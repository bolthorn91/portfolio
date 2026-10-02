import { createHmac, timingSafeEqual } from 'node:crypto'

export type Plan = 'free' | 'pro'

export type PlanStore = {
  getPlan(userId: string): Promise<Plan | undefined>
  setPlan(userId: string, plan: Plan): Promise<void>
}

export function createMemoryPlanStore(seed: Record<string, Plan> = {}): PlanStore & {
  all(): Record<string, Plan>
} {
  const plans: Record<string, Plan> = { ...seed }
  return {
    all: () => ({ ...plans }),
    async getPlan(userId) {
      return plans[userId]
    },
    async setPlan(userId, plan) {
      plans[userId] = plan
    },
  }
}

export class StripeSignatureError extends Error {
  readonly status = 400
  constructor() {
    super('invalid stripe signature')
    this.name = 'StripeSignatureError'
  }
}

export function verifyStripeSignature(
  rawBody: string,
  header: string | null,
  secret: string | undefined,
): boolean {
  if (!header || !secret) return false
  const items = Object.fromEntries(
    header.split(',').map((part) => {
      const [key, ...rest] = part.split('=')
      return [key.trim(), rest.join('=')]
    }),
  )
  const timestamp = items.t
  const signature = items.v1
  if (!timestamp || !signature) return false
  const expected = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex')
  const left = Buffer.from(signature)
  const right = Buffer.from(expected)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

export function signStripePayload(rawBody: string, secret: string, timestamp = '1700000000'): string {
  const v1 = createHmac('sha256', secret).update(`${timestamp}.${rawBody}`).digest('hex')
  return `t=${timestamp},v1=${v1}`
}

export async function handleStripeWebhook(
  rawBody: string,
  signatureHeader: string | null,
  secret: string | undefined,
  store: PlanStore,
): Promise<{ ok: true }> {
  if (!verifyStripeSignature(rawBody, signatureHeader, secret)) {
    throw new StripeSignatureError()
  }
  const event = JSON.parse(rawBody) as {
    type?: string
    data?: { object?: { metadata?: { userId?: string }; client_reference_id?: string } }
  }
  if (event.type === 'checkout.session.completed') {
    const userId = event.data?.object?.metadata?.userId ?? event.data?.object?.client_reference_id
    if (userId) await store.setPlan(userId, 'pro')
  }
  return { ok: true }
}

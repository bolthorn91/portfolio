import { createHmac, timingSafeEqual } from 'node:crypto'

export const ACADEMY_SIGNATURE_HEADER = 'x-academy-signature'

export function signAcademyWebhook(body: string, secret: string): string {
  return createHmac('sha256', secret).update(body).digest('hex')
}

export function verifyAcademyWebhook(
  body: string,
  signature: string | null,
  secret: string | undefined,
): boolean {
  if (!secret || !signature) return false
  const expected = signAcademyWebhook(body, secret)
  const left = Buffer.from(signature)
  const right = Buffer.from(expected)
  if (left.length !== right.length) return false
  return timingSafeEqual(left, right)
}

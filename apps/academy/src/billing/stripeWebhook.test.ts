import { describe, expect, it } from 'vitest'
import { createSubmission, createMemorySubmissionStore } from '../submissions/createSubmission'
import { planForUser, planStore } from './planStore'
import { POST } from '../app/api/stripe/webhook/route'
import {
  StripeSignatureError,
  createMemoryPlanStore,
  handleStripeWebhook,
  signStripePayload,
} from './stripeWebhook'

const secret = 'whsec_test'

describe('JR-07 Stripe webhook', () => {
  it('returns 400 on a bad signature', async () => {
    const store = createMemoryPlanStore({ 'user-1': 'free' })
    const body = JSON.stringify({
      type: 'checkout.session.completed',
      data: { object: { metadata: { userId: 'user-1' } } },
    })
    await expect(
      handleStripeWebhook(body, 't=1700000000,v1=deadbeef', secret, store),
    ).rejects.toMatchObject({ status: 400, name: 'StripeSignatureError' })
    expect(await store.getPlan('user-1')).toBe('free')
    expect(StripeSignatureError).toBeTruthy()
  })

  it('upgrades the user plan to pro on a valid signature', async () => {
    const store = createMemoryPlanStore({ 'user-1': 'free' })
    const body = JSON.stringify({
      type: 'checkout.session.completed',
      data: { object: { metadata: { userId: 'user-1' } } },
    })
    const header = signStripePayload(body, secret)
    const result = await handleStripeWebhook(body, header, secret, store)
    expect(result).toEqual({ ok: true })
    expect(await store.getPlan('user-1')).toBe('pro')
  })

  it('planForUser used by submissions becomes pro after a valid webhook', async () => {
    const previous = process.env.STRIPE_WEBHOOK_SECRET
    process.env.STRIPE_WEBHOOK_SECRET = secret
    const body = JSON.stringify({
      type: 'checkout.session.completed',
      data: { object: { metadata: { userId: 'product-user' } } },
    })
    const header = signStripePayload(body, secret)
    const response = await POST(
      new Request('http://localhost/api/stripe/webhook', {
        method: 'POST',
        headers: { 'stripe-signature': header },
        body,
      }),
    )
    expect(response.status).toBe(200)
    expect(await planForUser('product-user')).toBe('pro')
    const submissions = createMemorySubmissionStore()
    const created = await createSubmission(
      submissions,
      async () => ({ jobId: 'job-pro' }),
      {
        userId: 'product-user',
        plan: await planForUser('product-user'),
        challengeSlug: 'normalize-name',
        code: 'x',
      },
    )
    expect((await submissions.findById(created.id))?.plan).toBe('pro')
    expect(planStore).toBeTruthy()
    process.env.STRIPE_WEBHOOK_SECRET = previous
  })

  it('returns HTTP 400 from the shipped webhook route on a bad signature', async () => {
    const previous = process.env.STRIPE_WEBHOOK_SECRET
    process.env.STRIPE_WEBHOOK_SECRET = secret
    const body = JSON.stringify({
      type: 'checkout.session.completed',
      data: { object: { metadata: { userId: 'route-user' } } },
    })
    const response = await POST(
      new Request('http://localhost/api/stripe/webhook', {
        method: 'POST',
        headers: { 'stripe-signature': 't=1,v1=nope' },
        body,
      }),
    )
    expect(response.status).toBe(400)
    process.env.STRIPE_WEBHOOK_SECRET = previous
    expect(StripeSignatureError).toBeTruthy()
  })
})

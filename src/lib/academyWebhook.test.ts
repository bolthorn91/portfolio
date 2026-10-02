import { describe, expect, it } from 'vitest'
import { POST } from '../app/api/academy/webhooks/route'
import { signAcademyWebhook } from './academyWebhook'

describe('MVP-04 webhook HMAC', () => {
  it('returns 401 on a bad signature', async () => {
    const previous = process.env.WEBHOOK_PARENT_SECRET
    process.env.WEBHOOK_PARENT_SECRET = 'test-secret'
    const body = JSON.stringify({ type: 'lesson.completed' })
    const request = new Request('http://localhost/api/academy/webhooks', {
      method: 'POST',
      headers: { 'x-academy-signature': 'deadbeef' },
      body,
    })
    const response = await POST(request)
    expect(response.status).toBe(401)
    process.env.WEBHOOK_PARENT_SECRET = previous
  })

  it('accepts a valid HMAC', async () => {
    const previous = process.env.WEBHOOK_PARENT_SECRET
    process.env.WEBHOOK_PARENT_SECRET = 'test-secret'
    const body = JSON.stringify({ type: 'lesson.completed' })
    const request = new Request('http://localhost/api/academy/webhooks', {
      method: 'POST',
      headers: { 'x-academy-signature': signAcademyWebhook(body, 'test-secret') },
      body,
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    process.env.WEBHOOK_PARENT_SECRET = previous
  })
})

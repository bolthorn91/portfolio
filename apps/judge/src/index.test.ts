import { describe, expect, it } from 'vitest'
import { app } from './app'

describe('WS-01 health', () => {
  it('returns ok', async () => {
    const response = await app.request('/health')
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ ok: true })
  })
})

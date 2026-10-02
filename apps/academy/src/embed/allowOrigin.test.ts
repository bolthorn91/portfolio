import { describe, expect, it } from 'vitest'
import { GET } from '../app/embed/challenge/[slug]/route'
import { EmbedOriginError, assertEmbedOrigin, embedReadyMessage, isEmbedOriginAllowed } from './allowOrigin'

describe('PR-04 embed origin allowlist', () => {
  it('rejects origins that are not allowlisted', () => {
    expect(isEmbedOriginAllowed('https://evil.example', ['https://bolthornmakers.com'])).toBe(false)
    expect(() =>
      assertEmbedOrigin('https://evil.example', ['https://bolthornmakers.com']),
    ).toThrow(EmbedOriginError)
  })

  it('accepts an allowlisted origin and exposes EmbedMessage ready', () => {
    expect(isEmbedOriginAllowed('https://bolthornmakers.com', ['https://bolthornmakers.com'])).toBe(
      true,
    )
    expect(embedReadyMessage()).toEqual({ type: 'ready', payload: null })
  })

  it('GET embed handler returns 403 for a blocked origin', async () => {
    const previous = process.env.EMBED_ALLOWED_ORIGINS
    process.env.EMBED_ALLOWED_ORIGINS = 'https://bolthornmakers.com'
    const response = await GET(
      new Request('http://localhost/embed/challenge/normalize-name', {
        headers: { origin: 'https://evil.example' },
      }),
      { params: Promise.resolve({ slug: 'normalize-name' }) },
    )
    expect(response.status).toBe(403)
    const allowed = await GET(
      new Request('http://localhost/embed/challenge/normalize-name', {
        headers: { origin: 'https://bolthornmakers.com' },
      }),
      { params: Promise.resolve({ slug: 'normalize-name' }) },
    )
    expect(allowed.status).toBe(200)
    const body = (await allowed.json()) as { message: { type: string } }
    expect(body.message.type).toBe('ready')
    process.env.EMBED_ALLOWED_ORIGINS = previous
  })
})

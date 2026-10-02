import { describe, expect, it } from 'vitest'
import { challengeRouter, createChallengeCaller } from './challengeRouter'

describe('challenge.publicBySlug', () => {
  it('returns the public DTO and does not expose specBySlug', async () => {
    const caller = createChallengeCaller({})
    const dto = await caller.publicBySlug('normalize-name')
    expect(dto.slug).toBe('normalize-name')
    expect(JSON.stringify(dto)).not.toMatch(/hiddenTests|referenceSolution|generation/)
    expect('specBySlug' in caller).toBe(false)
  })
})

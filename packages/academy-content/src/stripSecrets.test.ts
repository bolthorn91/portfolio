import { describe, expect, it } from 'vitest'
import { loadChallengePublic, loadChallengeSpec } from './loadCourse'
import { CHALLENGE_SECRET_KEYS } from './stripSecrets'

describe('AC-01 public challenge DTO', () => {
  it('omits hiddenTests, referenceSolution and generation', () => {
    const spec = loadChallengeSpec('normalize-name')
    for (const key of CHALLENGE_SECRET_KEYS) {
      expect(spec).toHaveProperty(key)
    }

    const publicDto = loadChallengePublic('normalize-name')
    expect(JSON.stringify(publicDto)).not.toMatch(/hiddenTests|referenceSolution|generation/)
    expect(publicDto.slug).toBe('normalize-name')
    expect(publicDto.starterCode).toBeTruthy()
  })
})

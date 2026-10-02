import { describe, expect, it } from 'vitest'
import { loadChallengeSpec } from './loadCourse'
import { validateChallengeSpec } from './validateChallenge'

describe('JR-06 rubric weights', () => {
  it('rejects weights that do not sum to 100', () => {
    const result = validateChallengeSpec({
      slug: 'bad',
      rubric: {
        correctnessHidden: 50,
        computationalCost: 0,
        memory: 0,
        callEconomy: 0,
        styleQuality: 0,
        robustness: 0,
      },
    })
    expect(result.ok).toBe(false)
    expect(result.errors.join(' ')).toMatch(/sum to 100/)
  })

  it('accepts the seed normalize-name spec', () => {
    const spec = loadChallengeSpec('normalize-name')
    expect(validateChallengeSpec(spec).ok).toBe(true)
  })
})

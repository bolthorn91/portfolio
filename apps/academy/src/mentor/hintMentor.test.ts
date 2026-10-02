import { describe, expect, it } from 'vitest'
import { loadChallengeSpec } from '@bolthorn/academy-content'
import { createMemoryAiCallStore } from './aiCallStore'
import { requestEasyHint } from './hintMentor'

describe('PR-01 easy hint does not contain referenceSolution', () => {
  it('sanitizes a leaky LLM reply and logs ai_calls', async () => {
    const spec = loadChallengeSpec('normalize-name')
    const reference = String(spec.referenceSolution ?? '').trim()
    expect(reference.length).toBeGreaterThan(10)

    const log = createMemoryAiCallStore()
    const result = await requestEasyHint({
      userId: '11111111-1111-4111-8111-111111111111',
      challengeSlug: 'normalize-name',
      difficulty: 'easy',
      llm: {
        async complete() {
          return { text: `Copia esto: ${reference}`, tokens: 12 }
        },
      },
      log,
    })

    expect(result.hint).not.toContain(reference)
    expect(result.hint.length).toBeGreaterThan(0)
    const calls = await log.listByUser('11111111-1111-4111-8111-111111111111')
    expect(calls).toHaveLength(1)
    expect(calls[0]?.kind).toBe('hint')
    expect(calls[0]?.challengeSlug).toBe('normalize-name')
    expect(calls[0]?.tokens).toBe(12)
    expect(calls[0]?.text).not.toContain(reference)
  })
})

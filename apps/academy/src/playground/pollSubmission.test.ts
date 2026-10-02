import { describe, expect, it } from 'vitest'
import { pollSubmission } from './pollSubmission'

describe('pollSubmission', () => {
  it('returns public tests once the submission leaves queued', async () => {
    const snapshots = [
      { id: 'sub-1', status: 'queued' as const, publicResult: null },
      {
        id: 'sub-1',
        status: 'passed' as const,
        publicResult: {
          passedPublicTests: 1,
          totalPublicTests: 1,
          tests: [{ name: 'simple', passed: true }],
        },
      },
    ]
    const result = await pollSubmission(
      async () => {
        const next = snapshots.shift()
        if (!next) throw new Error('no snapshot')
        return next
      },
      'sub-1',
      { intervalMs: 0, sleep: async () => undefined },
    )
    expect(result.status).toBe('passed')
    expect(result.publicResult?.tests).toEqual([{ name: 'simple', passed: true }])
  })
})

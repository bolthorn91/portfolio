import { describe, expect, it } from 'vitest'
import {
  FREE_DAILY_RUN_LIMIT,
  QuotaExceededError,
  createMemorySubmissionStore,
  createSubmission,
  getSubmission,
  toPublicSubmission,
} from './createSubmission'

describe('MVP-01 createSubmission', () => {
  it('returns queued without invoking a sandbox', async () => {
    const store = createMemorySubmissionStore()
    let enqueueCalls = 0
    const result = await createSubmission(
      store,
      () => {
        enqueueCalls += 1
      },
      {
        userId: 'user-1',
        plan: 'free',
        challengeSlug: 'normalize-name',
        code: 'print(1)',
        now: new Date('2026-09-14T12:00:00.000Z'),
      },
    )
    expect(result.status).toBe('queued')
    expect(result.id).toBeTruthy()
    expect(enqueueCalls).toBe(1)
    const saved = await store.findById(result.id)
    expect(saved?.publicResult).toBeNull()
  })
})

describe('MVP-02 quota', () => {
  it('rejects the 31st free run on the same UTC day with 429', async () => {
    const now = new Date('2026-09-14T23:00:00.000Z')
    const seed = Array.from({ length: FREE_DAILY_RUN_LIMIT }, (_, index) => ({
      id: `seed-${index}`,
      userId: 'user-1',
      challengeSlug: 'normalize-name',
      code: 'x',
      status: 'queued' as const,
      publicResult: null,
      createdAt: now,
      plan: 'free' as const,
      judgeJobId: null,
      breakdown: null,
    }))
    const store = createMemorySubmissionStore(seed)

    await expect(
      createSubmission(store, () => undefined, {
        userId: 'user-1',
        plan: 'free',
        challengeSlug: 'normalize-name',
        code: 'print(1)',
        now,
      }),
    ).rejects.toMatchObject({ status: 429, name: 'QuotaExceededError' })

    try {
      await createSubmission(store, () => undefined, {
        userId: 'user-1',
        plan: 'free',
        challengeSlug: 'normalize-name',
        code: 'print(1)',
        now,
      })
    } catch (error) {
      expect(error).toBeInstanceOf(QuotaExceededError)
      expect((error as QuotaExceededError).message).toBe(
        'Has agotado las ejecuciones de hoy en el plan gratis.',
      )
    }
  })
})

describe('MVP-03 public result', () => {
  it('strips hiddenTests from a stored payload', async () => {
    const store = createMemorySubmissionStore([
      {
        id: 'sub-hidden',
        userId: 'user-1',
        challengeSlug: 'normalize-name',
        code: 'x',
        status: 'passed',
        publicResult: {
          passedPublicTests: 1,
          hiddenTests: [{ name: 'secret' }],
          referenceSolution: 'nope',
          generation: { model: 'x' },
        },
        createdAt: new Date(),
        plan: 'free',
        judgeJobId: null,
        breakdown: null,
      },
    ])
    const dto = await getSubmission(store, 'sub-hidden', 'user-1')
    expect(JSON.stringify(dto)).not.toMatch(/hiddenTests|referenceSolution|generation/)
    expect(toPublicSubmission((await store.findById('sub-hidden'))!).publicResult).not.toHaveProperty(
      'hiddenTests',
    )
  })
})

describe('judge result write-back', () => {
  it('copies public tests onto the academy submission when the judge job finishes', async () => {
    const store = createMemorySubmissionStore()
    const created = await createSubmission(
      store,
      async () => ({ jobId: 'job-1' }),
      {
        userId: 'user-1',
        plan: 'free',
        challengeSlug: 'normalize-name',
        code: 'def normalize_name(name): return name',
      },
    )
    expect((await store.findById(created.id))?.judgeJobId).toBe('job-1')
    expect((await store.findById(created.id))?.publicResult).toBeNull()

    const dto = await getSubmission(store, created.id, 'user-1', async (jobId) => {
      expect(jobId).toBe('job-1')
      return {
        status: 'passed',
        publicResult: {
          passedPublicTests: 1,
          totalPublicTests: 1,
          tests: [{ name: 'simple', passed: true }],
          hiddenTests: [{ name: 'secret' }],
        },
        breakdown: {
          total: 100,
          byCriterion: {
            correctnessHidden: 100,
            computationalCost: 0,
            memory: 0,
            callEconomy: 0,
            styleQuality: 100,
            robustness: 0,
          },
          passedPublicTests: 1,
          totalPublicTests: 1,
          passedHiddenTests: 1,
          totalHiddenTests: 1,
        },
      }
    })

    expect(dto.status).toBe('passed')
    expect(dto.publicResult?.passedPublicTests).toBe(1)
    expect(dto.publicResult?.tests).toEqual([{ name: 'simple', passed: true }])
    expect(JSON.stringify(dto)).not.toMatch(/hiddenTests/)
    expect((await store.findById(created.id))?.publicResult).not.toHaveProperty('hiddenTests')
    expect((await store.findById(created.id))?.breakdown?.byCriterion.correctnessHidden).toBe(100)
    expect(dto.score?.total).toBe(100)
    expect(JSON.stringify(dto.score)).not.toMatch(/byCriterion/)
  })
})

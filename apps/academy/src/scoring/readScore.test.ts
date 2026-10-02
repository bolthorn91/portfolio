import { describe, expect, it } from 'vitest'
import { GET } from '../app/api/scores/[id]/route'
import { planStore } from '../billing/planStore'
import { createMemorySubmissionStore } from '../submissions/createSubmission'
import { BreakdownForbiddenError, getStoredScore, readScore } from './readScore'
import type { ScoreBreakdown } from '@bolthorn/academy-types'
import { submissionStore } from '../submissions/submissionRouter'

const breakdown: ScoreBreakdown = {
  total: 92,
  byCriterion: {
    correctnessHidden: 100,
    computationalCost: 60,
    memory: 100,
    callEconomy: 100,
    styleQuality: 80,
    robustness: 100,
  },
  passedPublicTests: 1,
  totalPublicTests: 1,
  passedHiddenTests: 1,
  totalHiddenTests: 1,
}

describe('JR-05 free cannot read breakdown', () => {
  it('omits byCriterion for free callers', () => {
    const view = readScore(breakdown, 'free')
    expect(view).toEqual({
      total: 92,
      passedPublicTests: 1,
      totalPublicTests: 1,
    })
    expect(JSON.stringify(view)).not.toMatch(/byCriterion|correctnessHidden/)
  })

  it('forbids an explicit breakdown request on the free plan', () => {
    expect(() => readScore(breakdown, 'free', { includeBreakdown: true })).toThrow(
      BreakdownForbiddenError,
    )
  })

  it('returns byCriterion for pro', () => {
    const view = readScore(breakdown, 'pro', { includeBreakdown: true })
    expect('byCriterion' in view).toBe(true)
    if ('byCriterion' in view) {
      expect(view.byCriterion.correctnessHidden).toBe(100)
    }
  })

  it('GET /api/scores/:id uses stored judge breakdown and real plan', async () => {
    const stored = await submissionStore.insert({
      userId: 'score-user',
      challengeSlug: 'normalize-name',
      code: 'x',
      status: 'passed',
      publicResult: { tests: [{ name: 'simple', passed: true }] },
      createdAt: new Date(),
      plan: 'free',
      judgeJobId: 'job-score',
      breakdown,
    })
    await planStore.setPlan('score-user', 'free')

    const forbidden = await GET(
      new Request(`http://localhost/api/scores/${stored.id}?includeBreakdown=1`, {
        headers: { 'x-user-id': 'score-user' },
      }),
      { params: Promise.resolve({ id: stored.id }) },
    )
    expect(forbidden.status).toBe(403)

    await planStore.setPlan('score-user', 'pro')
    const allowed = await GET(
      new Request(`http://localhost/api/scores/${stored.id}?includeBreakdown=1`, {
        headers: { 'x-user-id': 'score-user' },
      }),
      { params: Promise.resolve({ id: stored.id }) },
    )
    expect(allowed.status).toBe(200)
    const body = (await allowed.json()) as { byCriterion?: { correctnessHidden: number } }
    expect(body.byCriterion?.correctnessHidden).toBe(100)

    const isolated = createMemorySubmissionStore()
    const row = await isolated.insert({
      userId: 'iso',
      challengeSlug: 'normalize-name',
      code: 'x',
      status: 'passed',
      publicResult: {},
      createdAt: new Date(),
      plan: 'free',
      judgeJobId: null,
      breakdown,
    })
    await expect(
      getStoredScore(isolated, planStore, row.id, 'iso', { includeBreakdown: true }),
    ).rejects.toMatchObject({ status: 403 })
  })
})

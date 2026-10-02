import type { ScoreBreakdown } from '@bolthorn/academy-types'
import type { PlanStore } from '../billing/stripeWebhook'
import type { SubmissionStore } from '../submissions/createSubmission'

export class BreakdownForbiddenError extends Error {
  readonly status = 403
  constructor() {
    super('breakdown requires plan pro')
    this.name = 'BreakdownForbiddenError'
  }
}

export type FreeScoreView = {
  total: number
  passedPublicTests: number
  totalPublicTests: number
}

export type ProScoreView = ScoreBreakdown

export function readScore(
  breakdown: ScoreBreakdown,
  plan: 'free' | 'pro',
  options: { includeBreakdown?: boolean } = {},
): FreeScoreView | ProScoreView {
  if (options.includeBreakdown && plan !== 'pro') {
    throw new BreakdownForbiddenError()
  }
  if (plan === 'free') {
    return {
      total: Math.round(breakdown.total),
      passedPublicTests: breakdown.passedPublicTests,
      totalPublicTests: breakdown.totalPublicTests,
    }
  }
  return {
    total: breakdown.total,
    byCriterion: breakdown.byCriterion,
    passedPublicTests: breakdown.passedPublicTests,
    totalPublicTests: breakdown.totalPublicTests,
    passedHiddenTests: breakdown.passedHiddenTests,
    totalHiddenTests: breakdown.totalHiddenTests,
  }
}

export async function getStoredScore(
  store: SubmissionStore,
  plans: PlanStore,
  submissionId: string,
  userId: string,
  options: { includeBreakdown?: boolean } = {},
): Promise<FreeScoreView | ProScoreView> {
  const row = await store.findById(submissionId)
  if (!row || row.userId !== userId) {
    throw Object.assign(new Error('not_found'), { status: 404 })
  }
  if (!row.breakdown) {
    throw Object.assign(new Error('not_found'), { status: 404 })
  }
  const plan = (await plans.getPlan(userId)) ?? row.plan
  return readScore(row.breakdown, plan, options)
}

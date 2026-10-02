import { stripChallengeSecrets } from '@bolthorn/academy-content'
import type { ScoreBreakdown } from '@bolthorn/academy-types'
import { readScore } from '../scoring/readScore'

export const FREE_DAILY_RUN_LIMIT = 30

export type SubmissionStatus = 'queued' | 'running' | 'passed' | 'failed' | 'error'

export type SubmissionRecord = {
  id: string
  userId: string
  challengeSlug: string
  code: string
  status: SubmissionStatus
  publicResult: Record<string, unknown> | null
  createdAt: Date
  plan: 'free' | 'pro'
  judgeJobId: string | null
  breakdown: ScoreBreakdown | null
}

export type CreateSubmissionInput = {
  userId: string
  plan: 'free' | 'pro'
  challengeSlug: string
  code: string
  now?: Date
}

export type EnqueueJob = (input: {
  submissionId: string
  challengeSlug: string
  code: string
}) => Promise<{ jobId: string } | void> | { jobId: string } | void

export type JudgeJobSnapshot = {
  status: SubmissionStatus
  publicResult: Record<string, unknown> | null
  breakdown?: ScoreBreakdown | null
}

export type SubmissionStore = {
  insert(row: Omit<SubmissionRecord, 'id'> & { id?: string }): Promise<SubmissionRecord>
  findById(id: string): Promise<SubmissionRecord | undefined>
  patch(id: string, patch: Partial<SubmissionRecord>): Promise<SubmissionRecord | undefined>
  countForUserOnUtcDay(userId: string, day: string): Promise<number>
}

export function utcDayKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function createMemorySubmissionStore(
  seed: SubmissionRecord[] = [],
): SubmissionStore & { all(): SubmissionRecord[] } {
  const rows = [...seed]
  return {
    all() {
      return [...rows]
    },
    async insert(row) {
      const created: SubmissionRecord = {
        id: row.id ?? crypto.randomUUID(),
        userId: row.userId,
        challengeSlug: row.challengeSlug,
        code: row.code,
        status: row.status,
        publicResult: row.publicResult,
        createdAt: row.createdAt,
        plan: row.plan,
        judgeJobId: row.judgeJobId ?? null,
        breakdown: row.breakdown ?? null,
      }
      rows.push(created)
      return created
    },
    async findById(id) {
      return rows.find((row) => row.id === id)
    },
    async patch(id, patch) {
      const row = rows.find((item) => item.id === id)
      if (!row) return undefined
      Object.assign(row, patch)
      return row
    },
    async countForUserOnUtcDay(userId, day) {
      return rows.filter(
        (row) => row.userId === userId && utcDayKey(row.createdAt) === day,
      ).length
    },
  }
}

export class QuotaExceededError extends Error {
  readonly status = 429
  constructor() {
    super('Has agotado las ejecuciones de hoy en el plan gratis.')
    this.name = 'QuotaExceededError'
  }
}

export async function createSubmission(
  store: SubmissionStore,
  enqueue: EnqueueJob,
  input: CreateSubmissionInput,
): Promise<{ id: string; status: 'queued' }> {
  const now = input.now ?? new Date()
  if (input.plan === 'free') {
    const used = await store.countForUserOnUtcDay(input.userId, utcDayKey(now))
    if (used >= FREE_DAILY_RUN_LIMIT) {
      throw new QuotaExceededError()
    }
  }

  const submission = await store.insert({
    userId: input.userId,
    challengeSlug: input.challengeSlug,
    code: input.code,
    status: 'queued',
    publicResult: null,
    createdAt: now,
    plan: input.plan,
    judgeJobId: null,
    breakdown: null,
  })

  const enqueued = await enqueue({
    submissionId: submission.id,
    challengeSlug: input.challengeSlug,
    code: input.code,
  })
  if (enqueued && enqueued.jobId) {
    await store.patch(submission.id, { judgeJobId: enqueued.jobId })
  }

  return { id: submission.id, status: 'queued' }
}

export async function applyJudgeResult(
  store: SubmissionStore,
  submissionId: string,
  snapshot: JudgeJobSnapshot,
): Promise<SubmissionRecord | undefined> {
  const publicResult = snapshot.publicResult
    ? (stripChallengeSecrets(snapshot.publicResult) as Record<string, unknown>)
    : null
  return store.patch(submissionId, {
    status: snapshot.status,
    publicResult,
    breakdown: snapshot.breakdown ?? null,
  })
}

export async function syncSubmissionWithJudge(
  store: SubmissionStore,
  id: string,
  fetchJob: (jobId: string) => Promise<JudgeJobSnapshot | null>,
): Promise<SubmissionRecord | undefined> {
  const row = await store.findById(id)
  if (!row) return undefined
  if (!row.judgeJobId) return row
  if (row.status !== 'queued' && row.status !== 'running') return row
  const snapshot = await fetchJob(row.judgeJobId)
  if (!snapshot) return row
  if (snapshot.status === 'queued') return row
  return (await applyJudgeResult(store, id, snapshot)) ?? row
}

export function toPublicSubmission(row: SubmissionRecord): {
  id: string
  status: SubmissionStatus
  publicResult: Record<string, unknown> | null
  score: ReturnType<typeof readScore> | null
} {
  const publicResult = row.publicResult
    ? stripHiddenDetails(stripChallengeSecrets(row.publicResult) as Record<string, unknown>)
    : null
  const score = row.breakdown ? readScore(row.breakdown, row.plan) : null
  return {
    id: row.id,
    status: row.status,
    publicResult,
    score,
  }
}

function stripHiddenDetails(result: Record<string, unknown>): Record<string, unknown> {
  const copy = { ...result }
  delete copy.hiddenTests
  delete copy.hiddenOutcomes
  delete copy.byCriterion
  if (copy.score && typeof copy.score === 'object') {
    const score = { ...(copy.score as Record<string, unknown>) }
    delete score.byCriterion
    copy.score = score
  }
  return copy
}

export async function getSubmission(
  store: SubmissionStore,
  id: string,
  ownerId: string,
  fetchJob?: (jobId: string) => Promise<JudgeJobSnapshot | null>,
): Promise<ReturnType<typeof toPublicSubmission>> {
  let row = await store.findById(id)
  if (!row || row.userId !== ownerId) {
    throw Object.assign(new Error('not_found'), { status: 404 })
  }
  if (fetchJob) {
    row = (await syncSubmissionWithJudge(store, id, fetchJob)) ?? row
  }
  return toPublicSubmission(row)
}

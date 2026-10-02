import { randomUUID } from 'node:crypto'
import { loadChallengeSpec } from '@bolthorn/academy-content'
import type { ScoreBreakdown } from '@bolthorn/academy-types'
import { functionNameFromSlug, runPublicTests, type PublicRunResult, type PublicTestCase } from './runPublicTests'
import { runJsPublicTests } from './runJsTests'
import type { Judge0Client } from './judge0Client'
import { scoreSubmission } from './scoreSubmission'

export type JudgeJobStatus = 'queued' | 'running' | 'passed' | 'failed' | 'error'

export type JudgeJob = {
  id: string
  submissionId: string
  challengeSlug: string
  code: string
  status: JudgeJobStatus
  language?: string
  publicResult: PublicRunResult | null
  breakdown: ScoreBreakdown | null
}

export type CreateJobInput = {
  submissionId: string
  challengeSlug: string
  code: string
  publicTests: PublicTestCase[]
  hiddenTests?: PublicTestCase[]
  functionName?: string
  language?: string
}

type JobStore = Map<string, JudgeJob>

export function createJobStore(): JobStore {
  return new Map()
}

export function createJob(
  store: JobStore,
  input: CreateJobInput,
  processLater: (jobId: string) => void,
): { id: string; status: 'queued' } {
  const id = randomUUID()
  store.set(id, {
    id,
    submissionId: input.submissionId,
    challengeSlug: input.challengeSlug,
    code: input.code,
    status: 'queued',
    language: input.language,
    publicResult: null,
    breakdown: null,
  })
  processLater(id)
  return { id, status: 'queued' }
}

export function getJob(store: JobStore, id: string): JudgeJob | undefined {
  return store.get(id)
}

type ChallengeRunSpec = {
  language: string
  functionName?: string
  hiddenTests: PublicTestCase[]
}

export function usesJsHarness(language: string): boolean {
  const normalized = language.toLowerCase()
  return (
    normalized === 'javascript' ||
    normalized === 'typescript' ||
    normalized === 'js' ||
    normalized === 'ts'
  )
}

function loadRunSpec(slug: string): ChallengeRunSpec {
  try {
    const spec = loadChallengeSpec(slug) as {
      language?: string
      functionName?: string
      hiddenTests?: PublicTestCase[]
    }
    return {
      language: String(spec.language ?? 'python'),
      functionName: typeof spec.functionName === 'string' ? spec.functionName : undefined,
      hiddenTests: Array.isArray(spec.hiddenTests) ? spec.hiddenTests : [],
    }
  } catch {
    return { language: 'python', hiddenTests: [] }
  }
}

export async function processJob(
  store: JobStore,
  id: string,
  publicTests: PublicTestCase[],
  client: Judge0Client | null,
  functionName?: string,
  hiddenTests: PublicTestCase[] = [],
): Promise<JudgeJob | undefined> {
  const job = store.get(id)
  if (!job) return undefined
  job.status = 'running'
  try {
    const spec = loadRunSpec(job.challengeSlug)
    const language = job.language ?? spec.language
    const resolvedName = functionName ?? spec.functionName ?? functionNameFromSlug(job.challengeSlug)
    const hidden = hiddenTests.length > 0 ? hiddenTests : spec.hiddenTests
    const publicRun = usesJsHarness(language)
      ? await runJsPublicTests(publicTests, job.code, client, resolvedName)
      : await runPublicTests(publicTests, job.code, client, resolvedName)
    const hiddenRun = usesJsHarness(language)
      ? await runJsPublicTests(hidden, job.code, client, resolvedName)
      : await runPublicTests(hidden, job.code, client, resolvedName)
    const grade = scoreSubmission({
      slug: job.challengeSlug,
      publicOutcomes: publicRun.tests,
      hiddenOutcomes: hiddenRun.tests,
    })
    job.publicResult = grade.publicResult
    job.breakdown = grade.breakdown
    if (grade.breakdown.total === 0 && (publicRun.passedPublicTests < publicRun.totalPublicTests || hiddenRun.passedPublicTests < hiddenRun.totalPublicTests)) {
      job.status = hiddenRun.totalPublicTests > 0 && hiddenRun.passedPublicTests < hiddenRun.totalPublicTests ? 'failed' : 'failed'
    } else if (grade.breakdown.total > 0) {
      job.status = 'passed'
    } else {
      job.status = 'failed'
    }
  } catch {
    job.status = 'error'
  }
  return job
}

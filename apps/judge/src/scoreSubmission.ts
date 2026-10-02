import type { JudgeMetrics, RubricWeights, ScoreBreakdown } from '@bolthorn/academy-types'
import type { PublicRunResult, PublicTestOutcome } from './runPublicTests'
import { toPublicRunResult } from './runPublicTests'

export const DEFAULT_RUBRIC: RubricWeights = {
  correctnessHidden: 40,
  computationalCost: 20,
  memory: 15,
  callEconomy: 10,
  styleQuality: 10,
  robustness: 5,
}

export const EASY_RUBRIC: RubricWeights = {
  correctnessHidden: 80,
  computationalCost: 0,
  memory: 0,
  callEconomy: 0,
  styleQuality: 20,
  robustness: 0,
}

const CRITERIA = [
  'correctnessHidden',
  'computationalCost',
  'memory',
  'callEconomy',
  'styleQuality',
  'robustness',
] as const

export function rubricForChallenge(slug: string, override?: Partial<RubricWeights>): RubricWeights {
  const base = slug === 'normalize-name' || slug === 'two-sum-lite' ? EASY_RUBRIC : DEFAULT_RUBRIC
  return { ...base, ...override }
}

export function rubricSum(weights: RubricWeights): number {
  return CRITERIA.reduce((sum, key) => sum + weights[key], 0)
}

export type GradeInput = {
  slug: string
  publicOutcomes: PublicTestOutcome[]
  hiddenOutcomes: PublicTestOutcome[]
  metrics?: Partial<JudgeMetrics>
  weights?: RubricWeights
}

export type GradeResult = {
  breakdown: ScoreBreakdown
  publicResult: PublicRunResult & {
    passedHiddenTests: number
    totalHiddenTests: number
    score: { total: number }
  }
}

function zeros(): ScoreBreakdown['byCriterion'] {
  return {
    correctnessHidden: 0,
    computationalCost: 0,
    memory: 0,
    callEconomy: 0,
    styleQuality: 0,
    robustness: 0,
  }
}

export function scoreSubmission(input: GradeInput): GradeResult {
  const weights = input.weights ?? rubricForChallenge(input.slug)
  const publicRun = toPublicRunResult(input.publicOutcomes)
  const hiddenPassed = input.hiddenOutcomes.filter((test) => test.passed).length
  const hiddenTotal = input.hiddenOutcomes.length
  const publicOk = publicRun.totalPublicTests === 0 || publicRun.passedPublicTests === publicRun.totalPublicTests
  const hiddenOk = hiddenTotal === 0 || hiddenPassed === hiddenTotal
  const counts = {
    passedPublicTests: publicRun.passedPublicTests,
    totalPublicTests: publicRun.totalPublicTests,
    passedHiddenTests: hiddenPassed,
    totalHiddenTests: hiddenTotal,
  }

  if (!publicOk || !hiddenOk) {
    return {
      breakdown: { total: 0, byCriterion: zeros(), ...counts },
      publicResult: {
        ...publicRun,
        ...counts,
        score: { total: 0 },
      },
    }
  }

  const metrics: JudgeMetrics = {
    timeMs: input.metrics?.timeMs ?? 1,
    memoryKb: input.metrics?.memoryKb ?? 1,
    callCounts: input.metrics?.callCounts ?? {},
    lintScore: input.metrics?.lintScore ?? 100,
    complexity: input.metrics?.complexity ?? 1,
  }

  const byCriterion: ScoreBreakdown['byCriterion'] = {
    correctnessHidden: 100,
    computationalCost: scoreCost(metrics),
    memory: scoreMemory(metrics),
    callEconomy: scoreCalls(metrics),
    styleQuality: clamp(metrics.lintScore),
    robustness: 100,
  }

  let total = 0
  for (const key of CRITERIA) {
    total += (byCriterion[key] * weights[key]) / 100
  }
  total = Math.round(total)

  return {
    breakdown: { total, byCriterion, ...counts },
    publicResult: {
      ...publicRun,
      ...counts,
      score: { total },
    },
  }
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value))
}

function scoreCost(metrics: JudgeMetrics): number {
  if (metrics.timeMs <= 20) return 100
  if (metrics.timeMs <= 80) return 60
  return 20
}

function scoreMemory(metrics: JudgeMetrics): number {
  if (metrics.memoryKb <= 4096) return 100
  if (metrics.memoryKb <= 16384) return 60
  return 20
}

function scoreCalls(metrics: JudgeMetrics): number {
  const totalCalls = Object.values(metrics.callCounts).reduce((sum, n) => sum + n, 0)
  if (totalCalls === 0) return 100
  if (totalCalls <= 10) return 80
  return 40
}

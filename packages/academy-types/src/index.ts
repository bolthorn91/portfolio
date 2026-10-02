export const DIFFICULTIES = ['easy', 'intermediate', 'hard', 'pro'] as const
export type Difficulty = (typeof DIFFICULTIES)[number]

export const PLANS = ['free', 'pro'] as const
export type Plan = (typeof PLANS)[number]

export const SUBMISSION_STATUSES = [
  'queued',
  'running',
  'passed',
  'failed',
  'error',
] as const
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number]

export interface RubricWeights {
  correctnessHidden: number
  computationalCost: number
  memory: number
  callEconomy: number
  styleQuality: number
  robustness: number
}

export interface JudgeMetrics {
  timeMs: number
  memoryKb: number
  callCounts: Record<string, number>
  lintScore: number
  complexity: number
}

export interface ScoreBreakdown {
  total: number
  byCriterion: Record<keyof RubricWeights, number>
  passedPublicTests: number
  totalPublicTests: number
  passedHiddenTests: number
  totalHiddenTests: number
}

export interface EmbedMessage {
  type: 'ready' | 'submitted' | 'scored' | 'resized'
  payload: unknown
}

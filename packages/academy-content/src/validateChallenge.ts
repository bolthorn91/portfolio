export type RubricLike = {
  correctnessHidden?: number
  computationalCost?: number
  memory?: number
  callEconomy?: number
  styleQuality?: number
  robustness?: number
}

export type ValidateResult = {
  ok: boolean
  errors: string[]
}

const RUBRIC_KEYS = [
  'correctnessHidden',
  'computationalCost',
  'memory',
  'callEconomy',
  'styleQuality',
  'robustness',
] as const

export function validateChallengeSpec(spec: Record<string, unknown>): ValidateResult {
  const errors: string[] = []
  const rubric = spec.rubric
  if (rubric && typeof rubric === 'object') {
    const weights = rubric as RubricLike
    const sum = RUBRIC_KEYS.reduce((total, key) => total + Number(weights[key] ?? 0), 0)
    if (sum !== 100) {
      errors.push(`rubric weights must sum to 100 (got ${sum})`)
    }
  }
  if (!spec.slug) errors.push('slug is required')
  return { ok: errors.length === 0, errors }
}

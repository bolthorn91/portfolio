export const CHALLENGE_SECRET_KEYS = [
  'referenceSolution',
  'hiddenTests',
  'generation',
] as const

export type ChallengeSecretKey = (typeof CHALLENGE_SECRET_KEYS)[number]

export function stripChallengeSecrets<T extends Record<string, unknown>>(
  spec: T,
): Omit<T, ChallengeSecretKey> {
  const publicSpec = { ...spec }
  for (const key of CHALLENGE_SECRET_KEYS) {
    delete publicSpec[key]
  }
  return publicSpec
}

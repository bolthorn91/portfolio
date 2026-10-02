import { loadChallengePublic } from '@bolthorn/academy-content'

export async function enqueueJudgeJob(input: {
  submissionId: string
  challengeSlug: string
  code: string
}): Promise<{ jobId: string }> {
  const baseUrl = process.env.JUDGE_URL ?? 'http://localhost:4001'
  const publicChallenge = loadChallengePublic(input.challengeSlug)
  const publicTests = Array.isArray(publicChallenge.publicTests)
    ? publicChallenge.publicTests
    : []
  const functionName =
    typeof publicChallenge.functionName === 'string'
      ? publicChallenge.functionName
      : input.challengeSlug.replace(/-/g, '_')
  const language =
    typeof publicChallenge.language === 'string' ? publicChallenge.language : undefined

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      submissionId: input.submissionId,
      challengeSlug: input.challengeSlug,
      code: input.code,
      publicTests,
      functionName,
      language,
    }),
  })
  const body = (await response.json()) as { id?: string }
  if (!body.id) {
    throw new Error('judge did not return a job id')
  }
  return { jobId: body.id }
}

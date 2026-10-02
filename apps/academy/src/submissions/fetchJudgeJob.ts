import type { JudgeJobSnapshot } from './createSubmission'

export async function fetchJudgeJob(jobId: string): Promise<JudgeJobSnapshot | null> {
  const baseUrl = process.env.JUDGE_URL ?? 'http://localhost:4001'
  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/jobs/${jobId}`)
  if (!response.ok) return null
  const body = (await response.json()) as JudgeJobSnapshot & { id?: string; breakdown?: JudgeJobSnapshot['breakdown'] }
  return {
    status: body.status,
    publicResult: body.publicResult,
    breakdown: body.breakdown,
  }
}

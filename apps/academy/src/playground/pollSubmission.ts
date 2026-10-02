import type { SubmissionStatus } from '../submissions/createSubmission'

export type PolledSubmission = {
  id: string
  status: SubmissionStatus
  publicResult: Record<string, unknown> | null
}

export function isTerminalStatus(status: SubmissionStatus): boolean {
  return status === 'passed' || status === 'failed' || status === 'error'
}

export async function pollSubmission(
  fetchById: (id: string) => Promise<PolledSubmission>,
  id: string,
  options: { intervalMs?: number; maxAttempts?: number; sleep?: (ms: number) => Promise<void> } = {},
): Promise<PolledSubmission> {
  const intervalMs = options.intervalMs ?? 50
  const maxAttempts = options.maxAttempts ?? 40
  const sleep = options.sleep ?? ((ms) => new Promise((resolve) => setTimeout(resolve, ms)))

  let last: PolledSubmission | undefined
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    last = await fetchById(id)
    if (isTerminalStatus(last.status)) return last
    await sleep(intervalMs)
  }
  if (!last) throw new Error('submission not found')
  return last
}

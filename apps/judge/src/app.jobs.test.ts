import { describe, expect, it } from 'vitest'
import { loadChallengeSpec } from '@bolthorn/academy-content'
import { app, createJudgeApp } from './app'

describe('POST /jobs', () => {
  it('returns queued JSON without waiting on Judge0', async () => {
    const started = Date.now()
    const response = await app.request('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId: 'sub-1',
        challengeSlug: 'normalize-name',
        code: 'print(1)',
        publicTests: [{ name: 'simple' }],
      }),
    })
    const elapsed = Date.now() - started
    expect(response.status).toBe(202)
    const body = (await response.json()) as { id: string; status: string }
    expect(body.status).toBe('queued')
    expect(body.id).toBeTruthy()
    expect(elapsed).toBeLessThan(2000)
  })

  it('scores the JS seed normalize-name-js on POST /jobs', async () => {
    const spec = loadChallengeSpec('normalize-name-js') as {
      publicTests: { name: string; input?: unknown; output?: unknown }[]
    }
    const judge = createJudgeApp(() => ({
      async runPython() {
        throw new Error('Python harness must not run for JS challenges')
      },
      async runJavaScript(source: string) {
        const logs: string[] = []
        const run = new Function('console', source)
        run({ log: (value: unknown) => logs.push(String(value)) })
        return {
          stdout: `${logs.join('\n')}\n`,
          stderr: '',
          status: { id: 3, description: 'Accepted' },
        }
      },
    }))

    const created = await judge.request('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        submissionId: 'sub-js-http',
        challengeSlug: 'normalize-name-js',
        code: 'function normalizeName(name) { return name.trim().replace(/\\s+/g, " "); }',
        publicTests: spec.publicTests,
      }),
    })
    expect(created.status).toBe(202)
    const queued = (await created.json()) as { id: string; status: string }
    expect(queued.status).toBe('queued')

    type JobSnapshot = {
      status: string
      publicResult: { passedPublicTests: number; totalPublicTests: number } | null
    }
    let body: JobSnapshot | null = null
    for (let attempt = 0; attempt < 40; attempt += 1) {
      const snapshot = await judge.request(`/jobs/${queued.id}`)
      body = (await snapshot.json()) as JobSnapshot
      if (body.status !== 'queued' && body.status !== 'running') break
      await new Promise((resolve) => setTimeout(resolve, 10))
    }
    expect(body?.status).toBe('passed')
    expect(body?.publicResult?.passedPublicTests).toBe(spec.publicTests.length)
  })
})

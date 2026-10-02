import { describe, expect, it } from 'vitest'
import { loadChallengeSpec } from '@bolthorn/academy-content'
import { createJob, createJobStore, getJob, processJob } from './jobs'
import { toPublicRunResult } from './runPublicTests'

describe('MVP-01 create job returns queued immediately', () => {
  it('does not wait for a hanging sandbox client', async () => {
    const store = createJobStore()
    let processed = false

    const result = createJob(
      store,
      {
        submissionId: 'sub-1',
        challengeSlug: 'normalize-name',
        code: 'def normalize_name(name): return name',
        publicTests: [{ name: 'simple', output: 'Ada Lovelace' }],
      },
      () => {
        processed = true
      },
    )

    expect(result).toEqual({ id: result.id, status: 'queued' })
    expect(getJob(store, result.id)?.publicResult).toBeNull()
    expect(processed).toBe(true)

    const hangingClient = {
      runPython: () => new Promise<never>(() => undefined),
      runJavaScript: () => new Promise<never>(() => undefined),
    }
    const processPromise = processJob(
      store,
      result.id,
      [{ name: 'simple' }],
      hangingClient,
    )
    await Promise.race([
      processPromise,
      new Promise((resolve) => setTimeout(resolve, 20)),
    ])
    expect(getJob(store, result.id)?.status).toBe('running')
  })
})

describe('public result mapping', () => {
  it('never includes hiddenTests on the public result', () => {
    const publicResult = toPublicRunResult([{ name: 'simple', passed: true }])
    expect(JSON.stringify(publicResult)).not.toMatch(/hiddenTests|referenceSolution|generation/)
  })
})

describe('processJob persists breakdown', () => {
  it('stores byCriterion on the job, not only score.total', async () => {
    const store = createJobStore()
    const created = createJob(
      store,
      {
        submissionId: 'sub-grade',
        challengeSlug: 'normalize-name',
        code: 'def normalize_name(name): return name',
        publicTests: [{ name: 'simple', input: ['ada lovelace'], output: 'Ada Lovelace' }],
      },
      () => undefined,
    )
    await processJob(
      store,
      created.id,
      [{ name: 'simple', input: ['ada lovelace'], output: 'Ada Lovelace' }],
      {
        runPython: async () => ({
          stdout: '"Ada Lovelace"\n',
          stderr: '',
          status: { id: 3, description: 'Accepted' },
        }),
        runJavaScript: async () => {
          throw new Error('JS harness must not run for Python challenges')
        },
      },
      'normalize_name',
      [{ name: 'extra spaces', input: ['  ada   lovelace '], output: 'Ada Lovelace' }],
    )
    const job = getJob(store, created.id)
    expect(job?.breakdown).toBeTruthy()
    expect(job?.breakdown?.byCriterion.correctnessHidden).toBe(100)
    expect(job?.breakdown?.total).toBeGreaterThanOrEqual(80)
    expect(JSON.stringify(job?.publicResult)).not.toMatch(/extra spaces/)
  })
})

describe('processJob JS seed', () => {
  it('scores normalize-name-js with runJavaScript, not the Python harness', async () => {
    const spec = loadChallengeSpec('normalize-name-js') as {
      publicTests: { name: string; input?: unknown; output?: unknown }[]
      functionName: string
      language: string
    }
    expect(spec.language).toBe('javascript')
    const store = createJobStore()
    const created = createJob(
      store,
      {
        submissionId: 'sub-js',
        challengeSlug: 'normalize-name-js',
        code: 'function normalizeName(name) { return name.trim().replace(/\\s+/g, " "); }',
        publicTests: spec.publicTests,
      },
      () => undefined,
    )

    let pythonCalls = 0
    let jsCalls = 0
    await processJob(
      store,
      created.id,
      spec.publicTests,
      {
        async runPython() {
          pythonCalls += 1
          return { stdout: '', stderr: '', status: { id: 3, description: 'Accepted' } }
        },
        async runJavaScript(source) {
          jsCalls += 1
          expect(source).toContain('normalizeName(..._list)')
          const logs: string[] = []
          const run = new Function('console', source)
          run({ log: (value: unknown) => logs.push(String(value)) })
          return {
            stdout: `${logs.join('\n')}\n`,
            stderr: '',
            status: { id: 3, description: 'Accepted' },
          }
        },
      },
    )

    const job = getJob(store, created.id)
    expect(pythonCalls).toBe(0)
    expect(jsCalls).toBeGreaterThan(0)
    expect(job?.status).toBe('passed')
    expect(job?.publicResult?.passedPublicTests).toBe(spec.publicTests.length)
    expect(job?.breakdown?.total).toBeGreaterThan(0)
  })
})

import { Hono } from 'hono'
import { createJob, createJobStore, getJob, processJob, type CreateJobInput } from './jobs'
import { judge0ClientFromEnv, type Judge0Client } from './judge0Client'

export function createJudgeApp(getClient: () => Judge0Client | null = judge0ClientFromEnv) {
  const jobs = createJobStore()
  const app = new Hono()

  app.get('/health', (c) => c.json({ ok: true as const }))

  app.post('/jobs', async (c) => {
    const body = (await c.req.json()) as CreateJobInput
    const created = createJob(jobs, body, (jobId) => {
      void processJob(
        jobs,
        jobId,
        body.publicTests ?? [],
        getClient(),
        body.functionName,
        body.hiddenTests ?? [],
      )
    })
    return c.json(created, 202)
  })

  app.get('/jobs/:id', (c) => {
    const job = getJob(jobs, c.req.param('id'))
    if (!job) return c.json({ error: 'not_found' }, 404)
    return c.json({
      id: job.id,
      status: job.status,
      publicResult: job.publicResult,
      breakdown: job.breakdown,
    })
  })

  return app
}

export const app = createJudgeApp()

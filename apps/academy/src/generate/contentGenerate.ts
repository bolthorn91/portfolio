export const GENERATE_STAGES = [
  'architect',
  'writer',
  'challengeSmith',
  'testForger',
  'validator',
  'pedagogue',
  'reviewer',
] as const

export type GenerateStage = (typeof GENERATE_STAGES)[number]

export type GenerateJobStatus = 'queued' | 'running' | 'ready' | 'failed' | 'published'

export type GenerateJob = {
  id: string
  brief: string
  status: GenerateJobStatus
  stagesDone: GenerateStage[]
}

export type GenerateJobStore = {
  insert(job: GenerateJob): Promise<GenerateJob>
  findById(id: string): Promise<GenerateJob | undefined>
  patch(id: string, patch: Partial<GenerateJob>): Promise<GenerateJob | undefined>
  list(): Promise<GenerateJob[]>
}

export function createMemoryGenerateStore(seed: GenerateJob[] = []): GenerateJobStore {
  const rows = [...seed]
  return {
    async insert(job) {
      rows.push(job)
      return job
    },
    async findById(id) {
      return rows.find((row) => row.id === id)
    },
    async patch(id, patch) {
      const row = rows.find((item) => item.id === id)
      if (!row) return undefined
      Object.assign(row, patch)
      return row
    },
    async list() {
      return [...rows]
    },
  }
}

export const generateStore = createMemoryGenerateStore()

export async function enqueueContentGenerate(
  store: GenerateJobStore,
  brief: string,
  processLater: (id: string) => void,
): Promise<{ id: string; status: 'queued' }> {
  const id = crypto.randomUUID()
  await store.insert({ id, brief, status: 'queued', stagesDone: [] })
  processLater(id)
  return { id, status: 'queued' }
}

export async function processContentGenerate(
  store: GenerateJobStore,
  id: string,
  runStage: (stage: GenerateStage) => Promise<void>,
): Promise<void> {
  const job = await store.findById(id)
  if (!job) return
  await store.patch(id, { status: 'running' })
  try {
    const done: GenerateStage[] = []
    for (const stage of GENERATE_STAGES) {
      await runStage(stage)
      done.push(stage)
      await store.patch(id, { stagesDone: [...done] })
    }
    await store.patch(id, { status: 'ready' })
  } catch {
    await store.patch(id, { status: 'failed' })
  }
}

export async function publishContentGenerate(
  store: GenerateJobStore,
  id: string,
): Promise<GenerateJob | undefined> {
  const job = await store.findById(id)
  if (!job) return undefined
  if (job.status !== 'ready') return job
  return store.patch(id, { status: 'published' })
}

import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { POST } from '../app/api/generate/route'
import { POST as PUBLISH } from '../app/api/generate/[id]/publish/route'
import GeneratorAdminPage from '../app/admin/generator/page'
import {
  createMemoryGenerateStore,
  enqueueContentGenerate,
  generateStore,
  processContentGenerate,
  publishContentGenerate,
} from './contentGenerate'

describe('PR-03 generate job is not inline', () => {
  it('returns queued before the processor runs stages', async () => {
    const store = createMemoryGenerateStore()
    let started = false
    const result = await enqueueContentGenerate(store, 'curso easy de python', () => {
      started = true
    })
    expect(result.status).toBe('queued')
    expect(result.id).toBeTruthy()
    expect((await store.findById(result.id))?.status).toBe('queued')
    expect(started).toBe(true)

    let processed = false
    const hang = processContentGenerate(store, result.id, async () => {
      processed = true
      await new Promise(() => undefined)
    })
    await Promise.race([hang, new Promise((resolve) => setTimeout(resolve, 20))])
    expect((await store.findById(result.id))?.status).toBe('running')
    expect(processed).toBe(true)
    expect(result.status).toBe('queued')
  })

  it('student-facing POST /api/generate returns queued', async () => {
    const response = await POST(
      new Request('http://localhost/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief: 'curso easy' }),
      }),
    )
    expect(response.status).toBe(202)
    const body = (await response.json()) as { status: string }
    expect(body.status).toBe('queued')
  })
})

describe('F9 publish ready generate jobs', () => {
  it('marks a ready job published and rejects jobs that are not ready', async () => {
    const store = createMemoryGenerateStore()
    const queued = await enqueueContentGenerate(store, 'curso easy de python', () => undefined)
    expect((await publishContentGenerate(store, queued.id))?.status).toBe('queued')
    await store.patch(queued.id, { status: 'ready' })
    expect((await publishContentGenerate(store, queued.id))?.status).toBe('published')
    expect(await publishContentGenerate(store, 'missing')).toBeUndefined()
  })

  it('POST /api/generate/:id/publish publishes a ready job and the admin UI exposes Publicar', async () => {
    const ready = await generateStore.insert({
      id: crypto.randomUUID(),
      brief: 'curso ready',
      status: 'ready',
      stagesDone: [],
    })
    const published = await PUBLISH(
      new Request(`http://localhost/api/generate/${ready.id}/publish`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
      }),
      { params: Promise.resolve({ id: ready.id }) },
    )
    expect(published.status).toBe(200)
    expect(await published.json()).toEqual({ id: ready.id, status: 'published' })

    const notReady = await generateStore.insert({
      id: crypto.randomUUID(),
      brief: 'curso queued',
      status: 'queued',
      stagesDone: [],
    })
    const conflict = await PUBLISH(
      new Request(`http://localhost/api/generate/${notReady.id}/publish`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
      }),
      { params: Promise.resolve({ id: notReady.id }) },
    )
    expect(conflict.status).toBe(409)

    const stillReady = await generateStore.insert({
      id: crypto.randomUUID(),
      brief: 'curso still ready',
      status: 'ready',
      stagesDone: [],
    })
    const html = renderToStaticMarkup(await GeneratorAdminPage())
    expect(html).toContain('Generaciones')
    expect(html).toContain('Publicar')
    expect(html).toContain(`/api/generate/${stillReady.id}/publish`)
    expect(html).not.toContain(`/api/generate/${notReady.id}/publish`)
  })
})

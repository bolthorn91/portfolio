import { describe, expect, it } from 'vitest'
import {
  createMemoryContentSyncStore,
  syncPublishedContent,
} from './syncPublishedContent'

describe('content:sync seed', () => {
  it('upserts published metadata and private specs, skipping drafts', async () => {
    const store = createMemoryContentSyncStore()
    await syncPublishedContent(store)

    expect(store.courses.map((course) => course.slug).sort()).toEqual([
      'js-data-in-the-ui',
      'python-fundamentals',
    ])
    expect(store.courses.map((course) => course.slug)).not.toContain('python-wip')
    expect(store.challenges.map((challenge) => challenge.slug)).toContain('normalize-name')
    expect(store.challenges.map((challenge) => challenge.slug)).toContain('normalize-name-js')

    const spec = store.challenges.find((challenge) => challenge.slug === 'normalize-name')
    expect(spec?.specYaml).toContain('hiddenTests')
    expect(spec?.specYaml).toContain('referenceSolution')
  })
})

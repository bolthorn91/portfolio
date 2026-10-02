import { readFileSync } from 'node:fs'
import { basename } from 'node:path'
import {
  listChallengePathsForCourse,
  loadChallengePublic,
  loadPublishedCourses,
} from '@bolthorn/academy-content'

export type SyncedCourse = {
  slug: string
  title: string
  language: string
  difficulty: string
  status: 'published'
  version: number
}

export type SyncedChallenge = {
  slug: string
  title: string
  language: string
  difficulty: string
  specYaml: string
}

export type ContentSyncStore = {
  upsertCourse(course: SyncedCourse): Promise<void>
  upsertChallenge(challenge: SyncedChallenge): Promise<void>
}

export function createMemoryContentSyncStore(): ContentSyncStore & {
  courses: SyncedCourse[]
  challenges: SyncedChallenge[]
} {
  const courses: SyncedCourse[] = []
  const challenges: SyncedChallenge[] = []
  return {
    courses,
    challenges,
    async upsertCourse(course) {
      const index = courses.findIndex((row) => row.slug === course.slug)
      if (index >= 0) courses[index] = course
      else courses.push(course)
    },
    async upsertChallenge(challenge) {
      const index = challenges.findIndex((row) => row.slug === challenge.slug)
      if (index >= 0) challenges[index] = challenge
      else challenges.push(challenge)
    },
  }
}

export async function syncPublishedContent(store: ContentSyncStore): Promise<void> {
  for (const meta of loadPublishedCourses()) {
    await store.upsertCourse({
      slug: meta.slug,
      title: meta.title,
      language: meta.language,
      difficulty: meta.difficulty,
      status: 'published',
      version: 1,
    })

    for (const path of listChallengePathsForCourse(meta.slug)) {
      const slug = basename(path, '.yaml')
      if (!slug) continue
      const publicDto = loadChallengePublic(slug)
      await store.upsertChallenge({
        slug,
        title: String(publicDto.title ?? slug),
        language: String(publicDto.language ?? meta.language),
        difficulty: String(publicDto.difficulty ?? meta.difficulty),
        specYaml: readFileSync(path, 'utf8'),
      })
    }
  }
}

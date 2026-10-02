import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parse } from 'yaml'
import { stripChallengeSecrets } from './stripSecrets'

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const defaultCoursesRoot = join(packageRoot, '..', '..', 'content', 'courses')
const fixturesDir = join(packageRoot, 'fixtures')

export function coursesRoot(): string {
  return process.env.ACADEMY_COURSES_ROOT ?? defaultCoursesRoot
}

export type PublishStatus = 'draft' | 'review' | 'published' | 'archived'

export type CourseMeta = {
  slug: string
  title: string
  language: string
  difficulty: string
  status: PublishStatus
}

export type CourseModule = {
  slug: string
  title: string
  order: number
}

export type Course = CourseMeta & {
  modules: CourseModule[]
}

type CourseYaml = {
  slug?: string
  title?: string
  language?: string
  difficulty?: string
  modules?: string[]
  publish?: { status?: string; version?: number }
}

type ModuleYaml = {
  slug?: string
  title?: string
  order?: number
}

function readYamlFile(path: string): Record<string, unknown> {
  return parse(readFileSync(path, 'utf8')) as Record<string, unknown>
}

function courseYamlPath(slug: string): string {
  return join(coursesRoot(), slug, 'course.yaml')
}

function parsePublishStatus(raw: CourseYaml): PublishStatus {
  const status = raw.publish?.status
  if (status === 'draft' || status === 'review' || status === 'published' || status === 'archived') {
    return status
  }
  return 'draft'
}

function toCourseMeta(slug: string, raw: CourseYaml): CourseMeta {
  return {
    slug: raw.slug ?? slug,
    title: raw.title ?? slug,
    language: String(raw.language ?? ''),
    difficulty: String(raw.difficulty ?? ''),
    status: parsePublishStatus(raw),
  }
}

export function loadCourses(): CourseMeta[] {
  const root = coursesRoot()
  if (!existsSync(root)) return []

  return readdirSync(root)
    .filter((entry) => statSync(join(root, entry)).isDirectory())
    .filter((slug) => existsSync(courseYamlPath(slug)))
    .map((slug) => {
      const raw = readYamlFile(courseYamlPath(slug)) as CourseYaml
      return toCourseMeta(slug, raw)
    })
}

export function loadPublishedCourses(): CourseMeta[] {
  return loadCourses().filter((course) => course.status === 'published')
}

export function loadCourse(slug: string): Course {
  const path = courseYamlPath(slug)
  if (!existsSync(path)) {
    throw new Error(`loadCourse not implemented for ${slug}`)
  }

  const raw = readYamlFile(path) as CourseYaml
  const moduleSlugs = raw.modules ?? []
  const modules = moduleSlugs.map((moduleSlug, index) => {
    const modulePath = join(coursesRoot(), slug, 'modules', moduleSlug, 'module.yaml')
    if (!existsSync(modulePath)) {
      return {
        slug: moduleSlug,
        title: moduleSlug,
        order: index + 1,
      }
    }
    const moduleRaw = readYamlFile(modulePath) as ModuleYaml
    return {
      slug: moduleRaw.slug ?? moduleSlug,
      title: moduleRaw.title ?? moduleSlug,
      order: moduleRaw.order ?? index + 1,
    }
  })

  return {
    ...toCourseMeta(slug, raw),
    modules,
  }
}

export function loadPublishedCourse(slug: string): Course | null {
  if (!existsSync(courseYamlPath(slug))) return null
  const course = loadCourse(slug)
  return course.status === 'published' ? course : null
}

export function listChallengePathsForCourse(courseSlug: string): string[] {
  const courseRoot = join(coursesRoot(), courseSlug)
  if (!existsSync(courseRoot)) return []

  const found: string[] = []
  const stack = [courseRoot]
  while (stack.length > 0) {
    const dir = stack.pop() as string
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry)
      if (statSync(full).isDirectory()) {
        stack.push(full)
        continue
      }
      if (entry.endsWith('.yaml') && dir.replace(/\\/g, '/').includes('/challenges')) {
        found.push(full)
      }
    }
  }
  return found
}

export function loadLesson(courseSlug: string, lessonSlug: string): { slug: string; title: string } {
  const courseRoot = join(coursesRoot(), courseSlug, 'modules')
  if (!existsSync(courseRoot)) {
    throw new Error(`loadLesson not implemented for ${courseSlug}/${lessonSlug}`)
  }

  for (const moduleSlug of readdirSync(courseRoot)) {
    const lessonsDir = join(courseRoot, moduleSlug, 'lessons')
    if (!existsSync(lessonsDir)) continue
    const match = readdirSync(lessonsDir).find((name) => name.startsWith(lessonSlug))
    if (!match) continue
    const body = readFileSync(join(lessonsDir, match), 'utf8')
    const titleMatch = body.match(/^title:\s*(.+)$/m)
    return { slug: lessonSlug, title: titleMatch?.[1]?.trim() ?? lessonSlug }
  }

  throw new Error(`loadLesson not implemented for ${courseSlug}/${lessonSlug}`)
}

function findChallengeYaml(slug: string): string | null {
  const root = coursesRoot()
  if (existsSync(root)) {
    const stack = [root]
    while (stack.length > 0) {
      const dir = stack.pop() as string
      for (const entry of readdirSync(dir)) {
        const full = join(dir, entry)
        if (statSync(full).isDirectory()) {
          stack.push(full)
          continue
        }
        if (entry === `${slug}.yaml` && dir.replace(/\\/g, '/').includes('/challenges')) {
          return full
        }
      }
    }
  }

  const fixture = join(fixturesDir, `${slug}.yaml`)
  return existsSync(fixture) ? fixture : null
}

export function loadChallengeSpec(slug: string): Record<string, unknown> {
  const path = findChallengeYaml(slug)
  if (!path) {
    throw new Error(`loadChallengeSpec not implemented for ${slug}`)
  }
  return readYamlFile(path)
}

export function loadChallengePublic(slug: string): Record<string, unknown> {
  return stripChallengeSecrets(loadChallengeSpec(slug))
}

import { describe, expect, it } from 'vitest'
import {
  loadCourse,
  loadCourses,
  loadPublishedCourse,
  loadPublishedCourses,
} from './loadCourse'

describe('AF-03 loadCourse python-fundamentals', () => {
  it('returns title and modules from git YAML', () => {
    const course = loadCourse('python-fundamentals')
    expect(course.slug).toBe('python-fundamentals')
    expect(course.title).toBe('Python desde cero')
    expect(course.language).toBe('python')
    expect(course.difficulty).toBe('easy')
    expect(course.status).toBe('published')
    expect(course.modules).toEqual([
      {
        slug: '03-funciones',
        title: 'Funciones que se pueden leer',
        order: 3,
      },
    ])

    const catalog = loadCourses()
    expect(catalog.some((item) => item.slug === 'python-fundamentals' && item.title === course.title)).toBe(true)
  })
})

describe('AF-02 unpublished courses stay out of the catalog', () => {
  it('omits draft courses from loadPublishedCourses', () => {
    const published = loadPublishedCourses()
    expect(published.map((course) => course.slug)).toContain('python-fundamentals')
    expect(published.map((course) => course.slug)).toContain('js-data-in-the-ui')
    expect(published.map((course) => course.slug)).not.toContain('python-wip')
    expect(loadPublishedCourse('python-wip')).toBeNull()
    expect(loadPublishedCourse('python-fundamentals')?.title).toBe('Python desde cero')
  })
})

import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { loadPublishedCourses } from '@bolthorn/academy-content'
import CourseList from './CourseList'

describe('AF-02 catalog page', () => {
  it('lists published seed and omits draft courses', () => {
    const html = renderToStaticMarkup(
      <CourseList courses={loadPublishedCourses()} />,
    )
    expect(html).toContain('Cursos')
    expect(html).toContain('Python desde cero')
    expect(html).toContain('/courses/python-fundamentals')
    expect(html).toContain('Datos en la UI')
    expect(html).toContain('/courses/js-data-in-the-ui')
    expect(html).not.toContain('python-wip')
    expect(html).not.toContain('Borrador WIP que no debe listarse')
  })
})

import type { CourseMeta } from '@bolthorn/academy-content'

export default function CourseList({ courses }: { courses: CourseMeta[] }) {
  return (
    <main>
      <h1>Cursos</h1>
      {courses.length === 0 ? (
        <p>No hay cursos publicados.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.slug}>
              <a href={`/courses/${course.slug}`}>{course.title}</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

import { notFound } from 'next/navigation'
import { loadPublishedCourse } from '@bolthorn/academy-content'

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = loadPublishedCourse(slug)
  if (!course) notFound()

  return (
    <main>
      <h1>{course.title}</h1>
      <p>
        {course.language} · {course.difficulty}
      </p>
      <ul>
        {course.modules.map((module) => (
          <li key={module.slug}>{module.title}</li>
        ))}
      </ul>
    </main>
  )
}

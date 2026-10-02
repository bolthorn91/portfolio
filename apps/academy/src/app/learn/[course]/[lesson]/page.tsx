import { loadLesson } from '@bolthorn/academy-content'
import { Callout, Checkpoint, CodePlayground, Quiz } from '../../../../mdx/components'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ course: string; lesson: string }>
}) {
  const { course, lesson } = await params
  const loaded = loadLesson(course, lesson)

  return (
    <main>
      <h1>{loaded.title}</h1>
      <Callout type="tip">Lee el enunciado y pasa a practicar.</Callout>
      <CodePlayground challenge="normalize-name" />
      <Quiz id="scope-basico" />
      <Checkpoint lessonSlug={loaded.slug} />
      <p>
        <a href={`/playground/normalize-name`}>Abrir playground</a>
      </p>
    </main>
  )
}

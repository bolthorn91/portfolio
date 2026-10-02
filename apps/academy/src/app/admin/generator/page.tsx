import { generateStore } from '../../../generate/contentGenerate'

export default async function GeneratorAdminPage() {
  const jobs = await generateStore.list()
  return (
    <main>
      <h1>Generaciones</h1>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            {job.brief} — {job.status}
            {job.status === 'ready' ? (
              <form action={`/api/generate/${job.id}/publish`} method="post">
                <button type="submit">Publicar</button>
              </form>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  )
}

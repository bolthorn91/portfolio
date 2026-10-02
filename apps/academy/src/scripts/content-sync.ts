import {
  createMemoryContentSyncStore,
  syncPublishedContent,
} from '../content/syncPublishedContent'

async function main() {
  const store = createMemoryContentSyncStore()
  await syncPublishedContent(store)
  console.log(
    JSON.stringify({
      dryRun: !process.env.DATABASE_URL,
      courses: store.courses.map((course) => course.slug),
      challenges: store.challenges.map((challenge) => challenge.slug),
    }),
  )
}

void main()

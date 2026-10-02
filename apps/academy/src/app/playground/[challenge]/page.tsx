import { loadChallengePublic } from '@bolthorn/academy-content'
import PlaygroundView from '../../../playground/PlaygroundView'

export default async function PlaygroundPage({
  params,
}: {
  params: Promise<{ challenge: string }>
}) {
  const { challenge } = await params
  const publicChallenge = loadChallengePublic(challenge)
  const starterCode = String(publicChallenge.starterCode ?? '')

  return (
    <main>
      <h1>{String(publicChallenge.title ?? challenge)}</h1>
      <PlaygroundView challengeSlug={challenge} starterCode={starterCode} />
    </main>
  )
}

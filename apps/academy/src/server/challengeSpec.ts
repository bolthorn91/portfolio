import 'server-only'
import { loadChallengeSpec } from '@bolthorn/academy-content'

export function loadChallengeSpecServer(slug: string) {
  return loadChallengeSpec(slug)
}

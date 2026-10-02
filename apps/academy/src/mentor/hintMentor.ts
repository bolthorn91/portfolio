import { loadChallengeSpec } from '@bolthorn/academy-content'
import { aiCallStore, type AiCallStore } from './aiCallStore'

export type LlmClient = {
  complete(prompt: string): Promise<{ text: string; tokens: number }>
}

const XAI_URL = 'https://api.x.ai/v1/chat/completions'

export function createXaiClient(
  apiKey: string,
  fetchImpl: typeof fetch = fetch,
): LlmClient {
  return {
    async complete(prompt) {
      const response = await fetchImpl(XAI_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'grok-4.5',
          messages: [{ role: 'user', content: prompt }],
        }),
      })
      const body = (await response.json()) as {
        choices?: { message?: { content?: string } }[]
        usage?: { total_tokens?: number }
      }
      return {
        text: body.choices?.[0]?.message?.content ?? '',
        tokens: body.usage?.total_tokens ?? 0,
      }
    },
  }
}

function sanitizeEasyHint(text: string, referenceSolution: string): string {
  const ref = referenceSolution.trim()
  if (!ref) return text
  if (text.includes(ref)) {
    return 'Piensa en los casos con espacios extra; no copies el ejemplo público.'
  }
  return text
}

export async function requestEasyHint(input: {
  userId: string
  challengeSlug: string
  difficulty: 'easy' | 'intermediate' | 'hard' | 'pro'
  llm: LlmClient
  loadSpec?: (slug: string) => Record<string, unknown>
  log?: AiCallStore
}): Promise<{ hint: string }> {
  const loadSpec = input.loadSpec ?? loadChallengeSpec
  const spec = loadSpec(input.challengeSlug)
  const reference = String(spec.referenceSolution ?? '')
  const prompt = [
    'Eres un mentor socrático. No des la función completa ni la solución de referencia.',
    `Reto: ${String(spec.title ?? input.challengeSlug)}`,
    'Haz una pregunta que ayude a pensar el caso límite.',
  ].join('\n')

  const { text, tokens } = await input.llm.complete(prompt)
  const hint =
    input.difficulty === 'easy' || input.difficulty === 'intermediate'
      ? sanitizeEasyHint(text, reference)
      : text

  const log = input.log ?? aiCallStore
  await log.insert({
    userId: input.userId,
    challengeSlug: input.challengeSlug,
    kind: 'hint',
    tokens,
    text: hint,
  })
  return { hint }
}

import { NextResponse } from 'next/server'
import { aiCallStore } from '../../../../mentor/aiCallStore'
import { createXaiClient, requestEasyHint } from '../../../../mentor/hintMentor'

export async function POST(request: Request) {
  const body = (await request.json()) as { challengeSlug?: string; difficulty?: 'easy' | 'intermediate' | 'hard' | 'pro' }
  if (!body.challengeSlug) {
    return NextResponse.json({ error: 'challengeSlug required' }, { status: 400 })
  }
  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'mentor unavailable' }, { status: 503 })
  }
  const hint = await requestEasyHint({
    userId: request.headers.get('x-user-id') ?? 'anonymous',
    challengeSlug: body.challengeSlug,
    difficulty: body.difficulty ?? 'easy',
    llm: createXaiClient(apiKey),
    log: aiCallStore,
  })
  return NextResponse.json(hint)
}

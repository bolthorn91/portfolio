import { NextResponse } from 'next/server'
import { loadChallengePublic } from '@bolthorn/academy-content'
import { EmbedOriginError, assertEmbedOrigin, embedReadyMessage } from '../../../../embed/allowOrigin'

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    assertEmbedOrigin(request.headers.get('origin'))
  } catch (error) {
    if (error instanceof EmbedOriginError) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    throw error
  }
  const { slug } = await context.params
  const challenge = loadChallengePublic(slug)
  return NextResponse.json({
    challenge: { slug: challenge.slug, title: challenge.title },
    message: embedReadyMessage(),
  })
}

import { NextResponse } from 'next/server'
import { progressStore } from '../../../progress/progressStore'
import { recordLessonProgress } from '../../../progress/recordProgress'

export async function POST(request: Request) {
  const body = (await request.json()) as { lessonSlug?: string }
  if (!body.lessonSlug) {
    return NextResponse.json({ error: 'lessonSlug required' }, { status: 400 })
  }
  const userId = request.headers.get('x-user-id') ?? 'anonymous'
  const row = await recordLessonProgress(progressStore, {
    userId,
    lessonSlug: body.lessonSlug,
  })
  return NextResponse.json({
    userId: row.userId,
    lessonSlug: row.lessonSlug,
    completedAt: row.completedAt.toISOString(),
  })
}

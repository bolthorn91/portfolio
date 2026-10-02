import { NextResponse } from 'next/server'
import { planStore } from '../../../../billing/planStore'
import { BreakdownForbiddenError, getStoredScore } from '../../../../scoring/readScore'
import { submissionStore } from '../../../../submissions/submissionRouter'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const userId = request.headers.get('x-user-id') ?? 'anonymous'
  const includeBreakdown = new URL(request.url).searchParams.get('includeBreakdown') === '1'
  try {
    const view = await getStoredScore(submissionStore, planStore, id, userId, {
      includeBreakdown,
    })
    return NextResponse.json(view)
  } catch (error) {
    if (error instanceof BreakdownForbiddenError) {
      return NextResponse.json({ error: error.message }, { status: 403 })
    }
    if (error instanceof Error && (error as Error & { status?: number }).status === 404) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    throw error
  }
}

import { NextResponse } from 'next/server'
import { getSubmission } from '../../../../submissions/createSubmission'
import { fetchJudgeJob } from '../../../../submissions/fetchJudgeJob'
import { submissionStore } from '../../../../submissions/submissionRouter'

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const userId = request.headers.get('x-user-id') ?? 'anonymous'
  try {
    const dto = await getSubmission(submissionStore, id, userId, fetchJudgeJob)
    return NextResponse.json(dto)
  } catch (error) {
    if (error instanceof Error && (error as Error & { status?: number }).status === 404) {
      return NextResponse.json({ error: 'not_found' }, { status: 404 })
    }
    throw error
  }
}

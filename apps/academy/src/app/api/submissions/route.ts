import { NextResponse } from 'next/server'
import { planForUser } from '../../../billing/planStore'
import { QuotaExceededError, createSubmission } from '../../../submissions/createSubmission'
import { enqueueJudgeJob } from '../../../submissions/enqueueJudgeJob'
import { submissionStore } from '../../../submissions/submissionRouter'

export async function POST(request: Request) {
  const body = (await request.json()) as { challengeSlug?: string; code?: string }
  if (!body.challengeSlug) {
    return NextResponse.json({ error: 'challengeSlug required' }, { status: 400 })
  }

  const userId = request.headers.get('x-user-id') ?? 'anonymous'
  const plan = await planForUser(userId)

  try {
    const created = await createSubmission(submissionStore, enqueueJudgeJob, {
      userId,
      plan,
      challengeSlug: body.challengeSlug,
      code: body.code ?? '',
    })
    return NextResponse.json(created, { status: 202 })
  } catch (error) {
    if (error instanceof QuotaExceededError) {
      return NextResponse.json({ error: error.message }, { status: 429 })
    }
    throw error
  }
}

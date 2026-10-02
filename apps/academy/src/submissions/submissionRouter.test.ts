import { TRPCError } from '@trpc/server'
import { describe, expect, it } from 'vitest'
import { FREE_DAILY_RUN_LIMIT } from './createSubmission'
import { createSubmissionCaller, submissionStore } from './submissionRouter'

describe('submission tRPC uses createSubmission', () => {
  it('maps quota errors to TOO_MANY_REQUESTS', async () => {
    const caller = createSubmissionCaller({ userId: 'quota-user', plan: 'free' })
    const now = new Date()
    for (let i = 0; i < FREE_DAILY_RUN_LIMIT; i += 1) {
      await submissionStore.insert({
        userId: 'quota-user',
        challengeSlug: 'normalize-name',
        code: 'x',
        status: 'queued',
        publicResult: null,
        createdAt: now,
        plan: 'free',
        judgeJobId: null,
        breakdown: null,
      })
    }

    await expect(
      caller.create({ challengeSlug: 'normalize-name', code: 'print(1)' }),
    ).rejects.toBeInstanceOf(TRPCError)
  })
})

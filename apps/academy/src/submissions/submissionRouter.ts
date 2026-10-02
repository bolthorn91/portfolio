import { initTRPC, TRPCError } from '@trpc/server'
import { z } from 'zod'
import {
  QuotaExceededError,
  createMemorySubmissionStore,
  createSubmission,
  getSubmission,
} from './createSubmission'
import { enqueueJudgeJob } from './enqueueJudgeJob'
import { fetchJudgeJob } from './fetchJudgeJob'

const t = initTRPC.context<{ userId: string; plan: 'free' | 'pro' }>().create()

export const submissionStore = createMemorySubmissionStore()

export const submissionRouter = t.router({
  create: t.procedure
    .input(
      z.object({
        challengeSlug: z.string().min(1),
        code: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await createSubmission(submissionStore, enqueueJudgeJob, {
          userId: ctx.userId,
          plan: ctx.plan,
          challengeSlug: input.challengeSlug,
          code: input.code,
        })
      } catch (error) {
        if (error instanceof QuotaExceededError) {
          throw new TRPCError({ code: 'TOO_MANY_REQUESTS', message: error.message })
        }
        throw error
      }
    }),
  byId: t.procedure.input(z.string().min(1)).query(async ({ ctx, input }) => {
    try {
      return await getSubmission(submissionStore, input, ctx.userId, fetchJudgeJob)
    } catch (error) {
      if (error instanceof Error && (error as Error & { status?: number }).status === 404) {
        throw new TRPCError({ code: 'NOT_FOUND' })
      }
      throw error
    }
  }),
})

export const createSubmissionCaller = t.createCallerFactory(submissionRouter)

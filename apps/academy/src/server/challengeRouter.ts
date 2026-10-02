import { initTRPC, TRPCError } from '@trpc/server'
import { loadChallengePublic } from '@bolthorn/academy-content'
import { z } from 'zod'

const t = initTRPC.create()

export const challengeRouter = t.router({
  publicBySlug: t.procedure.input(z.string().min(1)).query(({ input }) => {
    try {
      return loadChallengePublic(input)
    } catch {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }
  }),
})

export const createChallengeCaller = t.createCallerFactory(challengeRouter)

export type ChallengeRouter = typeof challengeRouter

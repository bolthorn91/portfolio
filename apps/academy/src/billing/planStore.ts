import { createMemoryPlanStore, type Plan } from './stripeWebhook'

export const planStore = createMemoryPlanStore()

export async function planForUser(userId: string): Promise<Plan> {
  return (await planStore.getPlan(userId)) ?? 'free'
}

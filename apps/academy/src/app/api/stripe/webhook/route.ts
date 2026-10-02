import { NextResponse } from 'next/server'
import { planStore } from '../../../../billing/planStore'
import { StripeSignatureError, handleStripeWebhook } from '../../../../billing/stripeWebhook'

export async function POST(request: Request) {
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')
  try {
    const result = await handleStripeWebhook(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
      planStore,
    )
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof StripeSignatureError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    throw error
  }
}

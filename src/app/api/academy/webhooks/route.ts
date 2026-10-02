import { NextResponse } from 'next/server'
import { ACADEMY_SIGNATURE_HEADER, verifyAcademyWebhook } from '../../../../lib/academyWebhook'

export async function POST(request: Request) {
  const raw = await request.text()
  const signature = request.headers.get(ACADEMY_SIGNATURE_HEADER)
  if (!verifyAcademyWebhook(raw, signature, process.env.WEBHOOK_PARENT_SECRET)) {
    return NextResponse.json({ error: 'invalid signature' }, { status: 401 })
  }
  return NextResponse.json({ ok: true })
}

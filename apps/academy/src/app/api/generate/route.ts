import { NextResponse } from 'next/server'
import {
  enqueueContentGenerate,
  generateStore,
  processContentGenerate,
} from '../../../generate/contentGenerate'

export async function POST(request: Request) {
  const body = (await request.json()) as { brief?: string }
  const created = await enqueueContentGenerate(generateStore, body.brief ?? '', (id) => {
    void processContentGenerate(generateStore, id, async () => undefined)
  })
  return NextResponse.json(created, { status: 202 })
}

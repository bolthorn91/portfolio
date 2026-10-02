import { NextResponse } from 'next/server'
import { generateStore, publishContentGenerate } from '../../../../../generate/contentGenerate'

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params
  const job = await publishContentGenerate(generateStore, id)
  if (!job) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  if (job.status !== 'published') {
    return NextResponse.json({ error: 'not_ready', status: job.status }, { status: 409 })
  }
  const accept = request.headers.get('accept') ?? ''
  if (accept.includes('application/json')) {
    return NextResponse.json({ id: job.id, status: job.status })
  }
  return NextResponse.redirect(new URL('/admin/generator', request.url), 303)
}
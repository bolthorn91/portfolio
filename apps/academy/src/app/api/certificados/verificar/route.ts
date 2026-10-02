import { NextResponse } from 'next/server'
import { certificateStore, verifyCertificate } from '../../../../certificates/certificates'

export async function GET(request: Request) {
  const hash = new URL(request.url).searchParams.get('hash') ?? ''
  const found = await verifyCertificate(certificateStore, hash)
  if (!found) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }
  return NextResponse.json({
    publicHash: found.publicHash,
    courseSlug: found.courseSlug,
  })
}

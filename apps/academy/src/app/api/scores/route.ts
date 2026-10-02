import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ error: 'use GET /api/scores/:id' }, { status: 404 })
}

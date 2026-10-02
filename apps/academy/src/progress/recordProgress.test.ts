import { describe, expect, it } from 'vitest'
import { POST } from '../app/api/progress/route'
import { progressStore } from './progressStore'

describe('progress', () => {
  it('records lesson completion through the shipped API handler', async () => {
    const request = new Request('http://localhost/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-id': 'user-1' },
      body: JSON.stringify({ lessonSlug: '01-que-es-una-funcion' }),
    })
    const response = await POST(request)
    expect(response.status).toBe(200)
    const body = (await response.json()) as { lessonSlug: string; userId: string }
    expect(body.lessonSlug).toBe('01-que-es-una-funcion')
    expect(body.userId).toBe('user-1')
    const saved = await progressStore.find('user-1', '01-que-es-una-funcion')
    expect(saved?.lessonSlug).toBe('01-que-es-una-funcion')
  })
})

import { describe, expect, it } from 'vitest'
import {
  JAVASCRIPT_LANGUAGE_ID,
  PYTHON_LANGUAGE_ID,
  createJudge0Client,
} from './judge0Client'

describe('Judge0 client language ids', () => {
  it('posts JavaScript with language_id 63 and Python with 71', async () => {
    const calls: { language_id: number; source_code: string }[] = []
    const fetchImpl: typeof fetch = async (_url, init) => {
      calls.push(JSON.parse(String(init?.body)) as { language_id: number; source_code: string })
      return new Response(
        JSON.stringify({ stdout: '"ok"', stderr: '', status: { id: 3, description: 'Accepted' } }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      )
    }
    const client = createJudge0Client('http://judge0.test', undefined, fetchImpl)
    await client.runPython('print(1)')
    await client.runJavaScript('console.log(1)')
    expect(PYTHON_LANGUAGE_ID).toBe(71)
    expect(JAVASCRIPT_LANGUAGE_ID).toBe(63)
    expect(calls[0]?.language_id).toBe(71)
    expect(calls[1]?.language_id).toBe(63)
    expect(calls[1]?.source_code).toBe('console.log(1)')
  })
})

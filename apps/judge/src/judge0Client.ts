export type Judge0RunResult = {
  stdout: string
  stderr: string
  status: { id: number; description: string }
}

export type Judge0Client = {
  runPython(source: string): Promise<Judge0RunResult>
  runJavaScript(source: string): Promise<Judge0RunResult>
}

export const PYTHON_LANGUAGE_ID = 71
export const JAVASCRIPT_LANGUAGE_ID = 63

async function submitJudge0(
  baseUrl: string,
  languageId: number,
  source: string,
  token?: string,
  fetchImpl: typeof fetch = fetch,
): Promise<Judge0RunResult> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['X-Auth-Token'] = token

  const response = await fetchImpl(
    `${baseUrl.replace(/\/$/, '')}/submissions?base64_encoded=false&wait=true`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({
        language_id: languageId,
        source_code: source,
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`Judge0 HTTP ${response.status}`)
  }

  const body = (await response.json()) as {
    stdout?: string | null
    stderr?: string | null
    status?: { id?: number; description?: string }
  }

  return {
    stdout: body.stdout ?? '',
    stderr: body.stderr ?? '',
    status: {
      id: body.status?.id ?? 0,
      description: body.status?.description ?? 'unknown',
    },
  }
}

export function createJudge0Client(
  baseUrl: string,
  token?: string,
  fetchImpl: typeof fetch = fetch,
): Judge0Client {
  return {
    runPython(source) {
      return submitJudge0(baseUrl, PYTHON_LANGUAGE_ID, source, token, fetchImpl)
    },
    runJavaScript(source) {
      return submitJudge0(baseUrl, JAVASCRIPT_LANGUAGE_ID, source, token, fetchImpl)
    },
  }
}

export function judge0ClientFromEnv(): Judge0Client | null {
  const baseUrl = process.env.JUDGE0_BASE_URL
  if (!baseUrl) return null
  return createJudge0Client(baseUrl, process.env.JUDGE0_AUTH_TOKEN)
}

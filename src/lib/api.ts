const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export function getApiUrl(path: string): string {
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let message = 'Request failed'
    try {
      const body = await response.json()
      message = body.message || body.error || message
    } catch {}
    throw new ApiError(response.status, message)
  }
  return response.json()
}

export async function apiGet<T>(path: string, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const response = await fetch(getApiUrl(path), { headers })
  return handleResponse<T>(response)
}

export async function apiPost<T>(path: string, body?: unknown, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  const response = await fetch(getApiUrl(path), {
    method: 'POST',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  return handleResponse<T>(response)
}

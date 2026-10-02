import type { EmbedMessage } from '@bolthorn/academy-types'

export function parseAllowlist(raw: string | undefined): string[] {
  return (raw ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export function isEmbedOriginAllowed(origin: string | null, allowlist: string[]): boolean {
  if (!origin) return false
  return allowlist.includes(origin)
}

export function embedReadyMessage(): EmbedMessage {
  return { type: 'ready', payload: null }
}

export class EmbedOriginError extends Error {
  readonly status = 403
  constructor() {
    super('embed origin not allowed')
    this.name = 'EmbedOriginError'
  }
}

export function assertEmbedOrigin(
  origin: string | null,
  allowlist = parseAllowlist(process.env.EMBED_ALLOWED_ORIGINS),
): void {
  if (!isEmbedOriginAllowed(origin, allowlist)) {
    throw new EmbedOriginError()
  }
}

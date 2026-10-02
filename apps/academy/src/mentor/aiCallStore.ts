export type AiCallKind = 'hint' | 'review' | 'generate-tests'

export type AiCallRow = {
  id: string
  userId: string
  challengeSlug: string
  kind: AiCallKind
  tokens: number
  text: string
  createdAt: Date
}

export type AiCallStore = {
  insert(row: Omit<AiCallRow, 'id' | 'createdAt'> & { id?: string; createdAt?: Date }): Promise<AiCallRow>
  listByUser(userId: string): Promise<AiCallRow[]>
}

export function createMemoryAiCallStore(seed: AiCallRow[] = []): AiCallStore & { all(): AiCallRow[] } {
  const rows = [...seed]
  return {
    all: () => [...rows],
    async insert(row) {
      const created: AiCallRow = {
        id: row.id ?? crypto.randomUUID(),
        userId: row.userId,
        challengeSlug: row.challengeSlug,
        kind: row.kind,
        tokens: row.tokens,
        text: row.text,
        createdAt: row.createdAt ?? new Date(),
      }
      rows.push(created)
      return created
    },
    async listByUser(userId) {
      return rows.filter((row) => row.userId === userId)
    },
  }
}

export const aiCallStore = createMemoryAiCallStore()

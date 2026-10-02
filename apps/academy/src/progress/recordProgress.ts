export type ProgressRow = {
  userId: string
  lessonSlug: string
  completedAt: Date
}

export type ProgressStore = {
  upsert(row: ProgressRow): Promise<ProgressRow>
  find(userId: string, lessonSlug: string): Promise<ProgressRow | undefined>
}

export function createMemoryProgressStore(): ProgressStore & { all(): ProgressRow[] } {
  const rows: ProgressRow[] = []
  return {
    all: () => [...rows],
    async find(userId, lessonSlug) {
      return rows.find((row) => row.userId === userId && row.lessonSlug === lessonSlug)
    },
    async upsert(row) {
      const index = rows.findIndex(
        (item) => item.userId === row.userId && item.lessonSlug === row.lessonSlug,
      )
      if (index >= 0) rows[index] = row
      else rows.push(row)
      return row
    },
  }
}

export async function recordLessonProgress(
  store: ProgressStore,
  input: { userId: string; lessonSlug: string; now?: Date },
): Promise<ProgressRow> {
  return store.upsert({
    userId: input.userId,
    lessonSlug: input.lessonSlug,
    completedAt: input.now ?? new Date(),
  })
}

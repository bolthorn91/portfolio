export type AcademyUserClaims = {
  sub: string
  email: string
  name?: string | null
}

export type AcademyUserRow = {
  id: string
  externalId: string
  email: string
  name: string | null
  role: 'student' | 'author' | 'admin'
  plan: 'free' | 'pro'
}

export type UserStore = {
  findByExternalId(externalId: string): Promise<AcademyUserRow | undefined>
  insert(row: Omit<AcademyUserRow, 'id'> & { id?: string }): Promise<AcademyUserRow>
}

export function createMemoryUserStore(
  seed: AcademyUserRow[] = [],
): UserStore & { all(): AcademyUserRow[] } {
  const rows = [...seed]

  return {
    all() {
      return [...rows]
    },
    async findByExternalId(externalId) {
      return rows.find((row) => row.externalId === externalId)
    },
    async insert(row) {
      const created: AcademyUserRow = {
        id: row.id ?? crypto.randomUUID(),
        externalId: row.externalId,
        email: row.email,
        name: row.name,
        role: row.role,
        plan: row.plan,
      }
      rows.push(created)
      return created
    },
  }
}

export async function upsertAcademyUser(
  store: UserStore,
  claims: AcademyUserClaims,
): Promise<{ user: AcademyUserRow; created: boolean }> {
  const existing = await store.findByExternalId(claims.sub)
  if (existing) {
    return { user: existing, created: false }
  }

  const user = await store.insert({
    externalId: claims.sub,
    email: claims.email,
    name: claims.name ?? null,
    role: 'student',
    plan: 'free',
  })
  return { user, created: true }
}

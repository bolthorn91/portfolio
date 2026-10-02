import { eq } from 'drizzle-orm'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import { users } from '../db/schema'
import type { AcademyUserRow, UserStore } from './upsertAcademyUser'

type AcademyDb = PostgresJsDatabase<Record<string, never>>

export function drizzleUserStore(db: AcademyDb): UserStore {
  return {
    async findByExternalId(externalId) {
      const [row] = await db.select().from(users).where(eq(users.externalId, externalId)).limit(1)
      if (!row) return undefined
      return toRow(row)
    },
    async insert(row) {
      const [created] = await db
        .insert(users)
        .values({
          externalId: row.externalId,
          email: row.email,
          name: row.name,
          role: row.role,
          plan: row.plan,
        })
        .returning()
      if (!created) {
        throw new Error('insert user failed')
      }
      return toRow(created)
    },
  }
}

function toRow(row: typeof users.$inferSelect): AcademyUserRow {
  return {
    id: row.id,
    externalId: row.externalId,
    email: row.email,
    name: row.name,
    role: row.role,
    plan: row.plan,
  }
}

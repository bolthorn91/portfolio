import { describe, expect, it } from 'vitest'
import { createMemoryUserStore, upsertAcademyUser } from './upsertAcademyUser'

describe('AF-01 upsert user', () => {
  it('does not duplicate a row for the same external_id', async () => {
    const store = createMemoryUserStore()
    const claims = {
      sub: '11111111-1111-4111-8111-111111111111',
      email: 'ada@bolthorn.test',
      name: 'Ada',
    }

    const first = await upsertAcademyUser(store, claims)
    const second = await upsertAcademyUser(store, {
      ...claims,
      email: 'ada-renamed@bolthorn.test',
    })

    expect(first.created).toBe(true)
    expect(second.created).toBe(false)
    expect(second.user.id).toBe(first.user.id)
    expect(second.user.externalId).toBe(claims.sub)
    expect(store.all()).toHaveLength(1)
    expect(store.all()[0]?.email).toBe('ada@bolthorn.test')
  })
})

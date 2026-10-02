import { getTableName } from 'drizzle-orm'
import { describe, expect, it } from 'vitest'
import {
  aiCalls,
  certificates,
  challengeSpecs,
  challenges,
  courses,
  lessons,
  modules,
  progress,
  submissions,
  users,
} from './schema'

const F4_TABLES = {
  users,
  courses,
  modules,
  lessons,
  challenges,
  challenge_specs: challengeSpecs,
  submissions,
  progress,
  certificates,
  ai_calls: aiCalls,
} as const

describe('F4 persistence surface', () => {
  it('exports migratable Drizzle tables with the canonical names', () => {
    const names = Object.entries(F4_TABLES).map(([key, table]) => {
      const sqlName = getTableName(table)
      expect(sqlName).toBe(key)
      return sqlName
    })

    expect(names).toEqual([
      'users',
      'courses',
      'modules',
      'lessons',
      'challenges',
      'challenge_specs',
      'submissions',
      'progress',
      'certificates',
      'ai_calls',
    ])
  })
})

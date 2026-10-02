import { describe, expect, it } from 'vitest'
import { DIFFICULTIES } from './index'

describe('AT-01 domain unions', () => {
  it('exports Difficulty runtime list', () => {
    expect(DIFFICULTIES).toEqual(['easy', 'intermediate', 'hard', 'pro'])
  })
})

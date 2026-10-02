import { describe, expect, it } from 'vitest'
import { EASY_RUBRIC, scoreSubmission } from './scoreSubmission'
import type { PublicTestOutcome } from './runPublicTests'

const publicPass: PublicTestOutcome[] = [{ name: 'simple', passed: true, output: '"Ada Lovelace"' }]
const hiddenPass: PublicTestOutcome[] = [{ name: 'extra spaces', passed: true, output: '"Ada Lovelace"' }]

describe('JR-01 referenceSolution scores high', () => {
  it('gives a high total when public and hidden correctness pass', () => {
    const grade = scoreSubmission({
      slug: 'normalize-name',
      publicOutcomes: publicPass,
      hiddenOutcomes: hiddenPass,
      metrics: { lintScore: 100, timeMs: 1, memoryKb: 1, callCounts: {}, complexity: 1 },
    })
    expect(grade.breakdown.total).toBeGreaterThanOrEqual(80)
    expect(grade.publicResult.score.total).toBe(grade.breakdown.total)
    expect(JSON.stringify(grade.publicResult)).not.toMatch(/extra spaces/)
  })
})

describe('JR-02 empty starter fails hidden ⇒ total 0', () => {
  it('gates quality at 0 when hidden correctness fails', () => {
    const grade = scoreSubmission({
      slug: 'normalize-name',
      publicOutcomes: publicPass,
      hiddenOutcomes: [{ name: 'extra spaces', passed: false, output: 'null' }],
    })
    expect(grade.breakdown.total).toBe(0)
    expect(grade.breakdown.byCriterion.correctnessHidden).toBe(0)
  })
})

describe('JR-03 hardcode of the public sample fails hidden', () => {
  it('scores 0 when the hidden extra-spaces case fails', () => {
    const grade = scoreSubmission({
      slug: 'normalize-name',
      publicOutcomes: [{ name: 'simple', passed: true }],
      hiddenOutcomes: [{ name: 'extra spaces', passed: false }],
    })
    expect(grade.breakdown.total).toBe(0)
    expect(grade.publicResult.passedHiddenTests).toBe(0)
    expect(grade.publicResult.tests.map((test) => test.name)).toEqual(['simple'])
  })
})

describe('JR-04 n² may pass easy two-sum', () => {
  it('still scores high on the easy rubric even with slow fixture metrics', () => {
    const grade = scoreSubmission({
      slug: 'two-sum-lite',
      publicOutcomes: [{ name: 'sample', passed: true }],
      hiddenOutcomes: [{ name: 'negatives', passed: true }],
      metrics: { timeMs: 500, memoryKb: 1, lintScore: 100, callCounts: {}, complexity: 20 },
      weights: EASY_RUBRIC,
    })
    expect(grade.breakdown.total).toBeGreaterThanOrEqual(80)
    expect(EASY_RUBRIC.computationalCost).toBe(0)
  })
})

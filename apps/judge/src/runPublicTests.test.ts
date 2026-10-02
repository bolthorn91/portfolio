import { describe, expect, it } from 'vitest'
import {
  buildPythonHarness,
  runPublicTests,
  scorePublicTest,
} from './runPublicTests'

describe('scorePublicTest', () => {
  it('accepts JSON stdout that matches the expected output', () => {
    expect(scorePublicTest('"Ada Lovelace"\n', 'Ada Lovelace')).toBe(true)
    expect(scorePublicTest('8.0\n', 8)).toBe(true)
  })

  it('rejects stdout that does not match expected output', () => {
    expect(scorePublicTest('1\n', 'Ada Lovelace')).toBe(false)
    expect(scorePublicTest('"hello"', 'Ada Lovelace')).toBe(false)
  })
})

describe('buildPythonHarness', () => {
  it('calls the target function with the test input', () => {
    const harness = buildPythonHarness(
      'def normalize_name(name): return name',
      'normalize_name',
      ['ada lovelace'],
    )
    expect(harness).toContain('normalize_name(*_args)')
    expect(harness).toContain('ada lovelace')
    expect(harness).toContain('json.dumps(_result')
  })
})

describe('runPublicTests', () => {
  it('maps fixture public tests without a live Judge0 client', async () => {
    const result = await runPublicTests(
      [{ name: 'simple', input: ['ada lovelace'], output: 'Ada Lovelace' }],
      'def normalize_name(name): return name',
      null,
      'normalize_name',
    )
    expect(result.totalPublicTests).toBe(1)
    expect(result.passedPublicTests).toBe(0)
    expect(result.tests[0]?.output).toBe('judge0_unavailable')
    expect(JSON.stringify(result)).not.toMatch(/hiddenTests/)
  })

  it('fails when Judge0 stdout does not match the expected output', async () => {
    const result = await runPublicTests(
      [{ name: 'simple', input: ['ada lovelace'], output: 'Ada Lovelace' }],
      'def normalize_name(name): return name',
      {
        runPython: async (source) => {
          expect(source).toContain('normalize_name(*_args)')
          return { stdout: '1\n', stderr: '', status: { id: 3, description: 'Accepted' } }
        },
      },
      'normalize_name',
    )
    expect(result.passedPublicTests).toBe(0)
    expect(result.tests[0]?.passed).toBe(false)
  })

  it('passes when Judge0 stdout matches the expected JSON value', async () => {
    const result = await runPublicTests(
      [{ name: 'simple', input: ['ada lovelace'], output: 'Ada Lovelace' }],
      'def normalize_name(name): return name.title()',
      {
        runPython: async () => ({
          stdout: '"Ada Lovelace"\n',
          stderr: '',
          status: { id: 3, description: 'Accepted' },
        }),
      },
      'normalize_name',
    )
    expect(result.passedPublicTests).toBe(1)
    expect(result.tests[0]?.passed).toBe(true)
  })
})

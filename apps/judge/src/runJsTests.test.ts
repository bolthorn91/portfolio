import { describe, expect, it } from 'vitest'
import { scorePublicTest } from './runPublicTests'
import { buildJsHarness, runJsPublicTests } from './runJsTests'

describe('PR-05 JS/TS public-test scorer', () => {
  it('passes matching JSON stdout and fails a wrong stdout', () => {
    expect(scorePublicTest('"Ada Lovelace"', 'Ada Lovelace')).toBe(true)
    expect(scorePublicTest('1', 'Ada Lovelace')).toBe(false)
  })

  it('scores a JS seed challenge via the shipped runner', async () => {
    const code = 'function normalizeName(name) { return name.trim(); }'
    const passed = await runJsPublicTests(
      [{ name: 'simple', input: ['Ada Lovelace'], output: 'Ada Lovelace' }],
      code,
      {
        async runJavaScript(source) {
          expect(source).toContain('normalizeName(..._list)')
          return { stdout: '"Ada Lovelace"\n', stderr: '', status: { id: 3 } }
        },
      },
      'normalizeName',
    )
    expect(passed.passedPublicTests).toBe(1)

    const failed = await runJsPublicTests(
      [{ name: 'simple', input: ['Ada Lovelace'], output: 'Ada Lovelace' }],
      code,
      {
        async runJavaScript() {
          return { stdout: '1\n', stderr: '', status: { id: 3 } }
        },
      },
      'normalizeName',
    )
    expect(failed.passedPublicTests).toBe(0)
    expect(buildJsHarness(code, 'normalizeName', ['x'])).toContain('normalizeName(..._list)')
  })
})

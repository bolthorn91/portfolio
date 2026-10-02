export type PublicTestCase = {
  name: string
  input?: unknown
  output?: unknown
}

export type PublicTestOutcome = {
  name: string
  passed: boolean
  output?: string
}

export type PublicRunResult = {
  passedPublicTests: number
  totalPublicTests: number
  tests: PublicTestOutcome[]
}

export function toPublicRunResult(outcomes: PublicTestOutcome[]): PublicRunResult {
  return {
    passedPublicTests: outcomes.filter((test) => test.passed).length,
    totalPublicTests: outcomes.length,
    tests: outcomes,
  }
}

export function functionNameFromSlug(slug: string): string {
  return slug.replace(/-/g, '_')
}

export function buildPythonHarness(code: string, functionName: string, input: unknown): string {
  const argsJson = JSON.stringify(input ?? [])
  return `${code}
import json
_args = json.loads(${JSON.stringify(argsJson)})
if not isinstance(_args, list):
    _args = [_args]
_result = ${functionName}(*_args)
print(json.dumps(_result, ensure_ascii=False))
`
}

export function scorePublicTest(stdout: string, expected: unknown): boolean {
  const text = stdout.trim()
  try {
    return jsonEqual(JSON.parse(text), expected)
  } catch {
    if (typeof expected === 'string') return text === expected
    return text === String(expected)
  }
}

function jsonEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(left) === JSON.stringify(right)
}

export async function runPublicTests(
  publicTests: PublicTestCase[],
  code: string,
  client: { runPython(source: string): Promise<{ stdout: string; stderr: string; status: { id: number } }> } | null,
  functionName = 'solution',
): Promise<PublicRunResult> {
  if (!client) {
    return toPublicRunResult(
      publicTests.map((test) => ({
        name: test.name,
        passed: false,
        output: 'judge0_unavailable',
      })),
    )
  }

  const outcomes: PublicTestOutcome[] = []
  for (const test of publicTests) {
    const harness = buildPythonHarness(code, functionName, test.input)
    const result = await client.runPython(harness)
    const passed =
      result.status.id === 3 &&
      !result.stderr.trim() &&
      scorePublicTest(result.stdout, test.output)
    outcomes.push({
      name: test.name,
      passed,
      output: result.stderr.trim() || result.stdout.trim(),
    })
  }
  return toPublicRunResult(outcomes)
}

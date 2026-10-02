import { scorePublicTest, type PublicTestCase, type PublicRunResult, toPublicRunResult } from './runPublicTests'

export function buildJsHarness(code: string, functionName: string, input: unknown): string {
  const argsJson = JSON.stringify(input ?? [])
  return `${code}
const _args = ${argsJson};
const _list = Array.isArray(_args) ? _args : [_args];
const _result = ${functionName}(..._list);
console.log(JSON.stringify(_result));
`
}

export async function runJsPublicTests(
  publicTests: PublicTestCase[],
  code: string,
  client: { runJavaScript(source: string): Promise<{ stdout: string; stderr: string; status: { id: number } }> } | null,
  functionName: string,
): Promise<PublicRunResult> {
  if (!client) {
    return toPublicRunResult(
      publicTests.map((test) => ({ name: test.name, passed: false, output: 'runner_unavailable' })),
    )
  }
  const outcomes = []
  for (const test of publicTests) {
    const harness = buildJsHarness(code, functionName, test.input)
    const result = await client.runJavaScript(harness)
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

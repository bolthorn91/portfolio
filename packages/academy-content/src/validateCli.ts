import { readFileSync } from 'node:fs'
import { parse } from 'yaml'
import { validateChallengeSpec } from './validateChallenge'

const file = process.argv[2]
if (!file) {
  console.error('usage: content:validate <challenge.yaml>')
  process.exit(2)
}

const spec = parse(readFileSync(file, 'utf8')) as Record<string, unknown>
const result = validateChallengeSpec(spec)
if (!result.ok) {
  console.error(result.errors.join('\n'))
  process.exit(1)
}
console.log('ok')

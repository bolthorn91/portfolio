import type { ReactNode } from 'react'

export type PublicTestView = { name: string; passed: boolean }

export function PlaygroundChrome({
  status,
  onRun,
  editor,
  tests = [],
}: {
  status: 'idle' | 'queued' | 'running' | 'passed' | 'failed' | 'error'
  onRun: () => void
  editor: ReactNode
  tests?: PublicTestView[]
}) {
  return (
    <section>
      {editor}
      <button type="button" onClick={onRun}>
        Ejecutar
      </button>
      {status === 'queued' ? <p>En cola</p> : null}
      {tests.length > 0 ? (
        <ul>
          {tests.map((test) => (
            <li key={test.name}>
              {test.name}: {test.passed ? 'ok' : 'fail'}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

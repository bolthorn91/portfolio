import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { PlaygroundChrome } from './PlaygroundChrome'

describe('MVP-06 playground', () => {
  it('uses Monaco rather than a textarea', () => {
    const dir = dirname(fileURLToPath(import.meta.url))
    const editor = readFileSync(join(dir, 'PlaygroundEditor.tsx'), 'utf8')
    const view = readFileSync(join(dir, 'PlaygroundView.tsx'), 'utf8')
    expect(editor).toContain('@monaco-editor/react')
    expect(editor).toContain('language="python"')
    expect(editor).not.toMatch(/<textarea/)
    expect(view).toContain('PlaygroundEditor')
    expect(view).not.toMatch(/<textarea/)
  })

  it('renders Spanish run and queued copy from the shipped chrome', () => {
    const html = renderToStaticMarkup(
      <PlaygroundChrome status="queued" onRun={() => undefined} editor={<div data-editor="monaco" />} />,
    )
    expect(html).toContain('Ejecutar')
    expect(html).toContain('En cola')
    expect(html).not.toMatch(/<textarea/)
  })

  it('renders public test outcomes from the shipped chrome', () => {
    const html = renderToStaticMarkup(
      <PlaygroundChrome
        status="passed"
        onRun={() => undefined}
        editor={<div data-editor="monaco" />}
        tests={[{ name: 'simple', passed: true }]}
      />,
    )
    expect(html).toContain('simple')
    expect(html).toContain('ok')
  })
})

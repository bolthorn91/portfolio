import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import PricingPage from './page'

describe('pricing UI', () => {
  it('renders Spanish Plan Pro, upgrade, and Desglose', () => {
    const html = renderToStaticMarkup(<PricingPage />)
    expect(html).toContain('Plan Pro')
    expect(html).toContain('Mejora a Pro')
    expect(html).toContain('Desglose')
    const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'page.tsx'), 'utf8')
    expect(src).not.toMatch(/byCriterion|correctnessHidden/)
  })
})

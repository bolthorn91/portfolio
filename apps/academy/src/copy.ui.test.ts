import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('PR UI copy', () => {
  it('includes Pedir pista, Generaciones, and Verificar certificado', () => {
    const root = join(process.cwd(), 'src')
    const hint = readFileSync(join(root, 'mentor/HintButton.tsx'), 'utf8')
    const admin = readFileSync(join(root, 'app/admin/generator/page.tsx'), 'utf8')
    const cert = readFileSync(join(root, 'app/certificados/verificar/page.tsx'), 'utf8')
    expect(hint).toContain('Pedir pista')
    expect(admin).toContain('Generaciones')
    expect(admin).toContain('Publicar')
    expect(cert).toContain('Verificar certificado')
    expect(hint).not.toContain('XAI_API_KEY')
    expect(admin).not.toContain('XAI_API_KEY')
    expect(cert).not.toContain('XAI_API_KEY')
  })
})

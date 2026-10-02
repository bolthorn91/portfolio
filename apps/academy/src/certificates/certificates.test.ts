import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import { GET } from '../app/api/certificados/verificar/route'
import VerifyCertificatePage from '../app/certificados/verificar/page'
import {
  certificateStore,
  createMemoryCertificateStore,
  issueCertificate,
  verifyCertificate,
} from './certificates'

describe('PR-05 certificate hash verify', () => {
  it('verifies an issued hash and 404s an unknown hash', async () => {
    const store = createMemoryCertificateStore()
    const issued = await issueCertificate(store, {
      userId: 'user-1',
      courseSlug: 'python-fundamentals',
      now: new Date('2026-09-15T00:00:00.000Z'),
      entropy: 'fixed',
    })
    expect(issued.publicHash).toMatch(/^[a-f0-9]{64}$/)
    expect(await verifyCertificate(store, issued.publicHash)).toEqual(issued)
    expect(await verifyCertificate(store, 'deadbeef')).toBeNull()

    await certificateStore.insert(issued)
    const ok = await GET(
      new Request(`http://localhost/api/certificados/verificar?hash=${issued.publicHash}`),
    )
    expect(ok.status).toBe(200)
    const missing = await GET(
      new Request('http://localhost/api/certificados/verificar?hash=unknown'),
    )
    expect(missing.status).toBe(404)

    const src = join(process.cwd(), 'src/app/certificados/verificar')
    expect(existsSync(join(src, 'page.tsx'))).toBe(true)
    expect(existsSync(join(src, 'route.ts'))).toBe(false)

    const validPage = await VerifyCertificatePage({
      searchParams: Promise.resolve({ hash: issued.publicHash }),
    })
    expect(renderToStaticMarkup(validPage)).toContain('python-fundamentals')
    const missingPage = await VerifyCertificatePage({
      searchParams: Promise.resolve({ hash: 'unknown' }),
    })
    expect(renderToStaticMarkup(missingPage)).toContain('Certificado no encontrado')
  })
})

import { certificateStore, verifyCertificate } from '../../../certificates/certificates'

export default async function VerifyCertificatePage({
  searchParams,
}: {
  searchParams: Promise<{ hash?: string }>
}) {
  const hash = ((await searchParams).hash ?? '').trim()
  const found = hash ? await verifyCertificate(certificateStore, hash) : null
  return (
    <main>
      <h1>Verificar certificado</h1>
      <form method="get">
        <label>
          Hash
          <input name="hash" defaultValue={hash} />
        </label>
        <button type="submit">Verificar certificado</button>
      </form>
      {hash ? (
        found ? (
          <p>
            Certificado válido: {found.courseSlug}
          </p>
        ) : (
          <p>Certificado no encontrado</p>
        )
      ) : null}
    </main>
  )
}

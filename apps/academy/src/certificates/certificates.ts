import { createHash, randomBytes } from 'node:crypto'

export type CertificateRecord = {
  userId: string
  courseSlug: string
  publicHash: string
  issuedAt: Date
}

export type CertificateStore = {
  insert(row: CertificateRecord): Promise<CertificateRecord>
  findByHash(hash: string): Promise<CertificateRecord | undefined>
}

export function createMemoryCertificateStore(
  seed: CertificateRecord[] = [],
): CertificateStore & { all(): CertificateRecord[] } {
  const rows = [...seed]
  return {
    all: () => [...rows],
    async insert(row) {
      rows.push(row)
      return row
    },
    async findByHash(hash) {
      return rows.find((row) => row.publicHash === hash)
    },
  }
}

export const certificateStore = createMemoryCertificateStore()

export function issueCertificate(
  store: CertificateStore,
  input: { userId: string; courseSlug: string; now?: Date; entropy?: string },
): Promise<CertificateRecord> {
  const issuedAt = input.now ?? new Date()
  const publicHash = createHash('sha256')
    .update(`${input.userId}:${input.courseSlug}:${issuedAt.toISOString()}:${input.entropy ?? randomBytes(8).toString('hex')}`)
    .digest('hex')
  return store.insert({
    userId: input.userId,
    courseSlug: input.courseSlug,
    publicHash,
    issuedAt,
  })
}

export async function verifyCertificate(
  store: CertificateStore,
  hash: string,
): Promise<CertificateRecord | null> {
  return (await store.findByHash(hash)) ?? null
}

'use client'

import { useEffect, useState } from 'react'
import HintButton from '../mentor/HintButton'
import { PlaygroundChrome, type PublicTestView } from './PlaygroundChrome'
import PlaygroundEditor from './PlaygroundEditor'
import { pollSubmission } from './pollSubmission'

export default function PlaygroundView({
  challengeSlug,
  starterCode,
}: {
  challengeSlug: string
  starterCode: string
}) {
  const draftKey = `academy-draft:${challengeSlug}`
  const [code, setCode] = useState(starterCode)
  const [status, setStatus] = useState<'idle' | 'queued' | 'running' | 'passed' | 'failed' | 'error'>('idle')
  const [tests, setTests] = useState<PublicTestView[]>([])

  useEffect(() => {
    const saved = window.localStorage.getItem(draftKey)
    if (saved) setCode(saved)
  }, [draftKey])

  useEffect(() => {
    window.localStorage.setItem(draftKey, code)
  }, [code, draftKey])

  async function onRun() {
    setStatus('queued')
    setTests([])
    const created = await fetch('/api/submissions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ challengeSlug, code }),
    })
    const body = (await created.json()) as { id?: string; status?: string }
    if (!body.id) return
    const finished = await pollSubmission(async (id) => {
      const response = await fetch(`/api/submissions/${id}`)
      return (await response.json()) as {
        id: string
        status: 'queued' | 'running' | 'passed' | 'failed' | 'error'
        publicResult: Record<string, unknown> | null
      }
    }, body.id)
    setStatus(finished.status)
    const listed = finished.publicResult?.tests
    if (Array.isArray(listed)) {
      setTests(
        listed.map((test) => {
          const row = test as { name?: string; passed?: boolean }
          return { name: String(row.name ?? ''), passed: Boolean(row.passed) }
        }),
      )
    }
  }

  return (
    <>
      <PlaygroundChrome
        status={status}
        onRun={() => void onRun()}
        editor={<PlaygroundEditor value={code} onChange={setCode} />}
        tests={tests}
      />
      <HintButton challengeSlug={challengeSlug} />
    </>
  )
}

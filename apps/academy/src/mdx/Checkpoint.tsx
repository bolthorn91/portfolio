'use client'

export default function Checkpoint({ lessonSlug }: { lessonSlug: string }) {
  async function complete() {
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonSlug }),
    })
  }

  return (
    <button type="button" data-checkpoint="true" onClick={() => void complete()}>
      Marcar como completado
    </button>
  )
}

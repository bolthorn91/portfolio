'use client'

export default function HintButton({ challengeSlug }: { challengeSlug: string }) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        void fetch('/api/mentor/hint', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ challengeSlug, difficulty: 'easy' }),
        })
      }}
    >
      <button type="submit">Pedir pista</button>
    </form>
  )
}

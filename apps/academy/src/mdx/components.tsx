import type { ReactNode } from 'react'

export function Callout({
  type,
  children,
}: {
  type: 'tip' | 'warning' | 'pro'
  children: ReactNode
}) {
  return <aside data-callout={type}>{children}</aside>
}

export function CodePlayground({ challenge }: { challenge: string }) {
  return <div data-playground={challenge} />
}

export function Quiz({ id }: { id: string }) {
  return <div data-quiz={id} />
}

export { default as Checkpoint } from './Checkpoint'

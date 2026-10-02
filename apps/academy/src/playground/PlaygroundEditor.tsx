'use client'

import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

export default function PlaygroundEditor({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <MonacoEditor
      height="320px"
      language="python"
      theme="vs-dark"
      value={value}
      onChange={(next) => onChange(next ?? '')}
      options={{ minimap: { enabled: false }, fontSize: 14 }}
    />
  )
}

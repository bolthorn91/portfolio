'use client'

import { useParams } from 'next/navigation'
import QuoteTracker from '@/components/sections/QuoteTracker'

export default function PresupuestoPage() {
  const params = useParams()
  const token = params.token as string

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <QuoteTracker token={token} />
      </div>
    </main>
  )
}

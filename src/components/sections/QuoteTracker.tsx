'use client'

import { useState, useEffect, useCallback } from 'react'
import { CheckCircle, Circle, Loader2 } from 'lucide-react'
import { apiGet, apiPost } from '@/lib/api'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/lib/AuthContext'
import AuthGate from '@/components/ui/AuthGate'
import type { QuoteResponse, PaymentProvider, QuoteStatus } from '@/types/api'

interface Props {
  token: string
}

const STATUS_ORDER: QuoteStatus[] = [
  'PENDING',
  'CONSULTING_REQUIRED',
  'CONSULTING_PAID',
  'QUOTED',
  'APPROVED',
  'DEPOSIT_PAID',
  'PAID',
  'IN_PROGRESS',
  'COMPLETED',
]

const STATUS_LABELS: Record<QuoteStatus, string> = {
  PENDING: 'Recibido',
  CONSULTING_REQUIRED: 'Consultoría requerida',
  CONSULTING_PAID: 'Consultoría pagada',
  QUOTED: 'Presupuestado',
  APPROVED: 'Aprobado',
  DEPOSIT_PAID: 'Anticipo pagado',
  PAID: 'Pagado completo',
  IN_PROGRESS: 'En desarrollo',
  COMPLETED: 'Completado',
  REJECTED: 'Rechazado',
  CANCELLED: 'Cancelado',
}

function getFilteredStatuses(quote: QuoteResponse): QuoteStatus[] {
  const filtered = STATUS_ORDER.filter((s) => {
    if (quote.status === 'REJECTED' || quote.status === 'CANCELLED') return true
    if (!quote.requiresConsulting && (s === 'CONSULTING_REQUIRED' || s === 'CONSULTING_PAID' || s === 'QUOTED')) return false
    return true
  })
  return filtered
}

function getDisplayStatuses(quote: QuoteResponse): QuoteStatus[] {
  const filtered = getFilteredStatuses(quote)
  if (quote.status === 'REJECTED' || quote.status === 'CANCELLED') {
    const idx = filtered.indexOf(quote.status)
    if (idx > 0) return [...filtered.slice(0, idx), quote.status]
    return [quote.status]
  }
  return filtered
}

function getCurrentStepIndex(statuses: QuoteStatus[], current: QuoteStatus): number {
  const idx = statuses.indexOf(current)
  return idx >= 0 ? idx : 0
}

export default function QuoteTracker({ token }: Props) {
  const [quote, setQuote] = useState<QuoteResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [paying, setPaying] = useState(false)
  const [providers, setProviders] = useState<PaymentProvider[]>([])
  const [selectedProvider, setSelectedProvider] = useState<'stripe' | 'paypal'>('stripe')
  const { user } = useAuth()

  const fetchQuote = useCallback(async () => {
    try {
      const data = await apiGet<QuoteResponse>(`/quotes/${token}`)
      setQuote(data)
      setError(null)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al cargar')
    } finally {
      setLoading(false)
    }
  }, [token])

  const fetchProviders = useCallback(async () => {
    try {
      const data = await apiGet<PaymentProvider[]>('/payments/providers')
      setProviders(data)
    } catch {}
  }, [])

  useEffect(() => {
    fetchQuote()
    fetchProviders()
    const interval = setInterval(fetchQuote, 30000)
    return () => clearInterval(interval)
  }, [fetchQuote, fetchProviders])

  const handlePay = async (paymentType: 'CONSULTING' | 'DEPOSIT' | 'FULL') => {
    if (!quote || !user) return
    setPaying(true)
    try {
      const session = await supabase.auth.getSession()
      const token_ = session.data.session?.access_token
      const result = await apiPost<{ redirectUrl: string }>(
        `/payments/create/${quote.id}/${selectedProvider}`,
        { paymentType },
        token_
      )
      window.location.href = result.redirectUrl
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al procesar pago')
    } finally {
      setPaying(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-white/60 mb-4">{error}</p>
        <button onClick={fetchQuote} className="text-white hover:underline">Reintentar</button>
      </div>
    )
  }

  if (!quote) return null

  const displayStatuses = getDisplayStatuses(quote)
  const currentStep = getCurrentStepIndex(displayStatuses, quote.status)
  const isTerminal = quote.status === 'COMPLETED' || quote.status === 'REJECTED' || quote.status === 'CANCELLED'

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Presupuesto {quote.reference}</h1>
        <p className="text-white/40">
          Creado el {new Date(quote.createdAt).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Timeline */}
      <div className="p-8 bg-[#0a0a0a] border border-white/[0.06]">
        <h2 className="text-lg font-semibold mb-6">Estado</h2>
        <div className="relative">
          {displayStatuses.map((status, i) => {
            const isPast = i < currentStep
            const isCurrent = i === currentStep
            const label = STATUS_LABELS[status]

            return (
              <div key={status} className="flex items-start gap-4 pb-6 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center z-10 ${
                    isPast ? 'bg-white/20 text-white/60' :
                    isCurrent ? 'bg-white/20 text-white' :
                    'border border-white/[0.06] text-white/40'
                  }`}>
                    {isPast ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  {i < displayStatuses.length - 1 && (
                    <div className={`w-0.5 h-full absolute top-8 left-4 ${
                      isPast ? 'bg-white/20' :
                      isCurrent ? 'bg-white/10' :
                      'border-l border-white/[0.06]'
                    }`} />
                  )}
                </div>
                <div className="pt-1">
                  <p className={`font-medium ${
                    isCurrent ? 'text-white' :
                    isPast ? 'text-white/60' :
                    'text-white/40'
                  }`}>{label}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-8 bg-[#0a0a0a] border border-white/[0.06]">
        <h2 className="text-lg font-semibold mb-4">Desglose de precios</h2>
        <div className="space-y-3">
          {quote.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-white/40">{item.subcategoryName} x{item.quantity}</span>
              <span>{item.totalPrice.toLocaleString()}€</span>
            </div>
          ))}
          {quote.addons.map((addon, i) => (
            <div key={`a-${i}`} className="flex justify-between text-sm">
              <span className="text-white/40">{addon.name}</span>
              <span>{addon.price.toLocaleString()}€</span>
            </div>
          ))}
          <div className="pt-3 border-t border-white/[0.06] flex justify-between font-semibold">
            <span>Total estimado</span>
            <span className="text-white">{quote.totalEstimate.toLocaleString()}€</span>
          </div>
          {quote.paidAmount > 0 && (
            <div className="flex justify-between text-sm text-white/60">
              <span>Pagado</span>
              <span>-{quote.paidAmount.toLocaleString()}€</span>
            </div>
          )}
        </div>
      </div>

      {/* Payment Actions */}
      {!isTerminal && (
        <div className="p-8 bg-[#0a0a0a] border border-white/[0.06]">
          <h2 className="text-lg font-semibold mb-4">Acciones</h2>

          {/* Provider selector */}
          {providers.length > 0 && (
            <div className="flex gap-3 mb-6">
              {providers.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedProvider(p.name as 'stripe' | 'paypal')}
                  className={`flex-1 py-3 border text-sm font-medium transition-all ${
                    selectedProvider === p.name
                      ? 'bg-white/10 border-white text-white'
                      : 'bg-background border-white/[0.06] text-white/40 hover:border-white/20'
                  }`}
                >
                  {p.name === 'stripe' ? 'Tarjeta / Bizum' : 'PayPal'}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-3">
            {quote.requiresConsulting && quote.consulting && (
              <AuthGate>
                <button
                  onClick={() => handlePay('CONSULTING')}
                  disabled={paying}
                  className="w-full py-3 bg-white disabled:opacity-50 text-black text-sm font-medium uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2"
                >
                  {paying && <Loader2 className="w-4 h-4 animate-spin" />}
                  Pagar consultoría ({quote.consulting.price}€)
                </button>
              </AuthGate>
            )}

            {(quote.status === 'APPROVED' || quote.status === 'QUOTED') && (
              <div className="space-y-2">
                <AuthGate>
                  <button
                    onClick={() => handlePay('DEPOSIT')}
                    disabled={paying}
                    className="w-full py-3 bg-white disabled:opacity-50 text-black text-sm font-medium uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2"
                  >
                    {paying && <Loader2 className="w-4 h-4 animate-spin" />}
                    Pagar anticipo (50% = {quote.depositAmount.toLocaleString()}€)
                  </button>
                </AuthGate>
                <AuthGate>
                  <button
                    onClick={() => handlePay('FULL')}
                    disabled={paying}
                    className="w-full py-3 border border-white/20 text-white hover:bg-white hover:text-black font-medium transition-all flex items-center justify-center gap-2"
                  >
                    {paying && <Loader2 className="w-4 h-4 animate-spin" />}
                    Pagar completo ({quote.totalEstimate.toLocaleString()}€)
                  </button>
                </AuthGate>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

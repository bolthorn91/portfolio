'use client'

import { useEffect, useState, useMemo } from 'react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { ArrowLeft, Loader2, Send, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { apiGet, apiPost } from '@/lib/api'
import type { ServiceSubcategory, ServiceCategory, QuoteEstimate } from '@/types/api'

export default function ContratarPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const slug = params.slug as string
  const subSlug = searchParams.get('sub')

  const [category, setCategory] = useState<ServiceCategory | null>(null)
  const [subcategory, setSubcategory] = useState<ServiceSubcategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Form state
  const [fieldValues, setFieldValues] = useState<Record<string, unknown>>({})
  const [selectedAddons, setSelectedAddons] = useState<string[]>([])
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [company, setCompany] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Estimate
  const [estimate, setEstimate] = useState<QuoteEstimate | null>(null)
  const [estimateLoading, setEstimateLoading] = useState(false)
  const [estimateError, setEstimateError] = useState<string | null>(null)

  const debouncedEstimate = useMemo(() => {
    return { subcategoryId: subcategory?.id, addonIds: selectedAddons, fieldValues }
  }, [subcategory?.id, selectedAddons, fieldValues])

  useEffect(() => {
    setLoading(true)
    apiGet<ServiceCategory>(`/services/${slug}`)
      .then((cat) => {
        setCategory(cat)
        if (subSlug) {
          const sub = cat.subcategories.find((s) => s.slug === subSlug)
          if (!sub) {
            setError('Subcategoría no encontrada')
          } else {
            setSubcategory(sub)
            const init: Record<string, unknown> = {}
            sub.formFields.forEach((f) => {
              if (f.fieldType === 'boolean') init[f.id] = false
              else if (f.fieldType === 'multiselect') init[f.id] = []
              else init[f.id] = ''
            })
            setFieldValues(init)
          }
        } else {
          setError('Selecciona un plan')
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [slug, subSlug])

  // Fetch estimate
  useEffect(() => {
    if (!subcategory) return
    setEstimateLoading(true)
    setEstimateError(null)
    const timer = setTimeout(async () => {
      try {
        const result = await apiPost<QuoteEstimate>('/quotes/estimate', {
          subcategoryId: subcategory.id,
          addonIds: selectedAddons,
          fieldValues,
        })
        setEstimate(result)
      } catch (err: unknown) {
        setEstimateError(err instanceof Error ? err.message : 'Error')
      } finally {
        setEstimateLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedEstimate, subcategory])

  const updateField = (id: string, value: unknown) => {
    setFieldValues((prev) => ({ ...prev, [id]: value }))
  }

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subcategory || !estimate) return
    setSubmitting(true)
    setSubmitError(null)
    try {
      const result = await apiPost<{ token: string }>('/quotes', {
        subcategoryId: subcategory.id,
        addonIds: selectedAddons,
        fieldValues,
        contactName,
        contactEmail,
        contactPhone: contactPhone || undefined,
        company: company || undefined,
        notes: notes || undefined,
        estimatedTotal: estimate.total,
      })
      router.push(`/presupuesto/${result.token}`)
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : 'Error al enviar solicitud')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </main>
    )
  }

  if (error || !subcategory) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{error || 'Error'}</p>
          <Link href={`/servicios/${slug}`} className="text-primary hover:underline">Volver</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Link href={`/servicios/${slug}`} className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver a {category?.name || slug}
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-2">{subcategory.name}</h1>
        <p className="text-muted-foreground mb-10">{subcategory.description}</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Add-ons */}
            {subcategory.addons.length > 0 && (
              <div className="p-6 bg-card rounded-2xl border border-border">
                <h2 className="text-lg font-semibold mb-4">Add-ons</h2>
                <div className="space-y-3">
                  {subcategory.addons.map((addon) => (
                    <label key={addon.id} className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:border-primary/50 transition-all cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAddons.includes(addon.id)}
                        onChange={() => toggleAddon(addon.id)}
                        className="w-4 h-4 accent-primary"
                      />
                      <div className="flex-1">
                        <span className="font-medium text-sm">{addon.name}</span>
                        {addon.description && <p className="text-xs text-muted-foreground">{addon.description}</p>}
                      </div>
                      <span className="text-sm font-semibold text-primary">{addon.price}€</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic form fields from backend */}
            {subcategory.formFields.length > 0 && (
              <div className="p-6 bg-card rounded-2xl border border-border">
                <h2 className="text-lg font-semibold mb-4">Detalles del proyecto</h2>
                <div className="space-y-5">
                  {subcategory.formFields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium mb-1.5">
                        {field.label}
                        {field.required && <span className="text-red-400 ml-1">*</span>}
                      </label>

                      {field.fieldType === 'textarea' ? (
                        <textarea
                          value={fieldValues[field.id] as string || ''}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          required={field.required}
                          placeholder={field.placeholder || ''}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none h-24"
                        />
                      ) : field.fieldType === 'number' ? (
                        <input
                          type="number"
                          value={fieldValues[field.id] as string || ''}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          required={field.required}
                          placeholder={field.placeholder || ''}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                      ) : field.fieldType === 'select' ? (
                        <select
                          value={fieldValues[field.id] as string || ''}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          required={field.required}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                        >
                          <option value="">Selecciona...</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      ) : field.fieldType === 'multiselect' ? (
                        <div className="space-y-2">
                          {field.options?.map((opt) => {
                            const selected = (fieldValues[field.id] as string[]) || []
                            const isSelected = selected.includes(opt.value)
                            return (
                              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => {
                                    const next = isSelected
                                      ? selected.filter((v) => v !== opt.value)
                                      : [...selected, opt.value]
                                    updateField(field.id, next)
                                  }}
                                  className="w-4 h-4 accent-primary"
                                />
                                <span className="text-sm">{opt.label}</span>
                              </label>
                            )
                          })}
                        </div>
                      ) : field.fieldType === 'boolean' ? (
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!!fieldValues[field.id]}
                            onChange={(e) => updateField(field.id, e.target.checked)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className="text-sm">{field.placeholder || 'Sí'}</span>
                        </label>
                      ) : (
                        <input
                          type={field.fieldType === 'email' ? 'email' : 'text'}
                          value={fieldValues[field.id] as string || ''}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          required={field.required}
                          placeholder={field.placeholder || ''}
                          className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                        />
                      )}

                      {field.helpText && (
                        <p className="text-xs text-muted-foreground mt-1">{field.helpText}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact form */}
            <form onSubmit={handleSubmit} className="p-6 bg-card rounded-2xl border border-border">
              <h2 className="text-lg font-semibold mb-4">Tus datos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Nombre *</label>
                  <input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="Tu nombre" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input type="email" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="tu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Teléfono</label>
                  <input type="text" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="+34 600 000 000" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Empresa</label>
                  <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors" placeholder="Nombre de tu empresa" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1.5">Notas adicionales</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none h-20" placeholder="Cualquier detalle que quieras añadir..." />
              </div>

              {submitError && (
                <p className="text-sm text-red-400 mb-4">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting || !estimate}
                className="w-full py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Enviar solicitud de presupuesto
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Price Calculator Sidebar */}
          <div className="lg:col-span-2">
            <div className="sticky top-28 p-6 bg-card rounded-2xl border border-border">
              <h2 className="text-lg font-semibold mb-4">Resumen de precios</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Precio base</span>
                  <span>{estimate?.basePrice.toLocaleString() || '—'}€</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Add-ons</span>
                    <span>+{estimate?.addonsPrice.toLocaleString() || '—'}€</span>
                  </div>
                )}
                {estimate && estimate.fieldModifiers > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ajustes</span>
                    <span>+{estimate.fieldModifiers.toLocaleString()}€</span>
                  </div>
                )}
                <div className="pt-3 border-t border-border flex justify-between font-semibold text-lg">
                  <span>Total estimado</span>
                  <span className={estimateLoading ? 'text-muted-foreground' : 'text-primary'}>
                    {estimateLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin inline" />
                    ) : estimate ? (
                      `${estimate.total.toLocaleString()}€`
                    ) : estimateError ? (
                      <span className="text-red-400 text-sm">Error</span>
                    ) : '—'}
                  </span>
                </div>
              </div>

              {estimate?.requiresConsulting && (
                <div className="flex items-start gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-4">
                  <HelpCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-amber-400">Requiere consultoría previa</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {estimate.consultingHours}h ({estimate.consultingPrice}€ adicionales)
                    </p>
                  </div>
                </div>
              )}

              {estimate && (
                <div className="flex justify-between text-sm px-3 py-2 bg-primary/10 rounded-lg">
                  <span className="font-medium">Anticipo mínimo (50%)</span>
                  <span className="font-bold text-primary">{estimate.depositAmount.toLocaleString()}€</span>
                </div>
              )}

              {estimateError && (
                <p className="text-xs text-red-400 mt-2">{estimateError}</p>
              )}

              <p className="text-xs text-muted-foreground mt-4">
                El precio es orientativo. El presupuesto final se confirmará tras revisar los detalles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

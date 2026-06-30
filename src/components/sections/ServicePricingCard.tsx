'use client'

import { CheckCircle, HelpCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import type { ServiceSubcategory } from '@/types/api'

interface Props {
  subcategory: ServiceSubcategory
  categorySlug: string
}

function formatPrice(sc: ServiceSubcategory): string {
  if (sc.priceType === 'fixed' && sc.basePrice != null) return `${sc.basePrice}€`
  if (sc.priceType === 'range' && sc.minPrice != null && sc.maxPrice != null) return `${sc.minPrice}€ – ${sc.maxPrice}€`
  if (sc.priceType === 'starting_from' && sc.basePrice != null) return `Desde ${sc.basePrice}€`
  if (sc.priceType === 'hourly' && sc.minPrice != null && sc.maxPrice != null) return `${sc.minPrice}€ – ${sc.maxPrice}€/h`
  if (sc.priceType === 'hourly' && sc.basePrice != null) return `${sc.basePrice}€/h`
  return 'Consultar'
}

function formatDays(days: number | null): string {
  if (!days) return ''
  return days <= 1 ? '1 día' : `${days} días`
}

export default function ServicePricingCard({ subcategory, categorySlug }: Props) {
  const priceLabel = formatPrice(subcategory)
  const daysLabel = formatDays(subcategory.estimatedDays)

  return (
    <div className="p-6 bg-[#0a0a0a] border border-white/[0.06] hover:border-white/20 transition-all flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold">{subcategory.name}</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{priceLabel}</div>
          {daysLabel && (
            <div className="flex items-center gap-1 text-xs text-white/40 justify-end">
              <Clock className="w-5 h-5 text-white/40" />
              {daysLabel}
            </div>
          )}
        </div>
      </div>

      <p className="text-white/40 text-sm mb-4">{subcategory.description}</p>

      {subcategory.requiresConsulting && (
        <div className="flex items-start gap-2 px-3 py-2 border border-white/[0.06] mb-4 group relative">
          <HelpCircle className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
          <div>
            <span className="text-xs font-medium text-white/40">Requiere consultoría previa</span>
            {subcategory.consultingCriteria && (
              <p className="text-xs text-white/40 mt-0.5">{subcategory.consultingCriteria}</p>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2 mb-6 flex-1">
        {subcategory.features.slice(0, 6).map((feat) => (
          <div key={feat} className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-5 h-5 text-white/40 mt-0.5 flex-shrink-0" />
            <span className="text-white/40">{feat}</span>
          </div>
        ))}
        {subcategory.features.length > 6 && (
          <p className="text-xs text-white/40 pl-6">+{subcategory.features.length - 6} más</p>
        )}
      </div>

      {subcategory.addons.length > 0 && (
        <div className="mb-6 pt-4 border-t border-white/[0.06]">
          <p className="text-sm font-medium mb-2">Add-ons disponibles:</p>
          <div className="space-y-1.5">
            {subcategory.addons.map((addon) => (
              <div key={addon.id} className="flex justify-between text-sm">
                <span className="text-white/40">{addon.name}</span>
                <span className="font-medium">
                  {addon.priceType === 'percentage' ? `${addon.price}%` : `${addon.price}€`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href={`/servicios/${categorySlug}/contratar?sub=${subcategory.slug}`}
        className="mt-auto w-full inline-flex items-center justify-center gap-2 py-3 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all"
      >
        Solicitar presupuesto
      </Link>
    </div>
  )
}

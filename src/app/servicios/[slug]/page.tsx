'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ArrowRight, ArrowRightCircle, Code2, Smartphone, Brain, Cloud, Sparkles, GraduationCap, Globe } from 'lucide-react'
import Link from 'next/link'
import { apiGet } from '@/lib/api'
import ServicePricingCard from '@/components/sections/ServicePricingCard'
import type { ServiceCategory } from '@/types/api'

const iconMap: Record<string, React.ElementType> = {
  Globe: Globe,
  Code2: Code2,
  Smartphone: Smartphone,
  Brain: Brain,
  Cloud: Cloud,
  Sparkles: Sparkles,
  GraduationCap: GraduationCap,
}

const visualTheme = {
  gradient: 'from-white/[0.03] to-transparent',
  pattern: 'bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]',
  iconBg: 'bg-white/10',
}

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [category, setCategory] = useState<ServiceCategory | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    apiGet<ServiceCategory>(`/services/${slug}`)
      .then((data) => { if (!cancelled) setCategory(data) })
      .catch((err) => { if (!cancelled) setError(err.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </main>
    )
  }

  if (error || !category) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">{error || 'Categoría no encontrada'}</p>
          <Link href="/servicios" className="text-primary hover:underline">Volver a servicios</Link>
        </div>
      </main>
    )
  }

  const Icon = iconMap[category.icon] || Code2

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent" />
        <div className={`absolute inset-0 ${visualTheme.pattern}`} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/servicios" className="inline-flex items-center gap-1 text-white/40 hover:text-white mb-8 transition-colors text-sm">
            <ArrowRightCircle className="w-4 h-4 rotate-180" />
            Volver a servicios
          </Link>
          <div className="max-w-4xl">
            <div className="w-14 h-14 bg-white/10 flex items-center justify-center mb-6">
              <Icon className="w-7 h-7 text-white/60" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">{category.name}</h1>
            <p className="text-lg text-white/40 max-w-2xl">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Planes y precios</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
              Elige el plan que mejor se adapte a ti
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Todos nuestros planes incluyen calidad garantizada, soporte y mejores prácticas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subcategories.map((sub) => (
              <ServicePricingCard key={sub.id} subcategory={sub} categorySlug={slug} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-16 bg-[#0a0a0a] border border-white/[0.06]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">¿No encuentras lo que buscas?</h2>
            <p className="text-white/40 text-lg mb-8 max-w-2xl mx-auto">
              Cada proyecto es único. Hablemos y diseñamos la solución perfecta para ti.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/90"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

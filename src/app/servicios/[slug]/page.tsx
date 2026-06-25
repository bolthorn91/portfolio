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
  Lightbulb: Sparkles,
}

const visualThemes: Record<string, { gradient: string; pattern: string; iconBg: string }> = {
  'web-development': {
    gradient: 'from-blue-600/20 to-cyan-900/20',
    pattern: 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]',
    iconBg: 'bg-blue-500/20',
  },
  'mobile-development': {
    gradient: 'from-purple-600/20 to-pink-900/20',
    pattern: 'bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]',
    iconBg: 'bg-purple-500/20',
  },
  'artificial-intelligence': {
    gradient: 'from-emerald-600/20 to-teal-900/20',
    pattern: 'bg-[linear-gradient(45deg,rgba(255,255,255,0.04)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.04)_75%,transparent_75%)] bg-[size:20px_20px]',
    iconBg: 'bg-emerald-500/20',
  },
  'cloud-devops': {
    gradient: 'from-orange-600/20 to-amber-900/20',
    pattern: 'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]',
    iconBg: 'bg-orange-500/20',
  },
  'tech-consulting': {
    gradient: 'from-red-600/20 to-rose-900/20',
    pattern: 'bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] bg-[size:40px_40px]',
    iconBg: 'bg-red-500/20',
  },
  'classes-mentoring': {
    gradient: 'from-cyan-600/20 to-blue-900/20',
    pattern: 'bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]',
    iconBg: 'bg-cyan-500/20',
  },
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

  const theme = visualThemes[slug] || visualThemes['web-development']
  const Icon = iconMap[category.icon] || Code2

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className={`relative pt-32 pb-24 overflow-hidden bg-gradient-to-br ${theme.gradient}`}>
        <div className={`absolute inset-0 ${theme.pattern}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/servicios" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowRightCircle className="w-4 h-4 rotate-180" />
            Volver a servicios
          </Link>
          <div className="max-w-4xl">
            <div className={`w-16 h-16 rounded-2xl ${theme.iconBg} flex items-center justify-center mb-6`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">{category.description}</p>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium text-sm tracking-wider uppercase">Planes y precios</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Elige el plan que mejor se adapte a ti
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Todos nuestros planes incluyen calidad garantizada, soporte y mejores prácticas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.subcategories.map((sub) => (
              <ServicePricingCard key={sub.id} subcategory={sub} categorySlug={slug} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Cada proyecto es único. Hablemos y diseñamos la solución perfecta para ti.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

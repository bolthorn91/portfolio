"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Quote, ArrowRight, Star, Sparkles } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "CTO",
    company: "InboxPro",
    content: "El equipo de Bolthorn Makers transformó nuestra visión en una realidad. Su experiencia en desarrollo de software y atención al detalle fue fundamental para el éxito del proyecto. Entregaron a tiempo y superaron nuestras expectativas en cada fase.",
    avatar: "MG",
    rating: 5,
    gradient: "from-primary/20 to-secondary/20",
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Producto",
    company: "Santander",
    content: "Trabajar con Bolthorn fue una experiencia excepcional. Entregaron un producto de alta calidad en tiempo récord y el soporte post-lanzamiento ha sido impecable. Su conocimiento del sector financiero marcó la diferencia.",
    avatar: "CR",
    rating: 5,
    gradient: "from-secondary/20 to-accent/20",
  },
  {
    name: "Ana López",
    role: "CEO",
    company: "Courthero",
    content: "Su enfoque estratégico y capacidad técnica nos ayudaron a diferenciar nuestra plataforma en el mercado. Recomiendo ampliamente su servicio para proyectos de software complejos.",
    avatar: "AL",
    rating: 5,
    gradient: "from-accent/20 to-primary/20",
  },
  {
    name: "David Chen",
    role: "Head of Engineering",
    company: "Vodafone",
    content: "Profesionales excepcionales. Entendieron perfectamente nuestros requisitos y entregaron una solución que superó nuestras expectativas. Su metodología ágil y comunicación constante hicieron que la colaboración fuera fluida.",
    avatar: "DC",
    rating: 5,
    gradient: "from-primary/20 to-accent/20",
  },
  {
    name: "Laura Martínez",
    role: "Product Manager",
    company: "IKEA",
    content: "Bolthorn Makers demostró un profundo entendimiento de las necesidades del usuario final. La app de fidelización que desarrollaron superó todos nuestros KPIs y nuestros clientes la aman.",
    avatar: "LM",
    rating: 5,
    gradient: "from-secondary/20 to-primary/20",
  },
  {
    name: "Javier Ruiz",
    role: "Founder",
    company: "Buscorepuestos",
    content: "Desde la conceptualización hasta el lanzamiento, Bolthorn nos guió en cada paso. Construyeron un marketplace robusto que escaló rápidamente y nuestros usuarios están encantados.",
    avatar: "JR",
    rating: 5,
    gradient: "from-accent/20 to-secondary/20",
  },
];

const stats = [
  { value: "98%", label: "Satisfacción cliente" },
  { value: "50+", label: "Proyectos entregados" },
  { value: "4.9", label: "Valoración media" },
  { value: "95%", label: "Recomendaría" },
];

export default function TestimoniosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-secondary font-semibold text-sm tracking-wider uppercase">Testimonios</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Lo que dicen nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              clientes
            </span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor reconocimiento.
            Estas son algunas de sus experiencias trabajando con nosotros.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-background rounded-2xl border border-border">
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 text-center max-w-4xl mx-auto relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <Sparkles className="w-12 h-12 text-primary/30 mx-auto mb-6" />
            <blockquote className="text-2xl md:text-3xl font-semibold mb-8 leading-relaxed">
              &ldquo;Bolthorn Makers no solo construye software, construye relaciones de confianza. Entienden el negocio, proponen soluciones innovadoras y ejecutan con excelencia.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                MG
              </div>
              <div className="text-left">
                <div className="font-semibold">María García</div>
                <div className="text-sm text-muted-foreground">CTO, InboxPro</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Testimonials */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-8 bg-background rounded-2xl border border-border relative group hover:border-primary/50 transition-all"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 relative z-10">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-semibold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role} at {t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-secondary/10 to-accent/10 border border-secondary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Únete a nuestros clientes satisfechos
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Cuéntanos tu proyecto y descubre por qué empresas líderes confían en nosotros.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Empezar ahora
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

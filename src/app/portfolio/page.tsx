"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight, Building2, Landmark, Wifi, Inbox, ShoppingBag, Globe, Wrench, Crosshair, CheckCircle } from "lucide-react";

const projectVisuals: Record<number, { icon: React.ElementType; gradient: string; pattern: string }> = {
  8: { icon: Building2, gradient: "from-amber-600/20 via-amber-800/10 to-blue-900/20", pattern: "grid" },
  7: { icon: Landmark, gradient: "from-red-600/20 via-red-800/10 to-red-900/20", pattern: "dots" },
  6: { icon: Wifi, gradient: "from-magenta-600/20 via-purple-800/10 to-red-900/20", pattern: "diagonal" },
  5: { icon: Inbox, gradient: "from-orange-600/20 via-amber-800/10 to-orange-900/20", pattern: "circles" },
  4: { icon: ShoppingBag, gradient: "from-blue-600/20 via-blue-800/10 to-yellow-900/20", pattern: "grid" },
  3: { icon: Globe, gradient: "from-emerald-600/20 via-emerald-800/10 to-teal-900/20", pattern: "dots" },
  2: { icon: Wrench, gradient: "from-slate-600/20 via-gray-800/10 to-blue-900/20", pattern: "diagonal" },
  1: { icon: Crosshair, gradient: "from-green-600/20 via-green-800/10 to-emerald-900/20", pattern: "circles" },
};

const patternStyles: Record<string, string> = {
  grid: "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]",
  dots: "bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]",
  diagonal: "bg-[linear-gradient(45deg,rgba(255,255,255,0.04)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.04)_75%,transparent_75%)] bg-[size:20px_20px]",
  circles: "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] bg-[size:40px_40px]",
};

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  client: string;
  results: string[];
}

const projects: Project[] = [
  {
    id: 8,
    title: "BBVA",
    category: "Mobile App",
    description: "Integración de métricas de usuario y sistema de chat de soporte en la app móvil de BBVA, mejorando la experiencia de millones de usuarios.",
    tags: ["NestJS", "MySQL", "PostgreSQL", "AWS", "RabbitMQ"],
    client: "BBVA",
    results: ["30% mejora en tiempo de respuesta", "95% satisfacción en chat de soporte", "5M+ usuarios activos"],
  },
  {
    id: 7,
    title: "Santander",
    category: "Backend",
    description: "Desarrollo de microservicios para la plataforma bancaria de Santander, optimizando procesos críticos de transacciones.",
    tags: ["Node.js", "TypeScript", "MongoDB", "Docker"],
    client: "Santander",
    results: ["99.9% uptime", "40% reducción de latencia", "Arquitectura escalable"],
  },
  {
    id: 6,
    title: "Vodafone",
    category: "Web App",
    description: "Plataforma de gestión de dispositivos IoT para Vodafone, permitiendo monitorización y control en tiempo real.",
    tags: ["React", "Python", "AWS", "GraphQL"],
    client: "Vodafone",
    results: ["10K+ dispositivos gestionados", "Tiempo real sub-100ms", "Dashboard unificado"],
  },
  {
    id: 5,
    title: "InboxPro",
    category: "SaaS",
    description: "Plataforma de email marketing con análisis avanzado, automatización de campañas y segmentación inteligente.",
    tags: ["Vue.js", "Node.js", "PostgreSQL", "Redis"],
    client: "InboxPro",
    results: ["3x aumento de conversión", "50K+ campañas gestionadas", "98% deliverability"],
  },
  {
    id: 4,
    title: "IKEA Family",
    category: "Mobile App",
    description: "Aplicación de fidelización para clientes de IKEA con ofertas personalizadas, historial y programa de puntos.",
    tags: ["React Native", "Node.js", "AWS", "DynamoDB"],
    client: "IKEA",
    results: ["2M+ descargas", "40% retención mensual", "NPS 78"],
  },
  {
    id: 3,
    title: "IKEA Taiwan",
    category: "E-commerce",
    description: "Plataforma de comercio electrónico para IKEA Taiwan con catálogo completo, pagos y logística integrada.",
    tags: ["Angular", "Node.js", "MongoDB", "Azure"],
    client: "IKEA Taiwan",
    results: ["Ventas online +150%", "Catálogo 10K+ productos", "Integración ERP"],
  },
  {
    id: 2,
    title: "Buscorepuestos",
    category: "E-commerce",
    description: "Marketplace de repuestos automotrices con búsqueda inteligente, comparativa de precios y pagos seguros.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    client: "Buscorepuestos",
    results: ["500+ talleres afiliados", "Catálogo 100K+ piezas", "30% margen promedio"],
  },
  {
    id: 1,
    title: "Courthero",
    category: "Web App",
    description: "Plataforma de reserva de canchas de tenis con sistema de pagos, gestión de horarios y perfiles de jugadores.",
    tags: ["Vue.js", "Laravel", "MySQL", "AWS"],
    client: "Courthero",
    results: ["100+ clubs activos", "50K+ reservas/mes", "4.8 estrellas usuarios"],
  },
];

const categories = ["Todos", "Mobile App", "Web App", "Backend", "SaaS", "E-commerce"];

const stats = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "20+", label: "Clientes satisfechos" },
  { value: "15+", label: "Años de experiencia" },
  { value: "8", label: "Países" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Portfolio</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Proyectos que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              demuestran nuestra experiencia
            </span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Hemos trabajado con empresas líderes en diversos sectores, desde fintech hasta retail, 
            entregando soluciones que generan impacto real.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-background rounded-2xl border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const visual = projectVisuals[project.id];
              const Icon = visual.icon;
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className={`relative h-56 bg-gradient-to-br ${visual.gradient} ${patternStyles[visual.pattern]} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <Icon className="w-20 h-20 text-white/20 group-hover:text-white/40 transition-all group-hover:scale-110 duration-500" />
                    <span className="absolute bottom-3 right-3 text-3xl font-bold text-white/10">{project.client.substring(0, 2)}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-primary text-sm font-medium">{project.category}</span>
                      <span className="text-muted-foreground text-sm">{project.client}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded">{tag}</span>
                      ))}
                    </div>
                    <div className="space-y-1.5 mb-4">
                      {project.results.map((r) => (
                        <div key={r} className="flex items-center gap-2 text-xs text-primary">
                          <CheckCircle className="w-3 h-3" />
                          {r}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <span className="flex items-center gap-1 text-sm text-primary">
                        <ExternalLink className="w-4 h-4" />
                        Ver proyecto
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              No hay proyectos en esta categoría.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Tu próximo proyecto podría estar aquí?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Trabajemos juntos para crear algo increíble.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Contáctanos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

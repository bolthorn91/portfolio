"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, ArrowRight, Building2, Landmark, Wifi, Inbox, ShoppingBag, Globe, Wrench, Crosshair, CheckCircle } from "lucide-react";

const projectVisuals: Record<number, { icon: React.ElementType; gradient: string; pattern: string }> = {
  8: { icon: Building2, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "grid" },
  7: { icon: Landmark, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "dots" },
  6: { icon: Wifi, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "diagonal" },
  5: { icon: Inbox, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "circles" },
  4: { icon: ShoppingBag, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "grid" },
  3: { icon: Globe, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "dots" },
  2: { icon: Wrench, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "diagonal" },
  1: { icon: Crosshair, gradient: "from-white/[0.03] to-white/[0.01]", pattern: "circles" },
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
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-white/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Portfolio</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-4 mb-6">
            Proyectos que{" "}
            <span className="text-white">
              demuestran nuestra experiencia
            </span>
          </h1>
          <p className="text-white/40 text-lg max-w-3xl mx-auto">
            Hemos trabajado con empresas líderes en diversos sectores, desde fintech hasta retail, 
            entregando soluciones que generan impacto real.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-6 bg-[#0a0a0a] border border-white/[0.06]">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-16 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 font-medium transition-all ${
                  activeCategory === category
                    ? "bg-white text-black text-sm font-medium uppercase tracking-[0.15em]"
                    : "border border-white/20 text-white hover:bg-white hover:text-black"
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
                  className="group bg-[#0a0a0a] border border-white/[0.06] overflow-hidden hover:border-white/20 transition-all"
                >
                  <div className={`relative h-56 bg-gradient-to-br ${visual.gradient} ${patternStyles[visual.pattern]} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <Icon className="w-20 h-20 text-white/[0.06] group-hover:text-white/10 transition-all group-hover:scale-110 duration-500" />
                    <span className="absolute bottom-3 right-3 text-3xl font-bold text-white/10">{project.client.substring(0, 2)}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white text-sm font-medium">{project.category}</span>
                      <span className="text-white/40 text-sm">{project.client}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">{project.title}</h3>
                    <p className="text-white/40 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs border border-white/[0.06] text-white/40">{tag}</span>
                      ))}
                    </div>
                    <div className="space-y-1.5 mb-4">
                      {project.results.map((r) => (
                        <div key={r} className="flex items-center gap-2 text-xs text-white">
                          <CheckCircle className="w-5 h-5 text-white/40" />
                          {r}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                      <span className="flex items-center gap-1 text-sm text-white">
                        <ExternalLink className="w-5 h-5" />
                        Ver proyecto
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 text-white/40">
              No hay proyectos en esta categoría.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-16 bg-[#0a0a0a] border border-white/[0.06]">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              ¿Tu próximo proyecto podría estar aquí?
            </h2>
            <p className="text-white/40 text-lg mb-8">
              Trabajemos juntos para crear algo increíble.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all"
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

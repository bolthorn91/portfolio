"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Building2, Landmark, Wifi, Inbox, ShoppingBag, Globe, Wrench, Crosshair } from "lucide-react";
import Link from "next/link";

const projectVisuals: Record<number, { icon: React.ElementType; gradient: string; pattern: string }> = {
  8: { icon: Building2, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "grid" },
  7: { icon: Landmark, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "dots" },
  6: { icon: Wifi, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "diagonal" },
  5: { icon: Inbox, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "circles" },
  4: { icon: ShoppingBag, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "grid" },
  3: { icon: Globe, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "dots" },
  2: { icon: Wrench, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "diagonal" },
  1: { icon: Crosshair, gradient: "from-white/[0.04] to-white/[0.01]", pattern: "circles" },
};

const patternStyles: Record<string, string> = {
  grid: "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]",
  dots: "bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:20px_20px]",
  diagonal: "bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%)] bg-[size:20px_20px]",
  circles: "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] bg-[size:40px_40px]",
};

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  client: string;
}

const projects: Project[] = [
  { id: 8, title: "BBVA", category: "Mobile App", description: "Integración de métricas de usuario y sistema de chat de soporte en la app móvil de BBVA.", tags: ["NestJS", "MySQL", "PostgreSQL", "AWS", "RabbitMQ"], client: "BBVA" },
  { id: 7, title: "Santander", category: "Backend", description: "Desarrollo de microservicios para la plataforma bancaria de Santander.", tags: ["Node.js", "TypeScript", "MongoDB", "Docker"], client: "Santander" },
  { id: 6, title: "Vodafone", category: "Web App", description: "Plataforma de gestión de dispositivos IoT para Vodafone.", tags: ["React", "Python", "AWS", "GraphQL"], client: "Vodafone" },
  { id: 5, title: "InboxPro", category: "SaaS", description: "Plataforma de email marketing con análisis avanzado.", tags: ["Vue.js", "Node.js", "PostgreSQL", "Redis"], client: "InboxPro" },
  { id: 4, title: "IKEA Family", category: "Mobile App", description: "Aplicación de fidelización para clientes de IKEA.", tags: ["React Native", "Node.js", "AWS", "DynamoDB"], client: "IKEA" },
  { id: 3, title: "IKEA Taiwan", category: "E-commerce", description: "Plataforma de comercio electrónico para IKEA Taiwan.", tags: ["Angular", "Node.js", "MongoDB", "Azure"], client: "IKEA Taiwan" },
  { id: 2, title: "Buscorepuestos", category: "E-commerce", description: "Marketplace de repuestos automotrices.", tags: ["React", "Node.js", "PostgreSQL", "Stripe"], client: "Buscorepuestos" },
  { id: 1, title: "Courthero", category: "Web App", description: "Plataforma de reserva de canchas de tenis con sistema de pagos y gestión de horarios.", tags: ["Vue.js", "Laravel", "MySQL", "AWS"], client: "Courthero" },
];

const categories = ["Todos", "Mobile App", "Web App", "Backend", "SaaS", "E-commerce"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const filteredProjects = activeCategory === "Todos" ? projects : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Proyectos que <span className="text-white/60">hablan por nosotros</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Algunos de los proyectos en los que hemos trabajado con empresas líderes.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-xs uppercase tracking-[0.15em] font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-white text-black"
                  : "bg-transparent border border-white/20 text-white/60 hover:bg-white hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project, index) => {
            const visual = projectVisuals[project.id];
            const Icon = visual.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-[#0a0a0a] border border-white/[0.06] hover:border-white/20 transition-all duration-300"
              >
                <div className={`relative h-48 bg-gradient-to-br ${visual.gradient} ${patternStyles[visual.pattern]} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <Icon className="w-16 h-16 text-white/10 group-hover:text-white/20 transition-all group-hover:scale-110 duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white/40 text-xs uppercase tracking-[0.15em]">{project.category}</span>
                    <span className="text-white/30 text-xs">{project.client}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                  <p className="text-white/40 text-sm mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs border border-white/[0.06] text-white/30">{tag}</span>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-white/[0.06]">
                    <span className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-white/40">
                      <ExternalLink className="w-3 h-3" />
                      Ver proyecto
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
          >
            Ver todos los proyectos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

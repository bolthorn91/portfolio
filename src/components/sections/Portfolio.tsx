"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Building2, Landmark, Wifi, Inbox, ShoppingBag, Globe, Wrench, Crosshair } from "lucide-react";
import Link from "next/link";

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
}

const projects: Project[] = [
  {
    id: 8,
    title: "BBVA",
    category: "Mobile App",
    description: "Integración de métricas de usuario y sistema de chat de soporte en la app móvil de BBVA.",
    tags: ["NestJS", "MySQL", "PostgreSQL", "AWS", "RabbitMQ"],
    client: "BBVA",
  },
  {
    id: 7,
    title: "Santander",
    category: "Backend",
    description: "Desarrollo de microservicios para la plataforma bancaria de Santander.",
    tags: ["Node.js", "TypeScript", "MongoDB", "Docker"],
    client: "Santander",
  },
  {
    id: 6,
    title: "Vodafone",
    category: "Web App",
    description: "Plataforma de gestión de dispositivos IoT para Vodafone.",
    tags: ["React", "Python", "AWS", "GraphQL"],
    client: "Vodafone",
  },
  {
    id: 5,
    title: "InboxPro",
    category: "SaaS",
    description: "Plataforma de email marketing con análisis avanzado.",
    tags: ["Vue.js", "Node.js", "PostgreSQL", "Redis"],
    client: "InboxPro",
  },
  {
    id: 4,
    title: "IKEA Family",
    category: "Mobile App",
    description: "Aplicación de fidelización para clientes de IKEA.",
    tags: ["React Native", "Node.js", "AWS", "DynamoDB"],
    client: "IKEA",
  },
  {
    id: 3,
    title: "IKEA Taiwan",
    category: "E-commerce",
    description: "Plataforma de comercio electrónico para IKEA Taiwan.",
    tags: ["Angular", "Node.js", "MongoDB", "Azure"],
    client: "IKEA Taiwan",
  },
  {
    id: 2,
    title: "Buscorepuestos",
    category: "E-commerce",
    description: "Marketplace de repuestos automotrices.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    client: "Buscorepuestos",
  },
  {
    id: 1,
    title: "Courthero",
    category: "Web App",
    description: "Plataforma de reserva de canchas de tenis con sistema de pagos y gestión de horarios.",
    tags: ["Vue.js", "Laravel", "MySQL", "AWS"],
    client: "Courthero",
  },
];

const categories = ["Todos", "Mobile App", "Web App", "Backend", "SaaS", "E-commerce"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects = activeCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Proyectos que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              hablan por nosotros
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Algunos de los proyectos en los que hemos trabajado con empresas líderes.
          </p>
        </motion.div>

        {/* Category Filter */}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => {
            const visual = projectVisuals[project.id];
            const Icon = visual.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                {/* CSS-Generated Visual */}
                <div className={`relative h-48 bg-gradient-to-br ${visual.gradient} ${patternStyles[visual.pattern]} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <Icon className="w-16 h-16 text-white/20 group-hover:text-white/40 transition-all group-hover:scale-110 duration-500" />
                  <span className="absolute bottom-3 right-3 text-2xl font-bold text-white/10">{project.title.substring(0, 2)}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary text-sm font-medium">{project.category}</span>
                    <span className="text-muted-foreground text-sm">{project.client}</span>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Link
                      href={`/portfolio#${project.id}`}
                      className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver proyecto
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Ver todos los proyectos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

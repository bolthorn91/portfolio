"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Smartphone, Brain, Cloud } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y escalables con React, Next.js, Vue y Angular.",
    tags: ["React", "Next.js", "Vue", "Angular", "Node.js"],
  },
  {
    icon: Smartphone,
    title: "Desarrollo Mobile",
    description: "Apps nativas y cross-platform para iOS y Android con alto rendimiento.",
    tags: ["React Native", "Ionic", "Swift", "Kotlin"],
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description: "Implementación de LLMs, automatización de procesos y soluciones de IA.",
    tags: ["OpenAI", "LangChain", "Machine Learning", "Automatización"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infraestructura escalable y deployments automatizados en AWS y GCP.",
    tags: ["AWS", "GCP", "Docker", "Kubernetes", "Serverless"],
  },
  {
    icon: Sparkles,
    title: "Consultoría Tecnológica",
    description: "Asesoría estratégica para transformar digitalmente tu empresa.",
    tags: ["Arquitectura", "MVP", "Auditorías", "Formación"],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Soluciones tecnológicas para <span className="text-primary">tu negocio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ofrecemos servicios de desarrollo de software de alta calidad, desde aplicaciones web hasta soluciones de IA.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

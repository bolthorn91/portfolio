"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Code2, Smartphone, Brain, Cloud, GraduationCap } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Aplicaciones web modernas y escalables con React, Next.js, Vue y Angular.",
    tags: ["React", "Next.js", "Vue", "Angular", "Node.js"],
    slug: "web-development",
  },
  {
    icon: Smartphone,
    title: "Desarrollo Mobile",
    description: "Apps nativas y cross-platform para iOS y Android con alto rendimiento.",
    tags: ["React Native", "Ionic", "Swift", "Kotlin"],
    slug: "mobile-development",
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description: "Implementación de LLMs, automatización de procesos y soluciones de IA.",
    tags: ["OpenAI", "LangChain", "Machine Learning", "Automatización"],
    slug: "artificial-intelligence",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infraestructura escalable y deployments automatizados en AWS y GCP.",
    tags: ["AWS", "GCP", "Docker", "Kubernetes", "Serverless"],
    slug: "cloud-devops",
  },
  {
    icon: Sparkles,
    title: "Consultoría Tecnológica",
    description: "Asesoría estratégica para transformar digitalmente tu empresa.",
    tags: ["Arquitectura", "MVP", "Auditorías", "Formación"],
    slug: "tech-consulting",
  },
  {
    icon: GraduationCap,
    title: "Clases y Mentorías",
    description: "Formación técnica y mentorship en desarrollo de software, arquitectura y tecnologías modernas para equipos e individuos.",
    tags: ["Mentoría 1:1", "Formación equipos", "Code Review", "Career Coaching"],
    slug: "classes-mentoring",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">
            Nuestros Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Soluciones tecnológicas para <span className="text-white/60">tu negocio</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Ofrecemos servicios de desarrollo de software de alta calidad, desde aplicaciones web hasta soluciones de IA.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <Link key={service.slug} href={`/servicios/${service.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group p-8 bg-[#0a0a0a] border border-white/[0.06] hover:border-white/20 transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6">
                  <service.icon className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-white/40 text-sm mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs text-white/30 border border-white/[0.06]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/servicios"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
          >
            Ver todos los servicios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Target, Zap, Shield, Users, Award, Globe } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Cada línea de código está orientada a generar valor medible para tu negocio.",
  },
  {
    icon: Zap,
    title: "Innovación Constante",
    description: "Utilizamos las tecnologías más modernas para mantener tu producto competitivo.",
  },
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Estándares de código estrictos y testing exhaustivo en cada proyecto.",
  },
  {
    icon: Users,
    title: "Colaboración Cercana",
    description: "Trabajamos como parte de tu equipo, entendiendo tu visión y objetivos.",
  },
];

const stats = [
  { value: "50+", label: "Proyectos Entregados" },
  { value: "15+", label: "Años de Experiencia" },
  { value: "20+", label: "Clientes Satisfechos" },
  { value: "100%", label: "Compromiso" },
];

export default function About() {
  return (
    <section id="about" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Sobre Nosotros</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Construimos el <span className="text-white/60">futuro digital</span> juntos
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Somos un equipo de profesionales con amplia experiencia en desarrollo de software y consultoría tecnológica.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-8 bg-[#0a0a0a] border border-white/[0.06]">
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-6 bg-[#0a0a0a] border border-white/[0.06] hover:border-white/20 transition-all duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5 text-white/60" />
              </div>
              <h3 className="font-semibold mb-2">{value.title}</h3>
              <p className="text-white/40 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-10 bg-[#0a0a0a] border border-white/[0.06]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Experiencia con empresas líderes</h3>
              <p className="text-white/40 mb-6 text-sm">
                Hemos trabajado con las principales empresas del sector financiero, tecnológico y retail, 
                lo que nos ha permitido desarrollar expertise en proyectos de alta complejidad.
              </p>
              <div className="flex flex-wrap gap-3">
                {["BBVA", "Santander", "Vodafone", "IKEA"].map((company) => (
                  <div key={company} className="px-4 py-2 border border-white/[0.06] text-xs text-white/40">
                    {company}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-5 border border-white/[0.06]">
                  <Award className="w-6 h-6 text-white/40 mb-2" />
                  <div className="font-semibold text-sm">Tech Leadership</div>
                  <div className="text-xs text-white/40">CTO en Squaads</div>
                </div>
                <div className="p-5 border border-white/[0.06]">
                  <Users className="w-6 h-6 text-white/40 mb-2" />
                  <div className="font-semibold text-sm">Mentoring</div>
                  <div className="text-xs text-white/40">EOI, Springboard</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-5 border border-white/[0.06]">
                  <Zap className="w-6 h-6 text-white/40 mb-2" />
                  <div className="font-semibold text-sm">50+ Proyectos</div>
                  <div className="text-xs text-white/40">Entregados</div>
                </div>
                <div className="p-5 border border-white/[0.06]">
                  <Shield className="w-6 h-6 text-white/40 mb-2" />
                  <div className="font-semibold text-sm">Calidad</div>
                  <div className="text-xs text-white/40">100% Satisfacción</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/nosotros"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
          >
            Conócenos mejor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

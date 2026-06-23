"use client";

import { motion } from "framer-motion";
import { Target, Zap, Shield, Users, Award, Globe } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Cada línea de código está orientada a generar valor measurable para tu negocio.",
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
    <section id="about" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Sobre Nosotros
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Construimos el{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              futuro digital
            </span>{" "}
            juntos
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Somos un equipo de profesionales con amplia experiencia en desarrollo de software y consultoría tecnológica.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
            {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-background rounded-2xl border border-border"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl border border-primary/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Experiencia con empresas líderes
              </h3>
              <p className="text-muted-foreground mb-6">
                hemos trabajado con las principales empresas del sector financiero, tecnológico y retail, 
                lo que nos ha permitido desarrollar expertise en proyectos de alta complejidad y exigentes 
                estándares de calidad.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm">BBVA</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm">Santander</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm">Vodafone</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-background/50 rounded-lg">
                  <Globe className="w-4 h-4 text-primary" />
                  <span className="text-sm">IKEA</span>
                </div>
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="p-4 bg-background/50 rounded-xl border border-border">
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <div className="font-semibold">Tech Leadership</div>
                  <div className="text-sm text-muted-foreground">CTO en Squaads</div>
                </div>
                <div className="p-4 bg-background/50 rounded-xl border border-border">
                  <Users className="w-8 h-8 text-secondary mb-2" />
                  <div className="font-semibold">Mentoring</div>
                  <div className="text-sm text-muted-foreground">EOI, Springboard</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="p-4 bg-background/50 rounded-xl border border-border">
                  <Zap className="w-8 h-8 text-accent mb-2" />
                  <div className="font-semibold">50+ Proyectos</div>
                  <div className="text-sm text-muted-foreground">Entregados</div>
                </div>
                <div className="p-4 bg-background/50 rounded-xl border border-border">
                  <Shield className="w-8 h-8 text-primary mb-2" />
                  <div className="font-semibold">Calidad</div>
                  <div className="text-sm text-muted-foreground">100% Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

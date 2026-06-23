"use client";

import { motion } from "framer-motion";
import { Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "María García",
    role: "CTO",
    company: "InboxPro",
    content: "El equipo de Bolthorn Makers transformó nuestra visión en una realidad. Su experiencia en desarrollo de software y atención al detalle fue fundamental para el éxito del proyecto.",
    avatar: "MG",
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Producto",
    company: "Santander",
    content: "Trabajar con Bolthorn fue una experiencia excepcional. Entregaron un producto de alta calidad en tiempo record y el soporte post-lanzamiento ha sido impecable.",
    avatar: "CR",
  },
  {
    name: "Ana López",
    role: "CEO",
    company: "Courthero",
    content: "Su enfoque estratégico y capacidad técnica nos helped differentiate our platform in the market. Highly recommended for complex software projects.",
    avatar: "AL",
  },
  {
    name: "David Chen",
    role: "Head of Engineering",
    company: "Vodafone",
    content: "Profesionales excepcionales. Entendieron perfectamente nuestros requisitos y deliveraron una solución que exceeded nuestras expectativas.",
    avatar: "DC",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Testimonios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Lo que dicen nuestros{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent">
              clientes
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor reconocimiento.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 bg-card rounded-2xl border border-border relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
                <p className="text-muted-foreground mb-6 relative z-10">
                  &ldquo;{testimonial.content}&rdquo;
                </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
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
            href="/testimonios"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Ver todos los testimonios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

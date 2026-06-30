"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    content: "Su enfoque estratégico y capacidad técnica nos ayudó a diferenciar nuestra plataforma en el mercado. Recomiendo ampliamente su servicio para proyectos complejos.",
    avatar: "AL",
  },
  {
    name: "David Chen",
    role: "Head of Engineering",
    company: "Vodafone",
    content: "Profesionales excepcionales. Entendieron perfectamente nuestros requisitos y entregaron una solución que superó nuestras expectativas.",
    avatar: "DC",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonios" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Testimonios</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Lo que dicen nuestros <span className="text-white/60">clientes</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestro mayor reconocimiento.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="p-8 bg-[#0a0a0a] border border-white/[0.06]"
            >
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center text-white/60 text-sm font-medium">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium">{testimonial.name}</div>
                  <div className="text-xs text-white/40">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/testimonios"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
          >
            Ver todos los testimonios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

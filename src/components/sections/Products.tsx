"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, Sparkles } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "inmo-redesign",
    icon: Home,
    title: "Inmo Redesign",
    description: "Transforma viviendas con IA. Sube fotos de tu propiedad y genera renderizados realistas de posibles remodelaciones.",
    features: [
      "Renderizados IA realistas",
      "Múltiples estilos de reforma",
      "Gamas de precio personalizables",
      "Visualización de colores y distribuciones",
    ],
    status: "En desarrollo",
    comingSoon: false,
    href: "https://inmo-redesign.bolthornmakers.com",
  },
  {
    id: "future-1",
    icon: Sparkles,
    title: "Próximo Producto",
    description: "Estamos trabajando en nuevas soluciones innovadoras para el sector inmobiliario y tecnológico.",
    features: [
      "Próximamente",
      "Stay tuned",
      "Más información pronto",
    ],
    status: "En desarrollo",
    comingSoon: true,
    href: "/contact",
  },
];

export default function Products() {
  return (
    <section id="productos" className="py-32 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">
            Productos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Nuestras <span className="text-white/60">soluciones</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            Productos propios diseñados para resolver problemas reales con tecnología innovadora.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-10 bg-[#0a0a0a] border ${
                product.comingSoon ? "border-white/[0.04]" : "border-white/[0.06] hover:border-white/20"
              } transition-all duration-300`}
            >
              {product.comingSoon && (
                <div className="absolute top-4 right-4 px-3 py-1 border border-white/20 text-white/60 text-xs uppercase tracking-[0.15em]">
                  Coming Soon
                </div>
              )}

              <div className="w-12 h-12 flex items-center justify-center mb-6">
                <product.icon className={`w-6 h-6 ${product.comingSoon ? "text-white/20" : "text-white"}`} />
              </div>

              <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
              <p className="text-white/40 mb-6">{product.description}</p>

              <ul className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="w-1 h-1 bg-white/40" />
                    <span className="text-sm text-white/40">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={product.href}
                className={`inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] transition-colors ${
                  product.comingSoon
                    ? "text-white/20 hover:text-white/40"
                    : "text-white hover:text-white/60"
                }`}
              >
                {product.comingSoon ? "Más información" : "Acceder"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 mb-4 text-sm">
            ¿Tienes una idea para un producto digital?
          </p>
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
          >
            Ver todos los productos
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

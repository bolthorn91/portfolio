"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Building2, Home } from "lucide-react";
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
    href: "#contacto",
  },
];

export default function Products() {
  return (
    <section id="productos" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Productos
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Nuestras{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              soluciones
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Productos propios diseñados para resolver problemas reales con tecnología innovadora.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border ${
                product.comingSoon
                  ? "bg-muted/30 border-border"
                  : "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
              }`}
            >
              {product.comingSoon && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-secondary/20 text-secondary text-sm font-medium rounded-full">
                  Coming Soon
                </div>
              )}

              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                product.comingSoon ? "bg-muted" : "bg-gradient-to-br from-primary to-secondary"
              }`}>
                <product.icon className={`w-8 h-8 ${product.comingSoon ? "text-muted-foreground" : "text-white"}`} />
              </div>

              <h3 className="text-2xl font-bold mb-3">{product.title}</h3>
              <p className="text-muted-foreground mb-6">{product.description}</p>

              <ul className="space-y-3 mb-8">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${product.comingSoon ? "bg-muted-foreground" : "bg-primary"}`} />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={product.href}
                className={`inline-flex items-center gap-2 font-medium transition-colors ${
                  product.comingSoon
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-primary hover:text-primary/80"
                }`}
              >
                {product.comingSoon ? "Más información" : "Acceder"}
                <ArrowRight className="w-4 h-4" />
              </Link>
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
          <p className="text-muted-foreground mb-4">
            ¿Tienes una idea para un producto digital?
          </p>
          <Link
            href="#contacto"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Hablemos de tu idea
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

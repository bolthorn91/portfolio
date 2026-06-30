"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-white/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-3xl" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white/60 text-xs uppercase tracking-[0.2em] mb-8">
              Transformamos ideas en productos digitales
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 tracking-tight"
          >
            Creamos productos digitales que{" "}
            <span className="text-white/60">
              impulsan tu crecimiento
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-white/40 mb-10 max-w-2xl mx-auto"
          >
            Empresa de consultoría y desarrollo de software. Construimos soluciones tecnológicas innovadoras para empresas que buscan destacar en el mercado.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/90"
            >
              Cuéntanos tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
            >
              Ver nuestro trabajo
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-24 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div className="text-center border-r border-white/[0.06] last:border-r-0">
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-white/40 text-sm mt-1">Proyectos</div>
            </div>
            <div className="text-center border-r border-white/[0.06] last:border-r-0">
              <div className="text-3xl md:text-4xl font-bold">15+</div>
              <div className="text-white/40 text-sm mt-1">Años exp.</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold">100%</div>
              <div className="text-white/40 text-sm mt-1">Compromiso</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

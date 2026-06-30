import Link from "next/link";
import { ArrowRight, Home, Sparkles, Zap, Shield, Palette, Globe, BarChart3 } from "lucide-react";

const products = [
  {
    icon: Home, title: "Inmo Redesign", tagline: "Transforma viviendas con Inteligencia Artificial",
    description: "Sube fotos de tu propiedad y genera renderizados realistas de posibles remodelaciones en segundos.",
    features: [
      { icon: Zap, text: "Renderizados IA en segundos" }, { icon: Palette, text: "Múltiples estilos de reforma" },
      { icon: BarChart3, text: "Gamas de precio personalizables" }, { icon: Globe, text: "Visualización de colores" },
    ],
    status: "En desarrollo", href: "https://inmo-redesign.bolthornmakers.com",
  },
  {
    icon: Sparkles, title: "Próximo Producto", tagline: "Estamos creando algo increíble",
    description: "Una nueva solución innovadora para el sector que revolucionará la forma en que las empresas gestionan sus operaciones.",
    features: [
      { icon: Shield, text: "Seguridad y privacidad primero" }, { icon: Zap, text: "Rendimiento optimizado" },
      { icon: Sparkles, text: "IA integrada" },
    ],
    status: "Próximamente", href: "/contact",
  },
];

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Productos</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6 tracking-tight">
            Nuestras <span className="text-white/60">soluciones propias</span>
          </h1>
          <p className="text-white/40 text-xl max-w-3xl mx-auto">
            Productos diseñados y desarrollados internamente para resolver problemas reales con tecnología innovadora.
          </p>
        </div>
      </section>

      <section className="py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <div key={product.title} className={`relative p-10 bg-[#0a0a0a] border ${product.status === "Próximamente" ? "border-white/[0.04]" : "border-white/[0.06] hover:border-white/20"} transition-all duration-300`}>
                  {product.status === "Próximamente" && (
                    <span className="absolute top-4 right-4 px-3 py-1 border border-white/20 text-white/60 text-xs uppercase tracking-[0.15em]">Coming Soon</span>
                  )}
                  <div className="w-12 h-12 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white/60" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
                  <p className="text-white/40 text-sm mb-4">{product.tagline}</p>
                  <p className="text-white/40 mb-8">{product.description}</p>
                  <div className="space-y-3 mb-10">
                    {product.features.map((f) => (
                      <div key={f.text} className="flex items-center gap-3">
                        <div className="w-8 h-8 border border-white/[0.06] flex items-center justify-center">
                          <f.icon className="w-4 h-4 text-white/40" />
                        </div>
                        <span className="text-sm text-white/60">{f.text}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={product.href} className={`inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black`}>
                    {product.status === "Próximamente" ? "Notificarme" : "Acceder"} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Roadmap</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">Hoja de ruta</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">Esto es lo que estamos construyendo y lo que viene después.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 border-l border-white/[0.06]">
              {[
                { year: "Q3 2026", title: "MVP Inmo Redesign", desc: "Lanzamiento de versión beta con funcionalidades core." },
                { year: "Q4 2026", title: "Inmo Redesign v1.0", desc: "Versión estable con todos los estilos de reforma y exportación." },
                { year: "Q1 2027", title: "Nuevo Producto", desc: "Revelación y beta del segundo producto propio." },
                { year: "Q2 2027", title: "Expansión", desc: "Integraciones con plataformas third-party y API pública." },
              ].map((item) => (
                <div key={item.year} className="relative pb-12 last:pb-0">
                  <div className="absolute -left-[calc(1rem+5px)] top-0 w-3 h-3 bg-white/40" />
                  <span className="text-xs text-white/60 font-medium uppercase tracking-[0.15em]">{item.year}</span>
                  <h3 className="text-lg font-bold mt-1">{item.title}</h3>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-card">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-16 bg-[#0a0a0a] border border-white/[0.06]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">¿Tienes una idea para un producto?</h2>
            <p className="text-white/40 text-lg mb-8">Construimos productos digitales desde cero. Cuéntanos tu idea y la hacemos realidad.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/90">
              Hablemos de tu idea <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

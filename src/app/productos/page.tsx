import Link from "next/link";
import { ArrowRight, Home, Sparkles, Zap, Shield, Palette, Globe, BarChart3 } from "lucide-react";

const products = [
  {
    icon: Home,
    title: "Inmo Redesign",
    tagline: "Transforma viviendas con Inteligencia Artificial",
    description: "Sube fotos de tu propiedad y genera renderizados realistas de posibles remodelaciones en segundos. La herramienta definitiva para agentes inmobiliarios, reformistas y propietarios.",
    gradient: "from-primary/20 to-secondary/20",
    features: [
      { icon: Zap, text: "Renderizados IA en segundos" },
      { icon: Palette, text: "Múltiples estilos de reforma" },
      { icon: BarChart3, text: "Gamas de precio personalizables" },
      { icon: Globe, text: "Visualización de colores y distribuciones" },
    ],
    status: "En desarrollo",
    href: "https://inmo-redesign.bolthornmakers.com",
    color: "from-primary to-secondary",
  },
  {
    icon: Sparkles,
    title: "Próximo Producto",
    tagline: "Estamos creando algo increíble",
    description: "Una nueva solución innovadora para el sector que revolucionará la forma en que las empresas gestionan sus operaciones diarias.",
    gradient: "from-muted/30 to-muted/10",
    features: [
      { icon: Shield, text: "Seguridad y privacidad primero" },
      { icon: Zap, text: "Rendimiento optimizado" },
      { icon: Sparkles, text: "IA integrada" },
    ],
    status: "Próximamente",
    href: "/contact",
    color: "from-muted to-muted",
  },
];

export default function ProductosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-accent font-semibold text-sm tracking-wider uppercase">Productos</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Nuestras{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
              soluciones propias
            </span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">
            Productos diseñados y desarrollados internamente para resolver problemas reales con tecnología innovadora.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {products.map((product) => {
              const Icon = product.icon;
              return (
                <div
                  key={product.title}
                  className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-background to-card border border-border overflow-hidden group"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${product.gradient} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`} />
                  <div className="relative">
                    {product.status === "Próximamente" && (
                      <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-4">
                        Coming Soon
                      </span>
                    )}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
                    <p className="text-xl text-muted-foreground mb-4">{product.tagline}</p>
                    <p className="text-muted-foreground mb-8">{product.description}</p>
                    <div className="space-y-4 mb-10">
                      {product.features.map((f) => (
                        <div key={f.text} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <f.icon className="w-4 h-4 text-primary" />
                          </div>
                          <span>{f.text}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      href={product.href}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
                    >
                      {product.status === "Próximamente" ? "Notificarme" : "Acceder"}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Roadmap</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Hoja de ruta
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Esto es lo que estamos construyendo y lo que viene después.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 border-l-2 border-border">
              {[
                { year: "Q3 2026", title: "MVP Inmo Redesign", desc: "Lanzamiento de versión beta con funcionalidades core." },
                { year: "Q4 2026", title: "Inmo Redesign v1.0", desc: "Versión estable con todos los estilos de reforma y exportación." },
                { year: "Q1 2027", title: "Nuevo Producto", desc: "Revelación y beta del segundo producto propio." },
                { year: "Q2 2027", title: "Expansión", desc: "Integraciones con plataformas third-party y API pública." },
              ].map((item) => (
                <div key={item.year} className="relative pb-12 last:pb-0">
                  <div className="absolute -left-[calc(1rem+5px)] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <span className="text-sm text-primary font-semibold">{item.year}</span>
                  <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Tienes una idea para un producto?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Construimos productos digitales desde cero. Cuéntanos tu idea y la hacemos realidad.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Hablemos de tu idea
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

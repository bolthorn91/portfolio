import Link from "next/link";
import { ArrowRight, Code2, Smartphone, Brain, Cloud, Sparkles, GraduationCap, CheckCircle, Zap, BarChart3, Layers, ArrowRightCircle } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Desarrollo Web",
    description: "Creamos aplicaciones web robustas y escalables con las tecnologías más modernas del mercado. Desde landing pages hasta plataformas SaaS complejas.",
    features: ["Arquitectura JAMstack", "SPA y SSR con React/Next.js", "APIs RESTful y GraphQL", "Optimización de rendimiento Core Web Vitals"],
    slug: "web-development",
    gradient: "from-blue-600/20 to-cyan-900/20",
    iconBg: "bg-blue-500/20",
  },
  {
    icon: Smartphone,
    title: "Desarrollo Mobile",
    description: "Desarrollamos apps nativas y cross-platform que ofrecen experiencias de usuario excepcionales en iOS y Android.",
    features: ["React Native & Flutter", "Apps nativas Swift/Kotlin", "Arquitectura offline-first", "Publicación en App Store y Google Play"],
    slug: "mobile-development",
    gradient: "from-purple-600/20 to-pink-900/20",
    iconBg: "bg-purple-500/20",
  },
  {
    icon: Brain,
    title: "Inteligencia Artificial",
    description: "Integramos IA generativa y machine learning en tus procesos para automatizar tareas y obtener insights accionables.",
    features: ["LLMs y ChatGPT custom", "Automatización de procesos", "Análisis predictivo", "Chatbots y asistentes virtuales"],
    slug: "artificial-intelligence",
    gradient: "from-emerald-600/20 to-teal-900/20",
    iconBg: "bg-emerald-500/20",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Diseñamos e implementamos infraestructura cloud escalable con pipelines CI/CD automatizados y las mejores prácticas DevOps.",
    features: ["AWS/GCP/Azure", "Docker & Kubernetes", "CI/CD automatizado", "Monitorización y observabilidad"],
    slug: "cloud-devops",
    gradient: "from-orange-600/20 to-amber-900/20",
    iconBg: "bg-orange-500/20",
  },
  {
    icon: Sparkles,
    title: "Consultoría Tecnológica",
    description: "Acompañamos a tu empresa en la transformación digital con asesoría estratégica y técnica de alto nivel.",
    features: ["Arquitectura de software", "Auditorías técnicas", "MVP y product strategy", "Formación de equipos"],
    slug: "tech-consulting",
    gradient: "from-red-600/20 to-rose-900/20",
    iconBg: "bg-red-500/20",
  },
  {
    icon: GraduationCap,
    title: "Clases y Mentorías",
    description: "Formación técnica personalizada para equipos e individuos que quieren llevar sus habilidades al siguiente nivel.",
    features: ["Mentoría 1:1", "Formación in-company", "Code review", "Career coaching técnico"],
    slug: "classes-mentoring",
    gradient: "from-cyan-600/20 to-blue-900/20",
    iconBg: "bg-cyan-500/20",
  },
];

const processSteps = [
  { icon: BarChart3, title: "Descubrimiento", description: "Entendemos tu negocio, objetivos y requisitos técnicos." },
  { icon: Layers, title: "Arquitectura", description: "Diseñamos la solución más adecuada para tu proyecto." },
  { icon: Code2, title: "Desarrollo", description: "Construimos con metodologías ágiles y mejores prácticas." },
  { icon: Zap, title: "Despliegue", description: "Lanzamos con CI/CD, monitorización y escalabilidad." },
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Servicios</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Soluciones tecnológicas para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              impulsar tu negocio
            </span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto mb-10">
            Ofrecemos un conjunto completo de servicios de desarrollo de software y consultoría tecnológica.
            Cada servicio está diseñado para resolver problemas reales y generar valor tangible.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
          >
            Solicitar consultoría gratuita
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* All Services */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => {
              const isReversed = index % 2 === 1;
              const Icon = service.icon;
              return (
                <div key={service.slug} className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 items-center`}>
                  <div className="flex-1">
                    <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{service.title}</h2>
                    <p className="text-muted-foreground text-lg mb-8">{service.description}</p>
                    <ul className="space-y-4 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all"
                    >
                      Más información
                      <ArrowRightCircle className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className={`flex-1 w-full h-80 rounded-3xl bg-gradient-to-br ${service.gradient} border border-primary/10 flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <Icon className="w-32 h-32 text-white/10" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Metodología</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Cómo <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">trabajamos</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestra metodología ágil garantiza entregas rápidas sin sacrificar calidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <div key={step.title} className="relative p-8 bg-card rounded-2xl border border-border">
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6 text-primary/30">
                    <ArrowRightCircle className="w-6 h-6" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary/20 mb-2">0{i + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Cada proyecto es único. Hablemos y diseñamos juntos la solución perfecta para tu negocio.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

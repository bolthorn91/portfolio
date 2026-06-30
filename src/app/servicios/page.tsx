import Link from "next/link";
import { ArrowRight, ArrowRightCircle, Globe, Code2, Smartphone, Brain, Cloud, Sparkles, GraduationCap } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Globe: Globe,
  Code2: Code2,
  Smartphone: Smartphone,
  Brain: Brain,
  Cloud: Cloud,
  Sparkles: Sparkles,
  GraduationCap: GraduationCap,
};

const services = [
  { icon: "Code2", title: "Desarrollo Web", description: "Creamos aplicaciones web robustas y escalables con las tecnologías más modernas del mercado.", features: ["Arquitectura JAMstack", "SPA y SSR con React/Next.js", "APIs RESTful y GraphQL", "Optimización de rendimiento"], slug: "web-development" },
  { icon: "Smartphone", title: "Desarrollo Mobile", description: "Desarrollamos apps nativas y cross-platform que ofrecen experiencias de usuario excepcionales.", features: ["React Native & Flutter", "Apps nativas Swift/Kotlin", "Arquitectura offline-first", "Publicación en stores"], slug: "mobile-development" },
  { icon: "Brain", title: "Inteligencia Artificial", description: "Integramos IA generativa y machine learning en tus procesos para automatizar tareas.", features: ["LLMs y ChatGPT custom", "Automatización de procesos", "Análisis predictivo", "Chatbots y asistentes virtuales"], slug: "artificial-intelligence" },
  { icon: "Cloud", title: "Cloud & DevOps", description: "Diseñamos infraestructura cloud escalable con pipelines CI/CD automatizados.", features: ["AWS/GCP/Azure", "Docker & Kubernetes", "CI/CD automatizado", "Monitorización y observabilidad"], slug: "cloud-devops" },
  { icon: "Sparkles", title: "Consultoría Tecnológica", description: "Acompañamos a tu empresa en la transformación digital con asesoría estratégica.", features: ["Arquitectura de software", "Auditorías técnicas", "MVP y product strategy", "Formación de equipos"], slug: "tech-consulting" },
  { icon: "GraduationCap", title: "Clases y Mentorías", description: "Formación técnica personalizada para equipos e individuos.", features: ["Mentoría 1:1", "Formación in-company", "Code review", "Career coaching técnico"], slug: "classes-mentoring" },
];

const processSteps = [
  { title: "Descubrimiento", description: "Entendemos tu negocio, objetivos y requisitos técnicos." },
  { title: "Arquitectura", description: "Diseñamos la solución más adecuada para tu proyecto." },
  { title: "Desarrollo", description: "Construimos con metodologías ágiles y mejores prácticas." },
  { title: "Despliegue", description: "Lanzamos con CI/CD, monitorización y escalabilidad." },
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative pt-40 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Servicios</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6 tracking-tight">
            Soluciones tecnológicas para{" "}
            <span className="text-white/60">impulsar tu negocio</span>
          </h1>
          <p className="text-white/40 text-xl max-w-3xl mx-auto mb-10">
            Ofrecemos un conjunto completo de servicios de desarrollo de software y consultoría tecnológica.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/90"
          >
            Solicitar consultoría gratuita
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="space-y-32">
            {services.map((service, index) => {
              const isReversed = index % 2 === 1;
              const Icon = iconMap[service.icon] || Code2;
              return (
                <div key={service.slug} className={`flex flex-col ${isReversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-16 items-center`}>
                  <div className="flex-1">
                    <div className="w-12 h-12 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-white/60" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">{service.title}</h2>
                    <p className="text-white/40 text-lg mb-8">{service.description}</p>
                    <ul className="space-y-3 mb-8">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-sm">
                          <div className="w-1 h-1 bg-white/40 mt-2 flex-shrink-0" />
                          <span className="text-white/60">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
                    >
                      Más información
                      <ArrowRightCircle className="w-4 h-4" />
                    </Link>
                  </div>
                  <div className="flex-1 w-full h-80 bg-[#0a0a0a] border border-white/[0.06] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
                    <Icon className="w-32 h-32 text-white/[0.04]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Metodología</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
              Cómo <span className="text-white/60">trabajamos</span>
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Nuestra metodología ágil garantiza entregas rápidas sin sacrificar calidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <div key={step.title} className="p-8 bg-[#0a0a0a] border border-white/[0.06]">
                <div className="text-4xl font-bold text-white/[0.04] mb-4">0{i + 1}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-card">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-16 bg-[#0a0a0a] border border-white/[0.06]">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">¿No encuentras lo que buscas?</h2>
            <p className="text-white/40 text-lg mb-8 max-w-2xl mx-auto">
              Cada proyecto es único. Hablemos y diseñamos juntos la solución perfecta para tu negocio.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/90"
            >
              Hablemos de tu proyecto
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

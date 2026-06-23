import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, ArrowRightCircle, Code2, Smartphone, Brain, Cloud, Sparkles, GraduationCap } from "lucide-react";

interface ServiceDetail {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string[];
  gradient: string;
  pattern: string;
  iconBg: string;
  benefits: string[];
  technologies: { name: string; color: string }[];
  process: { title: string; description: string }[];
  useCases: { title: string; description: string }[];
}

const services: Record<string, ServiceDetail> = {
  "web-development": {
    icon: Code2,
    title: "Desarrollo Web",
    subtitle: "Aplicaciones web modernas, rápidas y escalables",
    description: "Construimos aplicaciones web de alto rendimiento utilizando las tecnologías más avanzadas del ecosistema frontend y backend.",
    longDescription: [
      "Creamos desde landing pages optimizadas hasta plataformas SaaS complejas con arquitecturas escalables. Nuestro enfoque combina diseño atractivo, rendimiento excepcional y código mantenible.",
      "Utilizamos metodologías ágiles y las mejores prácticas de la industria para entregar productos que no solo se ven bien, sino que también funcionan perfectamente bajo cualquier carga de trabajo.",
    ],
    gradient: "from-blue-600/20 to-cyan-900/20",
    pattern: "grid",
    iconBg: "bg-blue-500/20",
    benefits: [
      "Optimización Core Web Vitals para mejor SEO y experiencia de usuario",
      "Arquitectura escalable que crece con tu negocio",
      "Desarrollo server-side y client-side según necesidades",
      "Integración continua y despliegue automatizado",
    ],
    technologies: [
      { name: "React", color: "text-sky-400" },
      { name: "Next.js", color: "text-white" },
      { name: "Vue", color: "text-emerald-400" },
      { name: "Angular", color: "text-red-400" },
      { name: "Node.js", color: "text-green-400" },
      { name: "TypeScript", color: "text-blue-400" },
    ],
    process: [
      { title: "Requisitos", description: "Definimos alcance, funcionalidades y objetivos del proyecto." },
      { title: "Prototipo", description: "Creamos prototipos interactivos para validar la experiencia." },
      { title: "Desarrollo", description: "Construimos con sprints ágiles y revisiones continuas." },
      { title: "Despliegue", description: "Lanzamos con monitoreo, tests y optimización de rendimiento." },
    ],
    useCases: [
      { title: "SaaS Platforms", description: "Plataformas multi-tenant con suscripciones, dashboards y APIs." },
      { title: "E-commerce", description: "Tiendas online con catálogos, carritos, pagos y gestión de inventario." },
      { title: "Dashboards", description: "Paneles de control con visualización de datos en tiempo real." },
      { title: "Landing Pages", description: "Páginas de alto impacto optimizadas para conversión." },
    ],
  },
  "mobile-development": {
    icon: Smartphone,
    title: "Desarrollo Mobile",
    subtitle: "Apps nativas y cross-platform con experiencias excepcionales",
    description: "Desarrollamos aplicaciones móviles que destacan por su rendimiento, usabilidad y diseño cuidadoso.",
    longDescription: [
      "Cubrimos todo el ciclo de vida de una app móvil: desde la conceptualización y diseño UX/UI hasta la publicación en tiendas y mantenimiento continuo.",
      "Ya sea iOS, Android o ambas plataformas, elegimos la tecnología óptima para cada proyecto maximizando la reutilización de código sin sacrificar rendimiento.",
    ],
    gradient: "from-purple-600/20 to-pink-900/20",
    pattern: "dots",
    iconBg: "bg-purple-500/20",
    benefits: [
      "Experiencia nativa en ambas plataformas",
      "Arquitectura offline-first para funcionalidad sin conexión",
      "Notificaciones push y sincronización en tiempo real",
      "Publicación y mantenimiento en App Store y Google Play",
    ],
    technologies: [
      { name: "React Native", color: "text-sky-400" },
      { name: "Flutter", color: "text-cyan-400" },
      { name: "Swift", color: "text-orange-400" },
      { name: "Kotlin", color: "text-purple-400" },
      { name: "Firebase", color: "text-yellow-400" },
    ],
    process: [
      { title: "UX Research", description: "Investigación de usuarios y definición de flujos." },
      { title: "UI Design", description: "Diseño de interfaces nativas con prototipado." },
      { title: "Desarrollo", description: "Implementación con pruebas en dispositivos reales." },
      { title: "Launch", description: "Publicación en tiendas y monitorización post-lanzamiento." },
    ],
    useCases: [
      { title: "Apps de consumo", description: "Redes sociales, streaming, marketplaces mobile-first." },
      { title: "Empresariales", description: "Apps internas para gestión, comunicación y productividad." },
      { title: "On-demand", description: "Servicios bajo demanda con geolocalización y pagos." },
    ],
  },
  "artificial-intelligence": {
    icon: Brain,
    title: "Inteligencia Artificial",
    subtitle: "Automatización inteligente y soluciones basadas en IA",
    description: "Integramos inteligencia artificial en tus procesos para automatizar tareas, extraer insights y crear experiencias personalizadas.",
    longDescription: [
      "Desde la integración de modelos de lenguaje como GPT hasta sistemas de recomendación y análisis predictivo, aplicamos IA donde más impacto genera.",
      "Ayudamos a empresas a identificar oportunidades de automatización y las implementamos con un enfoque práctico y medible.",
    ],
    gradient: "from-emerald-600/20 to-teal-900/20",
    pattern: "diagonal",
    iconBg: "bg-emerald-500/20",
    benefits: [
      "Automatización de procesos repetitivos con IA",
      "Chatbots y asistentes virtuales con lenguaje natural",
      "Análisis predictivo para toma de decisiones",
      "Procesamiento de documentos y extracción de datos",
    ],
    technologies: [
      { name: "OpenAI", color: "text-green-400" },
      { name: "LangChain", color: "text-yellow-400" },
      { name: "TensorFlow", color: "text-orange-400" },
      { name: "Python", color: "text-blue-400" },
      { name: "Hugging Face", color: "text-yellow-300" },
    ],
    process: [
      { title: "Identificación", description: "Encontramos procesos automatizables con alto retorno." },
      { title: "Prototipado", description: "Desarrollamos un proof-of-concept rápido." },
      { title: "Integración", description: "Conectamos la IA con tus sistemas existentes." },
      { title: "Optimización", description: "Iteramos y mejoramos basados en resultados reales." },
    ],
    useCases: [
      { title: "Atención al cliente", description: "Chatbots 24/7 que resuelven consultas y derivan casos complejos." },
      { title: "Análisis de datos", description: "Extracción de patrones y predicciones desde grandes volúmenes." },
      { title: "Generación de contenido", description: "Creación automatizada de textos, informes y descripciones." },
    ],
  },
  "cloud-devops": {
    icon: Cloud,
    title: "Cloud & DevOps",
    subtitle: "Infraestructura escalable y automatización de operaciones",
    description: "Diseñamos y gestionamos infraestructura cloud robusta con pipelines CI/CD que aceleran tus entregas.",
    longDescription: [
      "Transformamos la forma en que tu equipo despliega y gestiona software. Implementamos infraestructura como código, contenedores y orquestación para máxima fiabilidad.",
      "Nuestro enfoque DevOps elimina cuellos de botella entre desarrollo y operaciones, acelerando el time-to-market sin comprometer estabilidad.",
    ],
    gradient: "from-orange-600/20 to-amber-900/20",
    pattern: "grid",
    iconBg: "bg-orange-500/20",
    benefits: [
      "Infraestructura escalable con auto-scaling",
      "Deployments automatizados y reversiones seguras",
      "Monitorización y alertas proactivas",
      "Reducción de costes cloud con optimización continua",
    ],
    technologies: [
      { name: "AWS", color: "text-orange-400" },
      { name: "GCP", color: "text-blue-400" },
      { name: "Docker", color: "text-sky-400" },
      { name: "Kubernetes", color: "text-blue-500" },
      { name: "Terraform", color: "text-purple-400" },
    ],
    process: [
      { title: "Auditoría", description: "Evaluamos infraestructura actual y puntos de mejora." },
      { title: "Diseño", description: "Arquitecturamos la solución cloud óptima." },
      { title: "Implementación", description: "Configuramos infraestructura como código." },
      { title: "Gestión", description: "Monitorizamos y optimizamos continuamente." },
    ],
    useCases: [
      { title: "Migración cloud", description: "Traslado de infraestructura on-premise a cloud con mínima disrupción." },
      { title: "Microservicios", description: "Arquitecturas basadas en contenedores con orquestación Kubernetes." },
      { title: "CI/CD", description: "Pipelines de integración y despliegue continuo automatizados." },
    ],
  },
  "tech-consulting": {
    icon: Sparkles,
    title: "Consultoría Tecnológica",
    subtitle: "Asesoría estratégica para tu transformación digital",
    description: "Acompañamos a empresas en su viaje de transformación digital con asesoría técnica y estratégica de alto nivel.",
    longDescription: [
      "Ofrecemos una visión externa y experta para ayudarte a tomar las mejores decisiones tecnológicas. Desde la arquitectura de sistemas hasta la selección de tecnologías y formación de equipos.",
      "Nuestra consultoría está orientada a resultados: no solo recomendamos, sino que ayudamos a implementar cada cambio con un enfoque práctico.",
    ],
    gradient: "from-red-600/20 to-rose-900/20",
    pattern: "circles",
    iconBg: "bg-red-500/20",
    benefits: [
      "Arquitectura de software robusta y escalable",
      "Auditorías técnicas con recomendaciones accionables",
      "Definición de MVP y hoja de ruta de producto",
      "Formación y mentoring para tu equipo técnico",
    ],
    technologies: [
      { name: "System Design", color: "text-primary" },
      { name: "Cloud Architecture", color: "text-orange-400" },
      { name: "Microservices", color: "text-blue-400" },
      { name: "Best Practices", color: "text-green-400" },
    ],
    process: [
      { title: "Diagnóstico", description: "Análisis profundo de situación actual y objetivos." },
      { title: "Estrategia", description: "Definición de hoja de ruta tecnológica." },
      { title: "Ejecución", description: "Implementación guiada con equipos internos." },
      { title: "Seguimiento", description: "Acompañamiento y ajuste continuo de la estrategia." },
    ],
    useCases: [
      { title: "Transformación digital", description: "Reestructuración tecnológica integral de empresas tradicionales." },
      { title: "Code audit", description: "Revisión exhaustiva de código con recomendaciones de mejora." },
      { title: "Arquitectura", description: "Diseño de sistemas escalables para productos en crecimiento." },
    ],
  },
  "classes-mentoring": {
    icon: GraduationCap,
    title: "Clases y Mentorías",
    subtitle: "Formación técnica y desarrollo profesional",
    description: "Impulsamos el crecimiento de desarrolladores y equipos técnicos mediante formación personalizada y mentoría práctica.",
    longDescription: [
      "Ofrecemos sesiones de mentoring 1:1 y formación in-company adaptadas al nivel y objetivos de cada alumno o equipo. Cubrimos desde fundamentos hasta arquitecturas avanzadas.",
      "Nuestro enfoque es práctico: resolvemos problemas reales, hacemos code review en vivo y trabajamos sobre proyectos concretos para maximizar el aprendizaje.",
    ],
    gradient: "from-cyan-600/20 to-blue-900/20",
    pattern: "dots",
    iconBg: "bg-cyan-500/20",
    benefits: [
      "Mentoría individualizada con objetivos medibles",
      "Formación para equipos en tecnologías modernas",
      "Code review y pair programming en vivo",
      "Preparación para entrevistas técnicas y promociones",
    ],
    technologies: [
      { name: "System Design", color: "text-primary" },
      { name: "Algorithms", color: "text-green-400" },
      { name: "Clean Code", color: "text-yellow-400" },
      { name: "Architecture", color: "text-purple-400" },
    ],
    process: [
      { title: "Evaluación", description: "Valoramos nivel actual y definimos objetivos." },
      { title: "Plan", description: "Diseñamos ruta de aprendizaje personalizada." },
      { title: "Sesiones", description: "Clases prácticas con ejercicios y proyectos reales." },
      { title: "Seguimiento", description: "Evaluamos progreso y ajustamos el plan." },
    ],
    useCases: [
      { title: "Junior a Senior", description: "Programa intensivo para dar el salto profesional." },
      { title: "Formación equipos", description: "Upskilling de equipos en nuevas tecnologías." },
      { title: "Career coaching", description: "Preparación para roles de liderazgo técnico." },
    ],
  },
};

const patternStyles: Record<string, string> = {
  grid: "bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]",
  dots: "bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:20px_20px]",
  diagonal: "bg-[linear-gradient(45deg,rgba(255,255,255,0.04)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.04)_50%,rgba(255,255,255,0.04)_75%,transparent_75%)] bg-[size:20px_20px]",
  circles: "bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)] bg-[size:40px_40px]",
};

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug];

  if (!service) {
    notFound();
  }

  const Icon = service.icon;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className={`relative pt-32 pb-24 overflow-hidden bg-gradient-to-br ${service.gradient}`}>
        <div className={`absolute inset-0 ${patternStyles[service.pattern]}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <Link href="/servicios" className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowRightCircle className="w-4 h-4 rotate-180" />
            Volver a servicios
          </Link>
          <div className="max-w-4xl">
            <div className={`w-16 h-16 rounded-2xl ${service.iconBg} flex items-center justify-center mb-6`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl text-muted-foreground mb-6">{service.subtitle}</p>
            <p className="text-lg text-muted-foreground max-w-2xl">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Long description */}
            <div>
              <h2 className="text-3xl font-bold mb-6">¿Qué ofrecemos?</h2>
              {service.longDescription.map((p, i) => (
                <p key={i} className="text-muted-foreground text-lg mb-4">{p}</p>
              ))}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Beneficios clave</h3>
                <ul className="space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Technologies + visual */}
            <div>
              <div className={`h-64 rounded-3xl bg-gradient-to-br ${service.gradient} border border-primary/10 flex items-center justify-center mb-8 overflow-hidden relative`}>
                <div className={`absolute inset-0 ${patternStyles[service.pattern]}`} />
                <Icon className="w-32 h-32 text-white/10" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tecnologías</h3>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((t) => (
                  <span key={t.name} className={`px-4 py-2 bg-muted rounded-lg font-mono text-sm ${t.color} border border-border`}>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Proceso</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">Nuestra metodología</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proceso probado que garantiza resultados predecibles y de alta calidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <div key={step.title} className="p-6 bg-card rounded-2xl border border-border">
                <div className="text-4xl font-bold text-primary/20 mb-2">0{i + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Casos de uso</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-4">¿Para quién es?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estos son algunos de los escenarios donde aplicamos este servicio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.useCases.map((uc) => (
              <div key={uc.title} className="p-6 bg-background rounded-2xl border border-border">
                <h3 className="text-lg font-semibold mb-2">{uc.title}</h3>
                <p className="text-muted-foreground text-sm">{uc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Hablamos sobre tu proyecto?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Cuéntanos en qué estás trabajando y te propondremos la mejor solución.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Solicitar consultoría
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

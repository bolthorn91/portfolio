import Link from "next/link";
import { ArrowRight, Target, Zap, Shield, Users, Award, Code2 } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Enfoque en Resultados",
    description: "Cada línea de código está orientada a generar valor medible para tu negocio. No descansamos hasta ver que nuestros clientes alcanzan sus objetivos.",
  },
  {
    icon: Zap,
    title: "Innovación Constante",
    description: "Utilizamos las tecnologías más modernas para mantener tu producto competitivo. Invertimos continuamente en aprendizaje y experimentación.",
  },
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Estándares de código estrictos y testing exhaustivo en cada proyecto. Creemos que la calidad no es un agregado, es parte del proceso.",
  },
  {
    icon: Users,
    title: "Colaboración Cercana",
    description: "Trabajamos como parte de tu equipo, entendiendo tu visión y objetivos. La comunicación fluida es la base de nuestros proyectos exitosos.",
  },
];

const stats = [
  { value: "50+", label: "Proyectos Entregados" },
  { value: "15+", label: "Años de Experiencia" },
  { value: "20+", label: "Clientes Satisfechos" },
  { value: "8", label: "Países" },
];

const timeline = [
  { year: "2010", title: "Inicios", description: "Comienza la trayectoria profesional en desarrollo de software." },
  { year: "2014", title: "Liderazgo Técnico", description: "CTO en Squaads, liderando equipos y arquitecturas." },
  { year: "2018", title: "Consultoría Internacional", description: "Proyectos con BBVA, Santander, Vodafone e IKEA." },
  { year: "2021", title: "Bolthorn Makers", description: "Fundación oficial de la empresa con visión global." },
  { year: "2024", title: "Expansión", description: "20+ clientes, presencia en 8 países y nuevos productos." },
  { year: "2026", title: "Crecimiento", description: "Nuevos productos, servicios de IA y mentorías." },
];

const teamMembers = [
  { initials: "AB", name: "Alejandro Bolthorn", role: "CEO & Founder", gradient: "from-primary to-secondary" },
];

const clientLogos = [
  "BBVA", "Santander", "Vodafone", "InboxPro", "IKEA", "Courthero", "Buscorepuestos",
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase">Nosotros</span>
          <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
            Construimos el{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              futuro digital
            </span>{" "}
            juntos
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Somos un equipo apasionado por la tecnología con amplia experiencia en desarrollo de software 
            y consultoría tecnológica. Creemos en el poder de la tecnología para transformar negocios.
          </p>
        </div>
      </section>

      {/* About */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Nuestra historia
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg">
                <p>
                  Bolthorn Makers nace de la visión de crear productos digitales que realmente marquen la diferencia. 
                  Con más de 15 años de experiencia en el sector tecnológico, hemos tenido el privilegio de trabajar 
                  con algunas de las empresas más importantes del mundo.
                </p>
                <p>
                  Nuestra filosofía es simple: combinar la excelencia técnica con un profundo entendimiento del negocio 
                  para entregar soluciones que generen valor real. No solo construimos software, construimos relaciones 
                  de confianza con nuestros clientes.
                </p>
                <p>
                  Hoy, desde Las Palmas de Gran Canaria, trabajamos con clientes en más de 8 países, 
                  ayudándoles a navegar la transformación digital con confianza y resultados tangibles.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
              <div className="text-center relative">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-4xl">B</span>
                </div>
                <div className="text-2xl font-bold">Bolthorn<span className="text-primary">Makers</span></div>
                <div className="text-muted-foreground">Est. 2021</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Equipo</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Conoce a nuestro fundador
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Detrás de cada proyecto hay experiencia, dedicación y pasión por la tecnología.
            </p>
          </div>
          <div className="max-w-md mx-auto">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center p-8 bg-card rounded-3xl border border-border">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mx-auto mb-6`}>
                  <span className="text-white font-bold text-2xl">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
                <div className="mt-6 flex justify-center gap-3">
                  {[
                    { icon: Code2, label: "Full-Stack" },
                    { icon: Award, label: "Tech Leadership" },
                    { icon: Users, label: "Mentoring" },
                  ].map((skill) => (
                    <div key={skill.label} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-lg text-sm text-muted-foreground">
                      <skill.icon className="w-3.5 h-3.5" />
                      {skill.label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Valores</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Lo que nos define
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Nuestros valores guían cada decisión y cada línea de código que escribimos.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div key={value.title} className="p-6 bg-background rounded-2xl border border-border hover:border-primary/50 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-8 bg-card rounded-2xl border border-border">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Trayectoria</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Nuestra evolución</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Más de 15 años de experiencia resumidos en hitos clave.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 border-l-2 border-border">
              {timeline.map((item) => (
                <div key={item.year} className="relative pb-12 last:pb-0">
                  <div className="absolute -left-[calc(1rem+5px)] top-0 w-4 h-4 rounded-full bg-primary border-4 border-card" />
                  <span className="text-sm text-primary font-semibold">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">Clientes</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Empresas que confían en nosotros
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {clientLogos.map((client) => (
              <div key={client} className="px-6 py-3 bg-card rounded-xl border border-border">
                <span className="font-semibold text-muted-foreground">{client}</span>
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
              ¿Hablamos?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Estamos listos para ayudarte con tu próximo proyecto.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Contáctanos
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

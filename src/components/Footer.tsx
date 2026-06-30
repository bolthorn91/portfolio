import Link from "next/link";

const footerLinks = {
  servicios: [
    { label: "Desarrollo Web", href: "/servicios/web-development" },
    { label: "Desarrollo Mobile", href: "/servicios/mobile-development" },
    { label: "Consultoría IT", href: "/servicios/tech-consulting" },
    { label: "IA & Automatización", href: "/servicios/artificial-intelligence" },
  ],
  productos: [
    { label: "Inmo Redesign", href: "https://inmo-redesign.bolthornmakers.com" },
    { label: "Próximamente", href: "/productos" },
  ],
  company: [
    { label: "Sobre Nosotros", href: "/nosotros" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contacto", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white flex items-center justify-center">
                <span className="text-black font-bold text-xl">B</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Bolthorn<span className="text-white/60">Makers</span>
              </span>
            </Link>
            <p className="text-white/40 mb-6 max-w-sm text-sm">
              Empresa de consultoría y desarrollo de software. Creamos productos digitales que impulsan tu crecimiento.
            </p>
          </div>

          <div>
            <h4 className="text-white/80 font-medium text-xs uppercase tracking-[0.15em] mb-4">Servicios</h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 font-medium text-xs uppercase tracking-[0.15em] mb-4">Productos</h4>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white/80 font-medium text-xs uppercase tracking-[0.15em] mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-white/40 hover:text-white transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Bolthorn Makers. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

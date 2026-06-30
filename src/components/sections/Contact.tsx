"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: "info@bolthornmakers.com", href: "mailto:info@bolthornmakers.com" },
    { icon: Phone, label: "Teléfono", value: "+34 694 203 233", href: "tel:+34694203233" },
    { icon: MapPin, label: "Ubicación", value: "Las Palmas de Gran Canaria, España", href: "#" },
  ];

  return (
    <section id="contacto" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-white/40 text-xs uppercase tracking-[0.2em]">Contacto</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
            Hablemos de tu <span className="text-white/60">próximo proyecto</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            ¿Tienes una idea? Cuéntanos y juntos la convertiremos en realidad.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-start gap-4 p-6 bg-[#0a0a0a] border border-white/[0.06]">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-white/40" />
                  </div>
                  <div>
                    <div className="text-xs text-white/40 uppercase tracking-[0.1em] mb-1">{info.label}</div>
                    <a href={info.href} className="text-sm hover:text-white/60 transition-colors">
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-6 bg-[#0a0a0a] border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white/40" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Reserva una reunión</h3>
                  <p className="text-xs text-white/40">30 minutos gratis</p>
                </div>
              </div>
              <p className="text-white/40 text-xs mb-4">
                Elige un horario que te venga bien y reserva una llamada gratuita de 30 minutos para discutir tu proyecto.
              </p>
              <a
                href="https://calendly.com/bolthornmakers/30min?primary_color=ffffff"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 border border-white/20 text-white text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white hover:text-black"
              >
                <Calendar className="w-4 h-4" />
                Reservar reunión
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="p-8 bg-[#0a0a0a] border border-white/[0.06]">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-12 h-12 text-white/40 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">¡Mensaje enviado!</h3>
                  <p className="text-white/40 text-sm">
                    Gracias por contactarnos. Te responderemos en menos de 24 horas.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-white/40 mb-2">Nombre *</label>
                      <input
                        type="text" required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-white/[0.06] focus:outline-none focus:border-white/30 transition-colors text-sm"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-white/40 mb-2">Email *</label>
                      <input
                        type="email" required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-white/[0.06] focus:outline-none focus:border-white/30 transition-colors text-sm"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-white/40 mb-2">Empresa</label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-white/[0.06] focus:outline-none focus:border-white/30 transition-colors text-sm"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-[0.1em] text-white/40 mb-2">Servicio de interés</label>
                      <select
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-white/[0.06] focus:outline-none focus:border-white/30 transition-colors text-sm"
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="web">Desarrollo Web</option>
                        <option value="mobile">Desarrollo Mobile</option>
                        <option value="ia">Inteligencia Artificial</option>
                        <option value="consulting">Consultoría</option>
                        <option value="otro">Otro</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.1em] text-white/40 mb-2">Mensaje *</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-4 py-3 bg-background border border-white/[0.06] focus:outline-none focus:border-white/30 transition-colors resize-none text-sm"
                      placeholder="Cuéntanos sobre tu proyecto..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-white text-black text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                      <>
                        Enviar mensaje
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

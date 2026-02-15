"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import emailjs from "@emailjs/browser";

const EMAILJS_PUBLIC_KEY = "bRkDCPeKJD_RxzcFq";
const EMAILJS_SERVICE_ID = "service_zrn7agt";
const EMAILJS_TEMPLATE_ID = "template_uueq1rc";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formState.name,
          email: formState.email,
          phone: formState.phone || "No proporcionado",
          company: formState.company || "No proporcionado",
          service: formState.service || "No especificado",
          message: formState.message,
          time: new Date().toLocaleString("es-ES"),
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const openCalendly = () => {
    window.open("https://calendly.com/bolthornmakers/30min?primary_color=3b82f6", "_blank");
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "info@bolthornmakers.com",
      href: "mailto:info@bolthornmakers.com",
    },
    {
      icon: Phone,
      label: "Teléfono",
      value: "+34 694 203 233",
      href: "tel:+34694203233",
    },
    {
      icon: MapPin,
      label: "Ubicación",
      value: "Las Palmas de Gran Canaria, España",
      href: "#",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Contacto
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Hablemos de tu{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                próximo proyecto
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              ¿Tienes una idea? Cuéntanos y juntos la convertiremos en realidad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Calendly Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card rounded-2xl border border-border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Reserva una reunión</h2>
                    <p className="text-sm text-muted-foreground">30 minutos gratis</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">
                  Elige un horario que te venga bien y reserva una llamada gratuita de 30 minutos para discutir tu proyecto.
                </p>

                {/* Calendly Inline Widget */}
                <div
                  className="calendly-inline-widget mb-6"
                  data-url="https://calendly.com/bolthornmakers/30min?primary_color=3b82f6&hide_gdpr_banner=1&background_color=0f172a&text_color=f8fafc"
                  style={{ minWidth: "320px", height: "550px" }}
                ></div>

                <button
                  onClick={openCalendly}
                  className="w-full py-3 bg-card border border-border hover:border-primary/50 rounded-xl font-medium flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  Abrir en nueva ventana
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.label}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/50 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      <div className="font-medium">{info.value}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-card rounded-2xl border border-border p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Send className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Envíanos un mensaje</h2>
                    <p className="text-sm text-muted-foreground">Te responderemos pronto</p>
                  </div>
                </div>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2">¡Mensaje enviado!</h3>
                    <p className="text-muted-foreground">Te responderemos en menos de 24 horas.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-primary hover:text-primary/80"
                    >
                      Enviar otro mensaje
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formState.phone}
                          onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                          placeholder="+34 000 000 000"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-sm font-medium mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          id="company"
                          value={formState.company}
                          onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                          className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                          placeholder="Tu empresa"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium mb-2">
                        Servicio de interés
                      </label>
                      <select
                        id="service"
                        value={formState.service}
                        onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="">Selecciona un servicio</option>
                        <option value="Desarrollo Web">Desarrollo Web</option>
                        <option value="Desarrollo Mobile">Desarrollo Mobile</option>
                        <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                        <option value="Consultoría">Consultoría</option>
                        <option value="Otro">Otro</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Mensaje *
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                        placeholder="Cuéntanos sobre tu proyecto..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-medium transition-all hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
      </main>
      <Footer />
    </>
  );
}

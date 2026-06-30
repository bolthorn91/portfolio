import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bolthorn Makers | Consultoría y Desarrollo de Software",
  description: "Empresa de consultoría y desarrollo de software. Creamos productos digitales que impulsan tu crecimiento.",
  keywords: ["desarrollo software", "consultoría tecnológica", "app development", "IA", "inteligencia artificial"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen bg-background">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

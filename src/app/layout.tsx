import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}

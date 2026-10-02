import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Academia Bolthorn',
  description: 'Cursos interactivos de programación',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

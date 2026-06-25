'use client'

import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Chrome, Loader2 } from 'lucide-react'
import { useAuth } from '@/lib/AuthContext'

interface AuthGateProps {
  children: ReactNode
  fallback?: ReactNode
}

export default function AuthGate({ children, fallback }: AuthGateProps) {
  const { user, loading } = useAuth()
  const [showModal, setShowModal] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }

  if (user) return <>{children}</>

  return (
    <>
      <div onClick={() => setShowModal(true)}>
        {fallback || (
          <button className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-medium transition-all">
            Inicia sesión para pagar
          </button>
        )}
      </div>

      <AnimatePresence>
        {showModal && <LoginModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  )
}

function LoginModal({ onClose }: { onClose: () => void }) {
  const { signInWithGoogle, signInWithEmail, signUp } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const result = mode === 'login'
      ? await signInWithEmail(email, password)
      : await signUp(email, password)
    setSubmitting(false)
    if (result.error) {
      setError(result.error)
    } else if (mode === 'register') {
      setError('Revisa tu email para confirmar el registro.')
      setMode('login')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border rounded-2xl p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-1">
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          {mode === 'login' ? 'Para continuar con el pago' : 'Para solicitar presupuestos'}
        </p>

        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 py-3 bg-background border border-border rounded-xl hover:border-primary/50 transition-all mb-4"
        >
          <Chrome className="w-5 h-5" />
          Continuar con Google
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">o</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-4">
          {mode === 'login' ? (
            <>¿No tienes cuenta? <button onClick={() => { setMode('register'); setError(null) }} className="text-primary hover:underline">Regístrate</button></>
          ) : (
            <>¿Ya tienes cuenta? <button onClick={() => { setMode('login'); setError(null) }} className="text-primary hover:underline">Inicia sesión</button></>
          )}
        </p>
      </motion.div>
    </motion.div>
  )
}

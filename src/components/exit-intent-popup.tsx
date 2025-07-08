'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function ExitIntentPopup() {
  const t = useTranslations('popup')
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitIntentShown')) {
        setIsOpen(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Tutaj byłaby logika wysyłania emaila
    console.log('Email submitted:', email)
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-dark rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 z-50 border border-white/10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>

            <h3 className="text-2xl font-bold text-white mb-2">
              {t('title')}
            </h3>
            <h4 className="text-xl font-semibold text-gradient mb-2">
              {t('subtitle')}
            </h4>
            <p className="text-gray-300 mb-6">
              {t('description')}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Twój email"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 backdrop-blur-sm"
              />
              <Button type="submit" className="w-full" size="lg">
                {t('cta')}
              </Button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
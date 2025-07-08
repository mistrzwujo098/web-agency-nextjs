'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, BookOpen, Target, TrendingUp, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Download10BledowPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const mistakes = [
    'Brak jasnego przekazu wartości',
    'Słaba widoczność informacji kontaktowych',
    'Brak dowodów społecznych',
    'Niezoptymalizowana wersja mobilna',
    'Wolne ładowanie strony',
    'Skomplikowana nawigacja',
    'Brak wezwań do działania (CTA)',
    'Nieaktualne treści',
    'Brak optymalizacji SEO',
    'Ignorowanie analityki'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Submit to API
      const response = await fetch('/api/forms/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          resource: '10-bledow-poradnik'
        }),
      })

      if (response.ok) {
        setShowForm(false)
        // Redirect to thank you page with download
        setTimeout(() => {
          window.location.href = '/pl/thank-you/download?resource=10%20błędów%20które%20kosztują%20Cię%20klientów'
        }, 1000)
      }
    } catch (error) {
      console.error('Download form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                  DARMOWY PORADNIK
                </span>
                <span className="text-gray-400">PDF • 32 strony</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                10 błędów, które kosztują Cię klientów
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Odkryj najczęstsze błędy na stronach internetowych lokalnych firm i dowiedz się, 
                jak je naprawić, aby <span className="text-purple-400 font-semibold">zwiększyć konwersję o minimum 30%</span>.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium">Konkretne przykłady i rozwiązania</h3>
                    <p className="text-gray-400 text-sm">Każdy błąd opisany z przykładami i gotowymi rozwiązaniami</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium">Checklist do samodzielnej analizy</h3>
                    <p className="text-gray-400 text-sm">Sprawdź swoją stronę punkt po punkcie</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-medium">Priorytety implementacji</h3>
                    <p className="text-gray-400 text-sm">Dowiedz się, od czego zacząć, aby szybko zobaczyć efekty</p>
                  </div>
                </div>
              </div>

              {/* Download Form */}
              {showForm ? (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="glass-dark rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Pobierz darmowy poradnik
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Twój email..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Wysyłanie...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          Pobierz poradnik za darmo
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Dołączysz też do naszego newslettera. Możesz się wypisać w każdej chwili.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-dark rounded-2xl p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Sprawdź swoją skrzynkę email!
                  </h3>
                  <p className="text-gray-400">
                    Wysłaliśmy link do pobrania poradnika
                  </p>
                </motion.div>
              )}
            </motion.div>

            {/* Right Column - Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-8 relative overflow-hidden">
                {/* Book Cover Mock */}
                <div className="aspect-[3/4] bg-gradient-to-br from-red-900 to-purple-900 rounded-xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">10 BŁĘDÓW</h2>
                    <p className="text-lg text-gray-300 mb-4">które kosztują Cię klientów</p>
                    <div className="w-20 h-0.5 bg-white/50 mb-4" />
                    <p className="text-sm text-gray-400">Jak je naprawić i zwiększyć sprzedaż</p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">32</div>
                    <div className="text-xs text-gray-400">strony</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">10</div>
                    <div className="text-xs text-gray-400">błędów</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">50+</div>
                    <div className="text-xs text-gray-400">wskazówek</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Co znajdziesz w poradniku?
            </h2>
            <p className="text-xl text-gray-300">
              Kompleksowy przewodnik po najczęstszych błędach i ich rozwiązaniach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {mistakes.map((mistake, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-dark rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-red-400 font-bold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">{mistake}</h3>
                  <p className="text-gray-400 text-sm">
                    Szczegółowy opis problemu i gotowe rozwiązanie do wdrożenia
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-8">
              Dołącz do 2000+ przedsiębiorców, którzy pobrali ten poradnik
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-dark rounded-xl p-6">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-3">
                  "Prosty i konkretny poradnik. Wdrożyłem 5 zmian i widzę już pierwsze efekty!"
                </p>
                <p className="text-sm text-gray-500">
                  - Michał K., właściciel restauracji
                </p>
              </div>
              
              <div className="glass-dark rounded-xl p-6">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-3">
                  "Odkryłam błędy, których nie byłam świadoma. Świetna checklist!"
                </p>
                <p className="text-sm text-gray-500">
                  - Anna D., salon kosmetyczny
                </p>
              </div>
              
              <div className="glass-dark rounded-xl p-6">
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-3">
                  "Dzięki poradnikowi zwiększyłem konwersję o 25% w miesiąc!"
                </p>
                <p className="text-sm text-gray-500">
                  - Piotr W., sklep z elektroniką
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, CheckSquare, Zap, TrendingUp, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Download50ElementowPage() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const categories = [
    { name: 'Nagłówek i nawigacja', count: 8, icon: '🎯' },
    { name: 'Strona główna', count: 12, icon: '🏠' },
    { name: 'Treść i przekaz', count: 10, icon: '📝' },
    { name: 'Wezwania do działania', count: 6, icon: '🎪' },
    { name: 'Dowody społeczne', count: 7, icon: '⭐' },
    { name: 'Wydajność i SEO', count: 7, icon: '🚀' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/forms/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          resource: '50-elementow-checklist'
        }),
      })

      if (response.ok) {
        setShowForm(false)
        setTimeout(() => {
          window.location.href = '/pl/thank-you/download?resource=Checklist%2050%20elementów%20strony'
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
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  DARMOWA CHECKLIST
                </span>
                <span className="text-gray-400">PDF • Do druku</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                50 elementów strony, które zwiększają sprzedaż
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Kompletna checklist do analizy swojej strony. Sprawdź punkt po punkcie, 
                co możesz poprawić, aby <span className="text-green-400 font-semibold">przekształcić więcej odwiedzających w klientów</span>.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-6 h-6 text-green-400 flex-shrink-0" />
                  <span className="text-white">Gotowa do druku</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                  <span className="text-white">Szybka analiza</span>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-blue-400 flex-shrink-0" />
                  <span className="text-white">Priorytety wdrożenia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-purple-400 flex-shrink-0" />
                  <span className="text-white">Best practices</span>
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
                    Pobierz checklistę za darmo
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Twój email..."
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Wysyłanie...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          Pobierz checklistę (PDF)
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    Otrzymasz też dostęp do ekskluzywnych materiałów
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
                    Checklist wysłana!
                  </h3>
                  <p className="text-gray-400">
                    Sprawdź email i pobierz checklistę
                  </p>
                </motion.div>
              )}

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">5000+</span>
                  <span className="text-gray-400 text-sm">pobrań</span>
                </div>
                <div className="w-px h-8 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">4.8/5</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Checklist Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-8">
                <div className="bg-white rounded-xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  {/* Checklist Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Checklist konwersji</h2>
                      <p className="text-gray-600">50 kluczowych elementów</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <CheckSquare className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Category Preview */}
                  <div className="space-y-3">
                    {categories.map((category, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{category.icon}</span>
                          <span className="text-gray-800 font-medium">{category.name}</span>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          {category.count} punktów
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sample Checklist Items */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-3">Przykładowe punkty:</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="w-4 h-4" checked readOnly />
                        Logo widoczne w lewym górnym rogu
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="w-4 h-4" checked readOnly />
                        Jasny i czytelny nagłówek główny
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input type="checkbox" className="w-4 h-4" />
                        Numer telefonu w widocznym miejscu
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Jak korzystać z checklisty?
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">1</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Wydrukuj checklistę</h3>
              <p className="text-gray-400 text-sm">
                Lub otwórz na ekranie i przejdź punkt po punkcie
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">2</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Analizuj swoją stronę</h3>
              <p className="text-gray-400 text-sm">
                Zaznaczaj elementy, które już masz i te do poprawy
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-white font-semibold mb-2">Wdrażaj zmiany</h3>
              <p className="text-gray-400 text-sm">
                Zacznij od elementów oznaczonych jako priorytetowe
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Potrzebujesz pomocy we wdrożeniu?
            </h2>
            <p className="text-gray-300 mb-8">
              Nasz zespół może przeprowadzić dla Ciebie kompletny audyt i zaproponować plan działania
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => window.location.href = '/pl/free-analysis'}
            >
              Zamów darmową analizę strony
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
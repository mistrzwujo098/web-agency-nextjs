'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, CheckSquare, Zap, TrendingUp, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

export default function Download50ElementowPage() {
  const params = useParams()
  const locale = params.locale as string
  const isPL = locale === 'pl'
  
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const content = {
    pl: {
      badge: 'DARMOWA CHECKLIST',
      format: 'PDF • Do druku',
      title: '50 elementów strony, które zwiększają sprzedaż',
      subtitle: 'Kompletna checklist do analizy swojej strony. Sprawdź punkt po punkcie, co możesz poprawić, aby ',
      highlight: 'przekształcić więcej odwiedzających w klientów',
      categories: [
        { name: 'Nagłówek i nawigacja', count: 8, icon: '🎯' },
        { name: 'Strona główna', count: 12, icon: '🏠' },
        { name: 'Treść i przekaz', count: 10, icon: '📝' },
        { name: 'Wezwania do działania', count: 6, icon: '🎪' },
        { name: 'Dowody społeczne', count: 7, icon: '⭐' },
        { name: 'Wydajność i SEO', count: 7, icon: '🚀' }
      ],
      features: [
        { icon: CheckSquare, text: 'Gotowa do druku' },
        { icon: Zap, text: 'Szybka analiza' },
        { icon: TrendingUp, text: 'Priorytety wdrożenia' },
        { icon: Star, text: 'Best practices' }
      ],
      formTitle: 'Pobierz checklistę za darmo',
      emailPlaceholder: 'Twój email...',
      submitButton: 'Pobierz checklistę (PDF)',
      submitting: 'Wysyłanie...',
      disclaimer: 'Raz w tygodniu wysyłam 1 konkretną poradę. Żadnego spamu.',
      successTitle: 'Checklist wysłana!',
      successMessage: 'Sprawdź email i pobierz checklistę',
      stats: [
        { value: '5312', label: 'pobrań' },
        { value: '4.8/5', label: 'ocena' }
      ],
      howToUse: 'Jak korzystać z checklisty?',
      steps: [
        { number: '1', title: 'Wydrukuj checklistę', description: 'Lub otwórz na ekranie i przejdź punkt po punkcie' },
        { number: '2', title: 'Analizuj swoją stronę', description: 'Zaznaczaj elementy, które już masz i te do poprawy' },
        { number: '3', title: 'Wdrażaj zmiany', description: 'Zacznij od elementów oznaczonych jako priorytetowe' }
      ],
      sampleItems: [
        'Logo widoczne w lewym górnym rogu',
        'Jasny i czytelny nagłówek główny',
        'Numer telefonu w widocznym miejscu'
      ],
      cta: 'Potrzebujesz pomocy we wdrożeniu?',
      ctaDescription: 'Nasz zespół może przeprowadzić dla Ciebie kompletny audyt i zaproponować plan działania',
      ctaButton: 'Zamów darmową analizę strony'
    },
    en: {
      badge: 'FREE CHECKLIST',
      format: 'PDF • Printable',
      title: '50 Website Elements That Increase Sales',
      subtitle: 'Complete checklist to analyze your website. Check point by point what you can improve to ',
      highlight: 'convert more visitors into customers',
      categories: [
        { name: 'Header & Navigation', count: 8, icon: '🎯' },
        { name: 'Homepage', count: 12, icon: '🏠' },
        { name: 'Content & Messaging', count: 10, icon: '📝' },
        { name: 'Calls to Action', count: 6, icon: '🎪' },
        { name: 'Social Proof', count: 7, icon: '⭐' },
        { name: 'Performance & SEO', count: 7, icon: '🚀' }
      ],
      features: [
        { icon: CheckSquare, text: 'Print-ready' },
        { icon: Zap, text: 'Quick analysis' },
        { icon: TrendingUp, text: 'Implementation priorities' },
        { icon: Star, text: 'Best practices' }
      ],
      formTitle: 'Get your free checklist',
      emailPlaceholder: 'Your email...',
      submitButton: 'Download Checklist (PDF)',
      submitting: 'Sending...',
      disclaimer: 'Once a week I send 1 specific tip. No spam.',
      successTitle: 'Checklist sent!',
      successMessage: 'Check your email to download',
      stats: [
        { value: '5312', label: 'downloads' },
        { value: '4.8/5', label: 'rating' }
      ],
      howToUse: 'How to use the checklist?',
      steps: [
        { number: '1', title: 'Print the checklist', description: 'Or open on screen and go through point by point' },
        { number: '2', title: 'Analyze your website', description: 'Check off elements you have and those to improve' },
        { number: '3', title: 'Implement changes', description: 'Start with elements marked as priority' }
      ],
      sampleItems: [
        'Logo visible in top left corner',
        'Clear and readable main heading',
        'Phone number in visible location'
      ],
      cta: 'Need help with implementation?',
      ctaDescription: 'Our team can conduct a complete audit and propose an action plan',
      ctaButton: 'Request free website analysis'
    }
  }

  const t = content[isPL ? 'pl' : 'en']

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
          window.location.href = `/${locale}/thank-you/download?resource=${encodeURIComponent(t.title)}`
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
                  {t.badge}
                </span>
                <span className="text-gray-400">{t.format}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {t.subtitle}
                <span className="text-green-400 font-semibold">{t.highlight}</span>.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <feature.icon className="w-6 h-6 text-green-400 flex-shrink-0" />
                    <span className="text-white">{feature.text}</span>
                  </div>
                ))}
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
                    {t.formTitle}
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
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
                          {t.submitting}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          {t.submitButton}
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {t.disclaimer}
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
                    {t.successTitle}
                  </h3>
                  <p className="text-gray-400">{t.successMessage}</p>
                </motion.div>
              )}

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{t.stats[0].value}</span>
                  <span className="text-gray-400 text-sm">{t.stats[0].label}</span>
                </div>
                <div className="w-px h-8 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{t.stats[1].value}</span>
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
                      <h2 className="text-2xl font-bold text-gray-900">
                        {isPL ? 'Checklist konwersji' : 'Conversion Checklist'}
                      </h2>
                      <p className="text-gray-600">
                        {isPL ? '50 kluczowych elementów' : '50 key elements'}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <CheckSquare className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Category Preview */}
                  <div className="space-y-3">
                    {t.categories.map((category, index) => (
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
                          {category.count} {isPL ? 'punktów' : 'points'}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sample Checklist Items */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-3">
                      {isPL ? 'Przykładowe punkty:' : 'Sample items:'}
                    </p>
                    <div className="space-y-2">
                      {t.sampleItems.map((item, index) => (
                        <label key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" className="w-4 h-4" checked={index === 0} readOnly />
                          {item}
                        </label>
                      ))}
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
              {t.howToUse}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">{step.number}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
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
              {t.cta}
            </h2>
            <p className="text-gray-300 mb-8">
              {t.ctaDescription}
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => window.location.href = `/${locale}/free-analysis`}
            >
              {t.ctaButton}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
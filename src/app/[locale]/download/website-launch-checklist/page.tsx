'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, Rocket, Shield, Search, Gauge, FileCheck, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

export default function WebsiteLaunchChecklistPage() {
  const params = useParams()
  const locale = params.locale as string
  const isPL = locale === 'pl'
  
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const content = {
    pl: {
      badge: 'LISTA KONTROLNA',
      format: 'PDF • Do druku',
      title: 'Checklist przed startem strony',
      subtitle: 'Kompletna lista kontrolna 87 punktów, które musisz sprawdzić przed publikacją strony. Używana przez profesjonalne agencje.',
      highlight: 'uniknij kosztownych błędów',
      categories: [
        { name: 'Sprawdzenie techniczne', count: 15, icon: '⚙️', color: 'purple' },
        { name: 'Przegląd treści', count: 12, icon: '📝', color: 'blue' },
        { name: 'Konfiguracja SEO', count: 18, icon: '🔍', color: 'green' },
        { name: 'Zgodność prawna', count: 8, icon: '⚖️', color: 'orange' },
        { name: 'Testy wydajności', count: 14, icon: '🚀', color: 'red' },
        { name: 'Konfiguracja analityki', count: 10, icon: '📊', color: 'indigo' },
        { name: 'Przygotowanie marketingu', count: 10, icon: '📣', color: 'pink' }
      ],
      features: [
        'Kolejność chronologiczna zadań',
        'Wskaźniki priorytetów',
        'Kolumna odpowiedzialności',
        'Sekcja notatek'
      ],
      formTitle: 'Pobierz checklistę za darmo',
      emailPlaceholder: 'Twój email...',
      submitButton: 'Pobierz checklistę (PDF)',
      submitting: 'Wysyłanie...',
      disclaimer: 'Dołączysz do newslettera z poradami. Możesz się wypisać w każdej chwili.',
      successTitle: 'Checklist wysłana!',
      successMessage: 'Sprawdź email i pobierz checklistę',
      stats: [
        { value: '2100+', label: 'pobrań' },
        { value: '87', label: 'punktów' }
      ],
      howToUse: 'Jak korzystać z checklisty?',
      steps: [
        {
          number: '1',
          title: 'Wydrukuj lub otwórz PDF',
          description: 'Najlepiej 2 tygodnie przed planowanym startem'
        },
        {
          number: '2',
          title: 'Przypisz odpowiedzialności',
          description: 'Każde zadanie powinno mieć właściciela'
        },
        {
          number: '3',
          title: 'Sprawdzaj systematycznie',
          description: 'Zaznaczaj ukończone punkty na bieżąco'
        },
        {
          number: '4',
          title: 'Ostatnia weryfikacja',
          description: 'Dzień przed startem przejdź wszystko ponownie'
        }
      ],
      sampleItems: [
        'SSL certyfikat zainstalowany i działa',
        'Kopie zapasowe skonfigurowane',
        'Wszystkie linki sprawdzone (0 błędów 404)',
        'Formularze przetestowane i działają',
        'RODO i polityka prywatności dodane'
      ],
      testimonials: [
        {
          text: 'Używam tej checklisty przy każdym projekcie. Uratowała mnie przed wieloma wpadkami!',
          author: 'Michał P., Freelancer'
        },
        {
          text: 'Najbardziej kompletna lista jaką znalazłam. Świetnie uporządkowana.',
          author: 'Katarzyna L., Project Manager'
        }
      ]
    },
    en: {
      badge: 'LAUNCH CHECKLIST',
      format: 'PDF • Printable',
      title: 'Website Launch Checklist',
      subtitle: 'Complete 87-point checklist to verify before publishing your website. Used by professional agencies.',
      highlight: 'avoid costly mistakes',
      categories: [
        { name: 'Technical checks', count: 15, icon: '⚙️', color: 'purple' },
        { name: 'Content review', count: 12, icon: '📝', color: 'blue' },
        { name: 'SEO setup', count: 18, icon: '🔍', color: 'green' },
        { name: 'Legal compliance', count: 8, icon: '⚖️', color: 'orange' },
        { name: 'Performance testing', count: 14, icon: '🚀', color: 'red' },
        { name: 'Analytics setup', count: 10, icon: '📊', color: 'indigo' },
        { name: 'Marketing prep', count: 10, icon: '📣', color: 'pink' }
      ],
      features: [
        'Chronological task order',
        'Priority indicators',
        'Responsibility column',
        'Notes section'
      ],
      formTitle: 'Get your free checklist',
      emailPlaceholder: 'Your email...',
      submitButton: 'Download Checklist (PDF)',
      submitting: 'Sending...',
      disclaimer: 'You\'ll join our tips newsletter. Unsubscribe anytime.',
      successTitle: 'Checklist sent!',
      successMessage: 'Check your email to download',
      stats: [
        { value: '2100+', label: 'downloads' },
        { value: '87', label: 'checkpoints' }
      ],
      howToUse: 'How to use the checklist?',
      steps: [
        {
          number: '1',
          title: 'Print or open PDF',
          description: 'Best 2 weeks before planned launch'
        },
        {
          number: '2',
          title: 'Assign responsibilities',
          description: 'Every task should have an owner'
        },
        {
          number: '3',
          title: 'Check systematically',
          description: 'Mark completed items as you go'
        },
        {
          number: '4',
          title: 'Final verification',
          description: 'Go through everything again before launch'
        }
      ],
      sampleItems: [
        'SSL certificate installed and working',
        'Backups configured',
        'All links checked (0 404 errors)',
        'Forms tested and working',
        'GDPR and privacy policy added'
      ],
      testimonials: [
        {
          text: 'I use this checklist for every project. Saved me from many disasters!',
          author: 'Michael P., Freelancer'
        },
        {
          text: 'Most complete checklist I\'ve found. Excellently organized.',
          author: 'Catherine L., Project Manager'
        }
      ]
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
          resource: 'website-launch-checklist'
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
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                  {t.badge}
                </span>
                <span className="text-gray-400">{t.format}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {t.subtitle.split('uniknij').map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && isPL && <span className="text-blue-400 font-semibold">{t.highlight}</span>}
                  </span>
                ))}
                {!isPL && (
                  <span>
                    {' '}<span className="text-blue-400 font-semibold">{t.highlight}</span>
                  </span>
                )}
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-white text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Form */}
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg disabled:opacity-50"
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

              <div className="flex items-center gap-6 mt-8">
                {t.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-8">
                <div className="bg-white rounded-xl p-8 shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  {/* Checklist Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{isPL ? 'Checklist startu' : 'Launch Checklist'}</h2>
                      <p className="text-gray-600">87 {isPL ? 'punktów kontrolnych' : 'checkpoints'}</p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Rocket className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="space-y-2 mb-6">
                    {t.categories.slice(0, 4).map((category, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{category.icon}</span>
                          <span className="text-gray-800 text-sm font-medium">{category.name}</span>
                        </div>
                        <span className={`px-2 py-1 bg-${category.color}-100 text-${category.color}-700 rounded-full text-xs font-medium`}>
                          {category.count} {isPL ? 'pkt' : 'pts'}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Sample Items */}
                  <div className="border-t pt-4">
                    <p className="text-xs text-gray-500 mb-2">{isPL ? 'Przykładowe punkty:' : 'Sample items:'}</p>
                    <div className="space-y-1">
                      {t.sampleItems.slice(0, 3).map((item, index) => (
                        <label key={index} className="flex items-center gap-2 text-xs text-gray-700">
                          <input type="checkbox" className="w-3 h-3" checked={index === 0} readOnly />
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

      {/* How to Use */}
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

          <div className="grid md:grid-cols-4 gap-6">
            {t.steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-400">{step.number}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {t.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-xl p-6 text-center"
              >
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-3">"{testimonial.text}"</p>
                <p className="text-sm text-gray-500">- {testimonial.author}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
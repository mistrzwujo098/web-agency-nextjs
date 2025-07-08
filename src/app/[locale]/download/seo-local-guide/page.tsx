'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, MapPin, Search, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

export default function DownloadSeoLocalGuidePage() {
  const params = useParams()
  const locale = params.locale as string
  const isPL = locale === 'pl'
  
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const content = {
    pl: {
      badge: 'DARMOWY PRZEWODNIK',
      format: 'PDF • 45 stron',
      title: 'Jak być #1 w Google w swojej okolicy',
      subtitle: 'Pokaż się na pierwszej stronie gdy ktoś szuka ',
      highlight: '"fryzjer Warszawa" czy "mechanik koło mnie"',
      description: 'Praktyczny przewodnik jak wyprzedzić konkurencję w lokalnych wynikach Google. Bez ściemy, bez teorii - same sprawdzone taktyki.',
      benefits: [
        {
          icon: MapPin,
          title: 'Dominuj w Google Maps',
          description: 'Jak mieć wizytówkę firmy na samej górze'
        },
        {
          icon: Search,
          title: 'Słowa które sprzedają',
          description: 'Lista 127 fraz lokalnych które konwertują'
        },
        {
          icon: Users,
          title: 'Opinie które budują trust',
          description: 'System zbierania 5★ recenzji'
        },
        {
          icon: TrendingUp,
          title: 'Wzrost w 90 dni',
          description: 'Plan działania tydzień po tygodniu'
        }
      ],
      chapters: [
        'Wizytówka Google która przyciąga (17 tricków)',
        'Strona która Google lubi (checklist 31 punktów)',
        'Opinie - jak mieć ich więcej niż konkurencja',
        'Linki lokalne które dają power',
        'Content który sprzedaje lokalnie',
        'Śledzenie wyników (darmowe narzędzia)'
      ],
      formTitle: 'Weź przewodnik. Za darmo.',
      emailPlaceholder: 'Twój email...',
      submitButton: 'Wyślij mi PDF',
      submitting: 'Wysyłam...',
      disclaimer: 'Zero spamu. Dostajesz też dostęp do grupy 2000+ lokalnych firm.',
      successTitle: 'Sprawdź maila!',
      successMessage: 'Przewodnik już leci do Ciebie',
      testimonial: '"W 3 miesiące przeskoczyłem z 8 miejsca na 1. Telefon dzwoni non-stop" - Paweł, warsztat samochodowy',
      stats: [
        { value: '2137+', label: 'pobrań' },
        { value: '#1-3', label: 'średni wynik po wdrożeniu' },
        { value: '90 dni', label: 'do widocznych efektów' }
      ],
      cta: 'Potrzebujesz pomocy z SEO?',
      ctaDescription: 'Zrobię Ci pełny audyt SEO i pokażę co naprawić najpierw',
      ctaButton: 'Zamów audyt SEO za 0 zł'
    },
    en: {
      badge: 'FREE GUIDE',
      format: 'PDF • 45 pages',
      title: 'How to be #1 on Google locally',
      subtitle: 'Show up first when someone searches ',
      highlight: '"plumber Chicago" or "dentist near me"',
      description: 'Practical guide to beat competition in local Google results. No BS, no theory - just proven tactics.',
      benefits: [
        {
          icon: MapPin,
          title: 'Dominate Google Maps',
          description: 'Get your listing at the very top'
        },
        {
          icon: Search,
          title: 'Keywords that sell',
          description: 'List of 127 local phrases that convert'
        },
        {
          icon: Users,
          title: 'Reviews that build trust',
          description: 'System for getting 5★ reviews'
        },
        {
          icon: TrendingUp,
          title: 'Growth in 90 days',
          description: 'Week-by-week action plan'
        }
      ],
      chapters: [
        'Google listing that attracts (17 tricks)',
        'Website Google loves (31-point checklist)',
        'Reviews - how to have more than competition',
        'Local links that give power',
        'Content that sells locally',
        'Tracking results (free tools)'
      ],
      formTitle: 'Get the guide. Free.',
      emailPlaceholder: 'Your email...',
      submitButton: 'Send me PDF',
      submitting: 'Sending...',
      disclaimer: 'Zero spam. Also get access to 2000+ local business group.',
      successTitle: 'Check your email!',
      successMessage: 'Guide is on its way',
      testimonial: '"In 3 months jumped from #8 to #1. Phone rings non-stop" - Paul, auto repair shop',
      stats: [
        { value: '2137+', label: 'downloads' },
        { value: '#1-3', label: 'average result after implementation' },
        { value: '90 days', label: 'to visible results' }
      ],
      cta: 'Need help with SEO?',
      ctaDescription: "I'll do a full SEO audit and show what to fix first",
      ctaButton: 'Get SEO audit for $0'
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
          resource: 'seo-local-guide'
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
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                  {t.badge}
                </span>
                <span className="text-gray-400">{t.format}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-4">
                {t.subtitle}
                <span className="text-blue-400 font-semibold">{t.highlight}</span>.
              </p>

              <p className="text-lg text-gray-400 mb-8">
                {t.description}
              </p>

              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {t.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <benefit.icon className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">{benefit.title}</h3>
                      <p className="text-gray-400 text-sm">{benefit.description}</p>
                    </div>
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

              {/* Testimonial */}
              <div className="mt-8 p-4 bg-blue-500/10 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-gray-300 italic">{t.testimonial}</p>
              </div>
            </motion.div>

            {/* Right Column - Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-8">
                <div className="bg-white rounded-xl p-8 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  {/* Guide Preview */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {isPL ? 'SEO Lokalne' : 'Local SEO'}
                      </h2>
                      <p className="text-gray-600">
                        {isPL ? 'Przewodnik praktyczny' : 'Practical Guide'}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Chapter List */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      {isPL ? 'W środku:' : 'Inside:'}
                    </h3>
                    {t.chapters.map((chapter, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-gray-800 text-sm">{chapter}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {t.stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
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
              {t.cta}
            </h2>
            <p className="text-gray-300 mb-8">
              {t.ctaDescription}
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => window.location.href = `/${locale}/#contact`}
            >
              {t.ctaButton}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
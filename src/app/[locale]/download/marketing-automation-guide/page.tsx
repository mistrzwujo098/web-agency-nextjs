'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, Zap, Mail, Clock, Users, ArrowRight, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

export default function MarketingAutomationGuidePage() {
  const params = useParams()
  const locale = params.locale as string
  const isPL = locale === 'pl'
  
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const content = {
    pl: {
      badge: 'KOMPLETNY PRZEWODNIK',
      format: 'PDF • 45 stron',
      title: 'Automatyzacja marketingu dla lokalnych firm',
      subtitle: 'Niech Twoja strona sprzedaje 24/7 bez Twojego udziału. Pokażę Ci jak',
      highlight: 'oszczędź 20h tygodniowo',
      features: [
        {
          icon: Mail,
          title: '5 gotowych automatyzacji',
          description: 'Które możesz wdrożyć w 24h'
        },
        {
          icon: Clock,
          title: 'Szablony w języku polskim',
          description: 'Gotowe do użycia emaile i SMS-y'
        },
        {
          icon: BarChart,
          title: 'Kalkulatory ROI',
          description: 'Oblicz zwrot z inwestycji'
        },
        {
          icon: Users,
          title: 'Case studies z Polski',
          description: 'Rzeczywiste przykłady lokalnych firm'
        }
      ],
      formTitle: 'Pobierz przewodnik za darmo',
      emailPlaceholder: 'Twój email...',
      submitButton: 'Pobierz przewodnik (PDF)',
      submitting: 'Wysyłanie...',
      disclaimer: 'Zero spamu. Raz w tygodniu 1 konkretna porada.',
      successTitle: 'Przewodnik wysłany!',
      successMessage: 'Sprawdź swoją skrzynkę email',
      stats: [
        { value: '3521', label: 'pobrań' },
        { value: '4.9/5', label: 'ocena' }
      ],
      automations: [
        'Seria powitalna dla nowych klientów',
        'Przypomnienia o umówionych wizytach',
        'Kampania win-back (odzyskiwanie klientów)',
        'Automatyczne prośby o opinie',
        'Oferty urodzinowe i rocznicowe'
      ],
      whatYouGet: 'Co znajdziesz w przewodniku?',
      testimonials: [
        {
          text: 'Email powitalny + 3 followupy = 15 nowych klientów w miesiąc. Działa.',
          author: 'Tomek, fryzjer męski Poznań'
        },
        {
          text: 'Przypomnienia o wizytach zmniejszyły no-show z 30% do 5%. To duża kasa.',
          author: 'Marta, kosmetyczka Gdańsk'
        },
        {
          text: 'Automat do opinii Google = 47 nowych recenzji w 2 miesiące. Z 4.2 na 4.8.',
          author: 'Robert, warsztat Wrocław'
        }
      ]
    },
    en: {
      badge: 'COMPLETE GUIDE',
      format: 'PDF • 45 pages',
      title: 'Marketing Automation for Local Businesses',
      subtitle: 'Let your website sell 24/7 without you. I\'ll show you how',
      highlight: 'save 20h weekly',
      features: [
        {
          icon: Mail,
          title: '5 ready-to-use automations',
          description: 'You can implement in 24h'
        },
        {
          icon: Clock,
          title: 'Email & SMS templates',
          description: 'Ready to copy and paste'
        },
        {
          icon: BarChart,
          title: 'ROI calculators',
          description: 'Calculate your return on investment'
        },
        {
          icon: Users,
          title: 'Real case studies',
          description: 'From successful local businesses'
        }
      ],
      formTitle: 'Get your free guide',
      emailPlaceholder: 'Your email...',
      submitButton: 'Download Guide (PDF)',
      submitting: 'Sending...',
      disclaimer: 'Zero spam. Once a week 1 specific tip.',
      successTitle: 'Guide sent!',
      successMessage: 'Check your email inbox',
      stats: [
        { value: '3521', label: 'downloads' },
        { value: '4.9/5', label: 'rating' }
      ],
      automations: [
        'Welcome series for new customers',
        'Appointment reminder sequences',
        'Customer win-back campaigns',
        'Automated review requests',
        'Birthday & anniversary offers'
      ],
      whatYouGet: 'What\'s inside the guide?',
      testimonials: [
        {
          text: 'Welcome email + 3 followups = 15 new clients monthly. It works.',
          author: 'Tom, barber shop Denver'
        },
        {
          text: 'Appointment reminders reduced no-shows from 30% to 5%. That\'s big money.',
          author: 'Martha, beauty salon Miami'
        },
        {
          text: 'Google review automation = 47 new reviews in 2 months. From 4.2 to 4.8.',
          author: 'Rob, auto shop Seattle'
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
          resource: 'marketing-automation-guide'
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
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                  {t.badge}
                </span>
                <span className="text-gray-400">{t.format}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {t.subtitle.split('oszczędź').map((part, i) => (
                  <span key={i}>
                    {part}
                    {i === 0 && <span className="text-purple-400 font-semibold">{t.highlight}</span>}
                  </span>
                ))}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <feature.icon className="w-6 h-6 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
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
              <div className="glass-dark rounded-2xl p-8 relative overflow-hidden">
                <div className="aspect-[3/4] bg-gradient-to-br from-purple-900 to-blue-900 rounded-xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                    <Zap className="w-16 h-16 text-purple-400 mb-4" />
                    <h2 className="text-3xl font-bold text-white mb-2">AUTOMATYZACJA</h2>
                    <p className="text-lg text-gray-300 mb-4">{isPL ? 'dla lokalnych firm' : 'for local business'}</p>
                    <div className="w-20 h-0.5 bg-white/50 mb-4" />
                    <p className="text-sm text-gray-400">{isPL ? 'Kompletny przewodnik' : 'Complete guide'}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">45</div>
                    <div className="text-xs text-gray-400">{isPL ? 'stron' : 'pages'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">5</div>
                    <div className="text-xs text-gray-400">{isPL ? 'automatyzacji' : 'automations'}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">20+</div>
                    <div className="text-xs text-gray-400">{isPL ? 'szablonów' : 'templates'}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.whatYouGet}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {t.automations.map((automation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-dark rounded-xl p-6"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-purple-400 font-bold text-xl">{index + 1}</span>
                </div>
                <p className="text-white font-medium">{automation}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-xl p-6"
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
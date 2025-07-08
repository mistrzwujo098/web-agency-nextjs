'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, BookOpen, Target, TrendingUp, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function Download10BledowPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('downloads.mistakes10')
  
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

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
          resource: '10-bledow-poradnik'
        }),
      })

      if (response.ok) {
        setShowForm(false)
        setTimeout(() => {
          window.location.href = `/${locale}/thank-you/download?resource=${encodeURIComponent(t('title'))}`
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
                  {t('badge')}
                </span>
                <span className="text-gray-400">{t('format')}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('title')}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {t('subtitle')}
                <span className="text-purple-400 font-semibold">{t('highlight')}</span>.
              </p>

              {/* Benefits */}
              <div className="space-y-4 mb-8">
                {t.raw('benefits').map((benefit: any, index: number) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
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
                    {t('form.title')}
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('form.emailPlaceholder')}
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
                          {t('form.submitting')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          {t('form.submitButton')}
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {t('form.disclaimer')}
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
                    {t('form.successTitle')}
                  </h3>
                  <p className="text-gray-400">
                    {t('form.successMessage')}
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
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {t('mockup.title')}
                    </h2>
                    <p className="text-lg text-gray-300 mb-4">
                      {t('mockup.subtitle')}
                    </p>
                    <div className="w-20 h-0.5 bg-white/50 mb-4" />
                    <p className="text-sm text-gray-400">
                      {t('mockup.description')}
                    </p>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {t.raw('stats').map((stat: any, index: number) => (
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
              {t('content.whatInside')}
            </h2>
            <p className="text-xl text-gray-300">
              {t('content.insideDescription')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {t.raw('mistakes').map((mistake: string, index: number) => (
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
                    {t('content.mistakeDescription')}
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
              {t('socialProof')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.raw('testimonials').map((testimonial: any, index: number) => (
                <div key={index} className="glass-dark rounded-xl p-6">
                  <div className="flex justify-center mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 mb-3">
                    "{testimonial.text}"
                  </p>
                  <p className="text-sm text-gray-500">
                    - {testimonial.author}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
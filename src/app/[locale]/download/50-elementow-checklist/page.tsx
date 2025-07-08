'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, CheckSquare, Zap, TrendingUp, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function Download50ElementowPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('downloads.checklist50')
  
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
          resource: '50-elementow-checklist'
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
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {t('badge')}
                </span>
                <span className="text-gray-400">{t('format')}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('title')}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {t('subtitle')}
                <span className="text-green-400 font-semibold">{t('highlight')}</span>.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.raw('features').map((feature: any, index: number) => (
                  <div key={index} className="flex items-center gap-3">
                    {index === 0 && <CheckSquare className="w-6 h-6 text-green-400 flex-shrink-0" />}
                    {index === 1 && <Zap className="w-6 h-6 text-green-400 flex-shrink-0" />}
                    {index === 2 && <TrendingUp className="w-6 h-6 text-green-400 flex-shrink-0" />}
                    {index === 3 && <Star className="w-6 h-6 text-green-400 flex-shrink-0" />}
                    <span className="text-white">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Tool Options */}
              <div className="space-y-4">
                {/* Online Tool Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-dark rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t('onlineTool.title')}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {t('onlineTool.description')}
                  </p>
                  <Button
                    onClick={() => window.location.href = `/${locale}/tools/conversion-checklist`}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
                  >
                    <span className="flex items-center gap-2">
                      <CheckSquare className="w-5 h-5" />
                      {t('onlineTool.button')}
                    </span>
                  </Button>
                </motion.div>

                {/* Download Form */}
                {showForm ? (
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleSubmit}
                    className="glass-dark rounded-2xl p-6"
                  >
                    <h3 className="text-lg font-semibold text-white mb-4">
                      {t('pdfDownload.title')}
                    </h3>
                    <div className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('form.emailPlaceholder')}
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
                    <p className="text-gray-400">{t('form.successMessage')}</p>
                  </motion.div>
                )}
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-8">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{t.raw('stats')[0].value}</span>
                  <span className="text-gray-400 text-sm">{t.raw('stats')[0].label}</span>
                </div>
                <div className="w-px h-8 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-white">{t.raw('stats')[1].value}</span>
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
                        {t('mockup.title')}
                      </h2>
                      <p className="text-gray-600">
                        {t('mockup.subtitle')}
                      </p>
                    </div>
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <CheckSquare className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Category Preview */}
                  <div className="space-y-3">
                    {t.raw('categories').map((category: any, index: number) => (
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
                          {category.count} {t('content.pointsLabel')}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Sample Checklist Items */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <p className="text-xs text-gray-500 mb-3">
                      {t('content.sampleItemsLabel')}
                    </p>
                    <div className="space-y-2">
                      {t.raw('content.sampleItems').map((item: string, index: number) => (
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
              {t('content.howToUse')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.raw('content.steps').map((step: any, index: number) => (
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
              {t('cta.title')}
            </h2>
            <p className="text-gray-300 mb-8">
              {t('cta.description')}
            </p>
            <Button
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => window.location.href = `/${locale}/free-analysis`}
            >
              {t('cta.button')}
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
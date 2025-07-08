'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import debounce from 'lodash.debounce'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

export function ContactForm() {
  const t = useTranslations('contact')
  const params = useParams()
  const locale = params.locale as string
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const services = [
    t('form.services.website'),
    t('form.services.redesign'),
    t('form.services.ecommerce'),
    t('form.services.seo'),
    t('form.services.audit'),
    t('form.services.other')
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Debounced submit handler to prevent multiple submissions
  const debouncedSubmit = useCallback(
    debounce(async () => {
      if (isSubmitting) return
      
      setIsSubmitting(true)
      setSubmitStatus('idle')
      
      try {
      const response = await fetch('/api/forms/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
      
      // Redirect to thank you page after 2 seconds
      setTimeout(() => {
        window.location.href = `/${locale}/thank-you/contact`
      }, 2000)
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
    }, 1000),
    [formData, isSubmitting, locale]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    debouncedSubmit()
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="glass-dark rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                {t('contactInfo.title')}
              </h3>
              
              <div className="space-y-4">
                <a href="https://wa.me/48662508780" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/30 transition-colors">
                    <Phone className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{t('info.phone')}</p>
                    <p className="text-white font-medium">+48 662 508 780</p>
                  </div>
                </a>
                
                <a href="mailto:kontakt@kacperczaczyk.com" className="flex items-start gap-4 group">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{t('info.email')}</p>
                    <p className="text-white font-medium">kontakt@kacperczaczyk.com</p>
                  </div>
                </a>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{t('info.office')}</p>
                    <p className="text-white font-medium">ul. Innowacyjna 10<br />00-001 Warszawa</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">{t('info.hours')}</p>
                    <p className="text-white font-medium">Pon-Pt: 9-17</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Benefits */}
            <div className="glass-dark rounded-2xl p-8">
              <h4 className="text-lg font-semibold text-white mb-4">
                {t('benefits.title')}
              </h4>
              <ul className="space-y-3 text-gray-300">
                {t.raw('benefits.items').map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit} className="glass-dark rounded-2xl p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder={t('form.placeholders.name')}
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder={t('form.placeholders.email')}
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder={t('form.placeholders.phone')}
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                    {t('form.company')}
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 text-base bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder={t('form.placeholders.company')}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('form.service')} *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 text-base bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                >
                  <option value="" className="bg-gray-900">{t('form.selectService')}</option>
                  {services.map(service => (
                    <option key={service} value={service} className="bg-gray-900">
                      {service}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  {t('form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>
              
              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{t('form.successMessage')}</span>
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400"
                >
                  <AlertCircle className="w-5 h-5" />
                  <span>{t('form.errorMessage')}</span>
                </motion.div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-sm text-gray-400">
                  {t('form.required')}
                </p>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('form.submitting')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {t('form.submit')}
                      <Send className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 text-center">
                {t('form.gdpr')}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
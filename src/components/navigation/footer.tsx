'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  const t = useTranslations('footer')
  const params = useParams()
  const locale = params.locale as string
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const footerLinks = {
    services: [
      { name: t('links.items.webDevelopment'), href: '#web-development' },
      { name: t('links.items.ecommerce'), href: '#ecommerce' },
      { name: t('links.items.seo'), href: '#seo' },
      { name: t('links.items.automation'), href: '#automation' }
    ],
    company: [
      { name: t('links.items.aboutUs'), href: '#about' },
      { name: t('links.items.portfolio'), href: '#portfolio' },
      { name: t('links.items.contact'), href: '#contact' }
    ],
    resources: [
      { name: t('links.items.10mistakes'), href: `/${locale}/download/10-bledow-poradnik` },
      { name: t('links.items.50elements'), href: `/${locale}/download/50-elementow-checklist` },
      { name: t('links.items.localSeoGuide'), href: `/${locale}/download/seo-local-guide` },
      { name: t('links.items.marketingAutomation'), href: `/${locale}/download/marketing-automation-guide` },
      { name: t('links.items.launchChecklist'), href: `/${locale}/download/website-launch-checklist` },
      { name: t('links.items.roiCalculator'), href: `/${locale}/tools/roi-calculator` }
    ],
    legal: []
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' }
  ]

  return (
    <footer className="bg-gray-950 border-t border-white/10">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('newsletter.title')}
            </h3>
            <p className="text-gray-400 mb-8">
              {t('newsletter.description')}
            </p>
            
            <form 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              onSubmit={async (e) => {
                e.preventDefault()
                setIsSubmitting(true)
                try {
                  const response = await fetch('/api/forms/newsletter', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                  })
                  
                  if (response.ok) {
                    window.location.href = `/${locale}/thank-you/newsletter`
                  }
                } catch (error) {
                  console.error('Newsletter subscription error:', error)
                } finally {
                  setIsSubmitting(false)
                }
              }}
            >
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 disabled:opacity-50"
              >
                {isSubmitting ? t('newsletter.submitting') : t('newsletter.button')}
              </Button>
            </form>
            
            <p className="text-sm text-gray-500 mt-4">
              {t('newsletter.disclaimer')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
                <span className="text-white font-bold text-2xl">W</span>
              </div>
              <span className="text-white font-bold text-2xl">
                WebCraft<span className="text-gradient">AI</span>
              </span>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-xs">
              {t('company.description')}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="https://wa.me/48662508780" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-purple-500" />
                <span>+48 662 508 780</span>
              </a>
              <a href="mailto:kontakt@kacperczaczyk.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-purple-500" />
                <span>kontakt@kacperczaczyk.com</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <span>{t('company.address')}<br />{t('company.city')}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="w-5 h-5 text-purple-500" />
                <span>{t('company.hours')}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('links.services')}</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('links.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">{t('links.resources')}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowRight className="w-3 h-3 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">92%</div>
              <div className="text-sm text-gray-400">{t('stats.satisfaction')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">237</div>
              <div className="text-sm text-gray-400">{t('stats.projects')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">+34%</div>
              <div className="text-sm text-gray-400">{t('stats.conversion')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">24h</div>
              <div className="text-sm text-gray-400">{t('stats.support')}</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © {currentYear} WebCraftAI. {t('copyright')}
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>{t('vat')}: 123-456-78-90</span>
              <span>{locale === 'pl' ? 'REGON' : 'Company ID'}: 123456789</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
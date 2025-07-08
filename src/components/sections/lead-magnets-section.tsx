'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Download, FileText, Calculator, Search, Zap, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function LeadMagnetsSection() {
  const t = useTranslations()
  const params = useParams()
  const locale = params.locale as string

  const leadMagnets = [
    {
      icon: FileText,
      color: 'from-red-500 to-pink-500',
      title: locale === 'pl' 
        ? '10 błędów = -70% klientów' 
        : '10 mistakes = -70% customers',
      description: locale === 'pl'
        ? 'Zobacz które błędy kosztują Cię najwięcej'
        : 'See which mistakes cost you the most',
      downloads: '2137',
      href: `/${locale}/download/10-bledow-poradnik`
    },
    {
      icon: CheckSquare,
      color: 'from-green-500 to-emerald-500',
      title: locale === 'pl'
        ? '50 elementów które sprzedają'
        : '50 elements that sell',
      description: locale === 'pl'
        ? 'Checklist do analizy swojej strony'
        : 'Checklist to analyze your website',
      downloads: '5312',
      href: `/${locale}/download/50-elementow-checklist`
    },
    {
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      title: locale === 'pl'
        ? 'Bądź #1 w Google lokalnie'
        : 'Be #1 on Google locally',
      description: locale === 'pl'
        ? 'Wyprzedź konkurencję w swojej okolicy'
        : 'Beat competition in your area',
      downloads: '3127',
      href: `/${locale}/download/seo-local-guide`
    },
    {
      icon: Zap,
      color: 'from-purple-500 to-indigo-500',
      title: locale === 'pl'
        ? 'Automatyzacja = +28% sprzedaży'
        : 'Automation = +28% sales',
      description: locale === 'pl'
        ? 'Niech strona sprzedaje 24/7'
        : 'Let your site sell 24/7',
      downloads: '3521',
      href: `/${locale}/download/marketing-automation-guide`
    },
    {
      icon: CheckSquare,
      color: 'from-orange-500 to-red-500',
      title: locale === 'pl'
        ? '87 rzeczy przed startem'
        : '87 things before launch',
      description: locale === 'pl'
        ? 'Żeby nie było wpadki jak u konkurencji'
        : 'So you don\'t embarrass yourself',
      downloads: '2187',
      href: `/${locale}/download/website-launch-checklist`
    },
    {
      icon: Calculator,
      color: 'from-indigo-500 to-purple-500',
      title: locale === 'pl'
        ? 'Policz ROI swojej strony'
        : 'Calculate your website ROI',
      description: locale === 'pl'
        ? 'Zobacz ile tracisz miesięcznie'
        : 'See how much you lose monthly',
      downloads: '1893',
      href: `/${locale}/download/roi-calculator`
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {locale === 'pl' 
              ? 'Weź darmowe materiały. Bez ściemy.'
              : 'Get free resources. No BS.'}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {locale === 'pl'
              ? 'Pobrane już 19 874 razy. Średni wynik po wdrożeniu: +34% leadów.'
              : 'Downloaded 19,874 times. Average result after implementation: +34% leads.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leadMagnets.map((magnet, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={magnet.href} className="block h-full">
                <div className="glass-dark rounded-2xl p-6 h-full hover:scale-105 transition-all duration-300 hover:border-purple-500/50 border border-transparent group">
                  <div className={`w-14 h-14 bg-gradient-to-br ${magnet.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <magnet.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">
                    {magnet.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {magnet.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Download className="w-4 h-4" />
                      <span>{magnet.downloads} {locale === 'pl' ? 'pobrań' : 'downloads'}</span>
                    </div>
                    <Button 
                      variant="link" 
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                    >
                      {locale === 'pl' ? 'Pobierz →' : 'Download →'}
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-6">
            {locale === 'pl'
              ? '💡 Każdy materiał = konkretne działania które możesz wdrożyć od razu'
              : '💡 Each resource = specific actions you can implement right away'}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
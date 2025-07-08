'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Download, FileText, Calculator, Search, Zap, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function LeadMagnetsSection() {
  const t = useTranslations('leadMagnets')
  const params = useParams()
  const locale = params.locale as string

  const leadMagnets = [
    {
      icon: FileText,
      color: 'from-red-500 to-pink-500',
      downloads: '2137',
      href: `/${locale}/download/10-bledow-poradnik`,
      itemIndex: 0
    },
    {
      icon: CheckSquare,
      color: 'from-green-500 to-emerald-500',
      downloads: '5312',
      href: `/${locale}/download/50-elementow-checklist`,
      itemIndex: 1
    },
    {
      icon: Search,
      color: 'from-blue-500 to-cyan-500',
      downloads: '3127',
      href: `/${locale}/download/seo-local-guide`,
      itemIndex: 2
    },
    {
      icon: Zap,
      color: 'from-purple-500 to-indigo-500',
      downloads: '3521',
      href: `/${locale}/download/marketing-automation-guide`,
      itemIndex: 3
    },
    {
      icon: CheckSquare,
      color: 'from-orange-500 to-red-500',
      downloads: '2187',
      href: `/${locale}/download/website-launch-checklist`,
      itemIndex: 4
    },
    {
      icon: Calculator,
      color: 'from-indigo-500 to-purple-500',
      downloads: '1893',
      href: `/${locale}/download/roi-calculator`,
      itemIndex: 5
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
            {t('title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
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
                    {t(`items.${magnet.itemIndex}.title`)}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {t(`items.${magnet.itemIndex}.description`)}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Download className="w-4 h-4" />
                      <span>{magnet.downloads} {t('downloads')}</span>
                    </div>
                    <Button 
                      variant="link" 
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                    >
                      {t('downloadButton')}
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
          <p className="text-lg text-gray-300 mb-2">{t('footer.title')}</p>
          <p className="text-2xl font-bold text-white">{t('footer.subtitle')}</p>
        </motion.div>
      </div>
    </section>
  )
}
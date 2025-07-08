'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('notFound')

  const links = [
    { name: t('links.home'), href: '/' },
    { name: t('links.resources'), href: '/#resources' },
    { name: t('links.portfolio'), href: '/#portfolio' },
    { name: t('links.contact'), href: '/#contact' }
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 404 Animation */}
          <div className="mb-8">
            <motion.h1 
              className="text-9xl font-bold text-gradient"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: 'linear-gradient(to right, #a855f7, #3b82f6, #a855f7)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('title')}
            </motion.h1>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('subtitle')}
          </h2>
          
          <p className="text-xl text-gray-400 mb-8">
            {t('description')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href={`/${locale}`}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('backButton')}
              </Button>
            </Link>
            
            <Link href={`/${locale}#contact`}>
              <Button variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10">
                {t('contactButton')}
              </Button>
            </Link>
          </div>

          {/* Popular Pages */}
          <div className="glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-4">{t('popularPages')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={`/${locale}${link.href}`}
                  className="p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 text-gray-300 hover:text-white flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <ArrowLeft className="w-4 h-4 rotate-180 opacity-0 group-hover:opacity-100 transition-all duration-200" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
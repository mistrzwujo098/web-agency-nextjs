'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export function TrustSection() {
  const t = useTranslations('trust')

  const stats = [
    {
      key: 'revenue',
      value: t('stats.revenue.value'),
      label: t('stats.revenue.label'),
    },
    {
      key: 'time',
      value: t('stats.time.value'),
      label: t('stats.time.label'),
    },
    {
      key: 'retention',
      value: t('stats.retention.value'),
      label: t('stats.retention.label'),
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="bg-gray-100 rounded-lg p-8">
          <p className="text-center text-gray-500 mb-4">Zaufali nam:</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {/* Logo placeholder - będzie można dodać rzeczywiste loga klientów */}
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-32 h-12 bg-gray-300 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
'use client'

import { useTranslations } from 'next-intl'
import { Shield, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export function GuaranteeSection() {
  const t = useTranslations('guarantee')

  const features = [
    {
      title: t('features.0.title'),
      description: t('features.0.description'),
    },
    {
      title: t('features.1.title'),
      description: t('features.1.description'),
    },
    {
      title: t('features.2.title'),
      description: t('features.2.description'),
    },
    {
      title: t('features.3.title'),
      description: t('features.3.description'),
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start space-x-4 bg-white p-6 rounded-lg"
            >
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-block bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-2">Przykład umowy z zamazanymi danymi</p>
            <div className="w-64 h-48 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-gray-400">Podgląd umowy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
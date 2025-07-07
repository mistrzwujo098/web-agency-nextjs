'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Download, Clock, MousePointer, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function EducationSection() {
  const t = useTranslations('education')

  const reasons = [
    {
      icon: Clock,
      title: t('reasons.0.title'),
      subtitle: t('reasons.0.subtitle'),
      description: t('reasons.0.description'),
    },
    {
      icon: MousePointer,
      title: t('reasons.1.title'),
      description: t('reasons.1.description'),
    },
    {
      icon: Users,
      title: t('reasons.2.title'),
      description: t('reasons.2.description'),
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <div className="mb-4">
                <reason.icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {reason.title}
                {reason.subtitle && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    {reason.subtitle}
                  </span>
                )}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <Button size="lg" className="text-base">
            <Download className="mr-2 h-4 w-4" />
            {t('cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
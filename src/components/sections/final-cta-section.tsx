'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Phone, TrendingDown, DollarSign, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export function FinalCTASection() {
  const t = useTranslations('finalCta')

  const facts = [
    {
      icon: TrendingDown,
      text: t('facts.0'),
    },
    {
      icon: DollarSign,
      text: t('facts.1'),
    },
    {
      icon: Clock,
      text: t('facts.2'),
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-primary text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {t('title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-3"
              >
                <fact.icon className="h-6 w-6 flex-shrink-0 mt-1" />
                <p className="text-left">{fact.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" variant="secondary" className="text-base px-8 py-6">
              {t('primary')}
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-transparent text-white border-white hover:bg-white hover:text-primary">
              <Phone className="mr-2 h-4 w-4" />
              {t('secondary')}
            </Button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm opacity-90"
          >
            <strong>PS:</strong> {t('ps')}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
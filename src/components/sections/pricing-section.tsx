'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

export function PricingSection() {
  const t = useTranslations('pricing')

  const plans = [
    {
      name: t('plans.0.name'),
      price: t('plans.0.price'),
      features: [
        t('plans.0.features.0'),
        t('plans.0.features.1'),
        t('plans.0.features.2'),
      ],
      cta: t('plans.0.cta'),
      variant: 'outline' as const,
    },
    {
      name: t('plans.1.name'),
      price: t('plans.1.price'),
      badge: t('plans.1.badge'),
      features: [
        t('plans.1.features.0'),
        t('plans.1.features.1'),
        t('plans.1.features.2'),
      ],
      cta: t('plans.1.cta'),
      variant: 'default' as const,
      popular: true,
    },
    {
      name: t('plans.2.name'),
      price: t('plans.2.price'),
      features: [
        t('plans.2.features.0'),
        t('plans.2.features.1'),
        t('plans.2.features.2'),
      ],
      cta: t('plans.2.cta'),
      variant: 'outline' as const,
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-lg p-8 ${
                plan.popular
                  ? 'bg-primary text-white shadow-xl scale-105'
                  : 'bg-gray-50'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-4 py-1 rounded-full text-sm font-medium">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <div className={`text-3xl font-bold ${
                  plan.popular ? 'text-white' : 'text-primary'
                }`}>
                  {plan.price}
                </div>
              </div>

              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className={`h-5 w-5 mr-2 flex-shrink-0 ${
                      plan.popular ? 'text-white' : 'text-green-500'
                    }`} />
                    <span className={plan.popular ? 'text-white' : 'text-gray-600'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? 'secondary' : 'default'}
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
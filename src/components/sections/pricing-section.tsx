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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-purple-900/10 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-purple-600/10 animate-pulse" />
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
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
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl p-8 transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-2xl scale-105 border-2 border-purple-400'
                  : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                  {plan.badge}
                </div>
              )}
              
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${
                  plan.popular ? 'text-white' : 'text-white'
                }`}>
                  {plan.name}
                </h3>
                <div className={`text-3xl font-bold ${
                  plan.popular ? 'text-white' : 'text-purple-400'
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
                    <span className={plan.popular ? 'text-white' : 'text-gray-300'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'bg-white text-purple-600 hover:bg-gray-100' 
                    : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0'
                }`}
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
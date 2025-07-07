'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function TeamSection() {
  const t = useTranslations('team')

  const team = [
    {
      name: 'Jan Nowak',
      role: '12 lat w UX, ex-Google',
      image: '/api/placeholder/200/200',
    },
    {
      name: 'Anna Wiśniewska',
      role: 'Copywriter, 340+ landing pages',
      image: '/api/placeholder/200/200',
    },
    {
      name: 'Piotr Lewandowski',
      role: 'Dev, Core Web Vitals ninja',
      image: '/api/placeholder/200/200',
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
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              {/* Placeholder dla zdjęcia */}
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Zdjęcie</span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center bg-gray-50 rounded-lg p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Nasza historia
          </h3>
          <p className="text-gray-600 mb-4">
            {t('story')}
          </p>
          <a
            href="#"
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
          >
            {t('cta')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
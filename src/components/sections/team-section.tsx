'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export function TeamSection() {
  const t = useTranslations('team')

  const team = [
    {
      name: 'Kacper Czaczyk',
      role: 'CEO & Lead Developer',
      image: '/images/author/kacper-czaczyk.webp',
      description: 'Specjalista od CRO i tworzenia stron, które sprzedają'
    }
  ]

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
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

        <div className="max-w-2xl mx-auto mb-12">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-lg text-gray-600 mb-3">
                {member.role}
              </p>
              <p className="text-gray-500 max-w-md mx-auto">
                {member.description}
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
          <button
            className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {t('cta')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
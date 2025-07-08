'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight, TrendingUp, Clock, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export function PortfolioSection() {
  const t = useTranslations('portfolio')

  const projects = [
    {
      name: 'AIZEN Platform',
      improvement: '+73% konwersji',
      icon: TrendingUp,
      image: '/images/portfolio/aizen-website.png',
      description: 'Platforma edukacyjna z zaawansowaną automatyzacją'
    },
    {
      name: 'E-commerce Fashion',
      improvement: '+54% sprzedaży',
      icon: TrendingUp,
      image: '/images/portfolio/sp11.webp',
      description: 'Sklep internetowy z optymalizacją konwersji'
    },
    {
      name: 'Analytics Dashboard',
      improvement: '-3.2s czasu ładowania',
      icon: Clock,
      image: '/images/portfolio/sp10.webp',
      description: 'Panel analityczny z real-time data'
    },
  ]

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-gray-50">
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
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-full h-48 bg-gray-200 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {project.description}
                </p>
                <div className="flex items-center text-green-600">
                  <project.icon className="h-5 w-5 mr-2" />
                  <span className="font-medium">{project.improvement}</span>
                </div>
              </div>
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
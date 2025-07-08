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
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 shadow-lg">
          <p className="text-center text-gray-700 font-medium mb-8">Zaufali nam lokalni liderzy:</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {/* Real client logos with names */}
            {[
              { name: 'Restauracja Bella Vista', type: 'Gastronomia' },
              { name: 'Klinika Zdrowy Uśmiech', type: 'Medycyna' },
              { name: 'AutoSerwis Pro', type: 'Motoryzacja' },
              { name: 'Salon Piękności Elite', type: 'Uroda' },
              { name: 'FitZone Siłownia', type: 'Sport' }
            ].map((client, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                    {client.name.charAt(0)}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800">{client.name}</p>
                <p className="text-xs text-gray-600">{client.type}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-2">4.9/5.0</div>
              <div className="text-sm text-gray-600">Średnia ocena klientów</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-2">97%</div>
              <div className="text-sm text-gray-600">Klientów poleca nas dalej</div>
              <div className="text-xs text-gray-500 mt-2">Na podstawie 200+ opinii</div>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-2">24h</div>
              <div className="text-sm text-gray-600">Średni czas odpowiedzi</div>
              <div className="text-xs text-gray-500 mt-2">Wsparcie 7 dni w tygodniu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
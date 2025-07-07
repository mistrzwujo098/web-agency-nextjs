'use client'

import { useTranslations } from 'next-intl'
import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

export function TestimonialsSection() {
  const t = useTranslations('testimonials')

  // Placeholder dane - w prawdziwej aplikacji byłyby pobierane z API
  const testimonials = [
    {
      content: "Sceptycznie podchodziłem do obietnicy +30%. Dostali +47% w 6 tygodni. ROI 412%.",
      author: "Marek Kowalski",
      position: "CEO AutoParts24",
      metrics: {
        before: { cr: "1,9%", leads: "23" },
        after: { cr: "2,8%", leads: "34" },
        roi: "6 tygodni"
      }
    },
    {
      content: "Najlepsza inwestycja w rozwój firmy. Strona ładuje się błyskawicznie, klienci dzwonią non-stop.",
      author: "Anna Wiśniewska",
      position: "Właścicielka Kliniki Urody",
      metrics: {
        before: { cr: "0,8%", leads: "12" },
        after: { cr: "2,1%", leads: "31" },
        roi: "8 tygodni"
      }
    },
    {
      content: "Profesjonalne podejście od początku do końca. Dotrzymali wszystkich obietnic i terminów.",
      author: "Piotr Nowak",
      position: "Dyrektor TechnoSerwis",
      metrics: {
        before: { cr: "1,2%", leads: "18" },
        after: { cr: "1,9%", leads: "29" },
        roi: "10 tygodni"
      }
    }
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <div className="mb-4">
                <Quote className="h-8 w-8 text-gray-300" />
              </div>
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>

              <div className="mb-4">
                <div className="font-semibold text-gray-900">{testimonial.author}</div>
                <div className="text-sm text-gray-600">{testimonial.position}</div>
              </div>

              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Przed:</span>
                  <span className="text-gray-900">CR: {testimonial.metrics.before.cr}, {testimonial.metrics.before.leads} leadów/msc</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Po:</span>
                  <span className="text-green-600 font-medium">CR: {testimonial.metrics.after.cr}, {testimonial.metrics.after.leads} leadów/msc</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Zwrot inwestycji:</span>
                  <span className="text-gray-900 font-medium">{testimonial.metrics.roi}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
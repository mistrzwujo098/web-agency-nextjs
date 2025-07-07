'use client'

import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function FAQSection() {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "Skąd pewność, że u mnie zadziała?",
      answer: "Nie ma. Dlatego zaczynamy od darmowego audytu. Jeśli nie znajdziemy potencjału na +30%, powiemy wprost. Na 237 audytów, tylko 19 razy stwierdziliśmy brak potencjału."
    },
    {
      question: "Co jeśli moja branża jest specyficzna?",
      answer: "Pracowaliśmy już z 27 różnymi branżami - od e-commerce po usługi medyczne. Każda branża ma swoją specyfikę, ale zasady UX i konwersji są uniwersalne."
    },
    {
      question: "Ile to naprawdę kosztuje?",
      answer: "Audyt: 0 zł. Test A/B: 990 zł. Pełny redesign: 4900 zł (lub 2x2450 zł). Brak ukrytych kosztów. Wszystko transparentnie w umowie."
    },
    {
      question: "Jak długo trwa wdrożenie?",
      answer: "Audyt: 48h. Test A/B: 14 dni. Pełny redesign: 14-21 dni w zależności od złożoności. Zawsze dotrzymujemy terminów."
    },
    {
      question: "Co jeśli nie będę zadowolony?",
      answer: "Masz 30 dni na test. Jeśli nie osiągniemy obiecanych wyników, zwracamy 100% kosztów. Zero ryzyka."
    },
    {
      question: "Czy mogę najpierw zobaczyć przykłady?",
      answer: "Oczywiście! Mamy portfolio 48 projektów z dokładnymi wynikami przed/po. Pokażemy case studies z Twojej branży."
    },
    {
      question: "Kto będzie pracował nad moją stroną?",
      answer: "Dedykowany zespół 3 osób: UX designer, copywriter i developer. Poznasz ich przed rozpoczęciem projektu."
    }
  ]

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
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

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white rounded-lg shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-medium text-gray-900">{faq.question}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
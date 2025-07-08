'use client'

import { useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  MessageSquare, 
  Search, 
  Palette, 
  Code, 
  Rocket, 
  BarChart,
  CheckCircle 
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProcessTimeline() {
  const t = useTranslations('processTimeline')
  const timelineRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      icon: MessageSquare,
      title: 'Konsultacja',
      duration: '1 dzień',
      description: 'Poznajemy Twoje cele biznesowe i analizujemy konkurencję',
      deliverables: ['Analiza potrzeb', 'Określenie celów', 'Wstępna wycena']
    },
    {
      icon: Search,
      title: 'Audyt & Strategia',
      duration: '2-3 dni',
      description: 'Kompleksowy audyt obecnej strony i plan działania',
      deliverables: ['Raport UX/UI', 'Analiza konkurencji', 'Strategia konwersji']
    },
    {
      icon: Palette,
      title: 'Projekt',
      duration: '5-7 dni',
      description: 'Tworzenie mockupów i prototypów nowej strony',
      deliverables: ['Wireframe', 'Projekt graficzny', 'Prototyp interaktywny']
    },
    {
      icon: Code,
      title: 'Wdrożenie',
      duration: '7-10 dni',
      description: 'Kodowanie i implementacja wszystkich funkcjonalności',
      deliverables: ['Responsywna strona', 'Integracje', 'Panel CMS']
    },
    {
      icon: Rocket,
      title: 'Launch',
      duration: '1 dzień',
      description: 'Publikacja strony i konfiguracja wszystkich narzędzi',
      deliverables: ['Hosting', 'SSL', 'Konfiguracja domen']
    },
    {
      icon: BarChart,
      title: 'Optymalizacja',
      duration: 'Ciągła',
      description: 'Monitorowanie wyników i ciągłe ulepszanie',
      deliverables: ['Raporty miesięczne', 'A/B testy', 'Optymalizacja']
    }
  ]

  useEffect(() => {
    if (!timelineRef.current || !progressRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timelineRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    })

    tl.to(progressRef.current, {
      height: '100%',
      ease: 'none'
    })

    // Animate step appearances
    steps.forEach((_, index) => {
      gsap.fromTo(
        `.timeline-step-${index}`,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: `.timeline-step-${index}`,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [steps])

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Proces, który przynosi rezultaty
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Od pierwszego kontaktu do działającej strony w 14 dni
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/20 transform md:-translate-x-1/2">
            <div 
              ref={progressRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-purple-600 to-blue-600"
              style={{ height: '0%' }}
            />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`timeline-step-${index} relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 ml-20 md:ml-0 border border-white/20"
                  >
                    <div className={`flex items-center gap-4 mb-4 ${
                      index % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <span className="text-sm text-purple-400">{step.duration}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{step.description}</p>
                    <div className="space-y-2">
                      {step.deliverables.map((item, i) => (
                        <div key={i} className={`flex items-center gap-2 text-sm text-gray-400 ${
                          index % 2 === 0 ? 'md:flex-row-reverse' : ''
                        }`}>
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 z-10">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75" />
                </div>

                {/* Empty Space for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Gotowa strona w 14 dni roboczych
            </h3>
            <p className="text-white/90 mb-6">
              Nie musisz czekać miesiącami na swoją nową stronę. Nasz sprawdzony proces 
              gwarantuje terminową realizację bez kompromisów w jakości.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-white">
              <div>
                <div className="text-3xl font-bold">100%</div>
                <div className="text-sm opacity-90">Terminowość</div>
              </div>
              <div>
                <div className="text-3xl font-bold">14 dni</div>
                <div className="text-sm opacity-90">Średni czas</div>
              </div>
              <div>
                <div className="text-3xl font-bold">30+</div>
                <div className="text-sm opacity-90">Checkpointów</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
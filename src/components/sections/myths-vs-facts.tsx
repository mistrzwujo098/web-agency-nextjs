'use client'

import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { X, CheckCircle2, AlertCircle } from 'lucide-react'

export function MythsVsFacts() {
  const t = useTranslations('mythsFacts')
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const mythsAndFacts = [
    {
      myth: 'Wystarczy ładna strona, żeby przyciągnąć klientów',
      fact: 'Sama estetyka to za mało. Strona musi być szybka, intuicyjna i zoptymalizowana pod kątem konwersji. 94% pierwszych wrażeń dotyczy designu, ale 88% użytkowników nie wraca na stronę po złym doświadczeniu.',
      icon: '🎨'
    },
    {
      myth: 'Tańsza strona = większy zysk',
      fact: 'Tania strona często oznacza brak optymalizacji, wolne ładowanie i niską konwersję. Profesjonalna strona to inwestycja, która zwraca się średnio w 3-6 miesięcy dzięki większej liczbie leadów.',
      icon: '💰'
    },
    {
      myth: 'Wystarczy strona "wizytówka" dla małej firmy',
      fact: 'Nawet mała firma potrzebuje strony, która aktywnie pozyskuje klientów. Strona wizytówka to stracona szansa - 75% użytkowników ocenia wiarygodność firmy po jej stronie internetowej.',
      icon: '🏢'
    },
    {
      myth: 'SEO to oszustwo, nie działa',
      fact: 'SEO to długoterminowa strategia. 68% doświadczeń online zaczyna się od wyszukiwarki. Firmy na pierwszej stronie Google otrzymują 91.5% całego ruchu.',
      icon: '🔍'
    },
    {
      myth: 'Responsywność to dodatek, nie konieczność',
      fact: '60% wyszukiwań pochodzi z urządzeń mobilnych. Google karze strony nieresponsywne niższymi pozycjami. Mobilni użytkownicy 5x częściej opuszczają stronę niedostosowaną do ich urządzenia.',
      icon: '📱'
    },
    {
      myth: 'Raz zrobiona strona wystarczy na lata',
      fact: 'Technologie i oczekiwania użytkowników ciągle się zmieniają. Strona nieaktualizowana od 2-3 lat traci średnio 40% potencjalnych klientów przez przestarzałe rozwiązania.',
      icon: '🔄'
    }
  ]

  const handleCardFlip = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )

    // GSAP animation for flip effect
    if (cardRefs.current[index]) {
      gsap.to(cardRefs.current[index], {
        rotationY: flippedCards.includes(index) ? 0 : 180,
        duration: 0.6,
        ease: "power2.inOut"
      })
    }
  }

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239333ea' fill-opacity='0.4'%3E%3Cpath d='M50 5L61.8 38.2L95 50L61.8 61.8L50 95L38.2 61.8L5 50L38.2 38.2z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '100px 100px'
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Mity vs Fakty</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Kliknij kartę, aby odkryć prawdę o popularnych mitach
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mythsAndFacts.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-80 cursor-pointer"
              onClick={() => handleCardFlip(index)}
            >
              <div 
                ref={el => {cardRefs.current[index] = el}}
                className="absolute inset-0 w-full h-full transition-transform duration-600 preserve-3d"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front - Myth */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl ${
                    flippedCards.includes(index) ? 'pointer-events-none' : ''
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="h-full bg-gradient-to-br from-red-950/50 to-red-900/30 backdrop-blur-md border border-red-500/40 rounded-3xl p-6 flex flex-col shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{item.icon}</span>
                      <div className="w-8 h-8 bg-red-500/30 rounded-full flex items-center justify-center">
                        <X className="w-5 h-5 text-red-400" />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-semibold">MIT</span>
                      </div>
                      <h3 className="text-xl font-bold text-white">
                        {item.myth}
                      </h3>
                    </div>
                    <div className="text-center text-sm text-gray-400 mt-4">
                      Kliknij, aby poznać prawdę →
                    </div>
                  </div>
                </div>

                {/* Back - Fact */}
                <div 
                  className={`absolute inset-0 w-full h-full backface-hidden rounded-2xl ${
                    !flippedCards.includes(index) ? 'pointer-events-none' : ''
                  }`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <div className="h-full bg-gradient-to-br from-green-950/50 to-green-900/30 backdrop-blur-md border border-green-500/40 rounded-3xl p-6 flex flex-col shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{item.icon}</span>
                      <div className="w-8 h-8 bg-green-500/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">FAKT</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {item.fact}
                      </p>
                    </div>
                    <div className="text-center text-sm text-gray-400 mt-4">
                      ← Kliknij, aby wrócić
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-gray-300 mb-6">
            Nie pozwól, aby mity kosztowały Cię klientów
          </p>
          <button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-full font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-2xl text-lg border border-purple-400/20"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Zbuduj stronę opartą na faktach
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Calculator, TrendingUp, Euro } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ROICalculator() {
  const t = useTranslations('roiCalculator')
  const [visitors, setVisitors] = useState(5000)
  const [conversionRate, setConversionRate] = useState(1.5)
  const [avgOrderValue, setAvgOrderValue] = useState(200)
  
  const resultsRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  // Calculations
  const currentLeads = Math.round(visitors * (conversionRate / 100))
  const currentRevenue = currentLeads * avgOrderValue
  const improvedConversionRate = Math.min(conversionRate * 1.3, 5)
  const improvedLeads = Math.round(visitors * (improvedConversionRate / 100))
  const improvedRevenue = improvedLeads * avgOrderValue
  const additionalRevenue = improvedRevenue - currentRevenue
  const yearlyAdditional = additionalRevenue * 12

  useEffect(() => {
    if (resultsRef.current) {
      gsap.fromTo(
        resultsRef.current,
        { scale: 0.95, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
      )
    }

    // Animate numbers
    numberRefs.current.forEach((ref, index) => {
      if (ref) {
        const value = parseInt(ref.getAttribute('data-value') || '0')
        gsap.to(ref, {
          innerHTML: value,
          duration: 1,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function() {
            ref.innerHTML = Math.round(this.targets()[0].innerHTML).toLocaleString('pl-PL')
          }
        })
      }
    })
  }, [visitors, conversionRate, avgOrderValue])

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/20 via-transparent to-blue-950/20" />
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-2xl animate-glow">
            <Calculator className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Kalkulator ROI</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Wprowadź swoje dane i zobacz, ile dodatkowych przychodów możesz generować z obecnego ruchu
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-dark rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 border border-white/10"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Twoje obecne wyniki</h3>
            
            <div className="space-y-6">
              {/* Visitors Slider */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Miesięczna liczba odwiedzin: <span className="text-purple-400">{visitors.toLocaleString('pl-PL')}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={visitors}
                  onChange={(e) => setVisitors(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer slider"
                />
              </div>

              {/* Conversion Rate Slider */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Współczynnik konwersji: <span className="text-purple-400">{conversionRate}%</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                  className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer slider"
                />
              </div>

              {/* Average Order Value */}
              <div>
                <label className="text-white font-medium mb-2 block">
                  Średnia wartość zamówienia: <span className="text-purple-400">{avgOrderValue} zł</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={avgOrderValue}
                  onChange={(e) => setAvgOrderValue(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer slider"
                />
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Current State */}
            <div className="bg-gradient-to-br from-red-950/40 to-red-900/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/40 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
                Obecna sytuacja
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 text-sm">Leady/miesiąc</p>
                  <p className="text-2xl font-bold text-white">
                    <span ref={el => {numberRefs.current[0] = el}} data-value={currentLeads}>0</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Przychód/miesiąc</p>
                  <p className="text-2xl font-bold text-white">
                    <span ref={el => {numberRefs.current[1] = el}} data-value={currentRevenue}>0</span> zł
                  </p>
                </div>
              </div>
            </div>

            {/* Improved State */}
            <div className="bg-gradient-to-br from-green-950/40 to-green-900/20 backdrop-blur-md rounded-2xl p-6 border border-green-500/40 shadow-xl">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                Po optymalizacji (+30% konwersji)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-300 text-sm">Leady/miesiąc</p>
                  <p className="text-2xl font-bold text-white">
                    <span ref={el => {numberRefs.current[2] = el}} data-value={improvedLeads}>0</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Przychód/miesiąc</p>
                  <p className="text-2xl font-bold text-white">
                    <span ref={el => {numberRefs.current[3] = el}} data-value={improvedRevenue}>0</span> zł
                  </p>
                </div>
              </div>
            </div>

            {/* ROI Summary */}
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 text-white shadow-2xl border border-purple-400/20">
              <h4 className="text-xl font-bold mb-4 flex items-center">
                <Euro className="w-5 h-5 mr-2" />
                Twój potencjalny zysk
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Dodatkowy przychód/miesiąc:</span>
                  <span className="text-2xl font-bold">
                    +<span ref={el => {numberRefs.current[4] = el}} data-value={additionalRevenue}>0</span> zł
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/20">
                  <span>Dodatkowy przychód/rok:</span>
                  <span className="text-3xl font-bold">
                    +<span ref={el => {numberRefs.current[5] = el}} data-value={yearlyAdditional}>0</span> zł
                  </span>
                </div>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-lg font-semibold py-6"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Chcę zwiększyć swoje przychody
            </Button>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
          cursor: pointer;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(147, 51, 234, 0.5);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #9333ea 0%, #3b82f6 100%);
          cursor: pointer;
          border-radius: 50%;
          border: none;
          box-shadow: 0 2px 10px rgba(147, 51, 234, 0.5);
        }
      `}</style>
    </section>
  )
}
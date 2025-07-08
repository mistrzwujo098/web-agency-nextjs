'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ArrowRight, Zap, Timer, MousePointer, Smartphone } from 'lucide-react'

export function BeforeAfterComparison() {
  const t = useTranslations('beforeAfter')
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging])

  const metrics = {
    before: {
      loadTime: '5.7s',
      mobileScore: '45/100',
      bounceRate: '68%',
      conversion: '1.2%'
    },
    after: {
      loadTime: '1.2s',
      mobileScore: '95/100',
      bounceRate: '32%',
      conversion: '3.8%'
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 to-purple-900/10 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Zobacz różnicę - Przed i Po optymalizacji
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Przesuń suwak, aby zobaczyć transformację strony i jej wydajności
          </p>
        </motion.div>

        {/* Comparison Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-12"
        >
          <div 
            ref={containerRef}
            className="relative h-[500px] rounded-2xl overflow-hidden cursor-ew-resize"
            onMouseDown={() => setIsDragging(true)}
          >
            {/* After Image */}
            <div className="absolute inset-0">
              <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                <div className="text-center">
                  <Zap className="w-20 h-20 text-green-400 mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-white mb-2">Po optymalizacji</h3>
                  <p className="text-gray-300">Szybka, responsywna, konwertująca</p>
                </div>
              </div>
            </div>

            {/* Before Image */}
            <div 
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="w-full h-full bg-gradient-to-br from-red-600/20 to-gray-600/20 flex items-center justify-center">
                <div className="text-center">
                  <Timer className="w-20 h-20 text-red-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-3xl font-bold text-white mb-2">Przed optymalizacją</h3>
                  <p className="text-gray-300">Wolna, nieresponsywna, tracąca klientów</p>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div
              ref={sliderRef}
              className="absolute top-0 bottom-0 w-1 bg-white"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center">
                <div className="flex">
                  <ArrowRight className="w-4 h-4 text-gray-900 transform rotate-180" />
                  <ArrowRight className="w-4 h-4 text-gray-900" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Metrics Comparison */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Before Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Przed optymalizacją</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Timer className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-gray-300">Czas ładowania</span>
                </div>
                <span className="text-xl font-bold text-red-400">{metrics.before.loadTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-gray-300">Mobile Score</span>
                </div>
                <span className="text-xl font-bold text-red-400">{metrics.before.mobileScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MousePointer className="w-5 h-5 text-red-400 mr-3" />
                  <span className="text-gray-300">Bounce Rate</span>
                </div>
                <span className="text-xl font-bold text-red-400">{metrics.before.bounceRate}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-gray-300 font-medium">Konwersja</span>
                <span className="text-2xl font-bold text-red-400">{metrics.before.conversion}</span>
              </div>
            </div>
          </motion.div>

          {/* After Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-green-500/20 backdrop-blur-md rounded-2xl p-8 border border-green-500/30"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Po optymalizacji</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Timer className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Czas ładowania</span>
                </div>
                <span className="text-xl font-bold text-green-400">{metrics.after.loadTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Smartphone className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Mobile Score</span>
                </div>
                <span className="text-xl font-bold text-green-400">{metrics.after.mobileScore}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MousePointer className="w-5 h-5 text-green-400 mr-3" />
                  <span className="text-gray-300">Bounce Rate</span>
                </div>
                <span className="text-xl font-bold text-green-400">{metrics.after.bounceRate}</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <span className="text-gray-300 font-medium">Konwersja</span>
                <span className="text-2xl font-bold text-green-400">{metrics.after.conversion}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
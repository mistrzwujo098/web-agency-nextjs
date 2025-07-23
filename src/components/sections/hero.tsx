'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState, useEffect, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { TypingEffect } from '@/components/ui/typing-effect'
import { LiveVisitors } from '@/components/ui/live-visitors'
import { TimeGreeting } from '@/components/ui/time-greeting'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup'

// Lazy load heavy background component
const NeuralBackground = dynamic(() => import('@/components/neural-background').then(mod => ({ default: mod.NeuralBackground })), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20" />
})

export function Hero() {
  const t = useTranslations('hero')
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showExitIntent, setShowExitIntent] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    
    // Throttled mouse movement for performance
    let rafId: number | null = null
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        })
        rafId = null
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden pt-20">
      {/* Neural Network Background */}
      <div className="absolute inset-0 z-0">
        <NeuralBackground />
        
        {/* Animated Gradient Overlay - Desktop Only */}
        <div 
          className="absolute inset-0 opacity-30 hidden lg:block will-change-transform"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)`,
            transform: 'translateZ(0)' // Force GPU acceleration
          }}
        />
      </div>
      
      {/* Reduced Particle Effect for Performance */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
        {isVisible && typeof window !== 'undefined' && [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full will-change-transform"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-20">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <TimeGreeting className="text-purple-400 block mb-2 text-2xl md:text-3xl" />
            Tworzymy <TypingEffect 
              words={['strony internetowe', 'sklepy online', 'aplikacje webowe']} 
              className="text-gradient"
            /> które zarabiają
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-100 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {t('subtitle')}
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Button 
              size="lg" 
              className="text-base px-8 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 animate-breathe"
              onClick={() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('cta_primary')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base px-8 py-6 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105"
              onClick={() => {
                const portfolioSection = document.getElementById('portfolio');
                if (portfolioSection) {
                  portfolioSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {t('cta_secondary')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center gap-2 text-sm text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex -space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="italic">{t('testimonial')}</p>
          </motion.div>
          
          {/* Live visitors counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ delay: 1.5 }}
            className="mt-8 flex justify-center"
          >
            <LiveVisitors />
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ delay: 1.8 }}
            className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter end={127} suffix="+" />
              </div>
              <p className="text-sm text-gray-400 mt-1">Zadowolonych firm</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter end={30} suffix="%" prefix="+" />
              </div>
              <p className="text-sm text-gray-400 mt-1">Więcej leadów</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">
                <AnimatedCounter end={14} suffix=" dni" />
              </div>
              <p className="text-sm text-gray-400 mt-1">Do rezultatów</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}
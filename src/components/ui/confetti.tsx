'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiProps {
  trigger: boolean
  duration?: number
  particleCount?: number
}

interface Particle {
  id: number
  x: number
  y: number
  color: string
  rotation: number
  scale: number
}

export function Confetti({ trigger, duration = 3000, particleCount = 50 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])
  const colors = ['#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899']

  useEffect(() => {
    if (!trigger) return

    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5
    }))

    setParticles(newParticles)

    const timeout = setTimeout(() => {
      setParticles([])
    }, duration)

    return () => clearTimeout(timeout)
  }, [trigger, duration, particleCount])

  return (
    <AnimatePresence>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: particle.x,
            y: particle.y,
            rotate: particle.rotation,
            scale: particle.scale
          }}
          animate={{
            x: particle.x + (Math.random() - 0.5) * 200,
            y: -100,
            rotate: particle.rotation + Math.random() * 720,
            scale: 0
          }}
          exit={{ opacity: 0 }}
          transition={{
            duration: duration / 1000,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="fixed pointer-events-none z-50"
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: particle.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '0%'
          }}
        />
      ))}
    </AnimatePresence>
  )
}

// Hook for triggering confetti
export function useConfetti() {
  const [trigger, setTrigger] = useState(false)

  const fire = () => {
    setTrigger(true)
    setTimeout(() => setTrigger(false), 100)
  }

  return { trigger, fire }
}
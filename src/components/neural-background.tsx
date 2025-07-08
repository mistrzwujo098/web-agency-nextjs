'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  connections: number[]
}

const isMobile = () => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles (neurons) - optimized for readability
    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = isMobile() 
        ? Math.min(8, Math.floor((canvas.width * canvas.height) / 80000))
        : Math.min(15, Math.floor((canvas.width * canvas.height) / 60000))
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          radius: Math.random() * 4 + 2,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        })
      }
      
      // Create connections
      particles.forEach((particle, i) => {
        particles.forEach((otherParticle, j) => {
          if (i !== j) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 200) {
              particle.connections.push(j)
            }
          }
        })
      })
      
      return particles
    }

    particlesRef.current = createParticles()

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation variables
    let pulseTime = 0
    const pulses: { start: number; end: number; progress: number; speed: number }[] = []
    
    // Create random pulses
    setInterval(() => {
      if (particlesRef.current.length > 0 && pulses.length < 5) {
        const start = Math.floor(Math.random() * particlesRef.current.length)
        const connections = particlesRef.current[start].connections
        if (connections.length > 0) {
          const end = connections[Math.floor(Math.random() * connections.length)]
          pulses.push({
            start,
            end,
            progress: 0,
            speed: Math.random() * 0.01 + 0.005
          })
        }
      }
    }, 800)

    // Render function
    const render = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add multi-layer noise texture for depth
      if (timeRef.current % 2 === 0) {
        ctx.save()
        
        // Large ambient particles
        ctx.globalAlpha = 0.008
        for (let i = 0; i < 15; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const radius = Math.random() * 3 + 1
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
          gradient.addColorStop(0, '#8b5cf6')
          gradient.addColorStop(1, 'transparent')
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Small detail particles
        ctx.globalAlpha = 0.015
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 1.5
          ctx.fillStyle = Math.random() > 0.5 ? '#8b5cf6' : '#3b82f6'
          ctx.fillRect(x, y, size, size)
        }
        
        ctx.restore()
      }
      timeRef.current++

      pulseTime += 0.005

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Floating animation
        particle.x = particle.baseX + Math.sin(pulseTime + particle.pulsePhase) * 30
        particle.y = particle.baseY + Math.cos(pulseTime + particle.pulsePhase * 0.5) * 30

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 300) {
          const force = (1 - distance / 300) * 8
          particle.x -= (dx / distance) * force
          particle.y -= (dy / distance) * force
        }

        // Draw connections
        particle.connections.forEach(connectionIndex => {
          const connectedParticle = particlesRef.current[connectionIndex]
          const connectionDx = connectedParticle.x - particle.x
          const connectionDy = connectedParticle.y - particle.y
          const connectionDistance = Math.sqrt(connectionDx * connectionDx + connectionDy * connectionDy)
          
          if (connectionDistance < 250) {
            // Draw multiple connection layers for depth
            const opacity = (1 - connectionDistance / 250) * 0.2
            
            // Glow layer
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(connectedParticle.x, connectedParticle.y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity * 0.1})`
            ctx.lineWidth = 4
            ctx.stroke()
            
            // Mid layer
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(connectedParticle.x, connectedParticle.y)
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              connectedParticle.x, connectedParticle.y
            )
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`)
            gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity})`)
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`)
            ctx.strokeStyle = gradient
            ctx.lineWidth = 1
            ctx.stroke()
            
            // Core layer
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(connectedParticle.x, connectedParticle.y)
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })

        // Epic pulsing glow effect with multiple layers
        const pulseSize = Math.sin(pulseTime * 1.5 + particle.pulsePhase) * 0.3 + 1
        const secondaryPulse = Math.sin(pulseTime * 0.8 + particle.pulsePhase * 2) * 0.2 + 1
        const glowRadius = particle.radius * pulseSize * 3

        // Outer glow layer
        const outerGlow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius * 4
        )
        outerGlow.addColorStop(0, 'rgba(139, 92, 246, 0.05)')
        outerGlow.addColorStop(0.3, 'rgba(59, 130, 246, 0.02)')
        outerGlow.addColorStop(1, 'rgba(139, 92, 246, 0)')
        ctx.fillStyle = outerGlow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowRadius * 4, 0, Math.PI * 2)
        ctx.fill()

        // Middle glow layer
        const middleGlow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius * 2.5
        )
        middleGlow.addColorStop(0, 'rgba(139, 92, 246, 0.15)')
        middleGlow.addColorStop(0.4, 'rgba(59, 130, 246, 0.1)')
        middleGlow.addColorStop(1, 'rgba(139, 92, 246, 0)')
        ctx.fillStyle = middleGlow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowRadius * 2.5, 0, Math.PI * 2)
        ctx.fill()

        // Inner glow
        const innerGlow = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius
        )
        innerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.4)')
        innerGlow.addColorStop(0.2, 'rgba(139, 92, 246, 0.3)')
        innerGlow.addColorStop(1, 'rgba(59, 130, 246, 0)')
        ctx.fillStyle = innerGlow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        // Core particle with secondary pulse
        const particleGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * pulseSize * secondaryPulse
        )
        particleGradient.addColorStop(0, '#ffffff')
        particleGradient.addColorStop(0.3, '#e9d5ff')
        particleGradient.addColorStop(0.7, '#8b5cf6')
        particleGradient.addColorStop(1, '#6d28d9')
        
        ctx.fillStyle = particleGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * pulseSize * secondaryPulse, 0, Math.PI * 2)
        ctx.fill()
        
        // Bright center point
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * 0.3, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw and update pulses
      pulses.forEach((pulse, index) => {
        pulse.progress += pulse.speed
        
        if (pulse.progress >= 1) {
          pulses.splice(index, 1)
          return
        }

        const startParticle = particlesRef.current[pulse.start]
        const endParticle = particlesRef.current[pulse.end]
        
        if (startParticle && endParticle) {
          const x = startParticle.x + (endParticle.x - startParticle.x) * pulse.progress
          const y = startParticle.y + (endParticle.y - startParticle.y) * pulse.progress
          
          // Epic pulse effect with trail
          const pulseIntensity = Math.sin(pulse.progress * Math.PI) * 0.5 + 0.5
          
          // Trail effect
          for (let t = 0; t < 5; t++) {
            const trailProgress = Math.max(0, pulse.progress - (t * 0.05))
            const trailX = startParticle.x + (endParticle.x - startParticle.x) * trailProgress
            const trailY = startParticle.y + (endParticle.y - startParticle.y) * trailProgress
            const trailOpacity = (1 - t / 5) * pulseIntensity * 0.3
            
            ctx.fillStyle = `rgba(139, 92, 246, ${trailOpacity})`
            ctx.beginPath()
            ctx.arc(trailX, trailY, 15 - t * 2, 0, Math.PI * 2)
            ctx.fill()
          }
          
          // Main pulse with multiple layers
          const outerPulse = ctx.createRadialGradient(x, y, 0, x, y, 30 * pulseIntensity)
          outerPulse.addColorStop(0, `rgba(255, 255, 255, ${0.3 * pulseIntensity})`)
          outerPulse.addColorStop(0.2, `rgba(139, 92, 246, ${0.4 * pulseIntensity})`)
          outerPulse.addColorStop(0.5, `rgba(59, 130, 246, ${0.2 * pulseIntensity})`)
          outerPulse.addColorStop(1, 'rgba(59, 130, 246, 0)')
          ctx.fillStyle = outerPulse
          ctx.beginPath()
          ctx.arc(x, y, 30 * pulseIntensity, 0, Math.PI * 2)
          ctx.fill()
          
          // Inner pulse
          const innerPulse = ctx.createRadialGradient(x, y, 0, x, y, 15 * pulseIntensity)
          innerPulse.addColorStop(0, `rgba(255, 255, 255, ${0.9 * pulseIntensity})`)
          innerPulse.addColorStop(0.3, `rgba(229, 213, 255, ${0.7 * pulseIntensity})`)
          innerPulse.addColorStop(1, 'rgba(139, 92, 246, 0)')
          ctx.fillStyle = innerPulse
          ctx.beginPath()
          ctx.arc(x, y, 15 * pulseIntensity, 0, Math.PI * 2)
          ctx.fill()
          
          // Bright core
          ctx.shadowBlur = 20
          ctx.shadowColor = '#8b5cf6'
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(x, y, 4 * pulseIntensity, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationRef.current = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Multiple background layers for depth */}
      
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950/20 to-blue-950/20" />
      
      {/* Static background image with enhanced effects */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ 
          backgroundImage: 'url(/backgrounds/neuron-bg.png)',
          filter: 'blur(2px) brightness(0.8) contrast(0.9)',
          transform: 'scale(1.1)'
        }}
      />
      
      {/* Secondary static layer for parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ 
          backgroundImage: 'url(/backgrounds/neuron-bg.png)',
          filter: 'blur(10px) brightness(0.6)',
          transform: 'scale(1.2) translateY(50px)'
        }}
      />
      
      {/* Animated canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          mixBlendMode: 'screen',
          opacity: 0.7,
          filter: 'contrast(1.05) brightness(0.9)'
        }}
      />
      
      {/* Color enhancement overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(139, 92, 246, 0.05) 50%, rgba(59, 130, 246, 0.1) 100%)'
        }}
      />
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 60%, rgba(0, 0, 0, 0.2) 100%)'
      }} />
    </>
  )
}
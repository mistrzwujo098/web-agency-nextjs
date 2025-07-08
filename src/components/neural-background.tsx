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

    // Create particles (neurons)
    const createParticles = () => {
      const particles: Particle[] = []
      const particleCount = isMobile() 
        ? Math.min(30, Math.floor((canvas.width * canvas.height) / 30000))
        : Math.min(100, Math.floor((canvas.width * canvas.height) / 20000))
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 3 + 1,
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
            
            if (distance < 150) {
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
      if (particlesRef.current.length > 0 && pulses.length < 10) {
        const start = Math.floor(Math.random() * particlesRef.current.length)
        const connections = particlesRef.current[start].connections
        if (connections.length > 0) {
          const end = connections[Math.floor(Math.random() * connections.length)]
          pulses.push({
            start,
            end,
            progress: 0,
            speed: Math.random() * 0.02 + 0.01
          })
        }
      }
    }, 500)

    // Render function
    const render = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Add subtle noise texture
      if (timeRef.current % 3 === 0) {
        ctx.save()
        ctx.globalAlpha = 0.02
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * canvas.width
          const y = Math.random() * canvas.height
          const size = Math.random() * 2
          ctx.fillStyle = '#8b5cf6'
          ctx.fillRect(x, y, size, size)
        }
        ctx.restore()
      }
      timeRef.current++

      pulseTime += 0.02

      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Floating animation
        particle.x = particle.baseX + Math.sin(pulseTime + particle.pulsePhase) * 20
        particle.y = particle.baseY + Math.cos(pulseTime + particle.pulsePhase * 0.5) * 20

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const force = (1 - distance / 200) * 5
          particle.x -= (dx / distance) * force
          particle.y -= (dy / distance) * force
        }

        // Draw connections
        particle.connections.forEach(connectionIndex => {
          const connectedParticle = particlesRef.current[connectionIndex]
          const connectionDx = connectedParticle.x - particle.x
          const connectionDy = connectedParticle.y - particle.y
          const connectionDistance = Math.sqrt(connectionDx * connectionDx + connectionDy * connectionDy)
          
          if (connectionDistance < 200) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(connectedParticle.x, connectedParticle.y)
            
            const opacity = (1 - connectionDistance / 200) * 0.3
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
          }
        })

        // Pulsing glow effect
        const pulseSize = Math.sin(pulseTime * 2 + particle.pulsePhase) * 0.5 + 1
        const glowRadius = particle.radius * pulseSize * 2

        // Draw glow
        const glowGradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowRadius * 3
        )
        glowGradient.addColorStop(0, 'rgba(139, 92, 246, 0.4)')
        glowGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.2)')
        glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)')
        
        ctx.fillStyle = glowGradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, glowRadius * 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw particle
        ctx.fillStyle = '#8b5cf6'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius * pulseSize, 0, Math.PI * 2)
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
          
          // Draw pulse
          const pulseGradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
          pulseGradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
          pulseGradient.addColorStop(0.2, 'rgba(139, 92, 246, 0.6)')
          pulseGradient.addColorStop(1, 'rgba(59, 130, 246, 0)')
          
          ctx.fillStyle = pulseGradient
          ctx.beginPath()
          ctx.arc(x, y, 20, 0, Math.PI * 2)
          ctx.fill()
          
          // Small bright core
          ctx.fillStyle = '#ffffff'
          ctx.beginPath()
          ctx.arc(x, y, 3, 0, Math.PI * 2)
          ctx.fill()
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
      {/* Static background image with blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: 'url(/backgrounds/neuron-bg.png)',
          filter: 'blur(2px)'
        }}
      />
      
      {/* Animated canvas overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80" />
    </>
  )
}
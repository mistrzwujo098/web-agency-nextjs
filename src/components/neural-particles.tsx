'use client'

import { useEffect, useRef } from 'react'

export function NeuralParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('particles.js').then(() => {
      if (window.particlesJS && containerRef.current) {
        window.particlesJS('neural-particles', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: ['#8b5cf6', '#3b82f6', '#a855f7']
            },
            shape: {
              type: 'circle',
              stroke: {
                width: 0,
                color: '#000000'
              }
            },
            opacity: {
              value: 0.6,
              random: true,
              anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.3,
                sync: false
              }
            },
            size: {
              value: 3,
              random: true,
              anim: {
                enable: true,
                speed: 2,
                size_min: 1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#8b5cf6',
              opacity: 0.3,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: true,
              straight: false,
              out_mode: 'out',
              bounce: false,
              attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
              }
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 400,
                line_linked: {
                  opacity: 1
                }
              },
              bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
              },
              repulse: {
                distance: 200,
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 2
              }
            }
          },
          retina_detect: true
        })
      }
    })

    return () => {
      // Cleanup particles
      if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS()
        window.pJSDom = []
      }
    }
  }, [])

  return (
    <div 
      id="neural-particles" 
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

// Type declarations for particles.js
declare global {
  interface Window {
    particlesJS: any
    pJSDom: any
  }
}
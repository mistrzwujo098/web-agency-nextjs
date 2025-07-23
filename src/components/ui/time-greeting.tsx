'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react'

interface TimeGreetingProps {
  className?: string
  showIcon?: boolean
}

export function TimeGreeting({ className = '', showIcon = true }: TimeGreetingProps) {
  const [greeting, setGreeting] = useState({ text: '', icon: Sun })

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours()
      
      if (hour >= 5 && hour < 12) {
        setGreeting({ text: 'Dzień dobry', icon: Sunrise })
      } else if (hour >= 12 && hour < 17) {
        setGreeting({ text: 'Witaj', icon: Sun })
      } else if (hour >= 17 && hour < 22) {
        setGreeting({ text: 'Dobry wieczór', icon: Sunset })
      } else {
        setGreeting({ text: 'Dobry wieczór', icon: Moon })
      }
    }

    updateGreeting()
    // Update every minute
    const interval = setInterval(updateGreeting, 60000)
    
    return () => clearInterval(interval)
  }, [])

  const Icon = greeting.icon

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {showIcon && <Icon className="w-5 h-5" />}
      {greeting.text}
    </span>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Users } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface LiveVisitorsProps {
  minVisitors?: number
  maxVisitors?: number
  updateInterval?: number
  className?: string
}

export function LiveVisitors({ 
  minVisitors = 87,
  maxVisitors = 234,
  updateInterval = 30000, // 30 seconds
  className = ''
}: LiveVisitorsProps) {
  const [visitors, setVisitors] = useState(
    Math.floor(Math.random() * (maxVisitors - minVisitors + 1)) + minVisitors
  )
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true)
      
      setTimeout(() => {
        const change = Math.floor(Math.random() * 21) - 10 // -10 to +10
        const newCount = visitors + change
        const clampedCount = Math.max(minVisitors, Math.min(maxVisitors, newCount))
        setVisitors(clampedCount)
        setIsUpdating(false)
      }, 300)
    }, updateInterval)

    return () => clearInterval(interval)
  }, [visitors, minVisitors, maxVisitors, updateInterval])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm ${className}`}
    >
      <div className="relative">
        <Users className="w-4 h-4" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
      
      <AnimatePresence mode="wait">
        <motion.span
          key={visitors}
          initial={{ opacity: 0, y: isUpdating ? -10 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: isUpdating ? 10 : 0 }}
          transition={{ duration: 0.2 }}
          className="font-medium"
        >
          {visitors}
        </motion.span>
      </AnimatePresence>
      
      <span>osób ogląda teraz</span>
    </motion.div>
  )
}
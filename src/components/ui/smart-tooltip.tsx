'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SmartTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  delay?: number
  className?: string
}

export function SmartTooltip({ 
  children, 
  content, 
  delay = 500,
  className = ''
}: SmartTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setIsVisible(false)
  }

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`
              absolute z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-xl
              border border-gray-800 whitespace-nowrap
              bottom-full left-1/2 -translate-x-1/2 mb-2
              ${className}
            `}
          >
            {content}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Price breakdown tooltip component
interface PriceTooltipProps {
  monthlyPrice: number
  currency?: string
  className?: string
  children: React.ReactNode
}

export function PriceTooltip({ 
  monthlyPrice, 
  currency = 'zł',
  className = '',
  children 
}: PriceTooltipProps) {
  const dailyPrice = (monthlyPrice / 30).toFixed(2)
  const coffeePrice = (monthlyPrice / 30 / 15).toFixed(2) // Assuming coffee costs 15 zł

  return (
    <SmartTooltip
      className={className}
      content={
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-gray-400">Dziennie:</span>
            <span className="font-semibold text-purple-400">
              {dailyPrice} {currency}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400">To tylko:</span>
            <span className="font-semibold text-green-400">
              {coffeePrice} kawy ☕
            </span>
          </div>
        </div>
      }
    >
      {children}
    </SmartTooltip>
  )
}
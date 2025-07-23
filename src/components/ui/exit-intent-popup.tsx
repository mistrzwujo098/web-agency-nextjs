'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Clock } from 'lucide-react'
import { Button } from './button'

interface ExitIntentPopupProps {
  onClose?: () => void
  onAction?: () => void
}

export function ExitIntentPopup({ onClose, onAction }: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const shown = sessionStorage.getItem('exitIntentShown')
    if (shown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect when mouse leaves viewport from the top
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    // Add delay before activating to avoid immediate triggers
    const timeout = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000)

    return () => {
      clearTimeout(timeout)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown])

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  const handleAction = () => {
    setIsVisible(false)
    onAction?.()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          
          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
            
            {/* Content */}
            <div className="p-8 text-center">
              {/* Gift icon with animation */}
              <motion.div
                animate={{ 
                  rotate: [-5, 5, -5],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full mb-6"
              >
                <Gift className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Czekaj! Masz szczęście 🎉
              </h2>
              
              <p className="text-gray-300 mb-6">
                Specjalnie dla Ciebie przygotowaliśmy <span className="text-purple-400 font-semibold">10% rabatu</span> na 
                tworzenie strony internetowej!
              </p>
              
              {/* Countdown timer */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
                <Clock className="w-4 h-4" />
                <span>Oferta ważna tylko przez 24 godziny</span>
              </div>
              
              {/* Discount code */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <p className="text-xs text-gray-400 mb-1">Twój kod rabatowy:</p>
                <p className="text-2xl font-bold text-gradient">ZOSTAŃ10</p>
              </div>
              
              {/* CTA */}
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={handleAction}
              >
                Wykorzystaj rabat teraz
              </Button>
              
              <button
                onClick={handleClose}
                className="mt-4 text-sm text-gray-500 hover:text-gray-400 transition-colors"
              >
                Nie, dziękuję - wolę zapłacić pełną cenę
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
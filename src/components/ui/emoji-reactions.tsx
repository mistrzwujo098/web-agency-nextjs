'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Reaction {
  emoji: string
  count: number
  hasReacted: boolean
}

interface EmojiReactionsProps {
  initialReactions?: Record<string, number>
  onReact?: (emoji: string) => void
  className?: string
}

export function EmojiReactions({ 
  initialReactions = {
    '👍': 23,
    '❤️': 47,
    '🚀': 12,
    '🎯': 8
  },
  onReact,
  className = ''
}: EmojiReactionsProps) {
  const [reactions, setReactions] = useState<Record<string, Reaction>>(() => {
    const stored = typeof window !== 'undefined' 
      ? localStorage.getItem('emojiReactions') 
      : null
    
    if (stored) {
      return JSON.parse(stored)
    }

    return Object.entries(initialReactions).reduce((acc, [emoji, count]) => ({
      ...acc,
      [emoji]: { emoji, count, hasReacted: false }
    }), {} as Record<string, Reaction>)
  })

  useEffect(() => {
    localStorage.setItem('emojiReactions', JSON.stringify(reactions))
  }, [reactions])

  const handleReaction = (emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [emoji]: {
        ...prev[emoji],
        count: prev[emoji].hasReacted 
          ? prev[emoji].count - 1 
          : prev[emoji].count + 1,
        hasReacted: !prev[emoji].hasReacted
      }
    }))
    onReact?.(emoji)
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Object.values(reactions).map((reaction) => (
        <motion.button
          key={reaction.emoji}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleReaction(reaction.emoji)}
          className={`
            relative px-3 py-1.5 rounded-full transition-all duration-200
            ${reaction.hasReacted 
              ? 'bg-purple-500/20 border-purple-500' 
              : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
            }
            border text-sm flex items-center gap-1.5
          `}
        >
          <span className="text-lg">{reaction.emoji}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={reaction.count}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={reaction.hasReacted ? 'text-purple-400' : 'text-gray-400'}
            >
              {reaction.count}
            </motion.span>
          </AnimatePresence>
          
          {/* Reaction animation */}
          <AnimatePresence>
            {reaction.hasReacted && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                exit={{ scale: 0 }}
                className="absolute inset-0 rounded-full border-2 border-purple-500"
              />
            )}
          </AnimatePresence>
        </motion.button>
      ))}
      
      <span className="text-sm text-gray-500 ml-2">
        osób uznało to za pomocne
      </span>
    </div>
  )
}
'use client'

import { motion } from 'framer-motion'

interface ProgressFormProps {
  currentStep: number
  totalSteps: number
  stepLabels?: string[]
  className?: string
}

export function ProgressForm({ 
  currentStep, 
  totalSteps, 
  stepLabels,
  className = '' 
}: ProgressFormProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Progress bar */}
      <div className="relative">
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
          />
        </div>
        
        {/* Step indicators */}
        <div className="absolute top-0 left-0 w-full h-full flex justify-between">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber <= currentStep
            const isCurrent = stepNumber === currentStep
            
            return (
              <div
                key={index}
                className="flex flex-col items-center"
                style={{ 
                  position: 'absolute',
                  left: `${(index / (totalSteps - 1)) * 100}%`,
                  transform: 'translateX(-50%)'
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium
                    -mt-2 transition-all duration-300
                    ${isCompleted 
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                      : 'bg-gray-800 text-gray-500 border-2 border-gray-700'
                    }
                    ${isCurrent ? 'ring-4 ring-purple-500/30' : ''}
                  `}
                >
                  {isCompleted ? '✓' : stepNumber}
                </motion.div>
                
                {stepLabels && stepLabels[index] && (
                  <span className={`
                    mt-3 text-xs whitespace-nowrap
                    ${isCompleted ? 'text-purple-400' : 'text-gray-500'}
                  `}>
                    {stepLabels[index]}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Step counter */}
      <div className="text-center">
        <span className="text-sm text-gray-400">
          Krok <span className="text-purple-400 font-semibold">{currentStep}</span> z {totalSteps}
        </span>
      </div>
    </div>
  )
}
'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, className, onFocus, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const hasValue = props.value || props.defaultValue

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      onBlur?.(e)
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          className={cn(
            "peer w-full px-4 pt-6 pb-2 bg-gray-900/50 border rounded-lg",
            "text-white placeholder-transparent",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950",
            "transition-all duration-200",
            error ? "border-red-500 focus:ring-red-500" : "border-gray-700 focus:border-purple-500 focus:ring-purple-500",
            className
          )}
          placeholder={label}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        <label
          className={cn(
            "absolute left-4 transition-all duration-200 pointer-events-none",
            "text-gray-400",
            (isFocused || hasValue) 
              ? "top-2 text-xs text-purple-400" 
              : "top-4 text-base"
          )}
        >
          {label}
          {props.required && <span className="text-red-400 ml-1">*</span>}
        </label>
        
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

FloatingInput.displayName = 'FloatingInput'
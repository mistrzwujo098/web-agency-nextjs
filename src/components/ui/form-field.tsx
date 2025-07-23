'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, success, helperText, className, id, ...props }, ref) => {
    const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={fieldId} 
            className="block text-sm font-medium text-gray-200"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <input
            ref={ref}
            id={fieldId}
            className={cn(
              "w-full px-4 py-3 min-h-[44px] bg-gray-900/50 border rounded-lg",
              "text-white placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950",
              "transition-all duration-200",
              {
                "border-gray-700 focus:border-purple-500 focus:ring-purple-500": !error && !success,
                "border-red-500 focus:border-red-500 focus:ring-red-500": error,
                "border-green-500 focus:border-green-500 focus:ring-green-500": success,
                "pr-10": error || success,
              },
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
            {...props}
          />
          
          {(error || success) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {error ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500" />
              )}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${fieldId}-error`} className="text-sm text-red-400 flex items-center gap-1" role="alert">
            <AlertCircle className="w-4 h-4" />
            {error}
          </p>
        )}
        
        {helperText && !error && (
          <p id={`${fieldId}-helper`} className="text-sm text-gray-400">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  success?: boolean
  helperText?: string
  maxLength?: number
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, success, helperText, className, id, maxLength, ...props }, ref) => {
    const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`
    const currentLength = props.value?.toString().length || 0
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={fieldId} 
            className="block text-sm font-medium text-gray-200"
          >
            {label}
            {props.required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <textarea
            ref={ref}
            id={fieldId}
            className={cn(
              "w-full px-4 py-3 min-h-[120px] bg-gray-900/50 border rounded-lg",
              "text-white placeholder-gray-500 resize-y",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950",
              "transition-all duration-200",
              {
                "border-gray-700 focus:border-purple-500 focus:ring-purple-500": !error && !success,
                "border-red-500 focus:border-red-500 focus:ring-red-500": error,
                "border-green-500 focus:border-green-500 focus:ring-green-500": success,
              },
              className
            )}
            maxLength={maxLength}
            aria-invalid={!!error}
            aria-describedby={error ? `${fieldId}-error` : helperText ? `${fieldId}-helper` : undefined}
            {...props}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {error && (
              <p id={`${fieldId}-error`} className="text-sm text-red-400 flex items-center gap-1" role="alert">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
            
            {helperText && !error && (
              <p id={`${fieldId}-helper`} className="text-sm text-gray-400">
                {helperText}
              </p>
            )}
          </div>
          
          {maxLength && (
            <span className={cn(
              "text-sm",
              currentLength > maxLength * 0.9 ? "text-yellow-400" : "text-gray-500"
            )}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)

FormTextarea.displayName = 'FormTextarea'
'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CopyButtonProps {
  text: string
  className?: string
  successDuration?: number
}

export function CopyButton({ text, className, successDuration = 2000 }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), successDuration)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
        "bg-gray-800 hover:bg-gray-700 transition-all duration-200",
        "border border-gray-700",
        copied && "bg-green-900/50 border-green-700 text-green-400",
        className
      )}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Skopiowano!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>Kopiuj</span>
        </>
      )}
    </button>
  )
}
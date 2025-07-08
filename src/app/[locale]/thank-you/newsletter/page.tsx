'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, Gift, BookOpen, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NewsletterThankYouPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(15)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const benefits = [
    {
      icon: Mail,
      title: 'Cotygodniowe porady',
      description: 'Praktyczne wskazówki, które zwiększą konwersję Twojej strony'
    },
    {
      icon: Gift,
      title: 'Ekskluzywne oferty',
      description: 'Dostęp do specjalnych promocji tylko dla subskrybentów'
    },
    {
      icon: BookOpen,
      title: 'Case studies',
      description: 'Rzeczywiste przykłady wzrostu sprzedaży naszych klientów'
    },
    {
      icon: TrendingUp,
      title: 'Trendy branżowe',
      description: 'Bądź na bieżąco z najnowszymi trendami w marketingu online'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full text-center"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-purple-500/25">
            <Mail className="w-16 h-16 text-white" />
          </div>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Witaj w społeczności WebCraftAI!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Twoja subskrypcja została potwierdzona. Sprawdź swoją skrzynkę email!
          </p>
        </motion.div>

        {/* Email Confirmation Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-dark rounded-2xl p-8 mb-8 border border-purple-500/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            📧 Potwierdź swój email
          </h2>
          <p className="text-gray-300 mb-6">
            Wysłaliśmy Ci email z linkiem potwierdzającym. Kliknij w link, aby aktywować subskrypcję i otrzymać:
          </p>
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-4 mb-6">
            <p className="text-white font-semibold">
              🎁 Darmowy checklist: "50 elementów strony, które zwiększają sprzedaż"
            </p>
          </div>
          <p className="text-sm text-gray-400">
            Nie widzisz emaila? Sprawdź folder SPAM lub promocje.
          </p>
        </motion.div>

        {/* What You'll Get */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Co otrzymasz jako subskrybent?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="glass-dark rounded-xl p-6 text-left hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-white font-medium mb-2">{benefit.title}</h4>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-6 mb-8 border border-green-500/20"
        >
          <p className="text-green-400 font-medium mb-2">
            Dołączyłeś do 500+ przedsiębiorców
          </p>
          <p className="text-gray-300">
            którzy już zwiększyli swoje przychody dzięki naszym poradom
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/blog">
            <Button variant="outline" className="w-full sm:w-auto">
              <BookOpen className="w-4 h-4 mr-2" />
              Przeczytaj najnowsze artykuły
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Wróć do strony głównej
            </Button>
          </Link>
        </motion.div>

        {/* Auto-redirect Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-sm text-gray-500 mt-8"
        >
          Przekierowanie za {timeLeft} sekund...
        </motion.p>
      </motion.div>
    </div>
  )
}
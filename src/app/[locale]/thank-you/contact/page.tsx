'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Download, Mail, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function ContactThankYouPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState(10)

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </motion.div>

        {/* Main Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Dziękujemy za kontakt!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Twoja wiadomość została wysłana pomyślnie. Odpowiemy w ciągu 24 godzin.
          </p>
        </motion.div>

        {/* What's Next Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-dark rounded-2xl p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Co dalej?
          </h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Sprawdź swoją skrzynkę</h3>
                <p className="text-gray-400 text-sm">
                  Wysłaliśmy potwierdzenie na podany adres email wraz z dodatkowymi materiałami.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Przygotujemy analizę</h3>
                <p className="text-gray-400 text-sm">
                  W ciągu 48h otrzymasz darmową analizę swojej obecnej strony i plan działania.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Umówimy spotkanie</h3>
                <p className="text-gray-400 text-sm">
                  Skontaktujemy się, aby omówić Twoje potrzeby i zaproponować najlepsze rozwiązanie.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Free Resource CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-6 mb-8 border border-purple-500/20"
        >
          <h3 className="text-lg font-semibold text-white mb-2">
            Pobierz darmowy poradnik
          </h3>
          <p className="text-gray-300 mb-4">
            "10 błędów, które kosztują Cię klientów - jak je naprawić?"
          </p>
          <Button
            className="bg-white text-gray-900 hover:bg-gray-100"
            onClick={() => window.location.href = '/download/10-bledow-poradnik'}
          >
            <Download className="w-4 h-4 mr-2" />
            Pobierz za darmo
          </Button>
        </motion.div>

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/blog">
            <Button variant="outline" className="w-full sm:w-auto">
              Przeczytaj nasz blog
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button variant="outline" className="w-full sm:w-auto">
              Zobacz nasze realizacje
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Wróć do strony głównej
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Auto-redirect Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-sm text-gray-500 mt-8"
        >
          Zostaniesz automatycznie przekierowany za {timeLeft} sekund...
        </motion.p>
      </motion.div>
    </div>
  )
}
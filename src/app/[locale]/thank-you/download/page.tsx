'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Download, Mail, BookOpen, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DownloadThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [timeLeft, setTimeLeft] = useState(30)
  
  // Get resource name from URL params
  const resource = searchParams.get('resource') || 'materiał'
  
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

  const relatedResources = [
    {
      title: 'Checklist: 50 elementów strony',
      description: 'Kompleksowa lista elementów zwiększających konwersję',
      icon: BookOpen,
      href: '/resources/50-elementow-checklist'
    },
    {
      title: 'Poradnik: Marketing automation',
      description: 'Jak zautomatyzować procesy sprzedażowe',
      icon: Users,
      href: '/resources/marketing-automation-guide'
    },
    {
      title: 'Case study: +300% konwersji',
      description: 'Jak firma X potroiła liczbę leadów',
      icon: ArrowRight,
      href: '/case-studies/300-procent-wzrostu'
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
        {/* Download Success Icon */}
        <motion.div
          initial={{ scale: 0, y: -50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/25">
            <Download className="w-16 h-16 text-white animate-bounce" />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Pobieranie rozpoczęte!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {resource} został wysłany na Twój adres email
          </p>
        </motion.div>

        {/* Email Check Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-dark rounded-2xl p-8 mb-8 border border-green-500/20"
        >
          <div className="flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-green-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white">
              Sprawdź swoją skrzynkę
            </h2>
          </div>
          <p className="text-gray-300 mb-4">
            Wysłaliśmy email z linkiem do pobrania. Jeśli nie widzisz wiadomości, sprawdź folder SPAM.
          </p>
          <div className="bg-gray-800/50 rounded-xl p-4">
            <p className="text-sm text-gray-400">
              <span className="text-white font-medium">Temat:</span> Twój darmowy materiał od WebCraftAI
            </p>
            <p className="text-sm text-gray-400 mt-1">
              <span className="text-white font-medium">Nadawca:</span> materialy@webcraftai.pl
            </p>
          </div>
        </motion.div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 mb-8 border border-purple-500/20"
        >
          <h3 className="text-xl font-semibold text-white mb-3">
            💡 Jak najlepiej wykorzystać ten materiał?
          </h3>
          <ol className="text-left text-gray-300 space-y-2 max-w-md mx-auto">
            <li>1. Przeczytaj całość i zrób notatki</li>
            <li>2. Wybierz 3 najważniejsze elementy do wdrożenia</li>
            <li>3. Zacznij od najprostszego do implementacji</li>
            <li>4. Mierz rezultaty i optymalizuj</li>
          </ol>
        </motion.div>

        {/* Related Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Może Cię również zainteresować
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="glass-dark rounded-xl p-6 text-left hover:scale-105 transition-transform cursor-pointer"
                onClick={() => router.push(resource.href)}
              >
                <resource.icon className="w-8 h-8 text-purple-400 mb-3" />
                <h4 className="text-white font-medium mb-2">{resource.title}</h4>
                <p className="text-gray-400 text-sm">{resource.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Offer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3 }}
          className="bg-gradient-to-r from-orange-900/20 to-red-900/20 rounded-2xl p-6 mb-8 border border-orange-500/20"
        >
          <h3 className="text-xl font-semibold text-white mb-2">
            🎁 Specjalna oferta dla Ciebie
          </h3>
          <p className="text-gray-300 mb-4">
            Jako że pobrałeś nasz materiał, przygotowaliśmy dla Ciebie ekskluzywną ofertę:
          </p>
          <p className="text-2xl font-bold text-orange-400 mb-4">
            20% zniżki na audyt strony
          </p>
          <Link href="/free-analysis?discount=DOWNLOAD20">
            <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Skorzystaj z oferty
            </Button>
          </Link>
          <p className="text-xs text-gray-500 mt-2">
            Oferta ważna przez 7 dni
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/resources">
            <Button variant="outline" className="w-full sm:w-auto">
              Zobacz więcej materiałów
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
          transition={{ delay: 1.7 }}
          className="text-sm text-gray-500 mt-8"
        >
          Automatyczne przekierowanie za {timeLeft} sekund...
        </motion.p>
      </motion.div>
    </div>
  )
}
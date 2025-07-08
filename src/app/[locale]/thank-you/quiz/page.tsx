'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Trophy, Download, Calendar, Phone, ChartBar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function QuizThankYouPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [timeLeft, setTimeLeft] = useState(20)
  
  // Get quiz score from URL params
  const score = searchParams.get('score') || '0'
  const scoreNum = parseInt(score)
  
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

  const getScoreMessage = () => {
    if (scoreNum >= 5) {
      return {
        title: 'Świetny wynik!',
        message: 'Twoja firma jest gotowa na cyfrową transformację',
        color: 'text-green-500',
        bgColor: 'bg-green-500/20'
      }
    } else if (scoreNum >= 3) {
      return {
        title: 'Dobry początek!',
        message: 'Jest kilka obszarów, które możemy wspólnie poprawić',
        color: 'text-yellow-500',
        bgColor: 'bg-yellow-500/20'
      }
    } else {
      return {
        title: 'Czas na zmiany!',
        message: 'Mamy dla Ciebie plan działania, który odmieni Twój biznes',
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/20'
      }
    }
  }

  const scoreData = getScoreMessage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full text-center"
      >
        {/* Score Display */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className={`w-32 h-32 ${scoreData.bgColor} rounded-full flex flex-col items-center justify-center mx-auto`}>
            <Trophy className={`w-12 h-12 ${scoreData.color} mb-2`} />
            <span className={`text-3xl font-bold ${scoreData.color}`}>{score}/6</span>
          </div>
        </motion.div>

        {/* Result Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {scoreData.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {scoreData.message}
          </p>
        </motion.div>

        {/* Personalized Report CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-dark rounded-2xl p-8 mb-8 border border-purple-500/20"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            📊 Twój spersonalizowany raport jest gotowy!
          </h2>
          <p className="text-gray-300 mb-6">
            Na podstawie Twoich odpowiedzi przygotowaliśmy szczegółową analizę z konkretnymi rekomendacjami dla Twojej firmy.
          </p>
          
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-4">Co znajdziesz w raporcie?</h3>
            <ul className="text-left text-gray-300 space-y-2">
              <li className="flex items-start gap-2">
                <ChartBar className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Szczegółową analizę obecnej sytuacji Twojej strony</span>
              </li>
              <li className="flex items-start gap-2">
                <ChartBar className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>5 priorytetowych obszarów do poprawy</span>
              </li>
              <li className="flex items-start gap-2">
                <ChartBar className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Szacunkowy wzrost konwersji po wdrożeniu zmian</span>
              </li>
              <li className="flex items-start gap-2">
                <ChartBar className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <span>Plan działania na najbliższe 90 dni</span>
              </li>
            </ul>
          </div>

          <Button 
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
            onClick={() => window.location.href = `/download/quiz-report?score=${score}`}
          >
            <Download className="w-4 h-4 mr-2" />
            Pobierz darmowy raport (PDF)
          </Button>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <div className="glass-dark rounded-xl p-6 text-left">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Darmowa konsultacja</h3>
            <p className="text-gray-400 text-sm mb-4">
              Umów się na 30-minutową rozmowę z naszym ekspertem
            </p>
            <Link href="/book-consultation">
              <Button variant="outline" size="sm" className="w-full">
                Zarezerwuj termin
              </Button>
            </Link>
          </div>

          <div className="glass-dark rounded-xl p-6 text-left">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Szybki kontakt</h3>
            <p className="text-gray-400 text-sm mb-4">
              Zadzwoń do nas i porozmawiaj od razu
            </p>
            <a href="tel:+48123456789">
              <Button variant="outline" size="sm" className="w-full">
                +48 123 456 789
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 rounded-2xl p-6 mb-8 border border-green-500/20"
        >
          <p className="text-green-400 font-medium mb-2">
            98% firm, które skorzystały z naszej analizy
          </p>
          <p className="text-gray-300">
            zwiększyło konwersję o minimum 30% w ciągu 3 miesięcy
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/#case-study">
            <Button variant="outline" className="w-full sm:w-auto">
              Zobacz nasze sukcesy
            </Button>
          </Link>
          <Link href="/">
            <Button className="w-full sm:w-auto">
              Wróć do strony głównej
            </Button>
          </Link>
        </motion.div>

        {/* Auto-redirect Notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-sm text-gray-500 mt-8"
        >
          Przekierowanie za {timeLeft} sekund...
        </motion.p>
      </motion.div>
    </div>
  )
}
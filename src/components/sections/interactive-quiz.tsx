'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { 
  HelpCircle, 
  ChevronRight, 
  Check, 
  X,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Trophy
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface QuizQuestion {
  id: string
  question: string
  options: {
    text: string
    points: number
  }[]
}

interface QuizResult {
  score: number
  title: string
  description: string
  recommendations: string[]
  urgency: 'low' | 'medium' | 'high'
}

export function InteractiveQuiz() {
  const t = useTranslations('quiz')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const confettiRef = useRef<HTMLDivElement>(null)

  // Load quiz state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('quizState')
    if (savedState) {
      const { currentQuestion: savedQuestion, answers: savedAnswers, showResult: savedResult } = JSON.parse(savedState)
      setCurrentQuestion(savedQuestion)
      setAnswers(savedAnswers)
      setShowResult(savedResult)
    }
  }, [])

  // Save quiz state to localStorage
  useEffect(() => {
    const quizState = { currentQuestion, answers, showResult }
    localStorage.setItem('quizState', JSON.stringify(quizState))
  }, [currentQuestion, answers, showResult])

  const questions: QuizQuestion[] = [
    {
      id: 'age',
      question: t('questions.age.question'),
      options: [
        { text: t('questions.age.options.thisYear'), points: 3 },
        { text: t('questions.age.options.oneTwo'), points: 2 },
        { text: t('questions.age.options.threeFive'), points: 1 },
        { text: t('questions.age.options.moreThanFive'), points: 0 }
      ]
    },
    {
      id: 'mobile',
      question: t('questions.mobile.question'),
      options: [
        { text: t('questions.mobile.options.perfect'), points: 3 },
        { text: t('questions.mobile.options.works'), points: 2 },
        { text: t('questions.mobile.options.needsZoom'), points: 1 },
        { text: t('questions.mobile.options.dontKnow'), points: 0 }
      ]
    },
    {
      id: 'speed',
      question: t('questions.speed.question'),
      options: [
        { text: t('questions.speed.options.underThree'), points: 3 },
        { text: t('questions.speed.options.threeFive'), points: 2 },
        { text: t('questions.speed.options.fiveTen'), points: 1 },
        { text: t('questions.speed.options.overTen'), points: 0 }
      ]
    },
    {
      id: 'conversion',
      question: t('questions.conversion.question'),
      options: [
        { text: t('questions.conversion.options.overTen'), points: 3 },
        { text: t('questions.conversion.options.fiveTen'), points: 2 },
        { text: t('questions.conversion.options.oneFive'), points: 1 },
        { text: t('questions.conversion.options.almostNone'), points: 0 }
      ]
    },
    {
      id: 'seo',
      question: t('questions.seo.question'),
      options: [
        { text: t('questions.seo.options.firstPage'), points: 3 },
        { text: t('questions.seo.options.secondThird'), points: 2 },
        { text: t('questions.seo.options.hard'), points: 1 },
        { text: t('questions.seo.options.dontKnow'), points: 0 }
      ]
    },
    {
      id: 'content',
      question: t('questions.content.question'),
      options: [
        { text: t('questions.content.options.weekly'), points: 3 },
        { text: t('questions.content.options.monthly'), points: 2 },
        { text: t('questions.content.options.fewTimes'), points: 1 },
        { text: t('questions.content.options.almostNever'), points: 0 }
      ]
    }
  ]

  const getResult = (score: number): QuizResult => {
    if (score >= 15) {
      return {
        score,
        title: t('results.excellent.title'),
        description: t('results.excellent.description'),
        recommendations: t.raw('results.excellent.recommendations') as string[],
        urgency: 'low'
      }
    } else if (score >= 8) {
      return {
        score,
        title: t('results.good.title'),
        description: t('results.good.description'),
        recommendations: t.raw('results.good.recommendations') as string[],
        urgency: 'medium'
      }
    } else {
      return {
        score,
        title: t('results.poor.title'),
        description: t('results.poor.description'),
        recommendations: t.raw('results.poor.recommendations') as string[],
        urgency: 'high'
      }
    }
  }

  const handleAnswer = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    
    // Animate selection
    gsap.to(`.option-${optionIndex}`, {
      scale: 1.05,
      duration: 0.2,
      ease: 'power2.out'
    })

    setTimeout(() => {
      const newAnswers = [...answers, questions[currentQuestion].options[optionIndex].points]
      setAnswers(newAnswers)
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedOption(null)
      } else {
        setShowResult(true)
        // Trigger confetti for high scores
        const totalScore = newAnswers.reduce((sum, score) => sum + score, 0)
        if (totalScore >= 15) {
          triggerConfetti()
        }
      }
    }, 500)
  }

  const triggerConfetti = () => {
    if (!confettiRef.current) return
    
    const colors = ['#9333ea', '#3b82f6', '#10b981', '#f59e0b']
    const confettiCount = 50
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div')
      confetti.className = 'absolute w-2 h-2 rounded-full'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = `${Math.random() * 100}%`
      confetti.style.top = '-10px'
      confettiRef.current.appendChild(confetti)
      
      gsap.to(confetti, {
        y: window.innerHeight + 100,
        x: (Math.random() - 0.5) * 200,
        rotation: Math.random() * 720,
        duration: 2 + Math.random() * 2,
        ease: 'power1.out',
        onComplete: () => confetti.remove()
      })
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setSelectedOption(null)
    localStorage.removeItem('quizState')
  }

  useEffect(() => {
    // Animate progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${((currentQuestion + 1) / questions.length) * 100}%`,
        duration: 0.5,
        ease: 'power2.out'
      })
    }
  }, [currentQuestion, questions.length])

  const totalScore = answers.reduce((sum, score) => sum + score, 0)
  const result = getResult(totalScore)

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Confetti Container */}
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none z-20" />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239333ea' fill-opacity='0.4'%3E%3Cpath d='M0 20L20 0L40 20L20 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-2xl animate-glow">
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">{t('title')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            {t('subtitle')}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-dark rounded-3xl p-8 shadow-2xl border border-white/10"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>{t('progress.question')} {currentQuestion + 1} {t('progress.of')} {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    ref={progressRef}
                    className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                    style={{ width: '0%' }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 className="text-2xl font-bold text-white mb-6">
                {questions[currentQuestion].question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(index)}
                    className={`option-${index} w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                      selectedOption === index
                        ? 'bg-gradient-to-r from-purple-600/40 to-blue-600/40 border-purple-500/60 shadow-lg'
                        : 'bg-gray-900/50 border-gray-700/50 hover:bg-gray-800/50 hover:border-purple-500/30 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white">{option.text}</span>
                      {selectedOption === index && (
                        <Check className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Skip Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={() => handleAnswer(3)}
                  className="text-gray-300 hover:text-gray-300 text-sm transition-colors"
                >
                  {t('skipQuestion')}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="glass-dark rounded-3xl p-8 shadow-2xl border border-white/10"
            >
              {/* Result Header */}
              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
                  result.urgency === 'high' 
                    ? 'bg-red-500/20 border-2 border-red-500'
                    : result.urgency === 'medium'
                    ? 'bg-yellow-500/20 border-2 border-yellow-500'
                    : 'bg-green-500/20 border-2 border-green-500'
                }`}>
                  {result.urgency === 'high' ? (
                    <AlertTriangle className="w-10 h-10 text-red-400" />
                  ) : result.urgency === 'medium' ? (
                    <TrendingUp className="w-10 h-10 text-yellow-400" />
                  ) : (
                    <Trophy className="w-10 h-10 text-green-400" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{result.title}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl font-bold text-purple-400">{totalScore}</span>
                  <span className="text-gray-300">/ {questions.length * 3} {t('results.score')}</span>
                </div>
                <p className="text-gray-300 max-w-2xl mx-auto">{result.description}</p>
              </div>

              {/* Score Visualization */}
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-300">{t('results.overallScore')}</span>
                  <span className="text-sm text-white font-semibold">
                    {Math.round((totalScore / (questions.length * 3)) * 100)}%
                  </span>
                </div>
                <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(totalScore / (questions.length * 3)) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full ${
                      result.urgency === 'high'
                        ? 'bg-gradient-to-r from-red-600 to-orange-600'
                        : result.urgency === 'medium'
                        ? 'bg-gradient-to-r from-yellow-600 to-orange-600'
                        : 'bg-gradient-to-r from-green-600 to-blue-600'
                    }`}
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
                  {t('results.recommendations')}
                </h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start"
                    >
                      <ChevronRight className="w-5 h-5 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{rec}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {t('results.cta.consultation')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={resetQuiz}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  {t('results.cta.retake')}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
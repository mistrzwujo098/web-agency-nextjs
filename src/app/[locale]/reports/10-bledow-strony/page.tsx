'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, XCircle, TrendingDown, DollarSign, Users, Clock, Shield, Smartphone, Search, ChevronRight, Download, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function Report10BledowPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('reports.tenMistakes')
  const tCommon = useTranslations('reports.common')

  const [activeSection, setActiveSection] = useState(0)
  const [readProgress, setReadProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / total) * 100
      setReadProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mistakes = [
    {
      id: 1,
      icon: Smartphone,
      title: t('mistakes.1.title'),
      impact: t('mistakes.1.impact'),
      problem: t('mistakes.1.problem'),
      symptoms: t('mistakes.1.symptoms'),
      solution: t('mistakes.1.solution'),
      realExample: t('mistakes.1.realExample')
    },
    {
      id: 2,
      icon: Clock,
      title: t('mistakes.2.title'),
      impact: t('mistakes.2.impact'),
      problem: t('mistakes.2.problem'),
      symptoms: t('mistakes.2.symptoms'),
      solution: t('mistakes.2.solution'),
      realExample: t('mistakes.2.realExample')
    },
    {
      id: 3,
      icon: Search,
      title: t('mistakes.3.title'),
      impact: t('mistakes.3.impact'),
      problem: t('mistakes.3.problem'),
      symptoms: t('mistakes.3.symptoms'),
      solution: t('mistakes.3.solution'),
      realExample: t('mistakes.3.realExample')
    },
    {
      id: 4,
      icon: XCircle,
      title: t('mistakes.4.title'),
      impact: t('mistakes.4.impact'),
      problem: t('mistakes.4.problem'),
      symptoms: t('mistakes.4.symptoms'),
      solution: t('mistakes.4.solution'),
      realExample: t('mistakes.4.realExample')
    },
    {
      id: 5,
      icon: Users,
      title: t('mistakes.5.title'),
      impact: t('mistakes.5.impact'),
      problem: t('mistakes.5.problem'),
      symptoms: t('mistakes.5.symptoms'),
      solution: t('mistakes.5.solution'),
      realExample: t('mistakes.5.realExample')
    },
    {
      id: 6,
      icon: DollarSign,
      title: t('mistakes.6.title'),
      impact: t('mistakes.6.impact'),
      problem: t('mistakes.6.problem'),
      symptoms: t('mistakes.6.symptoms'),
      solution: t('mistakes.6.solution'),
      realExample: t('mistakes.6.realExample')
    },
    {
      id: 7,
      icon: Shield,
      title: t('mistakes.7.title'),
      impact: t('mistakes.7.impact'),
      problem: t('mistakes.7.problem'),
      symptoms: t('mistakes.7.symptoms'),
      solution: t('mistakes.7.solution'),
      realExample: t('mistakes.7.realExample')
    },
    {
      id: 8,
      icon: TrendingDown,
      title: t('mistakes.8.title'),
      impact: t('mistakes.8.impact'),
      problem: t('mistakes.8.problem'),
      symptoms: t('mistakes.8.symptoms'),
      solution: t('mistakes.8.solution'),
      realExample: t('mistakes.8.realExample')
    },
    {
      id: 9,
      icon: AlertTriangle,
      title: t('mistakes.9.title'),
      impact: t('mistakes.9.impact'),
      problem: t('mistakes.9.problem'),
      symptoms: t('mistakes.9.symptoms'),
      solution: t('mistakes.9.solution'),
      realExample: t('mistakes.9.realExample')
    },
    {
      id: 10,
      icon: Search,
      title: t('mistakes.10.title'),
      impact: t('mistakes.10.impact'),
      problem: t('mistakes.10.problem'),
      symptoms: t('mistakes.10.symptoms'),
      solution: t('mistakes.10.solution'),
      realExample: t('mistakes.10.realExample')
    }
  ]

  const calculateLostRevenue = () => {
    const avgCustomerValue = locale === 'pl' ? 250 : 100
    const monthlyVisitors = 1000
    const lostPercentage = 0.7 // średnio 70% traconych klientów
    const monthlyLoss = monthlyVisitors * lostPercentage * 0.02 * avgCustomerValue // 2% conversion rate
    const yearlyLoss = monthlyLoss * 12
    
    return {
      monthly: Math.round(monthlyLoss),
      yearly: Math.round(yearlyLoss),
      currency: locale === 'pl' ? 'PLN' : 'USD'
    }
  }

  const losses = calculateLostRevenue()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="bg-gray-900 border-b border-white/10 sticky top-1 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="text-white hover:text-purple-400 transition-colors">
              ← {tCommon('back')}
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="hidden sm:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: document.title,
                      url: window.location.href
                    })
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
{tCommon('share')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 md:pb-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">
                {tCommon('specialReport')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Lost Revenue Calculator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-dark rounded-2xl p-8 max-w-xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {t('lossCalculator.title')}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-2">{t('lossCalculator.monthly')}</p>
                  <p className="text-3xl font-bold text-red-400">
                    {losses.monthly.toLocaleString()} {losses.currency}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">{t('lossCalculator.yearly')}</p>
                  <p className="text-3xl font-bold text-red-400">
                    {losses.yearly.toLocaleString()} {losses.currency}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {t('lossCalculator.note')}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 md:py-8 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-dark rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {t('tableOfContents')}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {mistakes.map((mistake, index) => (
                <button
                  key={mistake.id}
                  onClick={() => {
                    document.getElementById(`mistake-${mistake.id}`)?.scrollIntoView({ behavior: 'smooth' })
                    setActiveSection(index)
                  }}
                  className={`text-left p-3 rounded-lg transition-all ${
                    activeSection === index 
                      ? 'bg-purple-600/20 border border-purple-600/50' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-gray-600">#{mistake.id}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{mistake.title}</p>
                      <p className="text-red-400 text-sm">{mistake.impact}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mistakes Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 md:py-16">
        <div className="container mx-auto max-w-4xl">
          {mistakes.map((mistake, index) => (
            <motion.div
              key={mistake.id}
              id={`mistake-${mistake.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Mistake Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <mistake.icon className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    #{mistake.id}. {mistake.title}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-bold">{mistake.impact}</span>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="glass-dark rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  {tCommon('problem')}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {mistake.problem}
                </p>
              </div>

              {/* Symptoms */}
              <div className="glass-dark rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  {tCommon('symptoms')}
                </h3>
                <ul className="space-y-2">
                  {mistake.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="glass-dark rounded-2xl p-6 mb-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {tCommon('solution')}
                </h3>
                <p className="text-gray-300 text-lg">
                  {mistake.solution}
                </p>
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-purple-600/30">
                <h3 className="text-lg font-semibold text-white mb-3">
                  💡 {tCommon('realExample')}
                </h3>
                <p className="text-gray-300 italic">
                  "{mistake.realExample}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summary & CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 md:py-16 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('summary.title')}
            </h2>
            
            <div className="glass-dark rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-300 mb-6">
                {t('summary.description')}
              </p>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
                <p className="text-2xl font-bold text-red-400 mb-2">
                  {t('summary.lossWarning', { amount: `${losses.yearly.toLocaleString()} ${losses.currency}` })}
                </p>
                <p className="text-gray-400">
                  {t('summary.lossNote')}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {t('summary.stats').map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className={`text-4xl font-bold mb-2 ${
                      index === 0 ? 'text-white' : 
                      index === 1 ? 'text-green-400' : 'text-blue-400'
                    }`}>{stat.value}</div>
                    <p className="text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => window.location.href = `/${locale}/free-analysis`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
{t('summary.cta')}
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {t('summary.ctaNote')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .glass-dark {
            background: white !important;
            color: black !important;
            border: 1px solid #ccc !important;
          }
          
          .text-white {
            color: black !important;
          }
          
          .text-gray-300, .text-gray-400 {
            color: #666 !important;
          }
          
          .bg-gradient-to-r {
            background: #666 !important;
          }
        }
      `}</style>
    </div>
  )
}
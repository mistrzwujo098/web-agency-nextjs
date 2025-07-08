'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, Clock, TrendingUp, DollarSign, Users, Zap, CheckCircle, ChevronRight, Download, Share2, BarChart, Settings, Mail, MessageSquare, Repeat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ReportMarketingAutopilotPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('reports.marketingAutopilot')
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

  const strategies = [
    {
      id: 1,
      icon: Mail,
      title: t('strategies.1.title'),
      timeToSet: t('strategies.1.timeToSet'),
      monthlyTime: t('strategies.1.monthlyTime'),
      roi: t('strategies.1.roi'),
      description: t('strategies.1.description'),
      howItWorks: tCommon('howItWorks'),
      steps: t('strategies.1.steps'),
      tools: t('strategies.1.tools'),
      realExample: t('strategies.1.realExample')
    },
    {
      id: 2,
      icon: Users,
      title: t('strategies.2.title'),
      timeToSet: t('strategies.2.timeToSet'),
      monthlyTime: t('strategies.2.monthlyTime'),
      roi: t('strategies.2.roi'),
      description: t('strategies.2.description'),
      howItWorks: tCommon('automaticFeatures'),
      steps: t('strategies.2.steps'),
      tools: t('strategies.2.tools'),
      realExample: t('strategies.2.realExample')
    },
    {
      id: 3,
      icon: MessageSquare,
      title: t('strategies.3.title'),
      timeToSet: t('strategies.3.timeToSet'),
      monthlyTime: t('strategies.3.monthlyTime'),
      roi: t('strategies.3.roi'),
      description: t('strategies.3.description'),
      howItWorks: tCommon('howItWorks'),
      steps: t('strategies.3.steps'),
      tools: t('strategies.3.tools'),
      realExample: t('strategies.3.realExample')
    },
    {
      id: 4,
      icon: Target,
      title: t('strategies.4.title'),
      timeToSet: t('strategies.4.timeToSet'),
      monthlyTime: t('strategies.4.monthlyTime'),
      roi: t('strategies.4.roi'),
      description: t('strategies.4.description'),
      howItWorks: tCommon('automaticProcess'),
      steps: t('strategies.4.steps'),
      tools: t('strategies.4.tools'),
      realExample: t('strategies.4.realExample')
    },
    {
      id: 5,
      icon: BarChart,
      title: t('strategies.5.title'),
      timeToSet: t('strategies.5.timeToSet'),
      monthlyTime: t('strategies.5.monthlyTime'),
      roi: t('strategies.5.roi'),
      description: t('strategies.5.description'),
      howItWorks: tCommon('contentAutomation'),
      steps: t('strategies.5.steps'),
      tools: t('strategies.5.tools'),
      realExample: t('strategies.5.realExample')
    },
    {
      id: 6,
      icon: Repeat,
      title: t('strategies.6.title'),
      timeToSet: t('strategies.6.timeToSet'),
      monthlyTime: t('strategies.6.monthlyTime'),
      roi: t('strategies.6.roi'),
      description: t('strategies.6.description'),
      howItWorks: tCommon('howItWorksProcess'),
      steps: t('strategies.6.steps'),
      tools: t('strategies.6.tools'),
      realExample: t('strategies.6.realExample')
    }
  ]

  const implementationPlan = [
    {
      week: t('implementationPlan.phases.1.week'),
      title: t('implementationPlan.phases.1.title'),
      tasks: t('implementationPlan.phases.1.tasks')
    },
    {
      week: t('implementationPlan.phases.2.week'),
      title: t('implementationPlan.phases.2.title'),
      tasks: t('implementationPlan.phases.2.tasks')
    },
    {
      week: t('implementationPlan.phases.3.week'),
      title: t('implementationPlan.phases.3.title'),
      tasks: t('implementationPlan.phases.3.tasks')
    },
    {
      week: t('implementationPlan.phases.4.week'),
      title: t('implementationPlan.phases.4.title'),
      tasks: t('implementationPlan.phases.4.tasks')
    }
  ]

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-6">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">
                {tCommon('automationGuide')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              {t('keyStats').map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold mb-2 ${
                    index === 0 ? 'text-white' : 
                    index === 1 ? 'text-green-400' : 'text-blue-400'
                  }`}>{stat.value}</div>
                  <p className="text-gray-400 text-sm">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {t('whyAutomation.title')}
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              {t('whyAutomation.description')}
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
              <p className="text-white font-semibold">
                {t('whyAutomation.quote')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Automation Strategies */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('systemsTitle')}
            </h2>
            <p className="text-gray-300">
              {t('systemsSubtitle')}
            </p>
          </motion.div>

          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Strategy Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <strategy.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    #{strategy.id}. {strategy.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        {tCommon('setup')}: <span className="text-white font-medium">{strategy.timeToSet}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">{strategy.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="glass-dark rounded-2xl p-6 mb-4">
                <p className="text-gray-300 text-lg mb-4">
                  {strategy.description}
                </p>
                
                {/* How it works */}
                <h4 className="text-white font-semibold mb-3">{strategy.howItWorks}</h4>
                <ol className="space-y-2 mb-4">
                  {strategy.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm font-medium flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>

                <p className="text-sm text-gray-400">{strategy.tools}</p>
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-600/30">
                <h4 className="text-white font-semibold mb-2">
                  ✅ {tCommon('realExample')}
                </h4>
                <p className="text-gray-300 italic">
                  "{strategy.realExample}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Implementation Plan */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('implementationPlan.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {implementationPlan.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{phase.week}</h3>
                    <p className="text-purple-400">{phase.title}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {t('roiCalculator.title')}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t('roiCalculator.withoutAutomation.title')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">{t('roiCalculator.withoutAutomation.marketingTime')}</span>
                    <span className="text-red-400 font-medium">{t('roiCalculator.withoutAutomation.timeValue')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{t('roiCalculator.withoutAutomation.timeCost')}</span>
                    <span className="text-red-400 font-medium">{t('roiCalculator.withoutAutomation.costValue')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{t('roiCalculator.withoutAutomation.leadsMonth')}</span>
                    <span className="text-red-400 font-medium">{t('roiCalculator.withoutAutomation.leadsValue')}</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {t('roiCalculator.withAutomation.title')}
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">{t('roiCalculator.withAutomation.marketingTime')}</span>
                    <span className="text-green-400 font-medium">{t('roiCalculator.withAutomation.timeValue')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{t('roiCalculator.withAutomation.toolsCost')}</span>
                    <span className="text-green-400 font-medium">{t('roiCalculator.withAutomation.costValue')}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{t('roiCalculator.withAutomation.leadsMonth')}</span>
                    <span className="text-green-400 font-medium">{t('roiCalculator.withAutomation.leadsValue')}</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-600/30">
              <p className="text-center text-xl text-white">
                {t('roiCalculator.savings')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {t('commonMistakes.title')}
            </h2>
            
            <div className="space-y-4">
              {t('commonMistakes.mistakes').map((item, index) => (
                <div key={index} className="glass-dark rounded-xl p-6">
                  <p className="text-red-400 font-semibold mb-2">❌ {item.mistake}</p>
                  <p className="text-gray-300">✅ {item.solution}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {t('finalCta.title')}
            </h2>
            
            <div className="glass-dark rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-300 mb-6">
                {t('finalCta.description')}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">{t('finalCta.stats.0.value')}</div>
                  <p className="text-gray-400">
                    {t('finalCta.stats.0.label')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">{t('finalCta.stats.1.value')}</div>
                  <p className="text-gray-400">
                    {t('finalCta.stats.1.label')}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">{t('finalCta.stats.2.value')}</div>
                  <p className="text-gray-400">
                    {t('finalCta.stats.2.label')}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = `/${locale}/free-analysis`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {t('finalCta.button')}
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {t('finalCta.note')}
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
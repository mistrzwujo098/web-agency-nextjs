'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Download, Printer, RefreshCw, TrendingUp, AlertCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

interface ChecklistItem {
  id: string
  text: string
  priority: 'critical' | 'important' | 'nice'
  checked: boolean
}

interface ChecklistCategory {
  name: string
  icon: string
  items: ChecklistItem[]
}

export default function ConversionChecklistTool() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('conversionChecklist')

  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      name: t('categories.header'),
      icon: '🎯',
      items: [
        { id: 'header-1', text: t('items.header.phone'), priority: 'critical', checked: false },
        { id: 'header-2', text: t('items.header.hours'), priority: 'critical', checked: false },
        { id: 'header-3', text: t('items.header.sticky'), priority: 'important', checked: false },
        { id: 'header-4', text: t('items.header.mobile'), priority: 'critical', checked: false },
        { id: 'header-5', text: t('items.header.search'), priority: 'nice', checked: false },
        { id: 'header-6', text: t('items.header.location'), priority: 'important', checked: false },
        { id: 'header-7', text: t('items.header.booking'), priority: 'critical', checked: false },
        { id: 'header-8', text: t('items.header.chat'), priority: 'important', checked: false }
      ]
    },
    {
      name: t('categories.homepage'),
      icon: '🏠',
      items: [
        { id: 'home-1', text: t('items.homepage.value'), priority: 'critical', checked: false },
        { id: 'home-2', text: t('items.homepage.hero'), priority: 'critical', checked: false },
        { id: 'home-3', text: t('items.homepage.area'), priority: 'critical', checked: false },
        { id: 'home-4', text: t('items.homepage.badges'), priority: 'important', checked: false },
        { id: 'home-5', text: t('items.homepage.testimonials'), priority: 'critical', checked: false },
        { id: 'home-6', text: t('items.homepage.featured'), priority: 'important', checked: false },
        { id: 'home-7', text: t('items.homepage.emergency'), priority: 'important', checked: false },
        { id: 'home-8', text: t('items.homepage.map'), priority: 'important', checked: false },
        { id: 'home-9', text: t('items.homepage.portfolio'), priority: 'important', checked: false },
        { id: 'home-10', text: t('items.homepage.offers'), priority: 'important', checked: false },
        { id: 'home-11', text: t('items.homepage.awards'), priority: 'nice', checked: false },
        { id: 'home-12', text: t('items.homepage.videoTestimonials'), priority: 'nice', checked: false }
      ]
    },
    {
      name: t('categories.content'),
      icon: '📝',
      items: [
        { id: 'content-1', text: t('items.content.headlines'), priority: 'critical', checked: false },
        { id: 'content-2', text: t('items.content.pricing'), priority: 'important', checked: false },
        { id: 'content-3', text: t('items.content.faq'), priority: 'critical', checked: false },
        { id: 'content-4', text: t('items.content.usp'), priority: 'critical', checked: false },
        { id: 'content-5', text: t('items.content.process'), priority: 'important', checked: false },
        { id: 'content-6', text: t('items.content.guarantee'), priority: 'important', checked: false },
        { id: 'content-7', text: t('items.content.beforeAfter'), priority: 'important', checked: false },
        { id: 'content-8', text: t('items.content.team'), priority: 'nice', checked: false },
        { id: 'content-9', text: t('items.content.caseStudies'), priority: 'nice', checked: false },
        { id: 'content-10', text: t('items.content.terminology'), priority: 'nice', checked: false }
      ]
    },
    {
      name: t('categories.cta'),
      icon: '🎯',
      items: [
        { id: 'cta-1', text: t('items.cta.multiple'), priority: 'critical', checked: false },
        { id: 'cta-2', text: t('items.cta.contrast'), priority: 'critical', checked: false },
        { id: 'cta-3', text: t('items.cta.actionText'), priority: 'critical', checked: false },
        { id: 'cta-4', text: t('items.cta.sticky'), priority: 'important', checked: false },
        { id: 'cta-5', text: t('items.cta.exitIntent'), priority: 'nice', checked: false },
        { id: 'cta-6', text: t('items.cta.clickToCall'), priority: 'critical', checked: false }
      ]
    },
    {
      name: t('categories.social'),
      icon: '⭐',
      items: [
        { id: 'social-1', text: t('items.social.reviews'), priority: 'critical', checked: false },
        { id: 'social-2', text: t('items.social.count'), priority: 'important', checked: false },
        { id: 'social-3', text: t('items.social.photos'), priority: 'important', checked: false },
        { id: 'social-4', text: t('items.social.associations'), priority: 'nice', checked: false },
        { id: 'social-5', text: t('items.social.media'), priority: 'nice', checked: false },
        { id: 'social-6', text: t('items.social.liveFeed'), priority: 'nice', checked: false },
        { id: 'social-7', text: t('items.social.partners'), priority: 'nice', checked: false }
      ]
    },
    {
      name: t('categories.performance'),
      icon: '🚀',
      items: [
        { id: 'perf-1', text: t('items.performance.speed'), priority: 'critical', checked: false },
        { id: 'perf-2', text: t('items.performance.mobile'), priority: 'critical', checked: false },
        { id: 'perf-3', text: t('items.performance.schema'), priority: 'important', checked: false },
        { id: 'perf-4', text: t('items.performance.ssl'), priority: 'critical', checked: false },
        { id: 'perf-5', text: t('items.performance.gmb'), priority: 'critical', checked: false },
        { id: 'perf-6', text: t('items.performance.images'), priority: 'important', checked: false },
        { id: 'perf-7', text: t('items.performance.amp'), priority: 'nice', checked: false }
      ]
    }
  ])

  const [completionRate, setCompletionRate] = useState(0)

  useEffect(() => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0)
    const checkedItems = categories.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.checked).length, 0)
    setCompletionRate(Math.round((checkedItems / totalItems) * 100))
  }, [categories])

  const toggleItem = (categoryIndex: number, itemId: string) => {
    setCategories(prev => {
      const newCategories = [...prev]
      newCategories[categoryIndex].items = newCategories[categoryIndex].items.map(item =>
        item.id === itemId ? { ...item, checked: !item.checked } : item
      )
      return newCategories
    })
  }

  const resetChecklist = () => {
    setCategories(prev => 
      prev.map(cat => ({
        ...cat,
        items: cat.items.map(item => ({ ...item, checked: false }))
      }))
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'important': return 'bg-orange-500'
      case 'nice': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'critical': return t('priorities.critical')
      case 'important': return t('priorities.important')
      case 'nice': return t('priorities.nice')
      default: return ''
    }
  }

  const exportResults = () => {
    const results = categories.map(cat => ({
      category: cat.name,
      completed: cat.items.filter(item => item.checked).length,
      total: cat.items.length,
      items: cat.items.filter(item => !item.checked).map(item => item.text)
    }))
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversion-checklist-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="text-white hover:text-purple-400 transition-colors">
              ← {t('back')}
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={resetChecklist}
                className="hidden sm:flex"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {t('reset')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="hidden sm:flex"
              >
                <Printer className="w-4 h-4 mr-2" />
                {t('print')}
              </Button>
              <Button
                size="sm"
                onClick={exportResults}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {t('export')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 max-w-4xl">
        {/* Title & Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚀 {t('title')}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {t('subtitle')}
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{t('progress')}</span>
              <span className="text-sm font-medium text-white">{completionRate}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Priority Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark rounded-2xl p-6 mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getPriorityColor('critical')}`} />
              <span className="text-white">{getPriorityLabel('critical')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getPriorityColor('important')}`} />
              <span className="text-white">{getPriorityLabel('important')}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getPriorityColor('nice')}`} />
              <span className="text-white">{getPriorityLabel('nice')}</span>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + categoryIndex * 0.05 }}
            className="mb-6"
          >
            <div className="glass-dark rounded-2xl overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    {category.name}
                  </h2>
                  <span className="text-sm text-white/80">
                    {category.items.filter(item => item.checked).length}/{category.items.length}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="p-4 space-y-2">
                {category.items.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleItem(categoryIndex, item.id)}
                      className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-white ${item.checked ? 'line-through opacity-50' : ''}`}>
                          {item.text}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Results Summary */}
        {completionRate > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-dark rounded-2xl p-8 text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              {t('results.title')}
            </h3>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              {completionRate}%
            </div>
            <p className="text-gray-300 mb-6">
              {completionRate >= 80 ? t('results.excellent')
                : completionRate >= 50 ? t('results.good')
                : t('results.needsWork')}
            </p>
            
            {completionRate < 80 && (
              <Link href={`/${locale}/#contact`}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t('results.needHelp')}
                </Button>
              </Link>
            )}
          </motion.div>
        )}

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-dark rounded-2xl p-6 flex items-start gap-4"
        >
          <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-gray-300">
            <p className="mb-2">
              {t('info.title')}
            </p>
            <p>
              {t('info.subtitle')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Floating completion counter */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 print:hidden"
      >
        <Check className="w-5 h-5" />
        <span className="font-semibold">{completionRate}%</span>
      </motion.div>
    </div>
  )
}
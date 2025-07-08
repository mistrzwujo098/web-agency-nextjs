'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, Clock, BarChart, FileText, Download, Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Metrics {
  // Current metrics
  currentVisitors: number
  currentConversion: number
  currentOrderValue: number
  
  // Expected improvements
  visitorIncrease: number
  newConversion: number
  orderValueIncrease: number
  
  // Initial costs
  designCost: number
  developmentCost: number
  contentCost: number
  mediaCost: number
  testingCost: number
  otherCost: number
  
  // Monthly costs
  hostingCost: number
  maintenanceCost: number
  marketingCost: number
}

export default function ROICalculatorTool() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('roiCalculator')

  const [activeTab, setActiveTab] = useState('data')
  const [metrics, setMetrics] = useState<Metrics>({
    currentVisitors: 5000,
    currentConversion: 2,
    currentOrderValue: 250,
    visitorIncrease: 30,
    newConversion: 3.5,
    orderValueIncrease: 15,
    designCost: 8000,
    developmentCost: 15000,
    contentCost: 3000,
    mediaCost: 2500,
    testingCost: 4000,
    otherCost: 2500,
    hostingCost: 150,
    maintenanceCost: 800,
    marketingCost: 2000,
  })

  // Calculations
  const currentMonthlyRevenue = (metrics.currentVisitors * metrics.currentConversion / 100) * metrics.currentOrderValue
  const newVisitors = metrics.currentVisitors * (1 + metrics.visitorIncrease / 100)
  const newOrderValue = metrics.currentOrderValue * (1 + metrics.orderValueIncrease / 100)
  const newMonthlyRevenue = (newVisitors * metrics.newConversion / 100) * newOrderValue
  const monthlyIncrease = newMonthlyRevenue - currentMonthlyRevenue
  
  const totalInitialCost = metrics.designCost + metrics.developmentCost + metrics.contentCost + 
                          metrics.mediaCost + metrics.testingCost + metrics.otherCost
  const totalMonthlyCost = metrics.hostingCost + metrics.maintenanceCost + metrics.marketingCost
  
  const paybackPeriod = totalInitialCost / (monthlyIncrease - totalMonthlyCost)
  const roi12Months = ((monthlyIncrease * 12 - totalMonthlyCost * 12 - totalInitialCost) / totalInitialCost) * 100
  const roi24Months = ((monthlyIncrease * 24 - totalMonthlyCost * 24 - totalInitialCost) / totalInitialCost) * 100

  const formatCurrency = (amount: number) => {
    const symbol = locale === 'pl' ? 'zł' : '$'
    return `${amount.toLocaleString()} ${symbol}`
  }

  const inputStyle = "w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 pt-20">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-6"
            >
              <Calculator className="w-8 h-8 text-white" />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {[
              { id: 'data', label: t('tabs.data'), icon: FileText },
              { id: 'results', label: t('tabs.results'), icon: TrendingUp },
              { id: 'chart', label: t('tabs.chart'), icon: BarChart }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="glass-dark rounded-3xl p-8">
            {activeTab === 'data' && (
              <div className="space-y-8">
                {/* Current Metrics */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    {t('current.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">{t('current.visitors')}</label>
                      <input
                        type="number"
                        value={metrics.currentVisitors}
                        onChange={(e) => setMetrics({...metrics, currentVisitors: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('current.conversion')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={metrics.currentConversion}
                        onChange={(e) => setMetrics({...metrics, currentConversion: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('current.orderValue')}</label>
                      <input
                        type="number"
                        value={metrics.currentOrderValue}
                        onChange={(e) => setMetrics({...metrics, currentOrderValue: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
                    <p className="text-blue-300">
                      <strong>{t('current.revenue')}:</strong> {formatCurrency(currentMonthlyRevenue)}
                    </p>
                  </div>
                </div>

                {/* Expected Improvements */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    {t('improvements.title')}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">{t('improvements.visitorIncrease')}</label>
                      <input
                        type="number"
                        value={metrics.visitorIncrease}
                        onChange={(e) => setMetrics({...metrics, visitorIncrease: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('improvements.newConversion')}</label>
                      <input
                        type="number"
                        step="0.1"
                        value={metrics.newConversion}
                        onChange={(e) => setMetrics({...metrics, newConversion: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('improvements.orderValueIncrease')}</label>
                      <input
                        type="number"
                        value={metrics.orderValueIncrease}
                        onChange={(e) => setMetrics({...metrics, orderValueIncrease: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Initial Costs */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Calculator className="w-6 h-6 text-orange-400" />
                    {t('costs.title')}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.design')}</label>
                      <input
                        type="number"
                        value={metrics.designCost}
                        onChange={(e) => setMetrics({...metrics, designCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.development')}</label>
                      <input
                        type="number"
                        value={metrics.developmentCost}
                        onChange={(e) => setMetrics({...metrics, developmentCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.content')}</label>
                      <input
                        type="number"
                        value={metrics.contentCost}
                        onChange={(e) => setMetrics({...metrics, contentCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.media')}</label>
                      <input
                        type="number"
                        value={metrics.mediaCost}
                        onChange={(e) => setMetrics({...metrics, mediaCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.testing')}</label>
                      <input
                        type="number"
                        value={metrics.testingCost}
                        onChange={(e) => setMetrics({...metrics, testingCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.other')}</label>
                      <input
                        type="number"
                        value={metrics.otherCost}
                        onChange={(e) => setMetrics({...metrics, otherCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                {/* Monthly Costs */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Clock className="w-6 h-6 text-red-400" />
                    {t('costs.monthly')}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.hosting')}</label>
                      <input
                        type="number"
                        value={metrics.hostingCost}
                        onChange={(e) => setMetrics({...metrics, hostingCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.maintenance')}</label>
                      <input
                        type="number"
                        value={metrics.maintenanceCost}
                        onChange={(e) => setMetrics({...metrics, maintenanceCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">{t('costs.marketing')}</label>
                      <input
                        type="number"
                        value={metrics.marketingCost}
                        onChange={(e) => setMetrics({...metrics, marketingCost: Number(e.target.value)})}
                        className={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center pt-6">
                  <Button
                    onClick={() => setActiveTab('results')}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-lg"
                  >
                    {t('buttons.calculate')}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'results' && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white text-center mb-8">
                  {t('results.title')}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                    <h4 className="text-blue-300 font-semibold mb-2">{t('results.currentRevenue')}</h4>
                    <p className="text-2xl font-bold text-white">{formatCurrency(currentMonthlyRevenue)}</p>
                  </div>

                  <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
                    <h4 className="text-green-300 font-semibold mb-2">{t('results.newRevenue')}</h4>
                    <p className="text-2xl font-bold text-white">{formatCurrency(newMonthlyRevenue)}</p>
                  </div>

                  <div className="bg-purple-500/20 rounded-xl p-6 border border-purple-500/30">
                    <h4 className="text-purple-300 font-semibold mb-2">{t('results.monthlyIncrease')}</h4>
                    <p className="text-2xl font-bold text-white">{formatCurrency(monthlyIncrease)}</p>
                  </div>

                  <div className="bg-orange-500/20 rounded-xl p-6 border border-orange-500/30">
                    <h4 className="text-orange-300 font-semibold mb-2">{t('results.totalInitialCost')}</h4>
                    <p className="text-2xl font-bold text-white">{formatCurrency(totalInitialCost)}</p>
                  </div>

                  <div className="bg-red-500/20 rounded-xl p-6 border border-red-500/30">
                    <h4 className="text-red-300 font-semibold mb-2">{t('results.totalMonthlyCost')}</h4>
                    <p className="text-2xl font-bold text-white">{formatCurrency(totalMonthlyCost)}</p>
                  </div>

                  <div className="bg-yellow-500/20 rounded-xl p-6 border border-yellow-500/30">
                    <h4 className="text-yellow-300 font-semibold mb-2">{t('results.paybackPeriod')}</h4>
                    <p className="text-2xl font-bold text-white">
                      {paybackPeriod > 0 ? `${paybackPeriod.toFixed(1)} ${t('results.months')}` : 'N/A'}
                    </p>
                  </div>

                  <div className="bg-emerald-500/20 rounded-xl p-6 border border-emerald-500/30">
                    <h4 className="text-emerald-300 font-semibold mb-2">{t('results.roi12months')}</h4>
                    <p className="text-2xl font-bold text-white">{roi12Months.toFixed(1)}%</p>
                  </div>

                  <div className="bg-cyan-500/20 rounded-xl p-6 border border-cyan-500/30">
                    <h4 className="text-cyan-300 font-semibold mb-2">{t('results.roi24months')}</h4>
                    <p className="text-2xl font-bold text-white">{roi24Months.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                    <Download className="w-4 h-4 mr-2" />
                    {t('buttons.download')}
                  </Button>
                  <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                    <Printer className="w-4 h-4 mr-2" />
                    {t('buttons.print')}
                  </Button>
                </div>
              </div>
            )}

            {activeTab === 'chart' && (
              <div className="space-y-8">
                <h3 className="text-3xl font-bold text-white text-center mb-8">
                  {t('results.chart.title')}
                </h3>

                <div className="bg-white/5 rounded-xl p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-blue-300 mb-4">{t('results.chart.current')}</h4>
                      <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-500/30">
                        <p className="text-3xl font-bold text-white">{formatCurrency(currentMonthlyRevenue)}</p>
                        <p className="text-gray-300 mt-2">per month</p>
                      </div>
                    </div>

                    <div className="text-center">
                      <h4 className="text-xl font-bold text-green-300 mb-4">{t('results.chart.projected')}</h4>
                      <div className="bg-green-500/20 rounded-xl p-6 border border-green-500/30">
                        <p className="text-3xl font-bold text-white">{formatCurrency(newMonthlyRevenue)}</p>
                        <p className="text-gray-300 mt-2">per month</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-2 bg-purple-500/20 rounded-xl px-6 py-3 border border-purple-500/30">
                      <TrendingUp className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-semibold">
                        {t('results.monthlyIncrease')}: {formatCurrency(monthlyIncrease)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Back to Tools */}
          <div className="text-center mt-12">
            <Link href={`/${locale}`}>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                ← Back to Homepage
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
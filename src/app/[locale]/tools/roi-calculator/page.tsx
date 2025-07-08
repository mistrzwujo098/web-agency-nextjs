'use client'

import { useState, useEffect } from 'react'
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
  const isPL = locale === 'pl'

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
    mediaCost: 2000,
    testingCost: 2000,
    otherCost: 0,
    hostingCost: 200,
    maintenanceCost: 500,
    marketingCost: 1000
  })

  // Calculated values
  const [calculations, setCalculations] = useState({
    currentRevenue: 0,
    projectedRevenue: 0,
    revenueIncrease: 0,
    totalInitialCost: 0,
    totalMonthlyCost: 0,
    monthlyNetProfit: 0,
    monthlyROI: 0,
    paybackPeriod: 0,
    firstYearProfit: 0,
    annualROI: 0,
    newVisitors: 0,
    newOrderValue: 0,
    currentTransactions: 0,
    newTransactions: 0
  })

  useEffect(() => {
    calculateROI()
  }, [metrics])

  const calculateROI = () => {
    const newVisitors = metrics.currentVisitors * (1 + metrics.visitorIncrease / 100)
    const newOrderValue = metrics.currentOrderValue * (1 + metrics.orderValueIncrease / 100)
    
    const currentRevenue = metrics.currentVisitors * (metrics.currentConversion / 100) * metrics.currentOrderValue
    const projectedRevenue = newVisitors * (metrics.newConversion / 100) * newOrderValue
    const revenueIncrease = projectedRevenue - currentRevenue
    
    const totalInitialCost = metrics.designCost + metrics.developmentCost + metrics.contentCost + 
                            metrics.mediaCost + metrics.testingCost + metrics.otherCost
    
    const totalMonthlyCost = metrics.hostingCost + metrics.maintenanceCost + metrics.marketingCost
    
    const monthlyNetProfit = revenueIncrease - totalMonthlyCost
    const monthlyROI = totalInitialCost > 0 ? (monthlyNetProfit / totalInitialCost) * 100 : 0
    const paybackPeriod = monthlyNetProfit > 0 ? totalInitialCost / monthlyNetProfit : 999
    const firstYearProfit = (monthlyNetProfit * 12) - totalInitialCost
    const annualROI = totalInitialCost > 0 ? (firstYearProfit / totalInitialCost) * 100 : 0
    
    const currentTransactions = metrics.currentVisitors * (metrics.currentConversion / 100)
    const newTransactions = newVisitors * (metrics.newConversion / 100)
    
    setCalculations({
      currentRevenue,
      projectedRevenue,
      revenueIncrease,
      totalInitialCost,
      totalMonthlyCost,
      monthlyNetProfit,
      monthlyROI,
      paybackPeriod,
      firstYearProfit,
      annualROI,
      newVisitors,
      newOrderValue,
      currentTransactions,
      newTransactions
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isPL ? 'pl-PL' : 'en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.round(amount)) + (isPL ? ' PLN' : ' USD')
  }

  const formatPercentage = (value: number) => {
    return value.toFixed(1) + '%'
  }

  const updateMetric = (key: keyof Metrics, value: number) => {
    setMetrics(prev => ({ ...prev, [key]: value }))
  }

  const exportResults = () => {
    const results = {
      metrics,
      calculations,
      date: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `roi-calculation-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const tabs = [
    { id: 'data', label: isPL ? '📊 Dane Wejściowe' : '📊 Input Data', icon: BarChart },
    { id: 'costs', label: isPL ? '💰 Koszty Inwestycji' : '💰 Investment Costs', icon: DollarSign },
    { id: 'analysis', label: isPL ? '📈 Analiza ROI' : '📈 ROI Analysis', icon: TrendingUp },
    { id: 'comparison', label: isPL ? '🔄 Porównanie' : '🔄 Comparison', icon: BarChart },
    { id: 'summary', label: isPL ? '📋 Podsumowanie' : '📋 Summary', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="text-white hover:text-purple-400 transition-colors">
              ← {isPL ? 'Powrót' : 'Back'}
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="hidden sm:flex"
              >
                <Printer className="w-4 h-4 mr-2" />
                {isPL ? 'Drukuj' : 'Print'}
              </Button>
              <Button
                size="sm"
                onClick={exportResults}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Download className="w-4 h-4 mr-2" />
                {isPL ? 'Eksportuj' : 'Export'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🌐 {isPL ? 'Kalkulator ROI Nowej Strony Internetowej' : 'Website ROI Calculator'}
          </h1>
          <p className="text-xl text-gray-300">
            {isPL 
              ? 'Oblicz zwrot z inwestycji w nową stronę'
              : 'Calculate the return on investment for your new website'}
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 glass-dark rounded-lg p-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Input Data Tab */}
          {activeTab === 'data' && (
            <div className="space-y-8">
              {/* Current Metrics */}
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Obecne Wskaźniki Strony' : 'Current Website Metrics'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Miesięczna liczba odwiedzających' : 'Monthly Visitors'}
                    </label>
                    <input
                      type="number"
                      value={metrics.currentVisitors}
                      onChange={(e) => updateMetric('currentVisitors', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Współczynnik konwersji (%)' : 'Conversion Rate (%)'}
                    </label>
                    <input
                      type="number"
                      value={metrics.currentConversion}
                      onChange={(e) => updateMetric('currentConversion', Number(e.target.value))}
                      step="0.1"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Średnia wartość zamówienia' : 'Average Order Value'}
                    </label>
                    <input
                      type="number"
                      value={metrics.currentOrderValue}
                      onChange={(e) => updateMetric('currentOrderValue', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Expected Improvements */}
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Przewidywane Ulepszenia z Nową Stroną' : 'Expected Improvements with New Website'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Wzrost liczby odwiedzających (%)' : 'Visitor Increase (%)'}
                    </label>
                    <input
                      type="number"
                      value={metrics.visitorIncrease}
                      onChange={(e) => updateMetric('visitorIncrease', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Nowy współczynnik konwersji (%)' : 'New Conversion Rate (%)'}
                    </label>
                    <input
                      type="number"
                      value={metrics.newConversion}
                      onChange={(e) => updateMetric('newConversion', Number(e.target.value))}
                      step="0.1"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Wzrost średniej wartości zamówienia (%)' : 'Order Value Increase (%)'}
                    </label>
                    <input
                      type="number"
                      value={metrics.orderValueIncrease}
                      onChange={(e) => updateMetric('orderValueIncrease', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Revenue Preview */}
              <div className="glass-dark rounded-2xl p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {isPL ? 'Przewidywane Miesięczne Przychody' : 'Projected Monthly Revenue'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2">{isPL ? 'Obecne przychody:' : 'Current Revenue:'}</p>
                    <div className="text-3xl font-bold text-white">{formatCurrency(calculations.currentRevenue)}</div>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">{isPL ? 'Przewidywane przychody:' : 'Projected Revenue:'}</p>
                    <div className="text-3xl font-bold text-green-400">{formatCurrency(calculations.projectedRevenue)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Investment Costs Tab */}
          {activeTab === 'costs' && (
            <div className="space-y-8">
              {/* Initial Costs */}
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Jednorazowe Koszty Wdrożenia' : 'One-time Implementation Costs'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Projekt graficzny' : 'Design'}
                    </label>
                    <input
                      type="number"
                      value={metrics.designCost}
                      onChange={(e) => updateMetric('designCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Programowanie' : 'Development'}
                    </label>
                    <input
                      type="number"
                      value={metrics.developmentCost}
                      onChange={(e) => updateMetric('developmentCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Treści i copywriting' : 'Content & Copywriting'}
                    </label>
                    <input
                      type="number"
                      value={metrics.contentCost}
                      onChange={(e) => updateMetric('contentCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Fotografie/Grafiki' : 'Photos/Graphics'}
                    </label>
                    <input
                      type="number"
                      value={metrics.mediaCost}
                      onChange={(e) => updateMetric('mediaCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Testy i optymalizacja' : 'Testing & Optimization'}
                    </label>
                    <input
                      type="number"
                      value={metrics.testingCost}
                      onChange={(e) => updateMetric('testingCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Inne koszty' : 'Other Costs'}
                    </label>
                    <input
                      type="number"
                      value={metrics.otherCost}
                      onChange={(e) => updateMetric('otherCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Monthly Costs */}
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Miesięczne Koszty Utrzymania' : 'Monthly Maintenance Costs'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Hosting' : 'Hosting'}
                    </label>
                    <input
                      type="number"
                      value={metrics.hostingCost}
                      onChange={(e) => updateMetric('hostingCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Utrzymanie i aktualizacje' : 'Maintenance & Updates'}
                    </label>
                    <input
                      type="number"
                      value={metrics.maintenanceCost}
                      onChange={(e) => updateMetric('maintenanceCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">
                      {isPL ? 'Marketing/SEO' : 'Marketing/SEO'}
                    </label>
                    <input
                      type="number"
                      value={metrics.marketingCost}
                      onChange={(e) => updateMetric('marketingCost', Number(e.target.value))}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Cost Summary */}
              <div className="glass-dark rounded-2xl p-6 bg-gradient-to-br from-red-900/20 to-orange-900/20">
                <h3 className="text-lg font-semibold text-white mb-4">
                  {isPL ? 'Podsumowanie Kosztów' : 'Cost Summary'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2">{isPL ? 'Całkowite koszty początkowe:' : 'Total Initial Costs:'}</p>
                    <div className="text-3xl font-bold text-red-400">{formatCurrency(calculations.totalInitialCost)}</div>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">{isPL ? 'Miesięczne koszty:' : 'Monthly Costs:'}</p>
                    <div className="text-3xl font-bold text-orange-400">{formatCurrency(calculations.totalMonthlyCost)}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ROI Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-8">
              {/* Monthly ROI */}
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Miesięczna Analiza ROI' : 'Monthly ROI Analysis'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">{isPL ? 'Miesięczny wzrost przychodów:' : 'Monthly Revenue Increase:'}</p>
                    <div className="text-3xl font-bold text-green-400">{formatCurrency(calculations.revenueIncrease)}</div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">{isPL ? 'Miesięczny zysk netto:' : 'Monthly Net Profit:'}</p>
                    <div className="text-3xl font-bold text-green-400">{formatCurrency(calculations.monthlyNetProfit)}</div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">{isPL ? 'Miesięczny ROI:' : 'Monthly ROI:'}</p>
                    <div className="text-3xl font-bold text-green-400">{formatPercentage(calculations.monthlyROI)}</div>
                  </div>
                </div>
              </div>

              {/* Payback Analysis */}
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Analiza Zwrotu Inwestycji' : 'Payback Analysis'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">{isPL ? 'Czas zwrotu inwestycji:' : 'Payback Period:'}</p>
                    <div className="text-3xl font-bold text-blue-400">
                      {calculations.paybackPeriod < 999 
                        ? `${calculations.paybackPeriod.toFixed(1)} ${isPL ? 'miesiąca' : 'months'}`
                        : 'N/A'}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">{isPL ? 'Roczny zysk netto:' : 'First Year Net Profit:'}</p>
                    <div className="text-3xl font-bold text-green-400">{formatCurrency(calculations.firstYearProfit)}</div>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400 mb-2">{isPL ? 'ROI po 12 miesiącach:' : '12-Month ROI:'}</p>
                    <div className="text-3xl font-bold text-green-400">{formatPercentage(calculations.annualROI)}</div>
                  </div>
                </div>
              </div>

              {/* 24-Month Projection */}
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Projekcja 24-miesięczna' : '24-Month Projection'}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Miesiąc' : 'Month'}
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Skumulowane przychody' : 'Cumulative Revenue'}
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Skumulowane koszty' : 'Cumulative Costs'}
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Zysk/Strata netto' : 'Net Profit/Loss'}
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">ROI (%)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[3, 6, 9, 12, 18, 24].map(month => {
                        const cumulativeRevenue = (calculations.monthlyNetProfit + calculations.totalMonthlyCost) * month
                        const cumulativeCosts = calculations.totalInitialCost + (calculations.totalMonthlyCost * month)
                        const netProfit = cumulativeRevenue - cumulativeCosts
                        const roi = calculations.totalInitialCost > 0 ? (netProfit / calculations.totalInitialCost) * 100 : 0
                        
                        return (
                          <tr key={month} className="border-b border-gray-800">
                            <td className="py-3 px-4 text-white">
                              {isPL ? `Miesiąc ${month}` : `Month ${month}`}
                            </td>
                            <td className="py-3 px-4 text-right text-white">{formatCurrency(cumulativeRevenue)}</td>
                            <td className="py-3 px-4 text-right text-white">{formatCurrency(cumulativeCosts)}</td>
                            <td className={`py-3 px-4 text-right font-semibold ${netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {formatCurrency(netProfit)}
                            </td>
                            <td className={`py-3 px-4 text-right font-semibold ${roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                              {formatPercentage(roi)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Comparison Tab */}
          {activeTab === 'comparison' && (
            <div className="space-y-8">
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Porównanie: Obecna Strona vs Nowa Strona' : 'Comparison: Current vs New Website'}
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Wskaźnik' : 'Metric'}
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Obecna Strona' : 'Current Website'}
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Nowa Strona' : 'New Website'}
                        </th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-400">
                          {isPL ? 'Zmiana' : 'Change'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white">{isPL ? 'Miesięczni odwiedzający' : 'Monthly Visitors'}</td>
                        <td className="py-3 px-4 text-right text-white">{metrics.currentVisitors.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">{Math.round(calculations.newVisitors).toLocaleString()}</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">+{metrics.visitorIncrease}%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white">{isPL ? 'Współczynnik konwersji' : 'Conversion Rate'}</td>
                        <td className="py-3 px-4 text-right text-white">{metrics.currentConversion}%</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">{metrics.newConversion}%</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">
                          +{((metrics.newConversion - metrics.currentConversion) / metrics.currentConversion * 100).toFixed(0)}%
                        </td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white">{isPL ? 'Średnia wartość zamówienia' : 'Average Order Value'}</td>
                        <td className="py-3 px-4 text-right text-white">{formatCurrency(metrics.currentOrderValue)}</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">{formatCurrency(calculations.newOrderValue)}</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">+{metrics.orderValueIncrease}%</td>
                      </tr>
                      <tr className="border-b border-gray-800">
                        <td className="py-3 px-4 text-white">{isPL ? 'Liczba transakcji miesięcznie' : 'Monthly Transactions'}</td>
                        <td className="py-3 px-4 text-right text-white">{Math.round(calculations.currentTransactions)}</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">{Math.round(calculations.newTransactions)}</td>
                        <td className="py-3 px-4 text-right text-green-400 font-semibold">
                          +{((calculations.newTransactions - calculations.currentTransactions) / calculations.currentTransactions * 100).toFixed(0)}%
                        </td>
                      </tr>
                      <tr className="border-b border-gray-800 bg-white/5">
                        <td className="py-4 px-4 text-white font-semibold">{isPL ? 'Miesięczne przychody' : 'Monthly Revenue'}</td>
                        <td className="py-4 px-4 text-right text-white font-semibold">{formatCurrency(calculations.currentRevenue)}</td>
                        <td className="py-4 px-4 text-right text-green-400 font-bold text-lg">{formatCurrency(calculations.projectedRevenue)}</td>
                        <td className="py-4 px-4 text-right text-green-400 font-bold text-lg">
                          +{((calculations.projectedRevenue - calculations.currentRevenue) / calculations.currentRevenue * 100).toFixed(0)}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Visual Comparison */}
              <div className="glass-dark rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6">{isPL ? 'Wizualizacja Porównania' : 'Visual Comparison'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-2">{isPL ? 'Przychody Obecne' : 'Current Revenue'}</div>
                      <div className="relative h-40 bg-gray-800 rounded-lg overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-red-500 rounded-t-lg transition-all duration-1000"
                             style={{ height: '100%' }}>
                          <div className="flex items-center justify-center h-full">
                            <span className="text-white font-bold text-xl">{formatCurrency(calculations.currentRevenue)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="mb-4">
                      <div className="text-sm text-gray-400 mb-2">{isPL ? 'Przychody Po Zmianie' : 'Revenue After Change'}</div>
                      <div className="relative h-40 bg-gray-800 rounded-lg overflow-hidden">
                        <div className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t-lg transition-all duration-1000"
                             style={{ height: `${Math.min((calculations.projectedRevenue / calculations.currentRevenue) * 100, 100)}%` }}>
                          <div className="flex items-center justify-center h-full">
                            <span className="text-white font-bold text-xl">{formatCurrency(calculations.projectedRevenue)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary Tab */}
          {activeTab === 'summary' && (
            <div className="space-y-8">
              <div className="glass-dark rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {isPL ? 'Podsumowanie Wykonawcze' : 'Executive Summary'}
                </h2>
                
                {/* Key Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-center">
                    <h3 className="text-sm text-purple-200 mb-2">{isPL ? 'Całkowita Inwestycja' : 'Total Investment'}</h3>
                    <div className="text-2xl font-bold text-white">{formatCurrency(calculations.totalInitialCost)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-center">
                    <h3 className="text-sm text-blue-200 mb-2">{isPL ? 'Czas Zwrotu' : 'Payback Period'}</h3>
                    <div className="text-2xl font-bold text-white">
                      {calculations.paybackPeriod < 999 
                        ? `${calculations.paybackPeriod.toFixed(1)} ${isPL ? 'mies.' : 'mo.'}`
                        : 'N/A'}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 text-center">
                    <h3 className="text-sm text-green-200 mb-2">{isPL ? 'Roczny Zysk Netto' : 'Annual Net Profit'}</h3>
                    <div className="text-2xl font-bold text-white">{formatCurrency(calculations.firstYearProfit)}</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6 text-center">
                    <h3 className="text-sm text-orange-200 mb-2">{isPL ? 'ROI (12 mies.)' : 'ROI (12 mo.)'}</h3>
                    <div className="text-2xl font-bold text-white">{formatPercentage(calculations.annualROI)}</div>
                  </div>
                </div>

                {/* Key Findings */}
                <div className="bg-gray-800/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {isPL ? 'Kluczowe Wnioski' : 'Key Findings'}
                  </h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>
                        {isPL ? 'Inwestycja w nową stronę internetową zwróci się w ' : 'Investment in new website will pay back in '}
                        <strong className="text-white">
                          {calculations.paybackPeriod < 999 
                            ? `${calculations.paybackPeriod.toFixed(1)} ${isPL ? 'miesiąca' : 'months'}`
                            : 'N/A'}
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>
                        {isPL ? 'Miesięczne przychody wzrosną o ' : 'Monthly revenue will increase by '}
                        <strong className="text-white">
                          {((calculations.projectedRevenue - calculations.currentRevenue) / calculations.currentRevenue * 100).toFixed(0)}%
                        </strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>
                        {isPL ? 'Po pierwszym roku zysk netto wyniesie ' : 'After the first year, net profit will be '}
                        <strong className="text-white">{formatCurrency(calculations.firstYearProfit)}</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>
                        {isPL ? 'Współczynnik konwersji wzrośnie z ' : 'Conversion rate will increase from '}
                        <strong className="text-white">{metrics.currentConversion}%</strong>
                        {isPL ? ' do ' : ' to '}
                        <strong className="text-white">{metrics.newConversion}%</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>
                        {isPL ? 'Liczba transakcji miesięcznie wzrośnie o ' : 'Monthly transactions will increase by '}
                        <strong className="text-white">
                          {((calculations.newTransactions - calculations.currentTransactions) / calculations.currentTransactions * 100).toFixed(0)}%
                        </strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="glass-dark rounded-2xl p-8 text-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                <Calculator className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-4">
                  {isPL ? 'Gotowy na nową stronę?' : 'Ready for a New Website?'}
                </h3>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  {isPL 
                    ? 'Te obliczenia pokazują jasno - profesjonalna strona internetowa to inwestycja, która się zwraca. Skontaktuj się z nami, aby dowiedzieć się więcej.'
                    : 'These calculations clearly show - a professional website is an investment that pays off. Contact us to learn more.'}
                </p>
                <Link href={`/${locale}/#contact`}>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    {isPL ? 'Porozmawiajmy o Twojej stronie' : "Let's Talk About Your Website"}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .glass-dark {
            background: white !important;
            color: black !important;
            border: 1px solid #ccc !important;
          }
          
          input {
            border: 1px solid #000 !important;
            background: white !important;
            color: black !important;
          }
          
          .text-white {
            color: black !important;
          }
          
          .text-gray-300, .text-gray-400 {
            color: #666 !important;
          }
        }
      `}</style>
    </div>
  )
}
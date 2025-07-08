'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Calculator, TrendingUp, DollarSign, BarChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

export function ROICalculator() {
  const t = useTranslations('roiCalculator')
  const params = useParams()
  const locale = params.locale as string
  
  const [visitors, setVisitors] = useState(1000)
  const [conversionRate, setConversionRate] = useState(2)
  const [orderValue, setOrderValue] = useState(locale === 'pl' ? 150 : 50)

  const currentLeads = Math.round(visitors * (conversionRate / 100))
  const currentRevenue = currentLeads * orderValue

  const improvedConversionRate = conversionRate * 1.3
  const improvedLeads = Math.round(visitors * (improvedConversionRate / 100))
  const improvedRevenue = improvedLeads * orderValue

  const monthlyGain = improvedRevenue - currentRevenue
  const yearlyGain = monthlyGain * 12

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/10 to-gray-900" />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-4">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">{t('sectionTitle')}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-dark rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">{t('current.titleShort')}</h3>
            
            <div className="space-y-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  {t('current.visitorsLabel')}
                </label>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={visitors}
                  onChange={(e) => setVisitors(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">100</span>
                  <span className="text-white font-semibold">{visitors.toLocaleString(locale)}</span>
                  <span className="text-gray-500">10k</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  {t('current.conversionLabel')}
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">0.5%</span>
                  <span className="text-white font-semibold">{conversionRate}%</span>
                  <span className="text-gray-500">10%</span>
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-2 block">
                  {t('current.orderValueLabel')}
                </label>
                <input
                  type="range"
                  min={locale === 'pl' ? 50 : 10}
                  max={locale === 'pl' ? 1000 : 500}
                  step={locale === 'pl' ? 50 : 10}
                  value={orderValue}
                  onChange={(e) => setOrderValue(Number(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-500">{locale === 'pl' ? '50 zł' : '$10'}</span>
                  <span className="text-white font-semibold">
                    {locale === 'pl' ? `${orderValue} zł` : `$${orderValue}`}
                  </span>
                  <span className="text-gray-500">{locale === 'pl' ? '1000 zł' : '$500'}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-800/50 rounded-xl">
              <p className="text-sm text-gray-400 mb-2">{t('current.currentSituation')}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">{currentLeads}</p>
                  <p className="text-sm text-gray-400">{t('current.leadsPerMonth')}</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {locale === 'pl' 
                      ? `${currentRevenue.toLocaleString('pl-PL')} zł`
                      : `$${currentRevenue.toLocaleString('en-US')}`
                    }
                  </p>
                  <p className="text-sm text-gray-400">{t('current.revenuePerMonth')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-dark rounded-3xl p-8 border-2 border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{t('improvements.afterOptimization')}</h3>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white">{improvedLeads}</p>
                  <p className="text-sm text-gray-400">{t('current.leadsPerMonth')}</p>
                  <p className="text-sm text-green-400 mt-1">+{improvedLeads - currentLeads} ({((improvedLeads / currentLeads - 1) * 100).toFixed(0)}%)</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-3xl font-bold text-white">
                    {locale === 'pl' 
                      ? `${improvedRevenue.toLocaleString('pl-PL')} zł`
                      : `$${improvedRevenue.toLocaleString('en-US')}`
                    }
                  </p>
                  <p className="text-sm text-gray-400">{t('current.revenuePerMonth')}</p>
                  <p className="text-sm text-green-400 mt-1">+30%</p>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-3xl p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{t('results.yourPotentialProfit')}</h3>
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t('results.additionalRevenueMonth')}</span>
                  <span className="text-2xl font-bold text-green-400">
                    {locale === 'pl' 
                      ? `+${monthlyGain.toLocaleString('pl-PL')} zł`
                      : `+$${monthlyGain.toLocaleString('en-US')}`
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">{t('results.additionalRevenueYear')}</span>
                  <span className="text-3xl font-bold text-green-400">
                    {locale === 'pl' 
                      ? `+${yearlyGain.toLocaleString('pl-PL')} zł`
                      : `+$${yearlyGain.toLocaleString('en-US')}`
                    }
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl text-lg py-6"
                onClick={() => {
                  const contactSection = document.getElementById('contact')
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
              >
                {t('cta')}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
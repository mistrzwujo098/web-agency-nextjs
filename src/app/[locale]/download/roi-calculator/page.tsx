'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, CheckCircle, Calculator, TrendingUp, DollarSign, BarChart3, PieChart, LineChart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

export default function ROICalculatorPage() {
  const params = useParams()
  const locale = params.locale as string
  const isPL = locale === 'pl'
  
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const content = {
    pl: {
      badge: 'KALKULATOR EXCEL',
      format: 'Excel/Google Sheets',
      title: 'Kalkulator ROI dla nowej strony',
      subtitle: 'Oblicz dokładny zwrot z inwestycji w nową stronę internetową. Zobacz, kiedy się zwróci i ile zarobisz w pierwszym roku.',
      highlight: 'średni ROI: 380% w 12 miesięcy',
      features: [
        {
          icon: Calculator,
          title: 'Automatyczne obliczenia',
          description: 'Wprowadź dane, reszta sama się wyliczy'
        },
        {
          icon: BarChart3,
          title: 'Wykresy i analizy',
          description: 'Wizualizacja zwrotu w czasie'
        },
        {
          icon: TrendingUp,
          title: 'Scenariusze wzrostu',
          description: 'Pesymistyczny, realny, optymistyczny'
        },
        {
          icon: DollarSign,
          title: 'Analiza kosztów',
          description: 'Wszystkie koszty w jednym miejscu'
        }
      ],
      whatYouCalculate: 'Co możesz obliczyć?',
      calculations: [
        'Aktualną wartość straconych leadów',
        'Przewidywany wzrost konwersji',
        'Miesięczny i roczny przyrost przychodów',
        'Czas zwrotu inwestycji (ROI)',
        'Porównanie: obecna vs nowa strona',
        'Koszty alternatywne (co tracisz czekając)'
      ],
      formTitle: 'Pobierz kalkulator za darmo',
      emailPlaceholder: 'Twój email...',
      submitButton: 'Pobierz kalkulator (Excel)',
      submitting: 'Wysyłanie...',
      disclaimer: 'Otrzymasz też case studies pokazujące rzeczywiste wyniki.',
      successTitle: 'Kalkulator wysłany!',
      successMessage: 'Sprawdź email i pobierz plik',
      stats: [
        { value: '1800+', label: 'pobrań' },
        { value: '380%', label: 'średni ROI' }
      ],
      instructions: 'Jak używać kalkulatora?',
      steps: [
        {
          icon: '📊',
          title: '1. Wprowadź obecne dane',
          items: ['Liczba odwiedzających miesięcznie', 'Obecny współczynnik konwersji', 'Średnia wartość klienta']
        },
        {
          icon: '🎯',
          title: '2. Ustaw cele wzrostu',
          items: ['Oczekiwany wzrost ruchu', 'Cel konwersji', 'Planowany budżet']
        },
        {
          icon: '📈',
          title: '3. Analizuj wyniki',
          items: ['Sprawdź czas zwrotu', 'Zobacz projekcje roczne', 'Porównaj scenariusze']
        }
      ],
      realResults: 'Rzeczywiste wyniki naszych klientów:',
      caseStudies: [
        {
          business: 'Salon kosmetyczny',
          investment: '4 900 zł',
          monthlyReturn: '2 100 zł/msc',
          roi: '515% w roku',
          time: '2,3 miesiąca'
        },
        {
          business: 'Warsztat samochodowy',
          investment: '6 500 zł',
          monthlyReturn: '3 200 zł/msc',
          roi: '590% w roku',
          time: '2 miesiące'
        },
        {
          business: 'Gabinet stomatologiczny',
          investment: '8 900 zł',
          monthlyReturn: '5 400 zł/msc',
          roi: '728% w roku',
          time: '1,6 miesiąca'
        }
      ]
    },
    en: {
      badge: 'EXCEL CALCULATOR',
      format: 'Excel/Google Sheets',
      title: 'Website ROI Calculator',
      subtitle: 'Calculate the exact return on investment for your new website. See when it pays off and how much you\'ll earn in the first year.',
      highlight: 'average ROI: 380% in 12 months',
      features: [
        {
          icon: Calculator,
          title: 'Automatic calculations',
          description: 'Enter data, everything else calculates'
        },
        {
          icon: BarChart3,
          title: 'Charts and analysis',
          description: 'Visualize returns over time'
        },
        {
          icon: TrendingUp,
          title: 'Growth scenarios',
          description: 'Pessimistic, realistic, optimistic'
        },
        {
          icon: DollarSign,
          title: 'Cost analysis',
          description: 'All costs in one place'
        }
      ],
      whatYouCalculate: 'What can you calculate?',
      calculations: [
        'Current value of lost leads',
        'Projected conversion growth',
        'Monthly and yearly revenue increase',
        'Return on investment timeline',
        'Comparison: current vs new website',
        'Opportunity costs (what you lose waiting)'
      ],
      formTitle: 'Get your free calculator',
      emailPlaceholder: 'Your email...',
      submitButton: 'Download Calculator (Excel)',
      submitting: 'Sending...',
      disclaimer: 'You\'ll also get case studies showing real results.',
      successTitle: 'Calculator sent!',
      successMessage: 'Check your email to download',
      stats: [
        { value: '1800+', label: 'downloads' },
        { value: '380%', label: 'average ROI' }
      ],
      instructions: 'How to use the calculator?',
      steps: [
        {
          icon: '📊',
          title: '1. Enter current data',
          items: ['Monthly visitors', 'Current conversion rate', 'Average customer value']
        },
        {
          icon: '🎯',
          title: '2. Set growth goals',
          items: ['Expected traffic growth', 'Conversion goal', 'Planned budget']
        },
        {
          icon: '📈',
          title: '3. Analyze results',
          items: ['Check payback time', 'See yearly projections', 'Compare scenarios']
        }
      ],
      realResults: 'Real results from our clients:',
      caseStudies: [
        {
          business: 'Beauty Salon',
          investment: '$1,200',
          monthlyReturn: '$520/mo',
          roi: '515% yearly',
          time: '2.3 months'
        },
        {
          business: 'Auto Repair Shop',
          investment: '$1,600',
          monthlyReturn: '$790/mo',
          roi: '590% yearly',
          time: '2 months'
        },
        {
          business: 'Dental Clinic',
          investment: '$2,200',
          monthlyReturn: '$1,330/mo',
          roi: '728% yearly',
          time: '1.6 months'
        }
      ]
    }
  }

  const t = content[isPL ? 'pl' : 'en']

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/forms/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          resource: 'roi-calculator'
        }),
      })

      if (response.ok) {
        setShowForm(false)
        setTimeout(() => {
          window.location.href = `/${locale}/thank-you/download?resource=${encodeURIComponent(t.title)}`
        }, 1000)
      }
    } catch (error) {
      console.error('Download form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                  {t.badge}
                </span>
                <span className="text-gray-400">{t.format}</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-4">
                {t.subtitle}
              </p>
              
              <p className="text-lg text-green-400 font-semibold mb-8">
                💰 {t.highlight}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {t.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <feature.icon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-white font-medium">{feature.title}</h3>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Form */}
              {showForm ? (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onSubmit={handleSubmit}
                  className="glass-dark rounded-2xl p-6"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {t.formTitle}
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.emailPlaceholder}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {t.submitting}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Download className="w-5 h-5" />
                          {t.submitButton}
                        </span>
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3 text-center">
                    {t.disclaimer}
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-dark rounded-2xl p-6 text-center"
                >
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {t.successTitle}
                  </h3>
                  <p className="text-gray-400">{t.successMessage}</p>
                </motion.div>
              )}

              <div className="flex items-center gap-6 mt-8">
                {t.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="glass-dark rounded-2xl p-8">
                <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
                  {/* Excel Mock */}
                  <div className="bg-gray-800 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-xs text-gray-400 ml-2">ROI_Calculator.xlsx</span>
                    </div>
                    
                    {/* Mock Spreadsheet */}
                    <div className="bg-gray-900 rounded p-3">
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="bg-gray-800 p-2 rounded text-gray-400">A</div>
                        <div className="bg-gray-800 p-2 rounded text-gray-400">B</div>
                        <div className="bg-gray-800 p-2 rounded text-gray-400">C</div>
                        
                        <div className="text-gray-300 p-2">{isPL ? 'Metryka' : 'Metric'}</div>
                        <div className="text-gray-300 p-2">{isPL ? 'Obecna' : 'Current'}</div>
                        <div className="text-gray-300 p-2">{isPL ? 'Nowa' : 'New'}</div>
                        
                        <div className="text-gray-400 p-2">{isPL ? 'Odwiedzający' : 'Visitors'}</div>
                        <div className="text-white p-2">1000</div>
                        <div className="text-green-400 p-2">1500</div>
                        
                        <div className="text-gray-400 p-2">{isPL ? 'Konwersja' : 'Conversion'}</div>
                        <div className="text-white p-2">1.5%</div>
                        <div className="text-green-400 p-2">3.8%</div>
                      </div>
                    </div>
                  </div>

                  {/* Mock Chart */}
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">{isPL ? 'Zwrot w czasie' : 'ROI Timeline'}</span>
                      <LineChart className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="h-32 bg-gradient-to-t from-green-900/20 to-transparent rounded flex items-end">
                      {[40, 60, 80, 100, 120, 140, 160].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-green-500 mx-0.5 rounded-t"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>M1</span>
                      <span>M3</span>
                      <span>M6</span>
                      <span>M12</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You Can Calculate */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.whatYouCalculate}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.calculations.map((calc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass-dark rounded-xl p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <p className="text-white">{calc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {t.realResults}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-xl p-6"
              >
                <h3 className="text-white font-semibold text-lg mb-4">{study.business}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Inwestycja:' : 'Investment:'}</span>
                    <span className="text-white font-medium">{study.investment}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Zwrot/msc:' : 'Return/mo:'}</span>
                    <span className="text-green-400 font-medium">{study.monthlyReturn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROI:</span>
                    <span className="text-green-400 font-bold">{study.roi}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-center text-sm">
                      <span className="text-gray-400">{isPL ? 'Zwrot po:' : 'Payback:'}</span>
                      <span className="text-white font-medium ml-2">{study.time}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Clock,
  Smartphone,
  Globe,
  ArrowUp,
  ArrowDown,
  Award,
  Target
} from 'lucide-react'
import { Button } from '@/components/ui/button'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function CaseStudy() {
  const t = useTranslations('caseStudy')
  const [activeTab, setActiveTab] = useState<'overview' | 'results' | 'testimonial'>('overview')
  const metricsRef = useRef<HTMLDivElement>(null)
  const countUpRefs = useRef<(HTMLSpanElement | null)[]>([])

  const caseStudyData = {
    client: 'E-commerce Fashion Store',
    industry: 'E-commerce / Moda',
    challenge: 'Niska konwersja, wolna strona, brak optymalizacji mobilnej',
    solution: 'Kompletna przebudowa na nowoczesny stack, optymalizacja UX/UI i SEO',
    timeline: '21 dni',
    results: {
      traffic: { before: 3200, after: 12800, change: 300 },
      conversion: { before: 1.2, after: 3.8, change: 217 },
      revenue: { before: 4500, after: 54000, change: 1100 },
      mobileTraffic: { before: 45, after: 82, change: 82 },
      pageSpeed: { before: 5.8, after: 1.4, change: -76 },
      searchRanking: { before: 28, after: 2, change: -93 }
    },
    chartImage: '/images/results/sales-growth-chart.png'
  }

  useEffect(() => {
    // Animate metrics on scroll
    countUpRefs.current.forEach((ref, index) => {
      if (ref) {
        const value = parseFloat(ref.getAttribute('data-value') || '0')
        const decimals = ref.getAttribute('data-decimals') || '0'
        
        ScrollTrigger.create({
          trigger: ref,
          start: 'top 80%',
          onEnter: () => {
            gsap.fromTo(ref, 
              { innerHTML: 0 },
              {
                innerHTML: value,
                duration: 2,
                ease: 'power2.out',
                snap: { innerHTML: decimals === '0' ? 1 : 0.1 },
                onUpdate: function() {
                  const num = parseFloat(this.targets()[0].innerHTML)
                  ref.innerHTML = decimals === '0' 
                    ? Math.round(num).toLocaleString('pl-PL')
                    : num.toFixed(1).replace('.', ',')
                }
              }
            )
          },
          once: true
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [activeTab])

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239333ea' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-2xl animate-glow">
            <Award className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Case Study: 300% wzrost</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Zobacz, jak pomogliśmy lokalnej restauracji stać się liderem online w swojej branży
          </p>
        </motion.div>

        {/* Client Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-dark rounded-3xl p-8 mb-8 shadow-2xl border border-white/10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{caseStudyData.client}</h3>
              <p className="text-gray-300">Branża: {caseStudyData.industry} • Czas realizacji: {caseStudyData.timeline}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                onClick={() => setActiveTab('overview')}
                className={activeTab === 'overview' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0 shadow-lg' 
                  : 'border-white/20 text-gray-300 hover:bg-white/10 hover:text-white'
                }
              >
                Przegląd
              </Button>
              <Button
                variant={activeTab === 'results' ? 'default' : 'outline'}
                onClick={() => setActiveTab('results')}
                className={activeTab === 'results' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0' 
                  : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Wyniki
              </Button>
              <Button
                variant={activeTab === 'testimonial' ? 'default' : 'outline'}
                onClick={() => setActiveTab('testimonial')}
                className={activeTab === 'testimonial' 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-0' 
                  : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                Opinia
              </Button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-red-400" />
                    Wyzwanie
                  </h4>
                  <p className="text-gray-300 mb-4">{caseStudyData.challenge}</p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <ArrowDown className="w-4 h-4 text-red-400 mr-2 mt-0.5" />
                      <span>Pozycja 47 w Google na kluczowe frazy</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowDown className="w-4 h-4 text-red-400 mr-2 mt-0.5" />
                      <span>80% klientów nie mogło złożyć rezerwacji online</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowDown className="w-4 h-4 text-red-400 mr-2 mt-0.5" />
                      <span>Strona ładowała się ponad 6 sekund</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-green-400" />
                    Rozwiązanie
                  </h4>
                  <p className="text-gray-300 mb-4">{caseStudyData.solution}</p>
                  <ul className="space-y-2 text-gray-400">
                    <li className="flex items-start">
                      <ArrowUp className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      <span>System rezerwacji online zintegrowany z kalendarzem</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUp className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      <span>Optymalizacja SEO i content marketing</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowUp className="w-4 h-4 text-green-400 mr-2 mt-0.5" />
                      <span>Responsywny design z czasem ładowania poniżej 2s</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'results' && (
            <motion.div
              ref={metricsRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {/* Traffic */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30"
                >
                  <Users className="w-8 h-8 text-purple-400 mb-3" />
                  <p className="text-sm text-gray-300 mb-1">Ruch miesięczny</p>
                  <p className="text-3xl font-bold text-white mb-2">
                    <span ref={el => {countUpRefs.current[0] = el}} data-value={caseStudyData.results.traffic.after} data-decimals="0">0</span>
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +{caseStudyData.results.traffic.change}%
                  </p>
                </motion.div>

                {/* Conversion */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-green-600/20 to-blue-600/20 rounded-xl p-6 border border-green-500/30"
                >
                  <ShoppingCart className="w-8 h-8 text-green-400 mb-3" />
                  <p className="text-sm text-gray-300 mb-1">Konwersja</p>
                  <p className="text-3xl font-bold text-white mb-2">
                    <span ref={el => {countUpRefs.current[1] = el}} data-value={caseStudyData.results.conversion.after} data-decimals="1">0</span>%
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +{caseStudyData.results.conversion.change}%
                  </p>
                </motion.div>

                {/* Revenue */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-xl p-6 border border-yellow-500/30"
                >
                  <TrendingUp className="w-8 h-8 text-yellow-400 mb-3" />
                  <p className="text-sm text-gray-300 mb-1">Przychód online</p>
                  <p className="text-3xl font-bold text-white mb-2">
                    <span ref={el => {countUpRefs.current[2] = el}} data-value={caseStudyData.results.revenue.after} data-decimals="0">0</span> zł
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +{caseStudyData.results.revenue.change}%
                  </p>
                </motion.div>

                {/* Mobile Traffic */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30"
                >
                  <Smartphone className="w-8 h-8 text-blue-400 mb-3" />
                  <p className="text-sm text-gray-300 mb-1">Ruch mobilny</p>
                  <p className="text-3xl font-bold text-white mb-2">
                    <span ref={el => {countUpRefs.current[3] = el}} data-value={caseStudyData.results.mobileTraffic.after} data-decimals="0">0</span>%
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    +{caseStudyData.results.mobileTraffic.change}%
                  </p>
                </motion.div>

                {/* Page Speed */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl p-6 border border-cyan-500/30"
                >
                  <Clock className="w-8 h-8 text-cyan-400 mb-3" />
                  <p className="text-sm text-gray-300 mb-1">Czas ładowania</p>
                  <p className="text-3xl font-bold text-white mb-2">
                    <span ref={el => {countUpRefs.current[4] = el}} data-value={caseStudyData.results.pageSpeed.after} data-decimals="1">0</span>s
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    {caseStudyData.results.pageSpeed.change}%
                  </p>
                </motion.div>

                {/* Search Ranking */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-br from-pink-600/20 to-purple-600/20 rounded-xl p-6 border border-pink-500/30"
                >
                  <Globe className="w-8 h-8 text-pink-400 mb-3" />
                  <p className="text-sm text-gray-300 mb-1">Pozycja Google</p>
                  <p className="text-3xl font-bold text-white mb-2">
                    TOP <span ref={el => {countUpRefs.current[5] = el}} data-value={caseStudyData.results.searchRanking.after} data-decimals="0">0</span>
                  </p>
                  <p className="text-sm text-green-400 flex items-center">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    44 pozycje
                  </p>
                </motion.div>
              </div>

              {/* Sales Chart */}
              <div className="mt-8 mb-8">
                <h5 className="text-lg font-semibold text-white mb-4">Wzrost sprzedaży w czasie</h5>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <img 
                    src={caseStudyData.chartImage} 
                    alt="Wykres wzrostu sprzedaży"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>

              {/* Visual Progress Bar */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Wzrost ruchu organicznego</span>
                    <span className="text-white font-semibold">+300%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300">Wzrost konwersji</span>
                    <span className="text-white font-semibold">+300%</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-green-600 to-blue-600"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'testimonial' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">AK</span>
                  </div>
                  <h4 className="text-xl font-semibold text-white">Anna Kowalska</h4>
                  <p className="text-gray-300">CEO, Fashion Store</p>
                </div>
                <blockquote className="text-lg text-gray-300 italic leading-relaxed mb-8">
                  "Profesjonalizm na najwyższym poziomie. W ciągu 3 miesięcy sprzedaż online wzrosła o 1100%! 
                  Nowa strona ładuje się błyskawicznie, wygląda świetnie na każdym urządzeniu, a system zarządzania 
                  jest intuicyjny. Najważniejsze - konwersja wzrosła z 1.2% do 3.8%. Klienci chwalą łatwość zakupów. 
                  ROI zwrócił się już po 6 tygodniach. Polecam każdemu, kto myśli poważnie o e-commerce."
                </blockquote>
                <div className="flex flex-wrap justify-center gap-6 text-center">
                  <div>
                    <p className="text-3xl font-bold text-white">4.9/5</p>
                    <p className="text-sm text-gray-300">Ocena Google</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">250+</p>
                    <p className="text-sm text-gray-300">Nowych opinii</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-white">95%</p>
                    <p className="text-sm text-gray-300">Rezerwacji online</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-xl text-gray-300 mb-6">
            Chcesz podobnych rezultatów dla swojej firmy?
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Zacznij swoją transformację
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
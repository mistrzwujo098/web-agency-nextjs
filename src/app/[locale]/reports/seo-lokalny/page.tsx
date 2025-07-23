'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Search, Star, Phone, Clock, TrendingUp, BarChart, Users, ChevronRight, Download, Share2, Target, Globe, Smartphone, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function ReportSEOLokalnyPage() {
  const params = useParams()
  const locale = params.locale as string
  const t = useTranslations('reports.localSeo')
  const tCommon = useTranslations('reports.common')
  const isPL = locale === 'pl'

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

  const icons = [MapPin, Star, Search, Phone, Globe, Smartphone, Target, BarChart]
  
  const localSEOSteps = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    icon: icons[i],
    title: t(`steps.${i + 1}.title`),
    importance: t(`steps.${i + 1}.importance`),
    impact: t(`steps.${i + 1}.impact`),
    description: t(`steps.${i + 1}.description`),
    howTo: t(`steps.${i + 1}.howTo`),
    steps: t.raw(`steps.${i + 1}.steps`),
    proTip: t(`steps.${i + 1}.proTip`),
    realExample: t(`steps.${i + 1}.realExample`)
  }))

  const monthlyPlan = Array.from({ length: 3 }, (_, i) => ({
    month: t(`actionPlan.months.${i + 1}.title`),
    tasks: t.raw(`actionPlan.months.${i + 1}.tasks`),
    expectedResult: t(`actionPlan.months.${i + 1}.expectedResult`)
  }))

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
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">
                {tCommon('localSeoGuide')}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t('title')}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Impact Stats */}
            <div className="glass-dark rounded-2xl p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {t('impactStats.title')}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">{t('impactStats.stats.0.value')}</div>
                  <p className="text-gray-400 text-sm">
                    {t('impactStats.stats.0.label')}
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{t('impactStats.stats.1.value')}</div>
                  <p className="text-gray-400 text-sm">
                    {t('impactStats.stats.1.label')}
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{t('impactStats.stats.2.value')}</div>
                  <p className="text-gray-400 text-sm">
                    {t('impactStats.stats.2.label')}
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">{t('impactStats.stats.3.value')}</div>
                  <p className="text-gray-400 text-sm">
                    {t('impactStats.stats.3.label')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Local SEO */}
      <section className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('whyLocalSeo.title')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">46%</span> {isPL ? 'wszystkich wyszukiwań w Google to lokalne zapytania' : 'of all Google searches are local queries'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">76%</span> {isPL ? 'osób szukających lokalnie odwiedza firmę w ciągu 24h' : 'of people searching locally visit business within 24h'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">88%</span> {isPL ? 'lokalnych wyszukiwań na telefonie kończy się telefonem lub wizytą' : 'of local mobile searches result in call or visit'}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">"koło mnie"</span> {isPL ? 'wzrosło o 500% w ostatnich 2 latach' : 'grew 500% in last 2 years'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">93%</span> {isPL ? 'klientów czyta opinie przed wyborem lokalnej firmy' : 'of customers read reviews before choosing local business'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">TOP 3</span> {isPL ? 'w mapach dostaje 75% wszystkich kliknięć' : 'in maps gets 75% of all clicks'}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <p className="text-orange-400 font-semibold">
                {isPL 
                  ? '⚠️ Jeśli nie jesteś w TOP 3 lokalnych wyników, praktycznie nie istniejesz dla klientów'
                  : '⚠️ If you\'re not in TOP 3 local results, you practically don\'t exist for customers'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8 Steps to Local Domination */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {isPL ? '8 Kroków do Lokalnej Dominacji' : '8 Steps to Local Domination'}
            </h2>
            <p className="text-gray-300">
              {isPL ? 'Rób po kolei. Każdy krok buduje na poprzednim.' : 'Do in order. Each step builds on the previous.'}
            </p>
          </motion.div>

          {localSEOSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Step Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isPL ? `Krok ${step.id}:` : `Step ${step.id}:`} {step.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      step.importance === (isPL ? 'Krytyczne' : 'Critical') 
                        ? 'bg-red-500/20 text-red-400' 
                        : step.importance === (isPL ? 'Wysoka' : 'High')
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {step.importance}
                    </span>
                    <span className="text-green-400 font-medium">{step.impact}</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="glass-dark rounded-2xl p-6 mb-4">
                <p className="text-gray-300 text-lg mb-4">
                  {step.description}
                </p>
                
                <h4 className="text-white font-semibold mb-3">{step.howTo}</h4>
                <ol className="space-y-2 mb-6">
                  {step.steps.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-medium flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ol>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <p className="text-purple-400">
                    <span className="font-semibold">💡 Pro tip:</span> {step.proTip}
                  </p>
                </div>
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-600/30">
                <h4 className="text-white font-semibold mb-2">
                  ✅ {isPL ? 'Dowód że działa:' : 'Proof it works:'}
                </h4>
                <p className="text-gray-300 italic">
                  "{step.realExample}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3-Month Action Plan */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {isPL ? '📅 Plan Działania na 3 Miesiące' : '📅 3-Month Action Plan'}
            </h2>
            <p className="text-gray-300">
              {isPL ? 'Dokładny harmonogram wdrożenia. Po 3 miesiącach będziesz w TOP 3.' : 'Exact implementation schedule. After 3 months you\'ll be in TOP 3.'}
            </p>
          </motion.div>

          <div className="space-y-6">
            {monthlyPlan.map((month, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{month.month}</h3>
                  <span className="text-green-400 font-medium">{month.expectedResult}</span>
                </div>
                <ul className="space-y-2">
                  {month.tasks.map((task: string, i: number) => (
                    <li key={i} className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {isPL ? '✅ Szybki Checklist - Sprawdź Co Już Masz' : '✅ Quick Checklist - Check What You Already Have'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                isPL ? 'Google Moja Firma założona i w 100% wypełniona' : 'Google My Business set up and 100% complete',
                isPL ? 'Minimum 10 opinii ze średnią 4.5+' : 'Minimum 10 reviews with 4.5+ average',
                isPL ? 'NAP identyczne wszędzie w internecie' : 'NAP identical everywhere online',
                isPL ? 'Strona ładuje się <3 sek na mobile' : 'Site loads <3 sec on mobile',
                isPL ? 'Lokalne słowa kluczowe w tytułach' : 'Local keywords in titles',
                isPL ? 'Schema LocalBusiness wdrożone' : 'LocalBusiness Schema implemented',
                isPL ? '10+ lokalnych linków' : '10+ local links',
                isPL ? 'Treści lokalne publikowane regularnie' : 'Local content published regularly'
              ].map((item, index) => (
                <label key={index} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-300">{item}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-blue-400 text-center">
                {isPL 
                  ? '📊 Jeśli masz <4 zaznaczone: Masz ogromny potencjał wzrostu!'
                  : '📊 If you have <4 checked: You have huge growth potential!'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {isPL ? '🔧 Narzędzia Które Ułatwią Ci Pracę' : '🔧 Tools That Will Make Your Work Easier'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">{isPL ? 'Darmowe:' : 'Free:'}</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">• Google My Business - {isPL ? 'zarządzanie profilem' : 'profile management'}</li>
                  <li className="text-gray-300">• Google Search Console - {isPL ? 'analiza ruchu' : 'traffic analysis'}</li>
                  <li className="text-gray-300">• Schema.org Generator - {isPL ? 'tworzenie kodu' : 'code creation'}</li>
                  <li className="text-gray-300">• GTmetrix - {isPL ? 'test szybkości' : 'speed test'}</li>
                </ul>
              </div>
              
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">{isPL ? 'Płatne (warte inwestycji):' : 'Paid (worth investment):'}</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">• BrightLocal - {isPL ? 'audyt NAP i monitoring' : 'NAP audit and monitoring'}</li>
                  <li className="text-gray-300">• Whitespark - {isPL ? 'budowanie cytowań' : 'citation building'}</li>
                  <li className="text-gray-300">• Surfer Local - {isPL ? 'analiza konkurencji' : 'competition analysis'}</li>
                  <li className="text-gray-300">• ReviewTrackers - {isPL ? 'zarządzanie opiniami' : 'review management'}</li>
                </ul>
              </div>
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
              {isPL ? 'Potrzebujesz Pomocy z Lokalnym SEO?' : 'Need Help with Local SEO?'}
            </h2>
            
            <div className="glass-dark rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-300 mb-6">
                {isPL 
                  ? 'Zrobimy kompletny audyt Twojej widoczności lokalnej i pokażemy dokładnie co poprawić, żeby być #1 w Twojej okolicy.'
                  : 'We\'ll do a complete audit of your local visibility and show exactly what to improve to be #1 in your area.'}
              </p>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <Search className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Analiza 50+ czynników' : 'Analysis of 50+ factors'}
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Mapa konkurencji' : 'Competition map'}
                  </p>
                </div>
                <div className="text-center">
                  <BarChart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Plan działania' : 'Action plan'}
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Gwarancja TOP 3' : 'TOP 3 guarantee'}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = `/${locale}/free-analysis`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {isPL ? 'Zamów darmowy audyt lokalnego SEO' : 'Get Free Local SEO Audit'}
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {isPL 
                ? 'Pokażemy Ci dokładnie gdzie jesteś teraz i jak dostać się na szczyt'
                : 'We\'ll show you exactly where you are now and how to get to the top'}
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
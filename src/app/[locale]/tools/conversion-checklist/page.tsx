'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, Download, Printer, RefreshCw, TrendingUp, AlertCircle, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
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
  const isPL = locale === 'pl'

  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      name: isPL ? 'Nagłówek i nawigacja' : 'Header & Navigation',
      icon: '🎯',
      items: [
        { id: 'header-1', text: isPL ? 'Numer telefonu w widocznym miejscu' : 'Phone number prominently displayed', priority: 'critical', checked: false },
        { id: 'header-2', text: isPL ? 'Widoczne godziny otwarcia' : 'Clear business hours visible', priority: 'critical', checked: false },
        { id: 'header-3', text: isPL ? 'Sticky nawigacja przy scrollowaniu' : 'Sticky navigation on scroll', priority: 'important', checked: false },
        { id: 'header-4', text: isPL ? 'Mobilne menu hamburger' : 'Mobile-friendly hamburger menu', priority: 'critical', checked: false },
        { id: 'header-5', text: isPL ? 'Funkcja wyszukiwania' : 'Search functionality', priority: 'nice', checked: false },
        { id: 'header-6', text: isPL ? 'Lokalizacja/adres w nagłówku' : 'Location/address in header', priority: 'important', checked: false },
        { id: 'header-7', text: isPL ? 'Przycisk "Umów się" lub "Wycena"' : '"Book Now" or "Get Quote" button', priority: 'critical', checked: false },
        { id: 'header-8', text: isPL ? 'Widget live chat' : 'Live chat widget', priority: 'important', checked: false }
      ]
    },
    {
      name: isPL ? 'Strona główna' : 'Homepage',
      icon: '🏠',
      items: [
        { id: 'home-1', text: isPL ? 'Jasna propozycja wartości above the fold' : 'Clear value proposition above the fold', priority: 'critical', checked: false },
        { id: 'home-2', text: isPL ? 'Profesjonalny hero image/video' : 'Professional hero image/video', priority: 'critical', checked: false },
        { id: 'home-3', text: isPL ? 'Obszar działania jasno określony' : 'Service area clearly defined', priority: 'critical', checked: false },
        { id: 'home-4', text: isPL ? 'Widoczne certyfikaty/odznaczenia' : 'Trust badges/certifications visible', priority: 'important', checked: false },
        { id: 'home-5', text: isPL ? 'Sekcja opinii klientów' : 'Customer testimonials section', priority: 'critical', checked: false },
        { id: 'home-6', text: isPL ? 'Wyróżnione usługi/produkty' : 'Featured services/products', priority: 'important', checked: false },
        { id: 'home-7', text: isPL ? 'Informacja o trybie pilnym/tym samym dniu' : 'Emergency/same-day service callout', priority: 'important', checked: false },
        { id: 'home-8', text: isPL ? 'Interaktywna mapa z lokalizacją' : 'Interactive map with location', priority: 'important', checked: false },
        { id: 'home-9', text: isPL ? 'Najnowsze realizacje/portfolio' : 'Recent projects/portfolio gallery', priority: 'important', checked: false },
        { id: 'home-10', text: isPL ? 'Baner z ofertami specjalnymi/promocjami' : 'Special offers/promotions banner', priority: 'important', checked: false },
        { id: 'home-11', text: isPL ? 'Logo nagród i wyróżnień' : 'Awards and recognition logos', priority: 'nice', checked: false },
        { id: 'home-12', text: isPL ? 'Wbudowane video testimoniale' : 'Video testimonials embedded', priority: 'nice', checked: false }
      ]
    },
    {
      name: isPL ? 'Treść i komunikaty' : 'Content & Messaging',
      icon: '📝',
      items: [
        { id: 'content-1', text: isPL ? 'Nagłówki skupione na korzyściach' : 'Benefit-focused headlines', priority: 'critical', checked: false },
        { id: 'content-2', text: isPL ? 'Jasne ceny lub ceny "od"' : 'Clear pricing or "starting at" prices', priority: 'important', checked: false },
        { id: 'content-3', text: isPL ? 'Sekcja FAQ odpowiadająca na wątpliwości' : 'FAQ section addressing objections', priority: 'critical', checked: false },
        { id: 'content-4', text: isPL ? 'Podkreślona unikalna propozycja sprzedaży' : 'Unique selling proposition highlighted', priority: 'critical', checked: false },
        { id: 'content-5', text: isPL ? 'Sekcja proces/jak to działa' : 'Process/how it works section', priority: 'important', checked: false },
        { id: 'content-6', text: isPL ? 'Informacje o gwarancji' : 'Guarantee or warranty information', priority: 'important', checked: false },
        { id: 'content-7', text: isPL ? 'Galerie przed/po' : 'Before/after galleries', priority: 'important', checked: false },
        { id: 'content-8', text: isPL ? 'Sekcja zespół/o nas ze zdjęciami' : 'Team/about us section with photos', priority: 'nice', checked: false },
        { id: 'content-9', text: isPL ? 'Case studies z wynikami' : 'Case studies with results', priority: 'nice', checked: false },
        { id: 'content-10', text: isPL ? 'Słownik branżowy wyjaśniony' : 'Industry-specific terminology explained', priority: 'nice', checked: false }
      ]
    },
    {
      name: isPL ? 'Wezwania do działania' : 'Calls to Action',
      icon: '🎯',
      items: [
        { id: 'cta-1', text: isPL ? 'Wiele CTA na stronę (3-5)' : 'Multiple CTAs per page (3-5)', priority: 'critical', checked: false },
        { id: 'cta-2', text: isPL ? 'Kontrastujące kolory przycisków' : 'Contrasting button colors', priority: 'critical', checked: false },
        { id: 'cta-3', text: isPL ? 'Tekst przycisków zorientowany na działanie' : 'Action-oriented button text', priority: 'critical', checked: false },
        { id: 'cta-4', text: isPL ? 'Pływający/sticky CTA na mobile' : 'Floating/sticky CTA on mobile', priority: 'important', checked: false },
        { id: 'cta-5', text: isPL ? 'Exit-intent popup z ofertą' : 'Exit-intent popup offer', priority: 'nice', checked: false },
        { id: 'cta-6', text: isPL ? 'Przyciski click-to-call na mobile' : 'Click-to-call buttons on mobile', priority: 'critical', checked: false }
      ]
    },
    {
      name: isPL ? 'Dowody społeczne' : 'Social Proof',
      icon: '⭐',
      items: [
        { id: 'social-1', text: isPL ? 'Wyświetlone gwiazdki z Google/Yelp' : 'Google/Yelp review stars displayed', priority: 'critical', checked: false },
        { id: 'social-2', text: isPL ? 'Liczba klientów lub lat działalności' : 'Customer count or years in business', priority: 'important', checked: false },
        { id: 'social-3', text: isPL ? 'Prawdziwe zdjęcia klientów' : 'Real customer photos', priority: 'important', checked: false },
        { id: 'social-4', text: isPL ? 'Członkostwo w stowarzyszeniach branżowych' : 'Industry association memberships', priority: 'nice', checked: false },
        { id: 'social-5', text: isPL ? 'Wzmianki w mediach lub "Widziane w"' : 'Media mentions or "As seen in"', priority: 'nice', checked: false },
        { id: 'social-6', text: isPL ? 'Feed z mediów społecznościowych na żywo' : 'Live social media feed', priority: 'nice', checked: false },
        { id: 'social-7', text: isPL ? 'Logo partnerów/dostawców' : 'Partner/supplier logos', priority: 'nice', checked: false }
      ]
    },
    {
      name: isPL ? 'Wydajność i SEO' : 'Performance & SEO',
      icon: '🚀',
      items: [
        { id: 'perf-1', text: isPL ? 'Ładowanie strony poniżej 3 sekund' : 'Page load under 3 seconds', priority: 'critical', checked: false },
        { id: 'perf-2', text: isPL ? 'Responsywny design mobilny' : 'Mobile-responsive design', priority: 'critical', checked: false },
        { id: 'perf-3', text: isPL ? 'Lokalny schema markup' : 'Local schema markup', priority: 'important', checked: false },
        { id: 'perf-4', text: isPL ? 'Aktywny certyfikat SSL' : 'SSL certificate active', priority: 'critical', checked: false },
        { id: 'perf-5', text: isPL ? 'Google My Business połączony' : 'Google My Business linked', priority: 'critical', checked: false },
        { id: 'perf-6', text: isPL ? 'Optymalizacja/kompresja obrazów' : 'Image optimization/compression', priority: 'important', checked: false },
        { id: 'perf-7', text: isPL ? 'Strony AMP dla kluczowej treści' : 'AMP pages for key content', priority: 'nice', checked: false }
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
    if (isPL) {
      switch (priority) {
        case 'critical': return 'Krytyczne'
        case 'important': return 'Ważne'
        case 'nice': return 'Przydatne'
        default: return ''
      }
    } else {
      switch (priority) {
        case 'critical': return 'Critical'
        case 'important': return 'Important'
        case 'nice': return 'Nice to have'
        default: return ''
      }
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
              ← {isPL ? 'Powrót' : 'Back'}
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={resetChecklist}
                className="hidden sm:flex"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                {isPL ? 'Resetuj' : 'Reset'}
              </Button>
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Title & Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚀 {isPL ? '50 elementów zwiększających konwersję' : '50 Website Elements That Increase Conversions'}
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            {isPL 
              ? 'Sprawdź swoją stronę punkt po punkcie'
              : 'Check your website point by point'}
          </p>
          
          {/* Progress Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">{isPL ? 'Postęp' : 'Progress'}</span>
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
              {isPL ? 'Twój wynik' : 'Your Score'}
            </h3>
            <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
              {completionRate}%
            </div>
            <p className="text-gray-300 mb-6">
              {isPL 
                ? completionRate >= 80 ? 'Świetna robota! Twoja strona jest dobrze zoptymalizowana.' 
                  : completionRate >= 50 ? 'Niezły wynik, ale jest sporo do poprawy.'
                  : 'Masz dużo pracy przed sobą, ale to się opłaci!'
                : completionRate >= 80 ? 'Great job! Your website is well optimized.'
                  : completionRate >= 50 ? 'Good start, but there\'s room for improvement.'
                  : 'Lots of work ahead, but it will pay off!'}
            </p>
            
            {completionRate < 80 && (
              <Link href={`/${locale}/#contact`}>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {isPL ? 'Potrzebujesz pomocy? Skontaktuj się' : 'Need help? Get in touch'}
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
              {isPL 
                ? 'Ta checklist jest oparta na analizie 237 stron lokalnych firm. Elementy oznaczone jako "Krytyczne" mają największy wpływ na konwersję.'
                : 'This checklist is based on analysis of 237 local business websites. Elements marked as "Critical" have the biggest impact on conversions.'}
            </p>
            <p>
              {isPL
                ? 'Zacznij od czerwonych punktów - to da Ci największy zwrot z inwestycji.'
                : 'Start with red items - they\'ll give you the biggest ROI.'}
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
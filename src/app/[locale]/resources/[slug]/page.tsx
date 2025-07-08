'use client'

import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Download, FileText, CheckCircle, ArrowLeft, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const resources = {
  '10-bledow-poradnik': {
    title: {
      pl: '10 błędów, które kosztują Cię klientów',
      en: '10 Mistakes That Cost You Customers'
    },
    file: 'Błędy, sprzedaż, polskie firmy._.pdf',
    description: {
      pl: 'Twój poradnik jest gotowy do pobrania. Znajdziesz w nim konkretne przykłady i rozwiązania.',
      en: 'Your guide is ready to download. You\'ll find specific examples and solutions inside.'
    }
  },
  '50-elementow-checklist': {
    title: {
      pl: '50 elementów strony, które zwiększają sprzedaż',
      en: '50 Website Elements That Increase Sales'
    },
    file: 'conversion-checklist-pdf.html',
    description: {
      pl: 'Checklist gotowa do użycia. Sprawdź punkt po punkcie swoją stronę.',
      en: 'Checklist ready to use. Check your website point by point.'
    }
  },
  'seo-local-guide': {
    title: {
      pl: 'Jak być #1 w Google w swojej okolicy',
      en: 'How to be #1 on Google locally'
    },
    file: 'Polish Local SEO Guide_.pdf',
    description: {
      pl: 'Przewodnik SEO lokalnego z konkretnymi taktykami które działają.',
      en: 'Local SEO guide with specific tactics that work.'
    }
  },
  'marketing-automation-guide': {
    title: {
      pl: 'Automatyzacja marketingu dla lokalnych firm',
      en: 'Marketing Automation for Local Businesses'
    },
    file: 'Automatyzacja marketingu dla lokalnych firm – kompletny przewodnik.pdf',
    description: {
      pl: 'Kompletny przewodnik z szablonami gotowymi do wdrożenia.',
      en: 'Complete guide with ready-to-implement templates.'
    }
  },
  'website-launch-checklist': {
    title: {
      pl: 'Checklist przed startem strony',
      en: 'Website Launch Checklist'
    },
    file: 'website-launch-checklist.html',
    description: {
      pl: '87 punktów do sprawdzenia przed publikacją strony.',
      en: '87 points to check before publishing your website.'
    }
  },
  'roi-calculator': {
    title: {
      pl: 'Kalkulator ROI strony internetowej',
      en: 'Website ROI Calculator'
    },
    file: 'website-roi-calculator.html',
    description: {
      pl: 'Interaktywny kalkulator do obliczenia zwrotu z inwestycji.',
      en: 'Interactive calculator to calculate your return on investment.'
    }
  }
}

export default function ResourceAccessPage() {
  const params = useParams()
  const locale = params.locale as string
  const slug = params.slug as string
  const isPL = locale === 'pl'
  const [isAuthorized, setIsAuthorized] = useState(false)
  
  const resource = resources[slug as keyof typeof resources]
  
  useEffect(() => {
    // Check if user came from download form (in real app, check auth/session)
    const referrer = document.referrer
    if (referrer.includes('/download/') || referrer.includes('/thank-you/')) {
      setIsAuthorized(true)
    }
  }, [])

  if (!resource) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            {isPL ? 'Nie znaleziono zasobu' : 'Resource not found'}
          </h1>
          <Link href={`/${locale}`}>
            <Button variant="outline">
              {isPL ? 'Wróć do strony głównej' : 'Back to homepage'}
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleDownload = () => {
    // In production, this would be a secure download link
    const link = document.createElement('a')
    link.href = `/api/download/${resource.file}`
    link.download = resource.file
    link.click()
  }

  const content = {
    pl: {
      ready: 'Twój materiał jest gotowy!',
      downloadButton: 'Pobierz teraz',
      backButton: 'Wróć do strony głównej',
      locked: 'Ten materiał jest dostępny tylko dla zapisanych',
      lockDescription: 'Zapisz się na naszej stronie, aby otrzymać dostęp do tego i innych materiałów.',
      signupButton: 'Zapisz się za darmo',
      bonus: 'BONUS: Co jeszcze dostaniesz?',
      bonusItems: [
        'Cotygodniowe porady które działają',
        'Dostęp do grupy 2000+ przedsiębiorców',
        'Pierwsze info o nowych materiałach',
        'Zniżki na płatne usługi'
      ]
    },
    en: {
      ready: 'Your resource is ready!',
      downloadButton: 'Download now',
      backButton: 'Back to homepage',
      locked: 'This resource is available only for subscribers',
      lockDescription: 'Sign up on our website to get access to this and other resources.',
      signupButton: 'Sign up for free',
      bonus: 'BONUS: What else you get?',
      bonusItems: [
        'Weekly tips that work',
        'Access to 2000+ entrepreneurs group',
        'First info about new resources',
        'Discounts on paid services'
      ]
    }
  }

  const t = content[isPL ? 'pl' : 'en']

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="glass-dark rounded-2xl p-8 text-center">
            <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">
              {t.locked}
            </h1>
            <p className="text-gray-400 mb-6">
              {t.lockDescription}
            </p>
            <Link href={`/${locale}/download/${slug}`}>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                {t.signupButton}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4 py-32 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Message */}
          <div className="text-center mb-12">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">
              {t.ready}
            </h1>
            <h2 className="text-2xl text-gray-300 mb-2">
              {resource.title[isPL ? 'pl' : 'en']}
            </h2>
            <p className="text-lg text-gray-400">
              {resource.description[isPL ? 'pl' : 'en']}
            </p>
          </div>

          {/* Download Section */}
          <div className="glass-dark rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <FileText className="w-12 h-12 text-purple-400" />
                <div>
                  <p className="text-white font-medium">{resource.file}</p>
                  <p className="text-gray-400 text-sm">
                    {resource.file.endsWith('.pdf') ? 'PDF' : 'HTML'} • 
                    {isPL ? ' Gotowy do pobrania' : ' Ready to download'}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleDownload}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                {t.downloadButton}
              </Button>
            </div>

            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {t.bonus}
              </h3>
              <ul className="space-y-2">
                {t.bonusItems.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <Link href={`/${locale}`}>
              <Button variant="outline" size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backButton}
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
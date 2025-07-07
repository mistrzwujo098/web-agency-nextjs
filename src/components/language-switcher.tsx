'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Globe } from 'lucide-react'
import { locales, type Locale } from '@/i18n/config'

export function LanguageSwitcher() {
  const params = useParams()
  const currentLocale = params.locale as Locale

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
        <Globe className="h-4 w-4" />
        <span>{currentLocale.toUpperCase()}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}`}
            className={`block px-4 py-2 text-sm hover:bg-gray-100 ${
              locale === currentLocale ? 'font-semibold bg-gray-50' : ''
            }`}
          >
            {locale === 'pl' ? 'Polski' : 'English'}
          </Link>
        ))}
      </div>
    </div>
  )
}
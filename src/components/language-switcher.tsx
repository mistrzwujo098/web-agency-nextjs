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
      <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200">
        <Globe className="h-4 w-4" />
        <span>{currentLocale.toUpperCase()}</span>
      </button>
      
      <div className="absolute right-0 mt-2 w-32 glass-dark rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-white/10">
        {locales.map((locale) => (
          <Link
            key={locale}
            href={`/${locale}`}
            className={`block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl ${
              locale === currentLocale ? 'font-semibold bg-white/10 text-white' : ''
            }`}
          >
            {locale === 'pl' ? 'Polski' : 'English'}
          </Link>
        ))}
      </div>
    </div>
  )
}
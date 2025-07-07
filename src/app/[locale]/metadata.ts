import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })

  const metadata: Metadata = {
    title: locale === 'pl' 
      ? 'Agencja Tworzenia Stron | +30% Leadów w 14 Dni'
      : 'Web Development Agency | +30% Leads in 14 Days',
    description: locale === 'pl'
      ? 'Tworzymy strony internetowe dla lokalnych firm. Gwarancja +30% leadów lub zwrot pieniędzy. Darmowy audyt w 48h.'
      : 'We create websites for local businesses. +30% leads guarantee or money back. Free audit in 48h.',
    alternates: {
      canonical: `https://yourwebsite.com/${locale}`,
      languages: {
        'pl': '/pl',
        'en': '/en',
      },
    },
    openGraph: {
      title: locale === 'pl' 
        ? 'Agencja Tworzenia Stron | +30% Leadów w 14 Dni'
        : 'Web Development Agency | +30% Leads in 14 Days',
      description: locale === 'pl'
        ? 'Tworzymy strony internetowe dla lokalnych firm. Gwarancja +30% leadów lub zwrot pieniędzy.'
        : 'We create websites for local businesses. +30% leads guarantee or money back.',
      url: `https://yourwebsite.com/${locale}`,
      siteName: locale === 'pl' ? 'Agencja Tworzenia Stron' : 'Web Development Agency',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
  }

  return metadata
}
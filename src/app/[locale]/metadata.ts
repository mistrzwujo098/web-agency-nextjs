import { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const metadata: Metadata = {
    title: locale === 'pl' 
      ? 'WebCraftAI - Strony Internetowe dla Firm | +30% Konwersji Gwarantowane'
      : 'WebCraftAI - Professional Websites for Business | +30% Conversion Guaranteed',
    description: locale === 'pl'
      ? 'Tworzymy strony internetowe, które zwiększają sprzedaż. Gwarancja +30% konwersji lub zwrot pieniędzy. Darmowa analiza ROI. Obsługujemy firmy lokalne w całej Polsce.'
      : 'We create websites that boost sales. +30% conversion guarantee or money back. Free ROI analysis. Serving local businesses across Poland.',
    keywords: locale === 'pl'
      ? ['strony internetowe', 'tworzenie stron', 'agencja interaktywna', 'strony dla firm', 'strony www', 'e-commerce', 'sklepy internetowe', 'optymalizacja konwersji', 'marketing automation', 'SEO', 'responsywne strony', 'wordpress', 'next.js']
      : ['web development', 'website creation', 'web agency', 'business websites', 'ecommerce', 'online stores', 'conversion optimization', 'marketing automation', 'SEO', 'responsive design', 'wordpress', 'next.js'],
    authors: [{ name: 'WebCraftAI Team' }],
    creator: 'WebCraftAI',
    publisher: 'WebCraftAI',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://webcraftai.pl'),
    alternates: {
      canonical: `https://webcraftai.pl/${locale}`,
      languages: {
        'pl': 'https://webcraftai.pl/pl',
        'en': 'https://webcraftai.pl/en',
      },
    },
    openGraph: {
      title: locale === 'pl' 
        ? 'WebCraftAI - Strony Internetowe dla Firm | +30% Konwersji'
        : 'WebCraftAI - Professional Websites | +30% Conversion',
      description: locale === 'pl'
        ? 'Zwiększ sprzedaż dzięki profesjonalnej stronie internetowej. Gwarancja +30% konwersji lub zwrot pieniędzy. Darmowa analiza i wycena w 48h.'
        : 'Boost your sales with a professional website. +30% conversion guarantee or money back. Free analysis and quote in 48h.',
      url: `https://webcraftai.pl/${locale}`,
      siteName: 'WebCraftAI',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://webcraftai.pl/og-image.jpg',
          width: 1200,
          height: 630,
          alt: locale === 'pl' 
            ? 'WebCraftAI - Profesjonalne strony internetowe'
            : 'WebCraftAI - Professional websites',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: locale === 'pl' 
        ? 'WebCraftAI - Strony Internetowe | +30% Konwersji'
        : 'WebCraftAI - Professional Websites | +30% Conversion',
      description: locale === 'pl'
        ? 'Zwiększ sprzedaż dzięki profesjonalnej stronie. Gwarancja rezultatów.'
        : 'Boost sales with a professional website. Results guaranteed.',
      site: '@webcraftai',
      creator: '@webcraftai',
      images: ['https://webcraftai.pl/twitter-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'google-site-verification-code',
      yandex: 'yandex-verification-code',
      yahoo: 'yahoo-verification-code',
    },
  }

  return metadata
}
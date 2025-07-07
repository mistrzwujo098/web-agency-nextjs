import { DefaultSeo } from 'next-seo'

export function DefaultSEO() {
  return (
    <DefaultSeo
      title="Agencja Tworzenia Stron | +30% Leadów w 14 Dni"
      description="Tworzymy strony internetowe dla lokalnych firm. Gwarancja +30% leadów lub zwrot pieniędzy. Darmowy audyt w 48h. Sprawdź swoją stratę."
      canonical="https://yourwebsite.com"
      openGraph={{
        type: 'website',
        locale: 'pl_PL',
        url: 'https://yourwebsite.com',
        siteName: 'Agencja Tworzenia Stron',
        title: 'Agencja Tworzenia Stron | +30% Leadów w 14 Dni',
        description: 'Tworzymy strony internetowe dla lokalnych firm. Gwarancja +30% leadów lub zwrot pieniędzy.',
        images: [
          {
            url: 'https://yourwebsite.com/og-image.jpg',
            width: 1200,
            height: 630,
            alt: 'Agencja Tworzenia Stron - Zwiększ konwersję o 30%',
          },
        ],
      }}
      twitter={{
        handle: '@yourhandle',
        site: '@yoursite',
        cardType: 'summary_large_image',
      }}
      additionalMetaTags={[
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        {
          httpEquiv: 'x-ua-compatible',
          content: 'IE=edge',
        },
      ]}
      additionalLinkTags={[
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
      ]}
    />
  )
}
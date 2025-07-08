import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://webcraftai.pl'
  
  const routes = [
    '',
    '/services/web-development',
    '/services/ecommerce',
    '/services/seo',
    '/services/automation',
    '/services/hosting',
    '/about',
    '/portfolio',
    '/blog',
    '/contact',
    '/free-analysis',
    '/case-studies',
    '/guides',
    '/faq',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
    '/gdpr',
  ]
  
  const sitemap: MetadataRoute.Sitemap = []
  
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'daily' : route.includes('blog') ? 'daily' : 'weekly',
        priority: route === '' ? 1 : route.includes('services') ? 0.9 : 0.8,
      })
    })
  })
  
  return sitemap
}
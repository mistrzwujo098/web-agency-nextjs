import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourwebsite.com'
  
  const routes = [''] // Dodaj tutaj więcej ścieżek gdy będziesz mieć więcej stron
  
  const sitemap: MetadataRoute.Sitemap = []
  
  locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
      })
    })
  })
  
  return sitemap
}
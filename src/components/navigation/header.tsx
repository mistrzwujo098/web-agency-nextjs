'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useParams } from 'next/navigation'

export function Header() {
  const t = useTranslations('navigation')
  const params = useParams()
  const locale = params.locale as string
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: t('home'), href: '#hero' },
    { 
      name: t('services'), 
      href: '#services',
      submenu: [
        { name: t('submenu.webDevelopment'), href: '#web-development' },
        { name: t('submenu.ecommerce'), href: '#ecommerce' },
        { name: t('submenu.seo'), href: '#seo' },
        { name: t('submenu.automation'), href: '#automation' }
      ]
    },
    { 
      name: t('resources'), 
      href: '#',
      submenu: [
        { name: t('submenu.10mistakes'), href: `/${locale}/download/10-bledow-poradnik` },
        { name: t('submenu.50elements'), href: `/${locale}/download/50-elementow-checklist` },
        { name: t('submenu.localSeo'), href: `/${locale}/download/seo-local-guide` },
        { name: t('submenu.marketingAutomation'), href: `/${locale}/download/marketing-automation-guide` },
        { name: t('submenu.launchChecklist'), href: `/${locale}/download/website-launch-checklist` },
        { name: t('submenu.roiCalculator'), href: `/${locale}/tools/roi-calculator` }
      ]
    },
    { name: t('portfolio'), href: '#portfolio' },
    { name: t('about'), href: '#about' },
    { name: t('pricing'), href: '#pricing' },
    { name: t('contact'), href: '#contact' }
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-950/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              WebCraft<span className="text-gradient">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <div
                    onMouseEnter={() => setActiveDropdown(item.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-1 group">
                      {item.name}
                      <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-64 glass-dark rounded-2xl shadow-2xl border border-white/10 overflow-hidden"
                        >
                          {item.submenu.map((subitem) => (
                            <Link
                              key={subitem.name}
                              href={subitem.href}
                              className="block px-6 py-3 text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                            >
                              {subitem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Phone Number - Desktop Only */}
            <a
              href="https://wa.me/48662508780"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+48 662 508 780</span>
            </a>

            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* CTA Button */}
            <Button
              className="hidden sm:inline-flex bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t('cta')}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 -mr-3 text-gray-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="w-full px-5 py-4 text-left text-base text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 flex items-center justify-between"
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 mt-2 space-y-2"
                            >
                              {item.submenu.map((subitem) => (
                                <Link
                                  key={subitem.name}
                                  href={subitem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                                >
                                  {subitem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}

                {/* Mobile CTAs */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <a
                    href="https://wa.me/48662508780"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200"
                  >
                    <Phone className="w-4 h-4" />
                    <span>+48 662 508 780</span>
                  </a>
                  
                  <div className="px-4">
                    <LanguageSwitcher />
                  </div>
                  
                  <div className="px-4">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                      {t('cta')}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Wrench, FileText, Search, Scale, Zap, BarChart3, Megaphone, Eye, Check, Download, Printer, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface ChecklistTask {
  id: string
  task: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  timeline: string
  checked: boolean
  responsible: string
  notes: string
}

interface ChecklistCategory {
  name: string
  icon: any
  emoji: string
  tasks: ChecklistTask[]
  expanded: boolean
}

export default function WebsiteLaunchChecklistTool() {
  const params = useParams()
  const locale = params.locale as string
  const isPL = locale === 'pl'

  const [projectInfo, setProjectInfo] = useState({
    projectName: '',
    client: '',
    launchDate: '',
    projectManager: ''
  })

  const [categories, setCategories] = useState<ChecklistCategory[]>([
    {
      name: isPL ? 'Kontrola techniczna przed startem' : 'Pre-launch Technical Checks',
      icon: Wrench,
      emoji: '🔧',
      expanded: true,
      tasks: [
        { id: 'tech-1', task: isPL ? 'DNS domeny skonfigurowany poprawnie' : 'Domain DNS configured correctly', priority: 'critical', timeline: isPL ? '7 dni przed' : '7 days before', checked: false, responsible: '', notes: '' },
        { id: 'tech-2', task: isPL ? 'Certyfikat SSL zainstalowany i działający' : 'SSL certificate installed and working', priority: 'critical', timeline: isPL ? '5 dni przed' : '5 days before', checked: false, responsible: '', notes: '' },
        { id: 'tech-3', task: isPL ? 'Środowisko hostingowe skonfigurowane' : 'Hosting environment configured', priority: 'critical', timeline: isPL ? '7 dni przed' : '7 days before', checked: false, responsible: '', notes: '' },
        { id: 'tech-4', task: isPL ? 'System automatycznych kopii zapasowych' : 'Automated backup system in place', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'tech-5', task: isPL ? 'CDN skonfigurowane (jeśli dotyczy)' : 'CDN configured (if applicable)', priority: 'medium', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'tech-6', task: isPL ? 'Konta e-mail skonfigurowane i przetestowane' : 'Email accounts set up and tested', priority: 'high', timeline: isPL ? '5 dni przed' : '5 days before', checked: false, responsible: '', notes: '' },
        { id: 'tech-7', task: isPL ? 'Baza danych zoptymalizowana i zindeksowana' : 'Database optimized and indexed', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'tech-8', task: isPL ? 'Nagłówki bezpieczeństwa skonfigurowane' : 'Security headers configured', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' }
      ]
    },
    {
      name: isPL ? 'Przegląd treści' : 'Content Review',
      icon: FileText,
      emoji: '📝',
      expanded: true,
      tasks: [
        { id: 'content-1', task: isPL ? 'Cała treść sprawdzona pod kątem błędów' : 'All content spell-checked', priority: 'critical', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'content-2', task: isPL ? 'Wszystkie linki przetestowane i działające' : 'All links tested and working', priority: 'critical', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'content-3', task: isPL ? 'Obrazy zoptymalizowane dla internetu' : 'Images optimized for web', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'content-4', task: isPL ? 'Alt text dodany do wszystkich obrazów' : 'Alt text added to all images', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'content-5', task: isPL ? 'Strona błędu 404 utworzona' : '404 error page created', priority: 'high', timeline: isPL ? '4 dni przed' : '4 days before', checked: false, responsible: '', notes: '' },
        { id: 'content-6', task: isPL ? 'Dane kontaktowe dokładne' : 'Contact information accurate', priority: 'critical', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'content-7', task: isPL ? 'Formularze przetestowane i działające' : 'Forms tested and working', priority: 'critical', timeline: isPL ? '1 dzień przed' : '1 day before', checked: false, responsible: '', notes: '' },
        { id: 'content-8', task: isPL ? 'Treść zastępcza usunięta' : 'Placeholder content removed', priority: 'critical', timeline: isPL ? '1 dzień przed' : '1 day before', checked: false, responsible: '', notes: '' }
      ]
    },
    {
      name: isPL ? 'Konfiguracja SEO' : 'SEO Setup',
      icon: Search,
      emoji: '🔍',
      expanded: true,
      tasks: [
        { id: 'seo-1', task: isPL ? 'Tytuły stron zoptymalizowane' : 'Page titles optimized', priority: 'critical', timeline: isPL ? '5 dni przed' : '5 days before', checked: false, responsible: '', notes: '' },
        { id: 'seo-2', task: isPL ? 'Meta opisy napisane' : 'Meta descriptions written', priority: 'critical', timeline: isPL ? '5 dni przed' : '5 days before', checked: false, responsible: '', notes: '' },
        { id: 'seo-3', task: isPL ? 'Mapa XML wygenerowana' : 'XML sitemap generated', priority: 'critical', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'seo-4', task: isPL ? 'Robots.txt skonfigurowany' : 'Robots.txt configured', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'seo-5', task: isPL ? 'Schema markup wdrożone' : 'Schema markup implemented', priority: 'medium', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'seo-6', task: isPL ? 'Przekierowania 301 ustawione' : '301 redirects set up', priority: 'critical', timeline: isPL ? '1 dzień przed' : '1 day before', checked: false, responsible: '', notes: '' },
        { id: 'seo-7', task: isPL ? 'Tagi Open Graph dodane' : 'Open Graph tags added', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'seo-8', task: isPL ? 'Canonical URL ustawione' : 'Canonical URLs set', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' }
      ]
    },
    {
      name: isPL ? 'Zgodność prawna' : 'Legal Compliance',
      icon: Scale,
      emoji: '⚖️',
      expanded: true,
      tasks: [
        { id: 'legal-1', task: isPL ? 'Polityka prywatności utworzona' : 'Privacy Policy created', priority: 'critical', timeline: isPL ? '7 dni przed' : '7 days before', checked: false, responsible: '', notes: '' },
        { id: 'legal-2', task: isPL ? 'Regulamin utworzony' : 'Terms of Service created', priority: 'critical', timeline: isPL ? '7 dni przed' : '7 days before', checked: false, responsible: '', notes: '' },
        { id: 'legal-3', task: isPL ? 'Baner zgody na cookies wdrożony' : 'Cookie consent banner implemented', priority: 'critical', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'legal-4', task: isPL ? 'Zgodność z RODO zweryfikowana' : 'GDPR compliance verified', priority: 'critical', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'legal-5', task: isPL ? 'Informacje o prawach autorskich dodane' : 'Copyright notices added', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'legal-6', task: isPL ? 'Oświadczenie o dostępności dodane' : 'Accessibility statement added', priority: 'medium', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'legal-7', task: isPL ? 'Weryfikacja wieku (jeśli wymagana)' : 'Age verification (if required)', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' }
      ]
    },
    {
      name: isPL ? 'Testy wydajności' : 'Performance Testing',
      icon: Zap,
      emoji: '⚡',
      expanded: true,
      tasks: [
        { id: 'perf-1', task: isPL ? 'Szybkość strony przetestowana (GTmetrix/PageSpeed)' : 'Page speed tested (GTmetrix/PageSpeed)', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'perf-2', task: isPL ? 'Responsywność mobilna przetestowana' : 'Mobile responsiveness tested', priority: 'critical', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'perf-3', task: isPL ? 'Testy między przeglądarkami ukończone' : 'Cross-browser testing completed', priority: 'critical', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'perf-4', task: isPL ? 'Testy obciążenia wykonane' : 'Load testing performed', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'perf-5', task: isPL ? 'Cachowanie skonfigurowane prawidłowo' : 'Caching configured properly', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'perf-6', task: isPL ? 'CSS/JS zminifikowane' : 'CSS/JS minified', priority: 'medium', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'perf-7', task: isPL ? 'Dostępność przetestowana (zgodność WCAG)' : 'Accessibility tested (WCAG compliance)', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' }
      ]
    },
    {
      name: isPL ? 'Konfiguracja analityki' : 'Analytics Setup',
      icon: BarChart3,
      emoji: '📊',
      expanded: true,
      tasks: [
        { id: 'analytics-1', task: isPL ? 'Google Analytics 4 zainstalowane' : 'Google Analytics 4 installed', priority: 'critical', timeline: isPL ? '5 dni przed' : '5 days before', checked: false, responsible: '', notes: '' },
        { id: 'analytics-2', task: isPL ? 'Google Tag Manager skonfigurowany' : 'Google Tag Manager configured', priority: 'high', timeline: isPL ? '5 dni przed' : '5 days before', checked: false, responsible: '', notes: '' },
        { id: 'analytics-3', task: isPL ? 'Cele konwersji skonfigurowane' : 'Conversion goals configured', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'analytics-4', task: isPL ? 'Śledzenie e-commerce skonfigurowane' : 'E-commerce tracking set up', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'analytics-5', task: isPL ? 'Search Console zweryfikowane' : 'Search Console verified', priority: 'critical', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'analytics-6', task: isPL ? 'Narzędzie heatmap zainstalowane (jeśli dotyczy)' : 'Heatmap tool installed (if applicable)', priority: 'low', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'analytics-7', task: isPL ? 'Filtrowanie IP skonfigurowane' : 'IP filtering configured', priority: 'medium', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' }
      ]
    },
    {
      name: isPL ? 'Przygotowanie marketingowe' : 'Marketing Preparation',
      icon: Megaphone,
      emoji: '📣',
      expanded: true,
      tasks: [
        { id: 'marketing-1', task: isPL ? 'Profile mediów społecznościowych zaktualizowane' : 'Social media profiles updated', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' },
        { id: 'marketing-2', task: isPL ? 'Ogłoszenie o uruchomieniu przygotowane' : 'Launch announcement prepared', priority: 'high', timeline: isPL ? '5 dni przed' : '5 days before', checked: false, responsible: '', notes: '' },
        { id: 'marketing-3', task: isPL ? 'Kampania e-mailowa utworzona' : 'Email campaign created', priority: 'high', timeline: isPL ? '4 dni przed' : '4 days before', checked: false, responsible: '', notes: '' },
        { id: 'marketing-4', task: isPL ? 'Komunikat prasowy przygotowany' : 'Press release drafted', priority: 'medium', timeline: isPL ? '7 dni przed' : '7 days before', checked: false, responsible: '', notes: '' },
        { id: 'marketing-5', task: isPL ? 'Treści na dzień premiery zaplanowane' : 'Launch day content scheduled', priority: 'high', timeline: isPL ? '2 dni przed' : '2 days before', checked: false, responsible: '', notes: '' },
        { id: 'marketing-6', task: isPL ? 'Google My Business zaktualizowane' : 'Google My Business updated', priority: 'medium', timeline: isPL ? '1 dzień przed' : '1 day before', checked: false, responsible: '', notes: '' },
        { id: 'marketing-7', task: isPL ? 'Partnerzy/interesariusze powiadomieni' : 'Partners/stakeholders notified', priority: 'high', timeline: isPL ? '3 dni przed' : '3 days before', checked: false, responsible: '', notes: '' }
      ]
    },
    {
      name: isPL ? 'Monitorowanie po uruchomieniu' : 'Post-launch Monitoring',
      icon: Eye,
      emoji: '👀',
      expanded: true,
      tasks: [
        { id: 'monitor-1', task: isPL ? 'Monitoring czasu działania aktywowany' : 'Uptime monitoring activated', priority: 'critical', timeline: isPL ? 'Dzień premiery' : 'Launch day', checked: false, responsible: '', notes: '' },
        { id: 'monitor-2', task: isPL ? 'Logi błędów monitorowane' : 'Error logs monitored', priority: 'high', timeline: isPL ? 'Codziennie przez 1 tydzień' : 'Daily for 1 week', checked: false, responsible: '', notes: '' },
        { id: 'monitor-3', task: isPL ? 'Dane analityczne zweryfikowane' : 'Analytics data verified', priority: 'high', timeline: isPL ? 'Dzień 1 po premierze' : 'Day 1 post-launch', checked: false, responsible: '', notes: '' },
        { id: 'monitor-4', task: isPL ? 'Przesyłanie formularzy przetestowane' : 'Form submissions tested', priority: 'critical', timeline: isPL ? 'Dzień premiery' : 'Launch day', checked: false, responsible: '', notes: '' },
        { id: 'monitor-5', task: isPL ? 'Metryki wydajności przejrzane' : 'Performance metrics reviewed', priority: 'high', timeline: isPL ? 'Dzień 3 po premierze' : 'Day 3 post-launch', checked: false, responsible: '', notes: '' },
        { id: 'monitor-6', task: isPL ? 'Opinie użytkowników zebrane' : 'User feedback collected', priority: 'medium', timeline: isPL ? 'Tydzień 1 po premierze' : 'Week 1 post-launch', checked: false, responsible: '', notes: '' },
        { id: 'monitor-7', task: isPL ? 'Skanowanie bezpieczeństwa wykonane' : 'Security scan performed', priority: 'high', timeline: isPL ? 'Tydzień 1 po premierze' : 'Week 1 post-launch', checked: false, responsible: '', notes: '' },
        { id: 'monitor-8', task: isPL ? 'Raport po premierze utworzony' : 'Post-launch report created', priority: 'medium', timeline: isPL ? 'Tydzień 2 po premierze' : 'Week 2 post-launch', checked: false, responsible: '', notes: '' }
      ]
    }
  ])

  const [completedTasks, setCompletedTasks] = useState(0)
  const [totalTasks, setTotalTasks] = useState(0)

  useEffect(() => {
    const total = categories.reduce((sum, cat) => sum + cat.tasks.length, 0)
    const completed = categories.reduce((sum, cat) => 
      sum + cat.tasks.filter(task => task.checked).length, 0)
    setTotalTasks(total)
    setCompletedTasks(completed)
  }, [categories])

  useEffect(() => {
    loadProgress()
  }, [])

  const saveProgress = () => {
    const data = {
      projectInfo,
      categories
    }
    localStorage.setItem('websiteLaunchChecklist', JSON.stringify(data))
  }

  const loadProgress = () => {
    const saved = localStorage.getItem('websiteLaunchChecklist')
    if (saved) {
      const data = JSON.parse(saved)
      setProjectInfo(data.projectInfo || projectInfo)
      setCategories(data.categories || categories)
    }
  }

  const toggleTask = (categoryIndex: number, taskId: string) => {
    setCategories(prev => {
      const newCategories = [...prev]
      const taskIndex = newCategories[categoryIndex].tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        newCategories[categoryIndex].tasks[taskIndex].checked = !newCategories[categoryIndex].tasks[taskIndex].checked
      }
      return newCategories
    })
    saveProgress()
  }

  const updateTask = (categoryIndex: number, taskId: string, field: 'responsible' | 'notes', value: string) => {
    setCategories(prev => {
      const newCategories = [...prev]
      const taskIndex = newCategories[categoryIndex].tasks.findIndex(t => t.id === taskId)
      if (taskIndex !== -1) {
        newCategories[categoryIndex].tasks[taskIndex][field] = value
      }
      return newCategories
    })
    saveProgress()
  }

  const toggleCategory = (categoryIndex: number) => {
    setCategories(prev => {
      const newCategories = [...prev]
      newCategories[categoryIndex].expanded = !newCategories[categoryIndex].expanded
      return newCategories
    })
  }

  const resetChecklist = () => {
    setCategories(prev => 
      prev.map(cat => ({
        ...cat,
        tasks: cat.tasks.map(task => ({ ...task, checked: false, responsible: '', notes: '' }))
      }))
    )
    setProjectInfo({
      projectName: '',
      client: '',
      launchDate: '',
      projectManager: ''
    })
    saveProgress()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-blue-500'
      case 'low': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityLabel = (priority: string) => {
    if (isPL) {
      switch (priority) {
        case 'critical': return 'Krytyczne'
        case 'high': return 'Wysokie'
        case 'medium': return 'Średnie'
        case 'low': return 'Niskie'
        default: return ''
      }
    } else {
      switch (priority) {
        case 'critical': return 'Critical'
        case 'high': return 'High'
        case 'medium': return 'Medium'
        case 'low': return 'Low'
        default: return ''
      }
    }
  }

  const exportResults = () => {
    const results = {
      projectInfo,
      categories: categories.map(cat => ({
        category: cat.name,
        completedTasks: cat.tasks.filter(task => task.checked).length,
        totalTasks: cat.tasks.length,
        tasks: cat.tasks.map(task => ({
          task: task.task,
          priority: task.priority,
          timeline: task.timeline,
          completed: task.checked,
          responsible: task.responsible,
          notes: task.notes
        }))
      }))
    }
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `website-launch-checklist-${new Date().toISOString().split('T')[0]}.json`
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
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🚀 {isPL ? 'Checklist uruchomienia strony' : 'Website Launch Checklist'}
          </h1>
          <p className="text-xl text-gray-300">
            {isPL 
              ? 'Twój kompletny przewodnik do udanego uruchomienia strony'
              : 'Your Complete Guide to a Successful Website Launch'}
          </p>
        </motion.div>

        {/* Project Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-dark rounded-2xl p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            📋 {isPL ? 'Informacje o projekcie' : 'Project Information'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                {isPL ? 'Nazwa projektu:' : 'Project Name:'}
              </label>
              <input
                type="text"
                value={projectInfo.projectName}
                onChange={(e) => {
                  setProjectInfo(prev => ({ ...prev, projectName: e.target.value }))
                  saveProgress()
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder={isPL ? 'Wprowadź nazwę projektu' : 'Enter project name'}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                {isPL ? 'Klient/Firma:' : 'Client/Company:'}
              </label>
              <input
                type="text"
                value={projectInfo.client}
                onChange={(e) => {
                  setProjectInfo(prev => ({ ...prev, client: e.target.value }))
                  saveProgress()
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder={isPL ? 'Wprowadź nazwę klienta lub firmy' : 'Enter client or company name'}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                {isPL ? 'Data uruchomienia:' : 'Launch Date:'}
              </label>
              <input
                type="date"
                value={projectInfo.launchDate}
                onChange={(e) => {
                  setProjectInfo(prev => ({ ...prev, launchDate: e.target.value }))
                  saveProgress()
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                {isPL ? 'Kierownik projektu:' : 'Project Manager:'}
              </label>
              <input
                type="text"
                value={projectInfo.projectManager}
                onChange={(e) => {
                  setProjectInfo(prev => ({ ...prev, projectManager: e.target.value }))
                  saveProgress()
                }}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                placeholder={isPL ? 'Wprowadź imię kierownika projektu' : 'Enter project manager name'}
              />
            </div>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-dark rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium text-white">
              {isPL ? 'Postęp ogólny' : 'Overall Progress'}
            </span>
            <span className="text-lg font-medium text-white">
              {completedTasks}/{totalTasks} ({Math.round((completedTasks / totalTasks) * 100)}%)
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        {/* Priority Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-dark rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <span className="font-medium text-white">{isPL ? 'Poziomy priorytetów:' : 'Priority Levels:'}</span>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor('critical')}`}>
                {getPriorityLabel('critical')}
              </div>
              <span className="text-sm text-gray-400">{isPL ? 'Musi być ukończone przed premierą' : 'Must complete before launch'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor('high')}`}>
                {getPriorityLabel('high')}
              </div>
              <span className="text-sm text-gray-400">{isPL ? 'Ważne dla premiery' : 'Important for launch'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor('medium')}`}>
                {getPriorityLabel('medium')}
              </div>
              <span className="text-sm text-gray-400">{isPL ? 'Zalecane' : 'Recommended'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor('low')}`}>
                {getPriorityLabel('low')}
              </div>
              <span className="text-sm text-gray-400">{isPL ? 'Miłe dodatki' : 'Nice to have'}</span>
            </div>
          </div>
        </motion.div>

        {/* Categories */}
        {categories.map((category, categoryIndex) => (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + categoryIndex * 0.05 }}
            className="mb-6"
          >
            <div className="glass-dark rounded-2xl overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(categoryIndex)}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 p-4 flex items-center justify-between hover:from-purple-700 hover:to-blue-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.emoji}</span>
                  <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                  <span className="text-sm text-white/80">
                    ({category.tasks.filter(t => t.checked).length}/{category.tasks.length})
                  </span>
                </div>
                {category.expanded ? <ChevronUp className="w-5 h-5 text-white" /> : <ChevronDown className="w-5 h-5 text-white" />}
              </button>

              {/* Tasks */}
              {category.expanded && (
                <div className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">{isPL ? 'Zadanie' : 'Task'}</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">{isPL ? 'Priorytet' : 'Priority'}</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-400">{isPL ? 'Termin' : 'Timeline'}</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-400 hidden md:table-cell">{isPL ? 'Odpowiedzialny' : 'Responsible'}</th>
                          <th className="text-left py-3 px-2 text-sm font-medium text-gray-400 hidden lg:table-cell">{isPL ? 'Notatki' : 'Notes'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {category.tasks.map((task) => (
                          <tr key={task.id} className="border-b border-gray-800 hover:bg-white/5">
                            <td className="py-3 px-2">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={task.checked}
                                  onChange={() => toggleTask(categoryIndex, task.id)}
                                  className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                                />
                                <span className={`text-white ${task.checked ? 'line-through opacity-50' : ''}`}>
                                  {task.task}
                                </span>
                              </label>
                            </td>
                            <td className="py-3 px-2">
                              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold text-white ${getPriorityColor(task.priority)}`}>
                                {getPriorityLabel(task.priority)}
                              </div>
                            </td>
                            <td className="py-3 px-2">
                              <span className="text-sm text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                                {task.timeline}
                              </span>
                            </td>
                            <td className="py-3 px-2 hidden md:table-cell">
                              <input
                                type="text"
                                value={task.responsible}
                                onChange={(e) => updateTask(categoryIndex, task.id, 'responsible', e.target.value)}
                                className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none"
                                placeholder={isPL ? 'Imię' : 'Name'}
                              />
                            </td>
                            <td className="py-3 px-2 hidden lg:table-cell">
                              <textarea
                                value={task.notes}
                                onChange={(e) => updateTask(categoryIndex, task.id, 'notes', e.target.value)}
                                className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:border-purple-500 focus:outline-none resize-none"
                                rows={1}
                                placeholder={isPL ? 'Dodaj notatki...' : 'Add notes...'}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-dark rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            {isPL ? 'Potrzebujesz pomocy przy uruchomieniu strony?' : 'Need Help With Your Website Launch?'}
          </h3>
          <p className="text-gray-300 mb-6">
            {isPL 
              ? 'Pozwól ekspertom WebCraftAI obsłużyć proces tworzenia i uruchomienia Twojej strony od początku do końca.'
              : "Let WebCraftAI's experts handle your website development and launch process from start to finish."}
          </p>
          <Link href={`/${locale}/#contact`}>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              {isPL ? 'Zacznij dzisiaj' : 'Get Started Today'}
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Floating completion counter */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 print:hidden"
      >
        <Check className="w-5 h-5" />
        <span className="font-semibold">{completedTasks}/{totalTasks}</span>
      </motion.div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .glass-dark {
            background: white !important;
            color: black !important;
            border: 1px solid #ccc !important;
          }
          
          input, textarea {
            border: 1px solid #000 !important;
            background: white !important;
            color: black !important;
          }
          
          .text-white {
            color: black !important;
          }
          
          .text-gray-300, .text-gray-400 {
            color: #666 !important;
          }
        }
      `}</style>
    </div>
  )
}
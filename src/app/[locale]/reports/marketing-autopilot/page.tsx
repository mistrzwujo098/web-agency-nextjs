'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Target, Clock, TrendingUp, DollarSign, Users, Zap, CheckCircle, ChevronRight, Download, Share2, BarChart, Settings, Mail, MessageSquare, Repeat } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ReportMarketingAutopilotPage() {
  const params = useParams()
  const locale = params.locale as string
  const isPL = locale === 'pl'

  const [activeSection, setActiveSection] = useState(0)
  const [readProgress, setReadProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrolled / total) * 100
      setReadProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const strategies = [
    {
      id: 1,
      icon: Mail,
      title: isPL ? 'Email Marketing Automatyczny' : 'Automated Email Marketing',
      timeToSet: isPL ? '2-3 godziny' : '2-3 hours',
      monthlyTime: isPL ? '30 minut' : '30 minutes',
      roi: isPL ? '4200% średni ROI' : '4200% average ROI',
      description: isPL 
        ? 'System automatycznego email marketingu pracuje 24/7. Wysyła spersonalizowane wiadomości do klientów dokładnie wtedy, gdy są najbardziej skłonni do zakupu.'
        : 'Automated email marketing system works 24/7. Sends personalized messages to customers exactly when they\'re most likely to buy.',
      howItWorks: isPL ? 'Jak to działa:' : 'How it works:',
      steps: [
        isPL ? 'Klient zostawia email (np. pobierając darmowy poradnik)' : 'Customer leaves email (e.g., downloading free guide)',
        isPL ? 'System automatycznie wysyła serię wartościowych emaili' : 'System automatically sends series of valuable emails',
        isPL ? 'Buduje zaufanie i relację przez 7-14 dni' : 'Builds trust and relationship over 7-14 days',
        isPL ? 'Wysyła ofertę gdy klient jest gotowy' : 'Sends offer when customer is ready'
      ],
      tools: isPL ? 'Narzędzia: ConvertKit, Mailchimp, ActiveCampaign' : 'Tools: ConvertKit, Mailchimp, ActiveCampaign',
      realExample: isPL 
        ? 'Salon fryzjerski z Warszawy: Stworzył automatyczną kampanię "5 sposobów na piękne włosy". Efekt: 127 nowych klientek w 2 miesiące, zero dodatkowej pracy.'
        : 'Warsaw hair salon: Created automatic campaign "5 ways to beautiful hair". Result: 127 new clients in 2 months, zero additional work.'
    },
    {
      id: 2,
      icon: Users,
      title: isPL ? 'Google Moja Firma na Autopilocie' : 'Google My Business on Autopilot',
      timeToSet: isPL ? '1 godzina' : '1 hour',
      monthlyTime: isPL ? '15 minut' : '15 minutes',
      roi: isPL ? '+251% więcej telefonów' : '+251% more calls',
      description: isPL 
        ? 'Twój profil Google pracuje jako całodobowy sprzedawca. Pokazuje się ludziom dokładnie wtedy, gdy szukają Twoich usług w okolicy.'
        : 'Your Google profile works as a 24/7 salesperson. Shows up for people exactly when they\'re looking for your services nearby.',
      howItWorks: isPL ? 'Automatyczne funkcje:' : 'Automatic features:',
      steps: [
        isPL ? 'Automatyczne odpowiedzi na częste pytania' : 'Automatic answers to frequent questions',
        isPL ? 'Przypomnienia o opiniach dla klientów' : 'Review reminders for customers',
        isPL ? 'Aktualizacje godzin i świąt' : 'Hours and holiday updates',
        isPL ? 'Posty z ofertami (można zaplanować)' : 'Offer posts (can be scheduled)'
      ],
      tools: isPL ? 'Narzędzia: Google Business Profile, LocalBusiness+' : 'Tools: Google Business Profile, LocalBusiness+',
      realExample: isPL 
        ? 'Mechanik z Krakowa: Ustawił automatyczne odpowiedzi i posty. Wzrost telefonów o 251% bez dodatkowej pracy. Klienci sami rezerwują terminy.'
        : 'Krakow mechanic: Set up automatic responses and posts. 251% increase in calls without additional work. Customers book appointments themselves.'
    },
    {
      id: 3,
      icon: MessageSquare,
      title: isPL ? 'Chatbot na Stronie 24/7' : '24/7 Website Chatbot',
      timeToSet: isPL ? '3-4 godziny' : '3-4 hours',
      monthlyTime: isPL ? '1 godzina' : '1 hour',
      roi: isPL ? '+67% konwersji' : '+67% conversions',
      description: isPL 
        ? 'Inteligentny chatbot odpowiada na pytania klientów o każdej porze. Zbiera kontakty, umawia spotkania i przekazuje gotowych klientów.'
        : 'Smart chatbot answers customer questions at any time. Collects contacts, schedules meetings, and delivers ready customers.',
      howItWorks: isPL ? 'Możliwości chatbota:' : 'Chatbot capabilities:',
      steps: [
        isPL ? 'Odpowiada na 80% typowych pytań' : 'Answers 80% of typical questions',
        isPL ? 'Zbiera dane kontaktowe zainteresowanych' : 'Collects contact data from interested parties',
        isPL ? 'Umawia spotkania w kalendarzu' : 'Schedules meetings in calendar',
        isPL ? 'Wysyła powiadomienia o nowych leadach' : 'Sends notifications about new leads'
      ],
      tools: isPL ? 'Narzędzia: Tidio, Intercom, Drift' : 'Tools: Tidio, Intercom, Drift',
      realExample: isPL 
        ? 'Gabinet stomatologiczny: Chatbot obsługuje 73% pytań nocą i w weekendy. 156 nowych pacjentów w 3 miesiące, których inaczej by stracili.'
        : 'Dental clinic: Chatbot handles 73% of questions at night and weekends. 156 new patients in 3 months that would have been lost otherwise.'
    },
    {
      id: 4,
      icon: Target,
      title: isPL ? 'Reklamy Remarketingowe' : 'Remarketing Ads',
      timeToSet: isPL ? '2 godziny' : '2 hours',
      monthlyTime: isPL ? '30 minut' : '30 minutes',
      roi: isPL ? '10x niższy koszt konwersji' : '10x lower conversion cost',
      description: isPL 
        ? 'System automatycznie pokazuje reklamy osobom, które już odwiedziły Twoją stronę. Przypomina o Tobie gdy są gotowi do zakupu.'
        : 'System automatically shows ads to people who already visited your site. Reminds them about you when they\'re ready to buy.',
      howItWorks: isPL ? 'Proces automatyczny:' : 'Automatic process:',
      steps: [
        isPL ? 'Klient odwiedza stronę ale nie kupuje' : 'Customer visits site but doesn\'t buy',
        isPL ? 'System "zapamiętuje" go przez piksel' : 'System "remembers" them through pixel',
        isPL ? 'Pokazuje mu reklamy przez 30 dni' : 'Shows them ads for 30 days',
        isPL ? 'Wraca i finalizuje zakup' : 'They return and complete purchase'
      ],
      tools: isPL ? 'Narzędzia: Facebook Pixel, Google Ads' : 'Tools: Facebook Pixel, Google Ads',
      realExample: isPL 
        ? 'Sklep z odzieżą: Ustawił remarketing na Facebooku. Koszt pozyskania klienta spadł z 120 zł do 12 zł. ROI wzrósł o 900%.'
        : 'Clothing store: Set up Facebook remarketing. Customer acquisition cost dropped from $30 to $3. ROI increased by 900%.'
    },
    {
      id: 5,
      icon: BarChart,
      title: isPL ? 'Content Marketing Automatyczny' : 'Automated Content Marketing',
      timeToSet: isPL ? '4-5 godzin' : '4-5 hours',
      monthlyTime: isPL ? '2 godziny' : '2 hours',
      roi: isPL ? '3x więcej ruchu' : '3x more traffic',
      description: isPL 
        ? 'Raz napisany artykuł pracuje latami. System automatycznie publikuje treści, optymalizuje SEO i przyciąga klientów z Google.'
        : 'Once written article works for years. System automatically publishes content, optimizes SEO and attracts customers from Google.',
      howItWorks: isPL ? 'Automatyzacja treści:' : 'Content automation:',
      steps: [
        isPL ? 'Tworzysz treści raz na miesiąc (batch)' : 'Create content once a month (batch)',
        isPL ? 'System publikuje według harmonogramu' : 'System publishes according to schedule',
        isPL ? 'Automatycznie udostępnia w social media' : 'Automatically shares on social media',
        isPL ? 'Mierzy wyniki i sugeruje tematy' : 'Measures results and suggests topics'
      ],
      tools: isPL ? 'Narzędzia: WordPress, Buffer, Hootsuite' : 'Tools: WordPress, Buffer, Hootsuite',
      realExample: isPL 
        ? 'Prawnik z Poznania: Pisze 4 artykuły miesięcznie, publikuje automatycznie. Po roku: 45 000 odwiedzin miesięcznie, 89 nowych klientów.'
        : 'Poznan lawyer: Writes 4 articles monthly, publishes automatically. After a year: 45,000 monthly visits, 89 new clients.'
    },
    {
      id: 6,
      icon: Repeat,
      title: isPL ? 'System Poleceń Automatyczny' : 'Automated Referral System',
      timeToSet: isPL ? '2 godziny' : '2 hours',
      monthlyTime: isPL ? '0 minut' : '0 minutes',
      roi: isPL ? '+43% nowych klientów' : '+43% new customers',
      description: isPL 
        ? 'Zadowoleni klienci automatycznie polecają Cię znajomym. System sam wysyła prośby o polecenia i nagradza polecających.'
        : 'Satisfied customers automatically recommend you to friends. System sends referral requests and rewards referrers.',
      howItWorks: isPL ? 'Mechanizm działania:' : 'How it works:',
      steps: [
        isPL ? 'Po 30 dniach system pyta o satysfakcję' : 'After 30 days system asks about satisfaction',
        isPL ? 'Zadowoleni dostają link polecający' : 'Satisfied ones get referral link',
        isPL ? 'Za każde polecenie - automatyczna nagroda' : 'For each referral - automatic reward',
        isPL ? 'Nowy klient = rabat dla obu stron' : 'New customer = discount for both parties'
      ],
      tools: isPL ? 'Narzędzia: ReferralCandy, Post Purchase Surveys' : 'Tools: ReferralCandy, Post Purchase Surveys',
      realExample: isPL 
        ? 'Trener personalny: System poleceń przynosi 43% nowych klientów. Średni koszt pozyskania = 0 zł (tylko rabaty dla polecających).'
        : 'Personal trainer: Referral system brings 43% of new clients. Average acquisition cost = $0 (only discounts for referrers).'
    }
  ]

  const implementationPlan = [
    {
      week: isPL ? 'Tydzień 1-2' : 'Week 1-2',
      title: isPL ? 'Fundament' : 'Foundation',
      tasks: [
        isPL ? 'Załóż Google Moja Firma' : 'Set up Google My Business',
        isPL ? 'Zainstaluj piksel remarketingowy' : 'Install remarketing pixel',
        isPL ? 'Wybierz system email marketingu' : 'Choose email marketing system'
      ]
    },
    {
      week: isPL ? 'Tydzień 3-4' : 'Week 3-4',
      title: isPL ? 'Automatyzacja' : 'Automation',
      tasks: [
        isPL ? 'Stwórz pierwszą kampanię email' : 'Create first email campaign',
        isPL ? 'Ustaw chatbota na stronie' : 'Set up website chatbot',
        isPL ? 'Skonfiguruj automatyczne posty' : 'Configure automatic posts'
      ]
    },
    {
      week: isPL ? 'Miesiąc 2' : 'Month 2',
      title: isPL ? 'Optymalizacja' : 'Optimization',
      tasks: [
        isPL ? 'Uruchom remarketing' : 'Launch remarketing',
        isPL ? 'Zaplanuj content na 3 miesiące' : 'Plan content for 3 months',
        isPL ? 'Włącz system poleceń' : 'Enable referral system'
      ]
    },
    {
      week: isPL ? 'Miesiąc 3+' : 'Month 3+',
      title: isPL ? 'Skalowanie' : 'Scaling',
      tasks: [
        isPL ? 'Analizuj wyniki i poprawiaj' : 'Analyze results and improve',
        isPL ? 'Dodawaj nowe automatyzacje' : 'Add new automations',
        isPL ? 'Reinwestuj zyski w rozwój' : 'Reinvest profits in growth'
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <motion.div 
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Header */}
      <div className="bg-gray-900 border-b border-white/10 sticky top-1 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="text-white hover:text-purple-400 transition-colors">
              ← {isPL ? 'Powrót' : 'Back'}
            </Link>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="hidden sm:flex"
              >
                <Download className="w-4 h-4 mr-2" />
                PDF
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: document.title,
                      url: window.location.href
                    })
                  }
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Share2 className="w-4 h-4 mr-2" />
                {isPL ? 'Udostępnij' : 'Share'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 md:pb-16">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 rounded-full mb-6">
              <Brain className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-medium">
                {isPL ? 'PRZEWODNIK AUTOMATYZACJI' : 'AUTOMATION GUIDE'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isPL 
                ? 'Marketing na Autopilocie: Prosty Przewodnik dla Lokalnych Firm' 
                : 'Marketing on Autopilot: Simple Guide for Local Businesses'}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {isPL 
                ? 'Jak ustawić marketing raz, a potem tylko zbierać klientów? 6 sprawdzonych systemów, które pracują za Ciebie 24/7.'
                : 'How to set up marketing once and then just collect customers? 6 proven systems that work for you 24/7.'}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">87%</div>
                <p className="text-gray-400 text-sm">
                  {isPL ? 'mniej pracy' : 'less work'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">3.5x</div>
                <p className="text-gray-400 text-sm">
                  {isPL ? 'więcej leadów' : 'more leads'}
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
                <p className="text-gray-400 text-sm">
                  {isPL ? 'działa non-stop' : 'works non-stop'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {isPL ? 'Dlaczego automatyzacja?' : 'Why Automation?'}
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              {isPL 
                ? 'Jako właściciel lokalnej firmy, Twój czas jest najcenniejszy. Każda godzina spędzona na powtarzalnych zadaniach marketingowych to godzina stracona - mogłeś obsłużyć klienta, rozwinąć usługę lub po prostu odpocząć.'
                : 'As a local business owner, your time is most valuable. Every hour spent on repetitive marketing tasks is an hour lost - you could have served a customer, developed your service, or simply rested.'}
            </p>
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
              <p className="text-white font-semibold">
                {isPL 
                  ? '💡 Marketing automatyczny = Pracownik, który nigdy nie śpi, nie choruje i kosztuje grosze'
                  : '💡 Automated marketing = Employee who never sleeps, never gets sick, and costs pennies'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Automation Strategies */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {isPL ? '6 Systemów Automatycznego Marketingu' : '6 Automated Marketing Systems'}
            </h2>
            <p className="text-gray-300">
              {isPL ? 'Każdy działa niezależnie. Zacznij od jednego.' : 'Each works independently. Start with one.'}
            </p>
          </motion.div>

          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Strategy Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <strategy.icon className="w-8 h-8 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    #{strategy.id}. {strategy.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">
                        {isPL ? 'Ustawienie:' : 'Setup:'} <span className="text-white font-medium">{strategy.timeToSet}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-medium">{strategy.roi}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="glass-dark rounded-2xl p-6 mb-4">
                <p className="text-gray-300 text-lg mb-4">
                  {strategy.description}
                </p>
                
                {/* How it works */}
                <h4 className="text-white font-semibold mb-3">{strategy.howItWorks}</h4>
                <ol className="space-y-2 mb-4">
                  {strategy.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 text-sm font-medium flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-gray-300">{step}</span>
                    </li>
                  ))}
                </ol>

                <p className="text-sm text-gray-400">{strategy.tools}</p>
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-600/30">
                <h4 className="text-white font-semibold mb-2">
                  ✅ {isPL ? 'Rzeczywisty przykład:' : 'Real Example:'}
                </h4>
                <p className="text-gray-300 italic">
                  "{strategy.realExample}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Implementation Plan */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {isPL ? 'Plan Wdrożenia: Od Zera do Autopilota' : 'Implementation Plan: From Zero to Autopilot'}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {implementationPlan.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{phase.week}</h3>
                    <p className="text-purple-400">{phase.title}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {isPL ? 'Twój Potencjalny Zwrot z Automatyzacji' : 'Your Potential Return from Automation'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {isPL ? 'Bez automatyzacji:' : 'Without automation:'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Czas na marketing/tydzień:' : 'Marketing time/week:'}</span>
                    <span className="text-red-400 font-medium">15-20h</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Koszt czasu (50zł/h):' : 'Time cost ($25/h):'}</span>
                    <span className="text-red-400 font-medium">{isPL ? '3000-4000 zł' : '$1500-2000'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Leady/miesiąc:' : 'Leads/month:'}</span>
                    <span className="text-red-400 font-medium">10-20</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  {isPL ? 'Z automatyzacją:' : 'With automation:'}
                </h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Czas na marketing/tydzień:' : 'Marketing time/week:'}</span>
                    <span className="text-green-400 font-medium">2-3h</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Koszt narzędzi:' : 'Tools cost:'}</span>
                    <span className="text-green-400 font-medium">{isPL ? '200-500 zł' : '$50-125'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">{isPL ? 'Leady/miesiąc:' : 'Leads/month:'}</span>
                    <span className="text-green-400 font-medium">35-70</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-xl border border-purple-600/30">
              <p className="text-center text-xl text-white">
                {isPL 
                  ? '💰 Oszczędność: 2500-3500 zł/miesiąc + 3.5x więcej klientów'
                  : '💰 Savings: $1250-1750/month + 3.5x more customers'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {isPL ? '⚠️ Najczęstsze Błędy (i jak ich uniknąć)' : '⚠️ Common Mistakes (and how to avoid them)'}
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  mistake: isPL ? 'Próba zrobienia wszystkiego naraz' : 'Trying to do everything at once',
                  solution: isPL ? 'Zacznij od jednego systemu. Opanuj go, potem dodaj kolejny.' : 'Start with one system. Master it, then add another.'
                },
                {
                  mistake: isPL ? 'Brak personalizacji wiadomości' : 'No message personalization',
                  solution: isPL ? 'Nawet automatyczne wiadomości muszą brzmieć osobisto. Używaj imion, odniesień lokalnych.' : 'Even automatic messages must sound personal. Use names, local references.'
                },
                {
                  mistake: isPL ? 'Ustawił i zapomniał' : 'Set and forget',
                  solution: isPL ? 'Automatyzacja to nie "ustawił i zapomniał". Sprawdzaj wyniki co tydzień, optymalizuj.' : 'Automation is not "set and forget". Check results weekly, optimize.'
                },
                {
                  mistake: isPL ? 'Za dużo automatyzacji' : 'Too much automation',
                  solution: isPL ? 'Zachowaj ludzki kontakt w kluczowych momentach. Automatyzuj rutynę, nie relacje.' : 'Keep human contact at key moments. Automate routine, not relationships.'
                }
              ].map((item, index) => (
                <div key={index} className="glass-dark rounded-xl p-6">
                  <p className="text-red-400 font-semibold mb-2">❌ {item.mistake}</p>
                  <p className="text-gray-300">✅ {item.solution}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {isPL ? 'Gotowy na Marketing Autopilot?' : 'Ready for Marketing Autopilot?'}
            </h2>
            
            <div className="glass-dark rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-300 mb-6">
                {isPL 
                  ? 'Pomożemy Ci ustawić wszystkie systemy w 30 dni. Ty się skupiasz na biznesie, my zajmiemy się automatyzacją.'
                  : 'We\'ll help you set up all systems in 30 days. You focus on business, we\'ll handle automation.'}
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">30 dni</div>
                  <p className="text-gray-400">
                    {isPL ? 'Pełne wdrożenie' : 'Full implementation'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">6 systemów</div>
                  <p className="text-gray-400">
                    {isPL ? 'Działających 24/7' : 'Working 24/7'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
                  <p className="text-gray-400">
                    {isPL ? 'Wsparcie i szkolenie' : 'Support and training'}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = `/${locale}/free-analysis`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  {isPL ? 'Zamów darmową konsultację automatyzacji' : 'Get Free Automation Consultation'}
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {isPL 
                ? 'Sprawdzimy, które automatyzacje przyniosą Ci największy zwrot'
                : 'We\'ll check which automations will bring you the biggest return'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .glass-dark {
            background: white !important;
            color: black !important;
            border: 1px solid #ccc !important;
          }
          
          .text-white {
            color: black !important;
          }
          
          .text-gray-300, .text-gray-400 {
            color: #666 !important;
          }
          
          .bg-gradient-to-r {
            background: #666 !important;
          }
        }
      `}</style>
    </div>
  )
}
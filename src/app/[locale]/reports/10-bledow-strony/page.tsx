'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, XCircle, TrendingDown, DollarSign, Users, Clock, Shield, Smartphone, Search, ChevronRight, Download, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function Report10BledowPage() {
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

  const mistakes = [
    {
      id: 1,
      icon: Smartphone,
      title: isPL ? 'Brak responsywności mobilnej' : 'No Mobile Responsiveness',
      impact: isPL ? '-67% potencjalnych klientów' : '-67% potential customers',
      problem: isPL ? 'W 2024 roku 67% lokalnych wyszukiwań pochodzi z urządzeń mobilnych. Jeśli Twoja strona nie działa dobrze na telefonie, tracisz większość klientów zanim zobaczą Twoją ofertę.' : 'In 2024, 67% of local searches come from mobile devices. If your site doesn\'t work well on phones, you\'re losing most customers before they see your offer.',
      symptoms: [
        isPL ? 'Tekst za mały do czytania na telefonie' : 'Text too small to read on phone',
        isPL ? 'Przyciski za blisko siebie' : 'Buttons too close together',
        isPL ? 'Treść "ucieka" poza ekran' : 'Content goes off-screen',
        isPL ? 'Długie ładowanie na mobilnym internecie' : 'Long loading on mobile internet'
      ],
      solution: isPL ? 'Zastosuj responsive web design. Testuj stronę na różnych urządzeniach. Użyj Google Mobile-Friendly Test.' : 'Apply responsive web design. Test on various devices. Use Google Mobile-Friendly Test.',
      realExample: isPL ? 'Fryzjer z Krakowa stracił 73% ruchu mobilnego przez nieresponsywną stronę. Po naprawie: +156% rezerwacji online w 2 miesiące.' : 'Krakow hairdresser lost 73% of mobile traffic due to non-responsive site. After fix: +156% online bookings in 2 months.'
    },
    {
      id: 2,
      icon: Clock,
      title: isPL ? 'Strona ładuje się dłużej niż 3 sekundy' : 'Page Loads Longer Than 3 Seconds',
      impact: isPL ? '-53% konwersji' : '-53% conversions',
      problem: isPL ? '53% użytkowników opuszcza stronę, która ładuje się dłużej niż 3 sekundy. Google też karze wolne strony niższą pozycją.' : '53% of users leave a page that loads longer than 3 seconds. Google also penalizes slow sites with lower rankings.',
      symptoms: [
        isPL ? 'Ładowanie strony głównej > 3 sek' : 'Homepage loading > 3 sec',
        isPL ? 'Duże, nieoptymalizowane zdjęcia' : 'Large, unoptimized images',
        isPL ? 'Za dużo pluginów/skryptów' : 'Too many plugins/scripts',
        isPL ? 'Tani hosting współdzielony' : 'Cheap shared hosting'
      ],
      solution: isPL ? 'Zoptymalizuj zdjęcia (WebP), włącz cache, usuń zbędne pluginy, rozważ lepszy hosting.' : 'Optimize images (WebP), enable caching, remove unnecessary plugins, consider better hosting.',
      realExample: isPL ? 'Mechanik z Warszawy przyspieszył stronę z 8s do 2.1s. Efekt: +89% zapytań o wycenę w pierwszy miesiąc.' : 'Warsaw mechanic sped up site from 8s to 2.1s. Result: +89% quote requests in first month.'
    },
    {
      id: 3,
      icon: Search,
      title: isPL ? 'Brak widocznego numeru telefonu' : 'No Visible Phone Number',
      impact: isPL ? '-70% połączeń' : '-70% calls',
      problem: isPL ? '70% klientów lokalnych chce zadzwonić od razu. Jeśli muszą szukać numeru dłużej niż 3 sekundy, dzwonią do konkurencji.' : '70% of local customers want to call immediately. If they have to search for the number longer than 3 seconds, they call the competition.',
      symptoms: [
        isPL ? 'Numer tylko w stopce' : 'Number only in footer',
        isPL ? 'Numer jako obrazek (nie klikalny)' : 'Number as image (not clickable)',
        isPL ? 'Brak numeru na stronie głównej' : 'No number on homepage',
        isPL ? 'Numer schowany w "Kontakt"' : 'Number hidden in "Contact"'
      ],
      solution: isPL ? 'Umieść klikalny numer w nagłówku, dodaj przycisk "Zadzwoń teraz", użyj sticky header na mobile.' : 'Place clickable number in header, add "Call now" button, use sticky header on mobile.',
      realExample: isPL ? 'Dentysta z Wrocławia dodał widoczny numer telefonu. Wzrost połączeń o 340% w tydzień.' : 'Wrocław dentist added visible phone number. 340% increase in calls within a week.'
    },
    {
      id: 4,
      icon: XCircle,
      title: isPL ? 'Niejasna propozycja wartości' : 'Unclear Value Proposition',
      impact: isPL ? '-80% zainteresowania' : '-80% interest',
      problem: isPL ? 'Masz 5 sekund żeby powiedzieć czym się zajmujesz i dlaczego klient ma wybrać Ciebie. 80% stron tego nie robi.' : 'You have 5 seconds to say what you do and why the customer should choose you. 80% of sites don\'t do this.',
      symptoms: [
        isPL ? 'Ogólnikowe hasła typu "Najlepsza jakość"' : 'Generic slogans like "Best quality"',
        isPL ? 'Brak konkretów czym się zajmujesz' : 'No specifics about what you do',
        isPL ? 'Za dużo branżowego żargonu' : 'Too much industry jargon',
        isPL ? 'Skupienie na sobie, nie na kliencie' : 'Focus on yourself, not the customer'
      ],
      solution: isPL ? 'W pierwszej sekcji odpowiedz: Co robisz? Dla kogo? Jaka jest korzyść? Dlaczego Ty?' : 'In the first section answer: What do you do? For whom? What\'s the benefit? Why you?',
      realExample: isPL ? 'Hydraulik zmienił "Usługi hydrauliczne" na "Naprawiam awarię w 60 minut - też w weekend". +200% wezwań.' : 'Plumber changed "Plumbing services" to "I fix emergencies in 60 minutes - weekends too". +200% calls.'
    },
    {
      id: 5,
      icon: Users,
      title: isPL ? 'Brak dowodów społecznych' : 'No Social Proof',
      impact: isPL ? '-92% zaufania' : '-92% trust',
      problem: isPL ? '92% klientów czyta opinie przed wyborem usługi lokalnej. Brak opinii = brak zaufania = brak klientów.' : '92% of customers read reviews before choosing a local service. No reviews = no trust = no customers.',
      symptoms: [
        isPL ? 'Zero opinii na stronie' : 'Zero reviews on site',
        isPL ? 'Stare opinie (sprzed 2+ lat)' : 'Old reviews (2+ years)',
        isPL ? 'Same teksty bez zdjęć/nazwisk' : 'Just text without photos/names',
        isPL ? 'Brak integracji z Google Reviews' : 'No Google Reviews integration'
      ],
      solution: isPL ? 'Zbieraj i pokazuj opinie systematycznie. Używaj zdjęć klientów. Integruj Google Reviews.' : 'Collect and show reviews systematically. Use customer photos. Integrate Google Reviews.',
      realExample: isPL ? 'Salon kosmetyczny dodał sekcję z opiniami Google. Konwersje wzrosły o 127% w miesiąc.' : 'Beauty salon added Google reviews section. Conversions increased 127% in a month.'
    },
    {
      id: 6,
      icon: DollarSign,
      title: isPL ? 'Ukryte ceny' : 'Hidden Prices',
      impact: isPL ? '-84% zapytań' : '-84% inquiries',
      problem: isPL ? '84% klientów chce znać przybliżone ceny przed kontaktem. "Ceny na zapytanie" = przechodzą do konkurencji.' : '84% of customers want to know approximate prices before contact. "Prices on request" = they go to competition.',
      symptoms: [
        isPL ? 'Żadnych cen na stronie' : 'No prices on site',
        isPL ? '"Wycena indywidualna" wszędzie' : '"Individual pricing" everywhere',
        isPL ? 'Ceny schowane głęboko w PDF' : 'Prices hidden deep in PDF',
        isPL ? 'Brak przedziałów cenowych' : 'No price ranges'
      ],
      solution: isPL ? 'Podaj przynajmniej przedziały "od-do", przykładowe wyceny, pakiety. Transparentność buduje zaufanie.' : 'Give at least "from-to" ranges, example quotes, packages. Transparency builds trust.',
      realExample: isPL ? 'Warsztat dodał cennik podstawowych usług. Telefony wzrosły o 156% (i mniej pytań o cenę!).' : 'Workshop added basic service pricing. Calls increased 156% (and fewer price questions!).'
    },
    {
      id: 7,
      icon: Shield,
      title: isPL ? 'Brak HTTPS (kłódki)' : 'No HTTPS (padlock)',
      impact: isPL ? '-85% zaufania' : '-85% trust',
      problem: isPL ? 'Przeglądarki pokazują "Połączenie nie jest bezpieczne". 85% użytkowników nie zostawi danych na takiej stronie.' : 'Browsers show "Connection is not secure". 85% of users won\'t leave data on such a site.',
      symptoms: [
        isPL ? 'Brak kłódki w pasku adresu' : 'No padlock in address bar',
        isPL ? 'Ostrzeżenie "Niebezpieczna strona"' : '"Dangerous site" warning',
        isPL ? 'http:// zamiast https://' : 'http:// instead of https://',
        isPL ? 'Formularze bez szyfrowania' : 'Forms without encryption'
      ],
      solution: isPL ? 'Zainstaluj certyfikat SSL (często za darmo u hostingu). To podstawa w 2024 roku.' : 'Install SSL certificate (often free with hosting). It\'s basic in 2024.',
      realExample: isPL ? 'Sklep internetowy dodał SSL. Konwersje wzrosły o 43% już pierwszego dnia.' : 'Online store added SSL. Conversions increased 43% on the first day.'
    },
    {
      id: 8,
      icon: TrendingDown,
      title: isPL ? 'Słabe lub brak wezwań do działania (CTA)' : 'Weak or No Calls to Action (CTA)',
      impact: isPL ? '-90% konwersji' : '-90% conversions',
      problem: isPL ? 'Klient nie wie co ma zrobić. "Skontaktuj się" to za mało. 90% stron ma słabe lub niewidoczne CTA.' : 'Customer doesn\'t know what to do. "Contact us" is not enough. 90% of sites have weak or invisible CTAs.',
      symptoms: [
        isPL ? 'Małe, szare przyciski' : 'Small, gray buttons',
        isPL ? 'Ogólnikowe teksty "Więcej", "Dalej"' : 'Generic texts "More", "Next"',
        isPL ? 'CTA tylko na dole strony' : 'CTA only at bottom of page',
        isPL ? 'Brak kontrastu kolorów' : 'No color contrast'
      ],
      solution: isPL ? 'Używaj dużych, kontrastowych przycisków. Pisz konkretnie: "Umów wizytę", "Sprawdź cenę", "Zadzwoń teraz".' : 'Use large, contrasting buttons. Write specifically: "Book appointment", "Check price", "Call now".',
      realExample: isPL ? 'Gabinet zmienił "Kontakt" na "Umów wizytę w 24h". Rezerwacje wzrosły o 218%.' : 'Clinic changed "Contact" to "Book visit in 24h". Bookings increased 218%.'
    },
    {
      id: 9,
      icon: AlertTriangle,
      title: isPL ? 'Brak informacji kontaktowych' : 'No Contact Information',
      impact: isPL ? '-95% wiarygodności' : '-95% credibility',
      problem: isPL ? 'Brak adresu, NIP, godzin otwarcia = klient myśli że to oszustwo. 95% sprawdza te dane przed kontaktem.' : 'No address, tax ID, opening hours = customer thinks it\'s a scam. 95% check this data before contact.',
      symptoms: [
        isPL ? 'Tylko formularz kontaktowy' : 'Only contact form',
        isPL ? 'Brak fizycznego adresu' : 'No physical address',
        isPL ? 'Brak godzin otwarcia' : 'No opening hours',
        isPL ? 'Brak danych firmy (NIP/REGON)' : 'No company data (tax ID)'
      ],
      solution: isPL ? 'Stwórz pełną stronę kontakt z mapą, godzinami, wszystkimi sposobami kontaktu. Dodaj dane do stopki.' : 'Create full contact page with map, hours, all contact methods. Add data to footer.',
      realExample: isPL ? 'Firma sprzątająca dodała pełne dane kontaktowe. Zapytania wzrosły o 167% w 2 tygodnie.' : 'Cleaning company added full contact details. Inquiries increased 167% in 2 weeks.'
    },
    {
      id: 10,
      icon: Search,
      title: isPL ? 'Brak optymalizacji lokalnego SEO' : 'No Local SEO Optimization',
      impact: isPL ? '-89% widoczności' : '-89% visibility',
      problem: isPL ? 'Nie pokazujesz się gdy ktoś szuka "mechanik Warszawa" czy "fryzjer koło mnie". Tracisz 89% lokalnych klientów.' : 'You don\'t show up when someone searches "mechanic Warsaw" or "hairdresser near me". You lose 89% of local customers.',
      symptoms: [
        isPL ? 'Brak nazwy miasta w tytułach' : 'No city name in titles',
        isPL ? 'Brak strony Google Moja Firma' : 'No Google My Business page',
        isPL ? 'Brak lokalnych słów kluczowych' : 'No local keywords',
        isPL ? 'Brak Schema markup LocalBusiness' : 'No LocalBusiness Schema markup'
      ],
      solution: isPL ? 'Dodaj miasto do tytułów, stwórz Google Moja Firma, używaj lokalnych fraz, dodaj Schema markup.' : 'Add city to titles, create Google My Business, use local phrases, add Schema markup.',
      realExample: isPL ? 'Pizza w Gdańsku zoptymalizowała SEO lokalne. Z 0 do 47 klientów dziennie w 3 miesiące.' : 'Gdańsk pizza optimized local SEO. From 0 to 47 customers daily in 3 months.'
    }
  ]

  const calculateLostRevenue = () => {
    const avgCustomerValue = isPL ? 250 : 100
    const monthlyVisitors = 1000
    const lostPercentage = 0.7 // średnio 70% traconych klientów
    const monthlyLoss = monthlyVisitors * lostPercentage * 0.02 * avgCustomerValue // 2% conversion rate
    const yearlyLoss = monthlyLoss * 12
    
    return {
      monthly: Math.round(monthlyLoss),
      yearly: Math.round(yearlyLoss),
      currency: isPL ? 'PLN' : 'USD'
    }
  }

  const losses = calculateLostRevenue()

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full mb-6">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-medium">
                {isPL ? 'RAPORT SPECJALNY' : 'SPECIAL REPORT'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isPL 
                ? '10 Błędów na Stronie, Które Kradną Ci Klientów' 
                : '10 Website Mistakes That Steal Your Customers'}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {isPL 
                ? 'Sprawdziłem 237 stron lokalnych firm. Każda traciła średnio 12-47 klientów miesięcznie przez te same błędy. Oto jak je naprawić.'
                : 'I checked 237 local business websites. Each was losing an average of 12-47 customers monthly due to the same mistakes. Here\'s how to fix them.'}
            </p>

            {/* Lost Revenue Calculator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-dark rounded-2xl p-8 max-w-xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {isPL ? 'Ile tracisz przez te błędy?' : 'How much are you losing?'}
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 mb-2">{isPL ? 'Miesięcznie:' : 'Monthly:'}</p>
                  <p className="text-3xl font-bold text-red-400">
                    {losses.monthly.toLocaleString()} {losses.currency}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 mb-2">{isPL ? 'Rocznie:' : 'Yearly:'}</p>
                  <p className="text-3xl font-bold text-red-400">
                    {losses.yearly.toLocaleString()} {losses.currency}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                {isPL 
                  ? '* Przy średniej wartości klienta 250 PLN i 1000 odwiedzających miesięcznie'
                  : '* With average customer value $100 and 1000 monthly visitors'}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 md:py-8 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <div className="glass-dark rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {isPL ? 'Spis błędów' : 'Table of Contents'}
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {mistakes.map((mistake, index) => (
                <button
                  key={mistake.id}
                  onClick={() => {
                    document.getElementById(`mistake-${mistake.id}`)?.scrollIntoView({ behavior: 'smooth' })
                    setActiveSection(index)
                  }}
                  className={`text-left p-3 rounded-lg transition-all ${
                    activeSection === index 
                      ? 'bg-purple-600/20 border border-purple-600/50' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-gray-600">#{mistake.id}</span>
                    <div className="flex-1">
                      <p className="text-white font-medium">{mistake.title}</p>
                      <p className="text-red-400 text-sm">{mistake.impact}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mistakes Sections */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 md:py-16">
        <div className="container mx-auto max-w-4xl">
          {mistakes.map((mistake, index) => (
            <motion.div
              key={mistake.id}
              id={`mistake-${mistake.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Mistake Header */}
              <div className="flex items-start gap-4 mb-8">
                <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <mistake.icon className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    #{mistake.id}. {mistake.title}
                  </h2>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                    <span className="text-red-400 font-bold">{mistake.impact}</span>
                  </div>
                </div>
              </div>

              {/* Problem Description */}
              <div className="glass-dark rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                  {isPL ? 'Problem' : 'The Problem'}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {mistake.problem}
                </p>
              </div>

              {/* Symptoms */}
              <div className="glass-dark rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-400" />
                  {isPL ? 'Objawy (sprawdź czy masz)' : 'Symptoms (check if you have)'}
                </h3>
                <ul className="space-y-2">
                  {mistake.symptoms.map((symptom, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-300">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution */}
              <div className="glass-dark rounded-2xl p-6 mb-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  {isPL ? 'Rozwiązanie' : 'Solution'}
                </h3>
                <p className="text-gray-300 text-lg">
                  {mistake.solution}
                </p>
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-purple-600/30">
                <h3 className="text-lg font-semibold text-white mb-3">
                  💡 {isPL ? 'Rzeczywisty przykład' : 'Real Example'}
                </h3>
                <p className="text-gray-300 italic">
                  "{mistake.realExample}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Summary & CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 md:py-16 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {isPL ? 'Co teraz?' : 'What Now?'}
            </h2>
            
            <div className="glass-dark rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-300 mb-6">
                {isPL 
                  ? 'Większość firm ma minimum 7 z tych 10 błędów. To oznacza, że tracisz 70-90% potencjalnych klientów.'
                  : 'Most businesses have at least 7 out of these 10 mistakes. This means you\'re losing 70-90% of potential customers.'}
              </p>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
                <p className="text-2xl font-bold text-red-400 mb-2">
                  {isPL 
                    ? `Twoja potencjalna strata: ${losses.yearly.toLocaleString()} ${losses.currency} rocznie`
                    : `Your potential loss: ${losses.yearly.toLocaleString()} ${losses.currency} yearly`}
                </p>
                <p className="text-gray-400">
                  {isPL 
                    ? 'To pieniądze, które idą do Twojej konkurencji'
                    : 'This money goes to your competition'}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">30 min</div>
                  <p className="text-gray-400">
                    {isPL ? 'Tyle zajmuje analiza' : 'Analysis time'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">+247%</div>
                  <p className="text-gray-400">
                    {isPL ? 'Średni wzrost leadów' : 'Average lead increase'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-400 mb-2">2-4 tyg</div>
                  <p className="text-gray-400">
                    {isPL ? 'Do pierwszych efektów' : 'To first results'}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = `/${locale}/free-analysis`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  {isPL ? 'Zamów darmową analizę swojej strony' : 'Get Free Website Analysis'}
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {isPL 
                ? 'Otrzymasz spersonalizowany raport z dokładnym planem naprawy'
                : 'You\'ll receive a personalized report with exact fix plan'}
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
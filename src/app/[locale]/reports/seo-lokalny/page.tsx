'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Search, Star, Phone, Clock, TrendingUp, BarChart, Users, ChevronRight, Download, Share2, Target, Globe, Smartphone, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function ReportSEOLokalnyPage() {
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

  const localSEOSteps = [
    {
      id: 1,
      icon: MapPin,
      title: isPL ? 'Google Moja Firma - Twoja Wizytówka 24/7' : 'Google My Business - Your 24/7 Business Card',
      importance: isPL ? 'Krytyczne' : 'Critical',
      impact: isPL ? '+350% widoczności lokalnej' : '+350% local visibility',
      description: isPL 
        ? 'To pierwsze, co widzą klienci szukając usług w Twojej okolicy. Pojawia się w mapach, wyszukiwaniu i pokazuje wszystkie kluczowe informacje.'
        : 'This is the first thing customers see when searching for services in your area. Appears in maps, search, and shows all key information.',
      howTo: isPL ? 'Jak zoptymalizować:' : 'How to optimize:',
      steps: [
        isPL ? 'Wypełnij KAŻDE pole w profilu (100% kompletności)' : 'Fill EVERY field in profile (100% completeness)',
        isPL ? 'Dodaj minimum 10 wysokiej jakości zdjęć' : 'Add minimum 10 high quality photos',
        isPL ? 'Ustaw dokładne godziny otwarcia (także święta)' : 'Set exact opening hours (including holidays)',
        isPL ? 'Wybierz wszystkie pasujące kategorie działalności' : 'Choose all matching business categories',
        isPL ? 'Napisz opis z lokalnymi słowami kluczowymi' : 'Write description with local keywords',
        isPL ? 'Dodaj produkty/usługi z cenami' : 'Add products/services with prices'
      ],
      proTip: isPL 
        ? 'Publikuj post w Google Moja Firma co tydzień. Algorytm lubi aktywne profile i pokazuje je wyżej.'
        : 'Publish a Google My Business post weekly. Algorithm likes active profiles and shows them higher.',
      realExample: isPL 
        ? 'Mechanik z Warszawy: Po pełnej optymalizacji GMF wzrost telefonów o 350% w 2 miesiące. Z 3 pozycji w mapach skoczył na 1.'
        : 'Warsaw mechanic: After full GMB optimization, 350% increase in calls in 2 months. Jumped from position 3 to 1 in maps.'
    },
    {
      id: 2,
      icon: Star,
      title: isPL ? 'Opinie - Twoja Tajna Broń SEO' : 'Reviews - Your Secret SEO Weapon',
      importance: isPL ? 'Krytyczne' : 'Critical',
      impact: isPL ? '+44% konwersji' : '+44% conversions',
      description: isPL 
        ? 'Google uwielbia firmy z dużą ilością pozytywnych opinii. To nie tylko buduje zaufanie - to bezpośrednio wpływa na pozycje w wynikach lokalnych.'
        : 'Google loves businesses with lots of positive reviews. It not only builds trust - it directly affects positions in local results.',
      howTo: isPL ? 'System zbierania opinii:' : 'Review collection system:',
      steps: [
        isPL ? 'Poproś KAŻDEGO zadowolonego klienta' : 'Ask EVERY satisfied customer',
        isPL ? 'Wyślij link do opinii SMS-em 24h po usłudze' : 'Send review link via SMS 24h after service',
        isPL ? 'Ułatw proces - bezpośredni link do dodania opinii' : 'Make it easy - direct link to add review',
        isPL ? 'Odpowiadaj na KAŻDĄ opinię w 24h' : 'Respond to EVERY review within 24h',
        isPL ? 'Podziękuj za pozytywne, przeproś za negatywne' : 'Thank for positive, apologize for negative',
        isPL ? 'Nigdy nie kupuj fałszywych opinii!' : 'Never buy fake reviews!'
      ],
      proTip: isPL 
        ? 'Cel: minimum 1 nowa opinia tygodniowo. Po roku będziesz miał 50+ opinii i zdominujesz lokalną konkurencję.'
        : 'Goal: minimum 1 new review weekly. After a year you\'ll have 50+ reviews and dominate local competition.',
      realExample: isPL 
        ? 'Dentysta z Krakowa: System SMS-owy przyniósł 127 opinii w 6 miesięcy. Średnia 4.9/5. Skok z 7 na 2 miejsce w "dentysta Kraków".'
        : 'Krakow dentist: SMS system brought 127 reviews in 6 months. Average 4.9/5. Jump from 7th to 2nd place for "dentist Krakow".'
    },
    {
      id: 3,
      icon: Search,
      title: isPL ? 'Słowa Kluczowe Lokalne - Mów Językiem Klienta' : 'Local Keywords - Speak Customer Language',
      importance: isPL ? 'Wysoka' : 'High',
      impact: isPL ? '+89% ruchu organicznego' : '+89% organic traffic',
      description: isPL 
        ? 'Ludzie nie szukają "usług fryzjerskich" - szukają "fryzjer Mokotów tanio" albo "barber koło metra Wilanowska". Musisz mówić ich językiem.'
        : 'People don\'t search for "hairdressing services" - they search for "cheap hairdresser Mokotow" or "barber near Wilanowska metro". You must speak their language.',
      howTo: isPL ? 'Gdzie umieścić słowa kluczowe:' : 'Where to place keywords:',
      steps: [
        isPL ? 'Tytuł strony: [Usługa] [Miasto/Dzielnica] - [Nazwa firmy]' : 'Page title: [Service] [City/District] - [Company name]',
        isPL ? 'Nagłówek H1: Najlepszy [usługa] w [miasto/dzielnica]' : 'H1 heading: Best [service] in [city/district]',
        isPL ? 'W treści: naturalne użycie nazw dzielnic, ulic, punktów orientacyjnych' : 'In content: natural use of district names, streets, landmarks',
        isPL ? 'W URL: /fryzjer-mokotow lub /mechanik-warszawa-wola' : 'In URL: /hairdresser-mokotow or /mechanic-warsaw-wola',
        isPL ? 'W opisach zdjęć (alt): "Salon fryzjerski Mokotów wnętrze"' : 'In image descriptions (alt): "Mokotow hair salon interior"',
        isPL ? 'W meta description: zachęcający opis z lokalizacją' : 'In meta description: compelling description with location'
      ],
      proTip: isPL 
        ? 'Stwórz osobne podstrony dla każdej dzielnicy/miasta które obsługujesz. Każda to szansa na wysoką pozycję.'
        : 'Create separate subpages for each district/city you serve. Each is a chance for high position.',
      realExample: isPL 
        ? 'Hydraulik z Gdańska: Stworzył 15 podstron dla dzielnic. Ruch wzrósł o 89% w 3 miesiące. Dominuje w każdej dzielnicy.'
        : 'Gdansk plumber: Created 15 district subpages. Traffic increased 89% in 3 months. Dominates in every district.'
    },
    {
      id: 4,
      icon: Phone,
      title: isPL ? 'NAP - Święta Trójca Lokalnego SEO' : 'NAP - Holy Trinity of Local SEO',
      importance: isPL ? 'Wysoka' : 'High',
      impact: isPL ? '+31% pozycji w mapach' : '+31% map rankings',
      description: isPL 
        ? 'NAP = Name, Address, Phone. Te 3 dane MUSZĄ być identyczne wszędzie w internecie. Każda niezgodność to sygnał dla Google, że coś jest nie tak.'
        : 'NAP = Name, Address, Phone. These 3 data points MUST be identical everywhere online. Every inconsistency signals Google something is wrong.',
      howTo: isPL ? 'Jak ujednolicić NAP:' : 'How to unify NAP:',
      steps: [
        isPL ? 'Sprawdź WSZYSTKIE miejsca gdzie jesteś wymieniony' : 'Check ALL places where you\'re listed',
        isPL ? 'Popraw dane w katalogach branżowych (Panorama Firm, itp.)' : 'Fix data in business directories',
        isPL ? 'Usuń duplikaty i stare wpisy' : 'Remove duplicates and old entries',
        isPL ? 'Używaj DOKŁADNIE tego samego formatu wszędzie' : 'Use EXACTLY the same format everywhere',
        isPL ? 'Dodaj się do 20-30 lokalnych katalogów' : 'Add yourself to 20-30 local directories',
        isPL ? 'Monitoruj nowe wpisy i poprawiaj na bieżąco' : 'Monitor new entries and fix ongoing'
      ],
      proTip: isPL 
        ? 'Użyj narzędzia Moz Local lub BrightLocal do znalezienia wszystkich niezgodności NAP. To oszczędzi Ci godziny pracy.'
        : 'Use Moz Local or BrightLocal tool to find all NAP inconsistencies. It will save you hours of work.',
      realExample: isPL 
        ? 'Pizzeria w Poznaniu: Poprawiła NAP w 47 miejscach. Skok z 8 na 3 miejsce w mapach Google w 6 tygodni.'
        : 'Poznan pizzeria: Fixed NAP in 47 places. Jump from 8th to 3rd place in Google maps in 6 weeks.'
    },
    {
      id: 5,
      icon: Globe,
      title: isPL ? 'Lokalne Linki - Buduj Autorytet w Okolicy' : 'Local Links - Build Authority in Area',
      importance: isPL ? 'Średnia' : 'Medium',
      impact: isPL ? '+42% autorytetu domeny' : '+42% domain authority',
      description: isPL 
        ? 'Linki z lokalnych stron są 10x bardziej wartościowe niż z przypadkowych. Google wie, że jesteś prawdziwą, szanowaną firmą w okolicy.'
        : 'Links from local sites are 10x more valuable than random ones. Google knows you\'re a real, respected business in the area.',
      howTo: isPL ? 'Skąd zdobyć lokalne linki:' : 'Where to get local links:',
      steps: [
        isPL ? 'Sponsoruj lokalne wydarzenia (link ze strony wydarzenia)' : 'Sponsor local events (link from event page)',
        isPL ? 'Współpracuj z innymi lokalnymi firmami (wzajemne polecenia)' : 'Collaborate with other local businesses (mutual recommendations)',
        isPL ? 'Lokalne media - wyślij ciekawą historię o firmie' : 'Local media - send interesting company story',
        isPL ? 'Organizacje branżowe i izby gospodarcze' : 'Industry organizations and chambers of commerce',
        isPL ? 'Uczelnie/szkoły - staże, współpraca, wykłady' : 'Universities/schools - internships, cooperation, lectures',
        isPL ? 'Blogi lokalne - guest posty, wywiady' : 'Local blogs - guest posts, interviews'
      ],
      proTip: isPL 
        ? 'Zacznij od listy 50 lokalnych stron. Kontaktuj 5 tygodniowo. Po roku będziesz mieć 20-30 świetnych linków.'
        : 'Start with list of 50 local sites. Contact 5 weekly. After a year you\'ll have 20-30 great links.',
      realExample: isPL 
        ? 'Warsztat samochodowy z Łodzi: 23 lokalne linki w rok. Autorytet domeny wzrósł z 12 do 34. Ruch +156%.'
        : 'Lodz auto repair shop: 23 local links in a year. Domain authority grew from 12 to 34. Traffic +156%.'
    },
    {
      id: 6,
      icon: Smartphone,
      title: isPL ? 'Mobilna Optymalizacja - Priorytet #1' : 'Mobile Optimization - Priority #1',
      importance: isPL ? 'Krytyczna' : 'Critical',
      impact: isPL ? '-73% jeśli nie masz' : '-73% if you don\'t have it',
      description: isPL 
        ? '76% lokalnych wyszukiwań to telefony. Jeśli strona nie działa idealnie na mobile, tracisz 3/4 potencjalnych klientów.'
        : '76% of local searches are phones. If the site doesn\'t work perfectly on mobile, you lose 3/4 of potential customers.',
      howTo: isPL ? 'Mobilny checklist:' : 'Mobile checklist:',
      steps: [
        isPL ? 'Czas ładowania < 3 sekundy na 3G' : 'Loading time < 3 seconds on 3G',
        isPL ? 'Przyciski minimum 44x44 piksele' : 'Buttons minimum 44x44 pixels',
        isPL ? 'Tekst czytelny bez zoomowania' : 'Text readable without zooming',
        isPL ? 'Klikalne numery telefonu (tel:)' : 'Clickable phone numbers (tel:)',
        isPL ? 'Mapy działające na dotyk' : 'Touch-working maps',
        isPL ? 'Formularz łatwy do wypełnienia na telefonie' : 'Form easy to fill on phone'
      ],
      proTip: isPL 
        ? 'Testuj stronę na prawdziwym telefonie, nie tylko w przeglądarce. Poproś 5 osób o znalezienie numeru telefonu - jeśli zajmie im to >5 sekund, masz problem.'
        : 'Test site on real phone, not just browser. Ask 5 people to find phone number - if it takes >5 seconds, you have a problem.',
      realExample: isPL 
        ? 'Salon kosmetyczny z Wrocławia: Przeprojektował stronę mobile-first. Bounce rate spadł o 67%, konwersje +234%.'
        : 'Wroclaw beauty salon: Redesigned site mobile-first. Bounce rate dropped 67%, conversions +234%.'
    },
    {
      id: 7,
      icon: Target,
      title: isPL ? 'Schema Markup - Sekretny Kod dla Google' : 'Schema Markup - Secret Code for Google',
      importance: isPL ? 'Średnia' : 'Medium',
      impact: isPL ? '+32% CTR w wynikach' : '+32% CTR in results',
      description: isPL 
        ? 'Schema to sposób na powiedzenie Google dokładnie czym się zajmujesz. Sprawia, że wyniki wyglądają lepiej i przyciągają więcej kliknięć.'
        : 'Schema is a way to tell Google exactly what you do. Makes results look better and attract more clicks.',
      howTo: isPL ? 'Jakie Schema dodać:' : 'What Schema to add:',
      steps: [
        isPL ? 'LocalBusiness - podstawowe dane firmy' : 'LocalBusiness - basic company data',
        isPL ? 'Godziny otwarcia (openingHours)' : 'Opening hours (openingHours)',
        isPL ? 'Obszar działania (areaServed)' : 'Service area (areaServed)',
        isPL ? 'Opinie (aggregateRating)' : 'Reviews (aggregateRating)',
        isPL ? 'Cennik usług (priceRange)' : 'Service pricing (priceRange)',
        isPL ? 'FAQ - często zadawane pytania' : 'FAQ - frequently asked questions'
      ],
      proTip: isPL 
        ? 'Użyj Google Structured Data Testing Tool do sprawdzenia czy Schema działa. Błędy = Google ignoruje Twój kod.'
        : 'Use Google Structured Data Testing Tool to check if Schema works. Errors = Google ignores your code.',
      realExample: isPL 
        ? 'Prawnik z Katowic: Dodał pełne Schema LocalBusiness + FAQ. CTR w wynikach wzrósł o 32%, pozycja o 3 miejsca w górę.'
        : 'Katowice lawyer: Added full LocalBusiness + FAQ Schema. CTR in results increased 32%, position up by 3 places.'
    },
    {
      id: 8,
      icon: BarChart,
      title: isPL ? 'Treść Lokalna - Pokaż, że Znasz Okolicę' : 'Local Content - Show You Know the Area',
      importance: isPL ? 'Wysoka' : 'High',
      impact: isPL ? '+124% ruchu długiego ogona' : '+124% long-tail traffic',
      description: isPL 
        ? 'Google sprawdza czy naprawdę znasz i obsługujesz daną okolicę. Treści lokalne to dowód, że jesteś ekspertem w swojej dzielnicy.'
        : 'Google checks if you really know and serve the area. Local content proves you\'re an expert in your district.',
      howTo: isPL ? 'Pomysły na treści lokalne:' : 'Local content ideas:',
      steps: [
        isPL ? 'Przewodniki po dzielnicach które obsługujesz' : 'Guides to districts you serve',
        isPL ? 'Case studies lokalnych klientów' : 'Local customer case studies',
        isPL ? 'Współpraca z lokalnymi firmami' : 'Collaboration with local businesses',
        isPL ? 'Wydarzenia w okolicy związane z branżą' : 'Area events related to industry',
        isPL ? 'Sezonowe porady (np. "Przygotuj auto do zimy w Warszawie")' : 'Seasonal advice (e.g. "Prepare car for winter in Warsaw")',
        isPL ? 'Historia firmy i związki z okolicą' : 'Company history and area connections'
      ],
      proTip: isPL 
        ? 'Każdy artykuł = szansa na pozycję dla frazy "długiego ogona" np. "najlepszy mechanik Żoliborz przy metrze".'
        : 'Each article = chance for position for "long tail" phrase e.g. "best mechanic Zoliborz near metro".',
      realExample: isPL 
        ? 'Firma sprzątająca z Gdańska: 24 artykuły o dzielnicach. Ruch z long-tail wzrósł o 124%. 67 nowych fraz w TOP 10.'
        : 'Gdansk cleaning company: 24 district articles. Long-tail traffic increased 124%. 67 new phrases in TOP 10.'
    }
  ]

  const monthlyPlan = [
    {
      month: isPL ? 'Miesiąc 1: Fundamenty' : 'Month 1: Foundation',
      tasks: [
        isPL ? 'Załóż i zoptymalizuj Google Moja Firma (100%)' : 'Set up and optimize Google My Business (100%)',
        isPL ? 'Popraw NAP we wszystkich katalogach' : 'Fix NAP in all directories',
        isPL ? 'Zacznij zbierać opinie (cel: 5-10)' : 'Start collecting reviews (goal: 5-10)',
        isPL ? 'Optymalizacja mobilna strony' : 'Mobile site optimization'
      ],
      expectedResult: isPL ? '+50-100% widoczności w mapach' : '+50-100% visibility in maps'
    },
    {
      month: isPL ? 'Miesiąc 2: Rozwój' : 'Month 2: Development',
      tasks: [
        isPL ? 'Dodaj lokalne słowa kluczowe na stronie' : 'Add local keywords to site',
        isPL ? 'Stwórz 3-5 podstron dla dzielnic' : 'Create 3-5 district subpages',
        isPL ? 'Zdobądź 5-10 lokalnych linków' : 'Get 5-10 local links',
        isPL ? 'Wdróż podstawowe Schema markup' : 'Implement basic Schema markup'
      ],
      expectedResult: isPL ? '+30-50% ruchu organicznego' : '+30-50% organic traffic'
    },
    {
      month: isPL ? 'Miesiąc 3: Dominacja' : 'Month 3: Domination',
      tasks: [
        isPL ? 'Napisz 5-10 lokalnych artykułów' : 'Write 5-10 local articles',
        isPL ? 'Osiągnij 20+ opinii' : 'Reach 20+ reviews',
        isPL ? 'Rozszerz Schema o FAQ i usługi' : 'Expand Schema with FAQ and services',
        isPL ? 'Kampania link building (10+ linków)' : 'Link building campaign (10+ links)'
      ],
      expectedResult: isPL ? 'TOP 3 dla głównych fraz lokalnych' : 'TOP 3 for main local phrases'
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
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-medium">
                {isPL ? 'PRZEWODNIK SEO LOKALNEGO' : 'LOCAL SEO GUIDE'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {isPL 
                ? 'Zdominuj Google w Swoim Mieście: Proste SEO dla Lokalnych Firm' 
                : 'Dominate Google in Your City: Simple SEO for Local Businesses'}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              {isPL 
                ? '8 kroków, które sprawią, że Twoja firma będzie #1 gdy ktoś szuka usług w Twojej okolicy. Bez technicznego bełkotu.'
                : '8 steps that will make your business #1 when someone searches for services in your area. Without technical jargon.'}
            </p>

            {/* Impact Stats */}
            <div className="glass-dark rounded-2xl p-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-6">
                {isPL ? '🎯 Co zyskasz stosując ten przewodnik:' : '🎯 What you\'ll gain using this guide:'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">3-10x</div>
                  <p className="text-gray-400 text-sm">
                    {isPL ? 'więcej telefonów' : 'more calls'}
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">#1-3</div>
                  <p className="text-gray-400 text-sm">
                    {isPL ? 'pozycja w mapach' : 'position in maps'}
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <p className="text-gray-400 text-sm">
                    {isPL ? 'widoczność' : 'visibility'}
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">0 zł</div>
                  <p className="text-gray-400 text-sm">
                    {isPL ? 'koszt reklam' : 'ad cost'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Local SEO */}
      <section className="py-8 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              {isPL ? '📊 Fakty o lokalnych wyszukiwaniach (2024):' : '📊 Facts about local searches (2024):'}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">46%</span> {isPL ? 'wszystkich wyszukiwań w Google to lokalne zapytania' : 'of all Google searches are local queries'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">76%</span> {isPL ? 'osób szukających lokalnie odwiedza firmę w ciągu 24h' : 'of people searching locally visit business within 24h'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">88%</span> {isPL ? 'lokalnych wyszukiwań na telefonie kończy się telefonem lub wizytą' : 'of local mobile searches result in call or visit'}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">"koło mnie"</span> {isPL ? 'wzrosło o 500% w ostatnich 2 latach' : 'grew 500% in last 2 years'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">93%</span> {isPL ? 'klientów czyta opinie przed wyborem lokalnej firmy' : 'of customers read reviews before choosing local business'}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300">
                    <span className="text-white font-semibold">TOP 3</span> {isPL ? 'w mapach dostaje 75% wszystkich kliknięć' : 'in maps gets 75% of all clicks'}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl">
              <p className="text-orange-400 font-semibold">
                {isPL 
                  ? '⚠️ Jeśli nie jesteś w TOP 3 lokalnych wyników, praktycznie nie istniejesz dla klientów'
                  : '⚠️ If you\'re not in TOP 3 local results, you practically don\'t exist for customers'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 8 Steps to Local Domination */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {isPL ? '8 Kroków do Lokalnej Dominacji' : '8 Steps to Local Domination'}
            </h2>
            <p className="text-gray-300">
              {isPL ? 'Rób po kolei. Każdy krok buduje na poprzednim.' : 'Do in order. Each step builds on the previous.'}
            </p>
          </motion.div>

          {localSEOSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              {/* Step Header */}
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isPL ? `Krok ${step.id}:` : `Step ${step.id}:`} {step.title}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      step.importance === (isPL ? 'Krytyczne' : 'Critical') 
                        ? 'bg-red-500/20 text-red-400' 
                        : step.importance === (isPL ? 'Wysoka' : 'High')
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {step.importance}
                    </span>
                    <span className="text-green-400 font-medium">{step.impact}</span>
                  </div>
                </div>
              </div>

              {/* Step Content */}
              <div className="glass-dark rounded-2xl p-6 mb-4">
                <p className="text-gray-300 text-lg mb-4">
                  {step.description}
                </p>
                
                <h4 className="text-white font-semibold mb-3">{step.howTo}</h4>
                <ol className="space-y-2 mb-6">
                  {step.steps.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 text-sm font-medium flex-shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ol>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                  <p className="text-purple-400">
                    <span className="font-semibold">💡 Pro tip:</span> {step.proTip}
                  </p>
                </div>
              </div>

              {/* Real Example */}
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 border border-green-600/30">
                <h4 className="text-white font-semibold mb-2">
                  ✅ {isPL ? 'Dowód że działa:' : 'Proof it works:'}
                </h4>
                <p className="text-gray-300 italic">
                  "{step.realExample}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3-Month Action Plan */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              {isPL ? '📅 Plan Działania na 3 Miesiące' : '📅 3-Month Action Plan'}
            </h2>
            <p className="text-gray-300">
              {isPL ? 'Dokładny harmonogram wdrożenia. Po 3 miesiącach będziesz w TOP 3.' : 'Exact implementation schedule. After 3 months you\'ll be in TOP 3.'}
            </p>
          </motion.div>

          <div className="space-y-6">
            {monthlyPlan.map((month, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-dark rounded-2xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{month.month}</h3>
                  <span className="text-green-400 font-medium">{month.expectedResult}</span>
                </div>
                <ul className="space-y-2">
                  {month.tasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-gray-300">{task}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-dark rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              {isPL ? '✅ Szybki Checklist - Sprawdź Co Już Masz' : '✅ Quick Checklist - Check What You Already Have'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                isPL ? 'Google Moja Firma założona i w 100% wypełniona' : 'Google My Business set up and 100% complete',
                isPL ? 'Minimum 10 opinii ze średnią 4.5+' : 'Minimum 10 reviews with 4.5+ average',
                isPL ? 'NAP identyczne wszędzie w internecie' : 'NAP identical everywhere online',
                isPL ? 'Strona ładuje się <3 sek na mobile' : 'Site loads <3 sec on mobile',
                isPL ? 'Lokalne słowa kluczowe w tytułach' : 'Local keywords in titles',
                isPL ? 'Schema LocalBusiness wdrożone' : 'LocalBusiness Schema implemented',
                isPL ? '10+ lokalnych linków' : '10+ local links',
                isPL ? 'Treści lokalne publikowane regularnie' : 'Local content published regularly'
              ].map((item, index) => (
                <label key={index} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500" />
                  <span className="text-gray-300">{item}</span>
                </label>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl">
              <p className="text-blue-400 text-center">
                {isPL 
                  ? '📊 Jeśli masz <4 zaznaczone: Masz ogromny potencjał wzrostu!'
                  : '📊 If you have <4 checked: You have huge growth potential!'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tools & Resources */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              {isPL ? '🔧 Narzędzia Które Ułatwią Ci Pracę' : '🔧 Tools That Will Make Your Work Easier'}
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">{isPL ? 'Darmowe:' : 'Free:'}</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">• Google My Business - {isPL ? 'zarządzanie profilem' : 'profile management'}</li>
                  <li className="text-gray-300">• Google Search Console - {isPL ? 'analiza ruchu' : 'traffic analysis'}</li>
                  <li className="text-gray-300">• Schema.org Generator - {isPL ? 'tworzenie kodu' : 'code creation'}</li>
                  <li className="text-gray-300">• GTmetrix - {isPL ? 'test szybkości' : 'speed test'}</li>
                </ul>
              </div>
              
              <div className="glass-dark rounded-xl p-6">
                <h3 className="text-white font-semibold mb-4">{isPL ? 'Płatne (warte inwestycji):' : 'Paid (worth investment):'}</h3>
                <ul className="space-y-2">
                  <li className="text-gray-300">• BrightLocal - {isPL ? 'audyt NAP i monitoring' : 'NAP audit and monitoring'}</li>
                  <li className="text-gray-300">• Whitespark - {isPL ? 'budowanie cytowań' : 'citation building'}</li>
                  <li className="text-gray-300">• Surfer Local - {isPL ? 'analiza konkurencji' : 'competition analysis'}</li>
                  <li className="text-gray-300">• ReviewTrackers - {isPL ? 'zarządzanie opiniami' : 'review management'}</li>
                </ul>
              </div>
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
              {isPL ? 'Potrzebujesz Pomocy z Lokalnym SEO?' : 'Need Help with Local SEO?'}
            </h2>
            
            <div className="glass-dark rounded-2xl p-8 mb-8">
              <p className="text-xl text-gray-300 mb-6">
                {isPL 
                  ? 'Zrobimy kompletny audyt Twojej widoczności lokalnej i pokażemy dokładnie co poprawić, żeby być #1 w Twojej okolicy.'
                  : 'We\'ll do a complete audit of your local visibility and show exactly what to improve to be #1 in your area.'}
              </p>
              
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <Search className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Analiza 50+ czynników' : 'Analysis of 50+ factors'}
                  </p>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Mapa konkurencji' : 'Competition map'}
                  </p>
                </div>
                <div className="text-center">
                  <BarChart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Plan działania' : 'Action plan'}
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">
                    {isPL ? 'Gwarancja TOP 3' : 'TOP 3 guarantee'}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => window.location.href = `/${locale}/free-analysis`}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-6"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {isPL ? 'Zamów darmowy audyt lokalnego SEO' : 'Get Free Local SEO Audit'}
                  <ChevronRight className="w-5 h-5" />
                </span>
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              {isPL 
                ? 'Pokażemy Ci dokładnie gdzie jesteś teraz i jak dostać się na szczyt'
                : 'We\'ll show you exactly where you are now and how to get to the top'}
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
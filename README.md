# Web Agency - Agencja Tworzenia Stron

Nowoczesna strona internetowa dla agencji tworzenia stron dla lokalnych firm, zbudowana z Next.js 15, TypeScript i najnowszymi technologiami.

## 🚀 Funkcje

- **Wielojęzyczność** - Wsparcie dla języka polskiego i angielskiego
- **Najlepsze SEO** - Zoptymalizowana pod kątem wyszukiwarek
- **Szybkie ładowanie** - Next.js 15 z Turbopack
- **Responsywny design** - Działa na wszystkich urządzeniach
- **Animacje** - Płynne animacje z Framer Motion
- **Exit Intent Popup** - Zwiększa konwersję
- **Analytics** - Integracja z Vercel Analytics

## 🛠️ Technologie

- **Next.js 15** - Framework React z App Router
- **TypeScript** - Typowanie statyczne
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animacje
- **next-intl** - Internacjonalizacja
- **React Hook Form + Zod** - Formularze i walidacja
- **Radix UI** - Komponenty dostępne
- **Vercel Analytics** - Analityka

## 📦 Instalacja

```bash
# Klonowanie repozytorium
git clone [your-repo-url]
cd web-agency

# Instalacja zależności
npm install

# Uruchomienie serwera deweloperskiego
npm run dev
```

Otwórz [http://localhost:3000/pl](http://localhost:3000/pl) dla polskiej wersji lub [http://localhost:3000/en](http://localhost:3000/en) dla angielskiej.

## 🌍 Struktura projektu

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── metadata.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── sections/
│   │   ├── hero.tsx
│   │   ├── trust-section.tsx
│   │   ├── education-section.tsx
│   │   ├── testimonials-section.tsx
│   │   ├── pricing-section.tsx
│   │   ├── portfolio-section.tsx
│   │   ├── guarantee-section.tsx
│   │   ├── team-section.tsx
│   │   ├── faq-section.tsx
│   │   └── final-cta-section.tsx
│   ├── ui/
│   │   └── button.tsx
│   ├── analytics.tsx
│   ├── exit-intent-popup.tsx
│   └── language-switcher.tsx
├── i18n/
│   ├── config.ts
│   ├── request.ts
│   └── messages/
│       ├── pl.json
│       └── en.json
└── lib/
    └── utils.ts
```

## 🎨 Customizacja

### Kolory
Kolory można dostosować w pliku `src/app/globals.css` modyfikując zmienne CSS.

### Treści
Treści strony są przechowywane w plikach:
- `src/i18n/messages/pl.json` - treści polskie
- `src/i18n/messages/en.json` - treści angielskie

### Komponenty
Każda sekcja strony jest osobnym komponentem w folderze `src/components/sections/`.

## 📱 Responsywność

Strona jest w pełni responsywna i dostosowana do:
- Telefonów (< 640px)
- Tabletów (640px - 1024px)
- Desktopów (> 1024px)

## 🔍 SEO

- Dynamiczne meta tagi dla każdego języka
- Sitemap.xml generowany automatycznie
- Robots.txt
- Open Graph tags
- Twitter Cards
- Manifest.json dla PWA

## 🚀 Deployment

Projekt jest gotowy do wdrożenia na Vercel:

```bash
# Build produkcyjny
npm run build

# Uruchomienie wersji produkcyjnej
npm start
```

## 📊 Performance

- Optymalizacja obrazów z Next.js Image
- Lazy loading komponentów
- Minimalizacja bundle size
- Turbopack dla szybszego developmentu

## 🔧 Komendy

```bash
npm run dev      # Uruchomienie serwera deweloperskiego
npm run build    # Build produkcyjny
npm start        # Uruchomienie wersji produkcyjnej
npm run lint     # Linting kodu
```

## 📝 TODO

- [ ] Dodać rzeczywiste obrazy portfolio
- [ ] Dodać rzeczywiste loga klientów
- [ ] Dodać integrację z systemem CRM
- [ ] Dodać formularz kontaktowy z wysyłaniem emaili
- [ ] Dodać więcej animacji przy przewijaniu
- [ ] Zaimplementować blog

## 📄 Licencja

MIT

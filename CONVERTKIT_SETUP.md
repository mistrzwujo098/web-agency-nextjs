# Instrukcja konfiguracji ConvertKit (Kit) na Vercel

**UWAGA**: W kodzie używamy nazwy "Kit" zamiast "ConvertKit" (krótsze nazwy zmiennych)

## 1. Uzyskaj klucze API z ConvertKit

1. Zaloguj się do ConvertKit: https://app.convertkit.com/
2. Przejdź do **Settings** → **Advanced** → **API**
3. Skopiuj:
   - **API Key** (publiczny klucz)
   - **API Secret** (prywatny klucz)
4. Znajdź ID swoich formularzy:
   - Przejdź do **Forms**
   - Kliknij na formularz
   - ID znajduje się w URL: `https://app.convertkit.com/forms/designers/XXXXXX/edit`

## 2. Konfiguracja zmiennych środowiskowych w Vercel

1. Zaloguj się do Vercel: https://vercel.com/
2. Wybierz swój projekt
3. Przejdź do **Settings** → **Environment Variables**
4. Dodaj następujące zmienne (używamy prefiksu KIT):

```
KIT_API_KEY=twoj_api_key
KIT_API_SECRET=twoj_api_secret
KIT_FORM_NEWSLETTER=id_formularza_newsletter
KIT_FORM_CONTACT=id_formularza_kontakt
KIT_FORM_QUIZ=id_formularza_quiz
KIT_FORM_DOWNLOAD=id_formularza_download
KIT_FORM_FREE_ANALYSIS=id_formularza_analiza

# Tagi (opcjonalne, ale zalecane)
KIT_TAG_NEWSLETTER=id_tagu_newsletter
KIT_TAG_CONTACTED=id_tagu_kontakt
KIT_TAG_QUIZ=id_tagu_quiz
KIT_TAG_DOWNLOAD=id_tagu_download
KIT_TAG_ANALYSIS=id_tagu_analiza
KIT_TAG_HIGH_INTENT=id_tagu_zainteresowany
KIT_TAG_CUSTOMER=id_tagu_klient
```

5. Wybierz środowiska: Production, Preview, Development
6. Kliknij **Save**

## 3. Zmienne środowiskowe używane w aplikacji

Aplikacja używa następujących zmiennych (wszystkie z prefiksem KIT):

```env
# Kit (ConvertKit) API
KIT_API_KEY=                 # Publiczny klucz API
KIT_API_SECRET=              # Prywatny klucz API

# ID Formularzy
KIT_FORM_NEWSLETTER=         # Newsletter w stopce
KIT_FORM_CONTACT=           # Formularz kontaktowy
KIT_FORM_QUIZ=              # Quiz interaktywny
KIT_FORM_DOWNLOAD=          # Lead magnety
KIT_FORM_FREE_ANALYSIS=     # Darmowa analiza

# ID Tagów (do segmentacji)
KIT_TAG_NEWSLETTER=         # Zapisał się na newsletter
KIT_TAG_CONTACTED=          # Wypełnił formularz kontaktu
KIT_TAG_QUIZ=              # Ukończył quiz
KIT_TAG_DOWNLOAD=          # Pobrał materiał
KIT_TAG_ANALYSIS=          # Poprosił o analizę
KIT_TAG_HIGH_INTENT=       # Wysokie zainteresowanie
KIT_TAG_CUSTOMER=          # Klient
```

## 4. Testowanie integracji

Po dodaniu zmiennych środowiskowych:

1. Zrób redeploy projektu na Vercel
2. Sprawdź logi w Vercel Functions:
   - **Functions** → wybierz endpoint → **Logs**
3. Przetestuj formularz na stronie
4. Sprawdź w ConvertKit czy subskrybent został dodany

## 5. Tagowanie subskrybentów

W plikach API (`/api/forms/*`) używamy tagów do segmentacji:

```javascript
// Przykład tagowania
tags: ['website-download', 'lead-magnet', 'polish']
```

Możesz stworzyć automaty w ConvertKit bazując na tagach:
- `website-download` - pobrał materiał ze strony
- `lead-magnet` - zainteresowany darmowymi materiałami
- `contact-form` - wypełnił formularz kontaktowy
- `quiz-completed` - ukończył quiz

## 6. Troubleshooting

### Błąd 401 Unauthorized
- Sprawdź czy API Key jest poprawny
- Upewnij się że nie ma spacji przed/po kluczu

### Subskrybent nie pojawia się w ConvertKit
- Sprawdź logi funkcji w Vercel
- Sprawdź czy FORM_ID jest poprawny
- Upewnij się że email nie jest już w systemie

### Błąd CORS
- Używaj API Routes (`/api/forms/*`) zamiast bezpośrednich zapytań
- Nie wywołuj ConvertKit API z frontendu

## 7. Lokalne testowanie

Dla lokalnego development utwórz plik `.env.local` (skopiuj z `.env.example`):

```bash
cp .env.example .env.local
```

Następnie wypełnij wartości w `.env.local`:

```env
KIT_API_KEY=twoj_api_key
KIT_API_SECRET=twoj_api_secret
KIT_FORM_NEWSLETTER=12345
KIT_FORM_DOWNLOAD=67890
# ... pozostałe zmienne
```

**WAŻNE**: Nie commituj pliku `.env.local` do repozytorium!

## 8. Webhook (opcjonalnie)

Możesz skonfigurować webhook w ConvertKit aby otrzymywać powiadomienia:

1. W ConvertKit: **Automations** → **Rules** → **Add Rule**
2. Trigger: "Joins a form"
3. Action: "Webhook"
4. URL: `https://twoja-domena.vercel.app/api/webhooks/convertkit`

---

Po konfiguracji wszystkie formularze będą automatycznie zapisywać subskrybentów do ConvertKit z odpowiednimi tagami.
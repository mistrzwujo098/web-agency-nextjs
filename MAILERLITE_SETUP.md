# MailerLite Integration Setup Guide

## 🚀 Quick Start

### 1. Uzyskaj klucz API MailerLite

1. Zaloguj się do swojego konta MailerLite
2. Przejdź do **Integrations** → **MailerLite API**
3. Kliknij **Generate new token**
4. Nadaj tokenowi nazwę (np. "WebCraftAI Website")
5. Skopiuj wygenerowany token

### 2. Skonfiguruj zmienne środowiskowe

#### Lokalnie (.env.local)

Stwórz plik `.env.local` w głównym katalogu projektu:

```bash
# MailerLite API Configuration
MAILERLITE_API_KEY=twój_klucz_api_tutaj

# MailerLite Group IDs (znajdziesz je w MailerLite > Subscribers > Groups)
MAILERLITE_GROUP_NEWSLETTER=123456
MAILERLITE_GROUP_CONTACT=123457
MAILERLITE_GROUP_QUIZ=123458
MAILERLITE_GROUP_DOWNLOAD=123459
MAILERLITE_GROUP_FREE_ANALYSIS=123460
MAILERLITE_GROUP_HIGH_INTENT=123461
MAILERLITE_GROUP_CUSTOMER=123462

# MailerLite Automation IDs (opcjonalne - znajdziesz je w MailerLite > Automations)
MAILERLITE_AUTOMATION_WELCOME=987654
MAILERLITE_AUTOMATION_DOWNLOAD=987655
MAILERLITE_AUTOMATION_QUIZ=987656
MAILERLITE_AUTOMATION_CONTACT=987657
```

#### Na Vercel

1. Przejdź do swojego projektu na Vercel
2. Kliknij **Settings** → **Environment Variables**
3. Dodaj każdą zmienną środowiskową:
   - **Key**: `MAILERLITE_API_KEY`
   - **Value**: Twój klucz API
   - **Environment**: Zaznacz wszystkie (Production, Preview, Development)
4. Powtórz dla wszystkich zmiennych

### 3. Stwórz grupy w MailerLite

1. Zaloguj się do MailerLite
2. Przejdź do **Subscribers** → **Groups**
3. Stwórz następujące grupy:
   - Newsletter Subscribers
   - Contact Form Submissions
   - Quiz Completed
   - Downloaded Resources
   - Free Analysis Requests
   - High Intent Leads
   - Customers

4. Dla każdej grupy skopiuj ID (widoczne w URL lub w ustawieniach grupy)

### 4. Stwórz automatyzacje (opcjonalne)

1. Przejdź do **Automations** w MailerLite
2. Stwórz automatyzacje dla:
   - **Welcome Series** - dla nowych subskrybentów newslettera
   - **Download Follow-up** - dla osób pobierających materiały
   - **Quiz Results** - dla osób wypełniających quiz
   - **Contact Follow-up** - dla osób wypełniających formularz kontaktowy

## 📊 Mapowanie danych

### Pola niestandardowe w MailerLite

Upewnij się, że masz następujące pola niestandardowe w MailerLite:

1. **source** - Źródło kontaktu
2. **downloaded_resource** - Pobrany materiał
3. **quiz_score** - Wynik quizu
4. **quiz_answers** - Odpowiedzi z quizu
5. **service_interest** - Interesująca usługa
6. **message** - Wiadomość z formularza
7. **phone** - Numer telefonu
8. **company** - Nazwa firmy
9. **submitted_at** - Data zgłoszenia
10. **downloaded_at** - Data pobrania

### Tworzenie pól niestandardowych

1. W MailerLite przejdź do **Subscribers** → **Fields**
2. Kliknij **Add new field**
3. Wybierz typ pola (Text, Date, Number)
4. Nadaj nazwę i zapisz

## 🔧 Testowanie integracji

### 1. Test lokalny

```bash
# Uruchom aplikację lokalnie
npm run dev

# Wypełnij formularz testowy
# Sprawdź logi w konsoli
```

### 2. Sprawdź w MailerLite

1. Przejdź do **Subscribers**
2. Sprawdź czy pojawił się nowy kontakt
3. Sprawdź czy ma przypisane odpowiednie grupy
4. Sprawdź czy pola niestandardowe są wypełnione

## 🚨 Rozwiązywanie problemów

### Błąd: "MailerLite API error: Invalid API key"

- Sprawdź czy klucz API jest poprawny
- Upewnij się, że nie ma spacji na początku/końcu klucza
- Sprawdź czy klucz ma odpowiednie uprawnienia

### Błąd: "Group not found"

- Sprawdź czy ID grupy jest poprawne
- Upewnij się, że grupa istnieje w MailerLite
- Sprawdź czy nie ma literówki w ID

### Kontakty nie pojawiają się w MailerLite

1. Sprawdź logi serwera (Network tab w DevTools)
2. Upewnij się, że zmienne środowiskowe są ustawione
3. Sprawdź czy API endpoint zwraca status 200

## 📋 Checklist przed wdrożeniem

- [ ] Klucz API MailerLite dodany do Vercel
- [ ] Wszystkie grupy utworzone w MailerLite
- [ ] ID grup dodane do zmiennych środowiskowych
- [ ] Pola niestandardowe utworzone w MailerLite
- [ ] Automatyzacje skonfigurowane (opcjonalne)
- [ ] Testy przeprowadzone lokalnie
- [ ] Deploy na Vercel wykonany
- [ ] Test na produkcji przeprowadzony

## 🔗 Przydatne linki

- [MailerLite API Documentation](https://developers.mailerlite.com/docs)
- [MailerLite Dashboard](https://dashboard.mailerlite.com)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
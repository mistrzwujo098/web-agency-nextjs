# Language Inconsistencies Report

## Summary
Found multiple language implementation issues across the codebase where hardcoded text should be using the translation system.

## Critical Issues

### 1. Navigation Components with Hardcoded Menu Items

#### `/src/components/navigation/header.tsx`
- **Lines 28-85**: Hardcoded navigation menu items in both Polish and English
- **Lines 34-38, 61-66**: Hardcoded submenu items for services
- **Lines 44-50, 72-78**: Hardcoded resource links
- **Line 177, 272**: Hardcoded CTA button text using conditional

**Fix Required**: Move all navigation items to translation files (`en.json` and `pl.json`)

#### `/src/components/navigation/footer.tsx`
- **Lines 31-48**: Hardcoded footer links with conditional language selection
- **Line 146**: Hardcoded email address `kontakt@kacperczaczyk.com`
- **Line 150**: Hardcoded address in Polish
- **Lines 260-261**: Hardcoded VAT and REGON labels

**Fix Required**: Use translation keys for all footer content

### 2. Pages Using Inline Language Conditionals

#### `/src/app/[locale]/not-found.tsx`
- **Lines 14-45**: Entire content object with hardcoded translations
- **Issue**: Not using the next-intl translation system at all

**Fix Required**: Convert to use `useTranslations` hook

#### `/src/app/[locale]/tools/roi-calculator/page.tsx`
- **Multiple lines**: Uses `isPL ?` pattern throughout for all UI text
- **Examples**: Lines 300, 312, 327, 331, 349, 354, 365, 376, 387, 398

**Fix Required**: Replace all conditional text with translation keys

### 3. Form Components with Hardcoded Placeholders

#### `/src/components/sections/contact-form.tsx`
- **Line 211**: Polish placeholder "Jan Kowalski"
- **Line 227**: Polish placeholder "jan@firma.pl"
- **Line 242**: Polish phone placeholder "+48 123 456 789"
- **Line 257**: Polish placeholder "Nazwa Twojej firmy"

**Fix Required**: Move placeholders to translation files

### 4. Metadata with Conditional Language

#### `/src/app/[locale]/metadata.ts`
- **Lines 11-86**: All metadata uses conditional language selection
- **Issue**: Should ideally use a translation system for metadata

**Fix Required**: Consider creating metadata translation structure

## Files Affected by `isPL ?` Pattern

The following files use the `isPL ?` conditional pattern instead of proper translations:

1. `/src/app/[locale]/reports/10-bledow-strony/page.tsx`
2. `/src/app/[locale]/download/seo-local-guide/page.tsx`
3. `/src/app/[locale]/reports/seo-lokalny/page.tsx`
4. `/src/app/[locale]/download/roi-calculator/page.tsx`
5. `/src/app/[locale]/reports/marketing-autopilot/page.tsx`
6. `/src/app/[locale]/download/marketing-automation-guide/page.tsx`
7. `/src/app/[locale]/not-found.tsx`
8. `/src/app/[locale]/download/10-bledow-poradnik/page.tsx`
9. `/src/app/[locale]/resources/[slug]/page.tsx`
10. `/src/app/[locale]/tools/conversion-checklist/page.tsx`
11. `/src/app/[locale]/download/website-launch-checklist/page.tsx`
12. `/src/app/[locale]/tools/roi-calculator/page.tsx`
13. `/src/app/[locale]/download/50-elementow-checklist/page.tsx`
14. `/src/app/[locale]/tools/website-launch-checklist/page.tsx`

## Recommendations

1. **Immediate Priority**: Fix navigation components (header.tsx and footer.tsx) as they appear on every page
2. **High Priority**: Convert all pages using `isPL ?` pattern to use `useTranslations` hook
3. **Medium Priority**: Fix form placeholders and move them to translation files
4. **Low Priority**: Consider restructuring metadata to use translations

## Implementation Guidelines

1. Add missing translation keys to `/src/i18n/messages/en.json` and `/src/i18n/messages/pl.json`
2. Replace all conditional language checks with `useTranslations` hook
3. Ensure all hardcoded text is moved to translation files
4. Test both language versions thoroughly after changes

## Example Fix Pattern

Instead of:
```tsx
{isPL ? 'Polski tekst' : 'English text'}
```

Use:
```tsx
const t = useTranslations('section')
{t('translationKey')}
```
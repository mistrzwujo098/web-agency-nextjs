import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '@/i18n/config';
import { Inter } from "next/font/google";
// import { AnalyticsWrapper } from '@/components/analytics';
import { Header } from '@/components/navigation/header';
import { Footer } from '@/components/navigation/footer';
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup';

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  adjustFontFallback: true
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for immediate render */
            #hero{position:relative;min-height:100vh;min-height:100dvh;display:flex;align-items:center;overflow:hidden;padding-top:5rem;background:linear-gradient(to bottom right,#111827,rgba(88,28,135,0.2),rgba(29,78,216,0.2))}
            header{position:fixed;top:0;left:0;right:0;z-index:50;height:80px}
            #hero h1{font-size:clamp(1.875rem,5vw,3.75rem);font-weight:700;color:white;line-height:1.2;margin-bottom:1.5rem}
            #hero p{font-size:clamp(1rem,2vw,1.25rem);color:#f3f4f6;margin-bottom:2rem}
            @media(max-width:768px){#hero{padding-top:4rem}header{height:64px}}
          `
        }} />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          {/* <AnalyticsWrapper /> */}
          <ExitIntentPopup 
            onAction={() => {
              if (typeof window !== 'undefined') {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' });
                }
              }
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
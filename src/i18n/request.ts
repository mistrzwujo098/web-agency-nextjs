import {getRequestConfig} from 'next-intl/server';
import {locales} from './config';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  // Default to 'pl' if no locale is provided
  if (!locale) {
    locale = 'pl';
  }
  
  if (!locales.includes(locale as any)) {
    locale = 'pl'; // Fallback to Polish
  }
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
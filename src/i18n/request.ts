import {getRequestConfig} from 'next-intl/server';
import {locales} from './config';
 
export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;
  
  if (!locale || !locales.includes(locale as any)) {
    throw new Error(`Invalid locale: ${locale}`);
  }
 
  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
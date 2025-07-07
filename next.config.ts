import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
const nextConfig: NextConfig = {
  experimental: {
    turbo: {}
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: []
  }
};
 
export default withNextIntl(nextConfig);

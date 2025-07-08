import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
const nextConfig: NextConfig = {
  output: 'export',
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    unoptimized: true
  },
  trailingSlash: true
};
 
export default withNextIntl(nextConfig);

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { locales } from '@/i18n/config';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Agencja Tworzenia Stron | +30% Leadów w 14 Dni",
  description: "Tworzymy strony internetowe dla lokalnych firm. Gwarancja +30% leadów lub zwrot pieniędzy. Darmowy audyt w 48h.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  return children;
}

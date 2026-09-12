import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Age Calculator — Calculate your exact age in years, months, days, and hours | ToolCraftKit',
  description: 'Calculate your exact age in years, months, days, and hours. Zodiac sign and birthday countdown.',
  openGraph: {
    title: 'Age Calculator — Calculate your exact age in years, months, days, and hours | ToolCraftKit',
    description: 'Calculate your exact age in years, months, days, and hours. Zodiac sign and birthday countdown.',
    url: 'https://toolcraftkit.com/tools/age-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Age Calculator — Calculate your exact age in years, months, days, and hours | ToolCraftKit',
    description: 'Calculate your exact age in years, months, days, and hours. Zodiac sign and birthday countdown.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/age-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

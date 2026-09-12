import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Discount Calculator — Calculate sale prices, savings, and reverse-calculate dis... | ToolCraftKit',
  description: 'Calculate sale prices, savings, and reverse-calculate discounts. Includes tax calculation.',
  openGraph: {
    title: 'Discount Calculator — Calculate sale prices, savings, and reverse-calculate dis... | ToolCraftKit',
    description: 'Calculate sale prices, savings, and reverse-calculate discounts. Includes tax calculation.',
    url: 'https://toolcraftkit.com/tools/discount-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Discount Calculator — Calculate sale prices, savings, and reverse-calculate dis... | ToolCraftKit',
    description: 'Calculate sale prices, savings, and reverse-calculate discounts. Includes tax calculation.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/discount-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Currency Converter — Convert Between 30+ World Currencies | ToolCraftKit',
  description: 'Free currency converter. Convert between USD, EUR, GBP, CAD, JPY, AUD, and 30+ major world currencies with approximate exchange rates.',
  openGraph: {
    title: 'Currency Converter — Convert Between 30+ World Currencies | ToolCraftKit',
    description: 'Free currency converter. Convert between USD, EUR, GBP, CAD, JPY, AUD, and 30+ major world currencies.',
    url: 'https://toolcraftkit.com/tools/currency-converter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Currency Converter | ToolCraftKit', description: 'Convert between 30+ world currencies instantly.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/currency-converter' },
};

export default function Page() {
  return <ClientPage />;
}

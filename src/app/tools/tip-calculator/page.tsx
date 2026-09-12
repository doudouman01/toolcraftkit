import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Tip Calculator — Calculate tip amount, split the bill, and compare tip per... | ToolCraftKit',
  description: 'Calculate tip amount, split the bill, and compare tip percentages instantly.',
  openGraph: {
    title: 'Tip Calculator — Calculate tip amount, split the bill, and compare tip per... | ToolCraftKit',
    description: 'Calculate tip amount, split the bill, and compare tip percentages instantly.',
    url: 'https://toolcraftkit.com/tools/tip-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tip Calculator — Calculate tip amount, split the bill, and compare tip per... | ToolCraftKit',
    description: 'Calculate tip amount, split the bill, and compare tip percentages instantly.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/tip-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Words to Pages Calculator — Estimate how many pages your word count fills | ToolCraftKit',
  description: 'Estimate how many pages your word count fills. Customize font size, spacing, and page format.',
  openGraph: {
    title: 'Words to Pages Calculator — Estimate how many pages your word count fills | ToolCraftKit',
    description: 'Estimate how many pages your word count fills. Customize font size, spacing, and page format.',
    url: 'https://toolcraftkit.com/tools/words-to-pages',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Words to Pages Calculator — Estimate how many pages your word count fills | ToolCraftKit',
    description: 'Estimate how many pages your word count fills. Customize font size, spacing, and page format.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/words-to-pages',
  },
};

export default function Page() {
  return <ClientPage />;
}

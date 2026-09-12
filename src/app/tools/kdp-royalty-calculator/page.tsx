import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'KDP Royalty Calculator — Amazon Ebook Royalties Across All Marketplaces | ToolCraftKit',
  description: 'Calculate Amazon KDP ebook royalties. Compare 35% vs 70% royalty rates across all Amazon marketplaces worldwide.',
  openGraph: {
    title: 'KDP Royalty Calculator — Amazon Ebook Royalties Across All Marketplaces | ToolCraftKit',
    description: 'Calculate Amazon KDP ebook royalties. Compare 35% vs 70% royalty rates across all Amazon marketplaces worldwide.',
    url: 'https://toolcraftkit.com/tools/kdp-royalty-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'KDP Royalty Calculator — Amazon Ebook Royalties Across All Marketplaces | ToolCraftKit',
    description: 'Calculate Amazon KDP ebook royalties. Compare 35% vs 70% royalty rates across all Amazon marketplaces worldwide.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/kdp-royalty-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

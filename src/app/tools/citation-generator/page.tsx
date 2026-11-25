import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Citation Generator — Free APA, MLA, Chicago & Harvard Citations | ToolCraftKit',
  description: 'Generate properly formatted citations in APA 7th, MLA 9th, Chicago, or Harvard style. Books, journals, websites, videos. Free, no signup.',
  openGraph: {
    title: 'Citation Generator — Free APA, MLA, Chicago & Harvard Citations | ToolCraftKit',
    description: 'Generate properly formatted citations in APA 7th, MLA 9th, Chicago, or Harvard style. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/citation-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Citation Generator — Free APA, MLA, Chicago & Harvard Citations | ToolCraftKit',
    description: 'Generate properly formatted citations. Free, no signup.',
  },
  alternates: { canonical: 'https://toolcraftkit.com/tools/citation-generator' },
};

export default function Page() { return <ClientPage />; }

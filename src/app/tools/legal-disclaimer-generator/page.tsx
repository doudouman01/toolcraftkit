import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Legal Disclaimer Generator — Free Website Disclaimer | ToolCraftKit',
  description: 'Generate a professional legal disclaimer for your website or business. Medical, financial, fitness, affiliate, and general disclaimers. Free, no signup.',
  openGraph: {
    title: 'Legal Disclaimer Generator — Free Website Disclaimer | ToolCraftKit',
    description: 'Generate a professional legal disclaimer for your website or business. Medical, financial, fitness, affiliate, and general disclaimers. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/legal-disclaimer-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Legal Disclaimer Generator — Free Website Disclaimer | ToolCraftKit',
    description: 'Generate a professional legal disclaimer for your website or business. Free, no signup.',
  },
  alternates: { canonical: 'https://toolcraftkit.com/tools/legal-disclaimer-generator' },
};

export default function Page() { return <ClientPage />; }

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'NDA Generator — Create a free Non-Disclosure Agreement | ToolCraftKit',
  description: 'Generate a professional NDA (Non-Disclosure Agreement) in seconds. Mutual or one-way, customizable duration and jurisdiction. Free, no signup.',
  openGraph: {
    title: 'NDA Generator — Create a free Non-Disclosure Agreement | ToolCraftKit',
    description: 'Generate a professional NDA in seconds. Mutual or one-way, customizable duration and jurisdiction. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/nda-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'NDA Generator — Create a free Non-Disclosure Agreement | ToolCraftKit',
    description: 'Generate a professional NDA in seconds. Mutual or one-way, customizable. Free.',
  },
  alternates: { canonical: 'https://toolcraftkit.com/tools/nda-generator' },
};

export default function Page() { return <ClientPage />; }

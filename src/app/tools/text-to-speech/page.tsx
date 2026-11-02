import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Text to Speech — Free Online TTS Reader | ToolCraftKit',
  description: 'Free online text to speech tool. Convert text to spoken audio using your browser. Multiple voices, languages, adjustable speed and pitch. No signup required.',
  openGraph: {
    title: 'Text to Speech — Free Online TTS Reader | ToolCraftKit',
    description: 'Free online text to speech tool. Convert text to spoken audio using your browser. Multiple voices, languages, adjustable speed and pitch. No signup required.',
    url: 'https://toolcraftkit.com/tools/text-to-speech',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Text to Speech — Free Online TTS Reader | ToolCraftKit',
    description: 'Free online text to speech tool. Convert text to spoken audio using your browser. Multiple voices, languages, adjustable speed and pitch. No signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/text-to-speech',
  },
};

export default function Page() {
  return <ClientPage />;
}

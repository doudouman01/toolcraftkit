import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Audio Converter — Convert Audio Files Online | ToolCraftKit',
  description: 'Free audio converter. Convert WAV, OGG, WEBM, M4A audio files to WAV or WEBM format. Client-side processing, no upload to server.',
  openGraph: {
    title: 'Audio Converter — Convert Audio Files Online | ToolCraftKit',
    description: 'Convert audio files between formats. WAV, OGG, WEBM, M4A supported. 100% client-side.',
    url: 'https://toolcraftkit.com/tools/audio-converter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Audio Converter | ToolCraftKit', description: 'Convert audio files between formats entirely in your browser.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/audio-converter' },
};

export default function Page() {
  return <ClientPage />;
}

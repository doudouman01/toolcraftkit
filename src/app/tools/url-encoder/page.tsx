import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'URL Encoder/Decoder — Encode or decode URLs and query strings | ToolCraftKit',
  description: 'Encode or decode URLs and query strings. Component and full URI mode.',
  openGraph: {
    title: 'URL Encoder/Decoder — Encode or decode URLs and query strings | ToolCraftKit',
    description: 'Encode or decode URLs and query strings. Component and full URI mode.',
    url: 'https://toolcraftkit.com/tools/url-encoder',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'URL Encoder/Decoder — Encode or decode URLs and query strings | ToolCraftKit',
    description: 'Encode or decode URLs and query strings. Component and full URI mode.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/url-encoder',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Base64 Encoder/Decoder — Encode and Decode Base64 Instantly | ToolCraftKit',
  description: 'Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 to text instantly. No signup required.',
  openGraph: {
    title: 'Base64 Encoder/Decoder — Encode and Decode Base64 Instantly | ToolCraftKit',
    description: 'Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 to text instantly. No signup required.',
    url: 'https://toolcraftkit.com/tools/base64',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Base64 Encoder/Decoder — Encode and Decode Base64 Instantly | ToolCraftKit',
    description: 'Free online Base64 encoder and decoder. Convert text to Base64 or decode Base64 to text instantly. No signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/base64',
  },
};

export default function Page() {
  return <ClientPage />;
}

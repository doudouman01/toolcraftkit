import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Signature Generator — Draw or Type Your Signature | ToolCraftKit',
  description: 'Free online signature generator. Draw your signature or type your name in cursive styles. Download as PNG or JPG. No signup required.',
  openGraph: {
    title: 'Signature Generator — Draw or Type Your Signature | ToolCraftKit',
    description: 'Create digital signatures. Draw or type, customize colors and thickness, download as PNG or JPG.',
    url: 'https://toolcraftkit.com/tools/signature-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Signature Generator | ToolCraftKit', description: 'Draw or type your signature and download as PNG or JPG.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/signature-generator' },
};

export default function Page() {
  return <ClientPage />;
}

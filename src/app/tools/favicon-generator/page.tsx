import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Favicon Generator — Create favicons from text or emoji | ToolCraftKit',
  description: 'Create favicons from text or emoji. Download ICO, PNG 32px, 180px, 512px. Free online tool.',
  openGraph: {
    title: 'Favicon Generator — Create favicons from text or emoji | ToolCraftKit',
    description: 'Create favicons from text or emoji. Download ICO, PNG 32px, 180px, 512px. Free online tool.',
    url: 'https://toolcraftkit.com/tools/favicon-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Favicon Generator — Create favicons from text or emoji | ToolCraftKit',
    description: 'Create favicons from text or emoji. Download ICO, PNG 32px, 180px, 512px. Free online tool.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/favicon-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

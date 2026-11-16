import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Fancy Font Generator — Unicode Text Styles & Copy | ToolCraftKit',
  description: 'Generate fancy text with 15+ Unicode font styles. Bold, italic, script, fraktur, monospace, circled, and more. Copy and paste anywhere.',
  openGraph: {
    title: 'Fancy Font Generator — Unicode Text Styles & Copy | ToolCraftKit',
    description: 'Generate fancy text with 15+ Unicode font styles. Bold, italic, script, fraktur, monospace, circled, and more. Copy and paste anywhere.',
    url: 'https://toolcraftkit.com/tools/font-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Fancy Font Generator — Unicode Text Styles & Copy | ToolCraftKit',
    description: 'Generate fancy text with 15+ Unicode font styles. Bold, italic, script, fraktur, monospace, circled, and more. Copy and paste anywhere.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/font-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

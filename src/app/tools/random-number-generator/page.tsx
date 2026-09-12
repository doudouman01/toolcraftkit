import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Random Number Generator — Random numbers, dice roller, list picker, and coin flip | ToolCraftKit',
  description: 'Random numbers, dice roller, list picker, and coin flip. Four modes for any use.',
  openGraph: {
    title: 'Random Number Generator — Random numbers, dice roller, list picker, and coin flip | ToolCraftKit',
    description: 'Random numbers, dice roller, list picker, and coin flip. Four modes for any use.',
    url: 'https://toolcraftkit.com/tools/random-number-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Random Number Generator — Random numbers, dice roller, list picker, and coin flip | ToolCraftKit',
    description: 'Random numbers, dice roller, list picker, and coin flip. Four modes for any use.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/random-number-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

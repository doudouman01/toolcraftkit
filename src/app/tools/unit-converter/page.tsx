import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Unit Converter — Convert between 60+ units: length, weight, temperature, v... | ToolCraftKit',
  description: 'Convert between 60+ units: length, weight, temperature, volume, speed, and more.',
  openGraph: {
    title: 'Unit Converter — Convert between 60+ units: length, weight, temperature, v... | ToolCraftKit',
    description: 'Convert between 60+ units: length, weight, temperature, volume, speed, and more.',
    url: 'https://toolcraftkit.com/tools/unit-converter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Unit Converter — Convert between 60+ units: length, weight, temperature, v... | ToolCraftKit',
    description: 'Convert between 60+ units: length, weight, temperature, volume, speed, and more.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/unit-converter',
  },
};

export default function Page() {
  return <ClientPage />;
}

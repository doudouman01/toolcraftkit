import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image Resizer — Resize images online for free | ToolCraftKit',
  description: 'Resize images online for free. Set custom dimensions or use social media presets. No upload to server.',
  openGraph: {
    title: 'Image Resizer — Resize images online for free | ToolCraftKit',
    description: 'Resize images online for free. Set custom dimensions or use social media presets. No upload to server.',
    url: 'https://toolcraftkit.com/tools/image-resizer',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image Resizer — Resize images online for free | ToolCraftKit',
    description: 'Resize images online for free. Set custom dimensions or use social media presets. No upload to server.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/image-resizer',
  },
};

export default function Page() {
  return <ClientPage />;
}

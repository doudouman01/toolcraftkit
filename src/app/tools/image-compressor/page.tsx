import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image Compressor — Compress images online for free | ToolCraftKit',
  description: 'Compress images online for free. Reduce file size without losing quality. JPEG, PNG, WebP supported.',
  openGraph: {
    title: 'Image Compressor — Compress images online for free | ToolCraftKit',
    description: 'Compress images online for free. Reduce file size without losing quality. JPEG, PNG, WebP supported.',
    url: 'https://toolcraftkit.com/tools/image-compressor',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image Compressor — Compress images online for free | ToolCraftKit',
    description: 'Compress images online for free. Reduce file size without losing quality. JPEG, PNG, WebP supported.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/image-compressor',
  },
};

export default function Page() {
  return <ClientPage />;
}

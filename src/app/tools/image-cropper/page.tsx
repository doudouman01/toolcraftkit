import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image Cropper — Crop images online for free | ToolCraftKit',
  description: 'Crop images online with preset aspect ratios or custom dimensions. Free, fast, and private — all processing happens in your browser.',
  openGraph: {
    title: 'Image Cropper — Crop images online for free | ToolCraftKit',
    description: 'Crop images online with preset aspect ratios or custom dimensions. Free, fast, and private — all processing happens in your browser.',
    url: 'https://toolcraftkit.com/tools/image-cropper',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image Cropper — Crop images online for free | ToolCraftKit',
    description: 'Crop images online with preset aspect ratios or custom dimensions. Free, fast, and private — all processing happens in your browser.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/image-cropper',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image Upscaler - Enhance Image Resolution with AI',
  description: 'Upscale images 2x or 4x with AI. Enhance resolution without losing quality. Free online image upscaler tool.',
  openGraph: {
    title: 'Image Upscaler - Enhance Image Resolution with AI',
    description: 'Upscale images 2x or 4x with AI. Enhance resolution without losing quality.',
    url: 'https://toolcraftkit.com/tools/image-upscaler',
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/image-upscaler' },
};

export default function Page() {
  return <ClientPage />;
}

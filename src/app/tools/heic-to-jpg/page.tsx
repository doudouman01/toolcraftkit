import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'HEIC to JPG Converter — Convert HEIC Images to JPEG Free | ToolCraftKit',
  description: 'Convert HEIC/HEIF images to JPG format instantly. Free, no upload to server. Adjustable quality, batch conversion, drag and drop.',
  openGraph: {
    title: 'HEIC to JPG Converter — Convert HEIC Images to JPEG Free | ToolCraftKit',
    description: 'Convert HEIC/HEIF images to JPG format instantly. Free, no upload to server. Adjustable quality, batch conversion, drag and drop.',
    url: 'https://toolcraftkit.com/tools/heic-to-jpg',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'HEIC to JPG Converter — Convert HEIC Images to JPEG Free | ToolCraftKit',
    description: 'Convert HEIC/HEIF images to JPG format instantly. Free, no upload to server. Adjustable quality, batch conversion, drag and drop.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/heic-to-jpg',
  },
};

export default function Page() {
  return <ClientPage />;
}

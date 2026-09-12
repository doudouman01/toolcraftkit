import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image to PDF — Convert images to PDF online | ToolCraftKit',
  description: 'Convert images to PDF online. Combine multiple images into one PDF document. Free, no upload to server.',
  openGraph: {
    title: 'Image to PDF — Convert images to PDF online | ToolCraftKit',
    description: 'Convert images to PDF online. Combine multiple images into one PDF document. Free, no upload to server.',
    url: 'https://toolcraftkit.com/tools/image-to-pdf',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image to PDF — Convert images to PDF online | ToolCraftKit',
    description: 'Convert images to PDF online. Combine multiple images into one PDF document. Free, no upload to server.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/image-to-pdf',
  },
};

export default function Page() {
  return <ClientPage />;
}

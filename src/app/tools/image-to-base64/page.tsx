import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image to Base64 — Convert Images to Base64 String Free | ToolCraftKit',
  description: 'Convert images to Base64 encoded strings. Upload or drag and drop. Copy data URI, see file size comparison. Free, runs in your browser.',
  openGraph: {
    title: 'Image to Base64 — Convert Images to Base64 String Free | ToolCraftKit',
    description: 'Convert images to Base64 encoded strings. Upload or drag and drop. Copy data URI, see file size comparison. Free, runs in your browser.',
    url: 'https://toolcraftkit.com/tools/image-to-base64',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image to Base64 — Convert Images to Base64 String Free | ToolCraftKit',
    description: 'Convert images to Base64 encoded strings. Upload or drag and drop. Copy data URI, see file size comparison. Free, runs in your browser.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/image-to-base64',
  },
};

export default function Page() {
  return <ClientPage />;
}

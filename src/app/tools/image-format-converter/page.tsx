import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image Format Converter — Convert PNG, JPG, WebP, BMP, GIF Online Free | ToolCraftKit',
  description: 'Convert images between PNG, JPG, WebP, BMP, and GIF formats instantly. Client-side conversion, no upload to server. Free online image converter.',
  openGraph: {
    title: 'Image Format Converter — Convert PNG, JPG, WebP, BMP, GIF Online Free | ToolCraftKit',
    description: 'Convert images between PNG, JPG, WebP, BMP, and GIF formats instantly. Client-side conversion, no upload to server. Free online image converter.',
    url: 'https://toolcraftkit.com/tools/image-format-converter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image Format Converter — Convert PNG, JPG, WebP, BMP, GIF Online Free | ToolCraftKit',
    description: 'Convert images between PNG, JPG, WebP, BMP, and GIF formats instantly. Client-side conversion, no upload to server. Free online image converter.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/image-format-converter',
  },
};

export default function Page() {
  return <ClientPage />;
}

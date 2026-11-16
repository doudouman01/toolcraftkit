import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Image Watermark — Add Text Watermark to Images Free | ToolCraftKit',
  description: 'Add text watermarks to images. Customize font, size, color, opacity, and position. Download watermarked image. Free, no upload to server.',
  openGraph: {
    title: 'Image Watermark — Add Text Watermark to Images Free | ToolCraftKit',
    description: 'Add text watermarks to images. Customize font, size, color, opacity, and position. Download watermarked image. Free, no upload to server.',
    url: 'https://toolcraftkit.com/tools/image-watermark',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Image Watermark — Add Text Watermark to Images Free | ToolCraftKit',
    description: 'Add text watermarks to images. Customize font, size, color, opacity, and position. Download watermarked image. Free, no upload to server.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/image-watermark',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'SVG to PNG Converter — Convert SVG to PNG Online | ToolCraftKit',
  description: 'Free SVG to PNG converter. Upload SVG or paste code, set output size and scale (1x-4x), choose transparent or white background. Download as PNG.',
  openGraph: {
    title: 'SVG to PNG Converter — Convert SVG to PNG Online | ToolCraftKit',
    description: 'Convert SVG files to PNG images. Set custom size, scale, and background color.',
    url: 'https://toolcraftkit.com/tools/svg-to-png',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'SVG to PNG Converter | ToolCraftKit', description: 'Convert SVG to PNG with custom size and scale options.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/svg-to-png' },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Color Palette Generator — Generate harmonious color palettes from any color | ToolCraftKit',
  description: 'Generate harmonious color palettes from any color. 6 modes with CSS export.',
  openGraph: {
    title: 'Color Palette Generator — Generate harmonious color palettes from any color | ToolCraftKit',
    description: 'Generate harmonious color palettes from any color. 6 modes with CSS export.',
    url: 'https://toolcraftkit.com/tools/color-palette',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Color Palette Generator — Generate harmonious color palettes from any color | ToolCraftKit',
    description: 'Generate harmonious color palettes from any color. 6 modes with CSS export.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/color-palette',
  },
};

export default function Page() {
  return <ClientPage />;
}

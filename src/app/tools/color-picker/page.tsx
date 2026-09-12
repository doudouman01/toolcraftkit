import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Color Picker — Pick any color, get HEX, RGB, HSL values | ToolCraftKit',
  description: 'Pick any color, get HEX, RGB, HSL values. Generate shades and tints. Free online color tool.',
  openGraph: {
    title: 'Color Picker — Pick any color, get HEX, RGB, HSL values | ToolCraftKit',
    description: 'Pick any color, get HEX, RGB, HSL values. Generate shades and tints. Free online color tool.',
    url: 'https://toolcraftkit.com/tools/color-picker',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Color Picker — Pick any color, get HEX, RGB, HSL values | ToolCraftKit',
    description: 'Pick any color, get HEX, RGB, HSL values. Generate shades and tints. Free online color tool.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/color-picker',
  },
};

export default function Page() {
  return <ClientPage />;
}

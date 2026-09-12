import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Text Compare — Compare two texts side by side | ToolCraftKit',
  description: 'Compare two texts side by side. Find differences instantly. Free online diff tool.',
  openGraph: {
    title: 'Text Compare — Compare two texts side by side | ToolCraftKit',
    description: 'Compare two texts side by side. Find differences instantly. Free online diff tool.',
    url: 'https://toolcraftkit.com/tools/text-compare',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Text Compare — Compare two texts side by side | ToolCraftKit',
    description: 'Compare two texts side by side. Find differences instantly. Free online diff tool.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/text-compare',
  },
};

export default function Page() {
  return <ClientPage />;
}

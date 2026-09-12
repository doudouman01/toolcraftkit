import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Regex Tester — Test regular expressions with live highlighting, presets,... | ToolCraftKit',
  description: 'Test regular expressions with live highlighting, presets, and replace mode.',
  openGraph: {
    title: 'Regex Tester — Test regular expressions with live highlighting, presets,... | ToolCraftKit',
    description: 'Test regular expressions with live highlighting, presets, and replace mode.',
    url: 'https://toolcraftkit.com/tools/regex-tester',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Regex Tester — Test regular expressions with live highlighting, presets,... | ToolCraftKit',
    description: 'Test regular expressions with live highlighting, presets, and replace mode.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/regex-tester',
  },
};

export default function Page() {
  return <ClientPage />;
}

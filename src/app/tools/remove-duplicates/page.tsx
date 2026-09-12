import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Remove Duplicate Lines — Remove duplicate lines from text | ToolCraftKit',
  description: 'Remove duplicate lines from text. Keep only unique entries, sort, and trim whitespace.',
  openGraph: {
    title: 'Remove Duplicate Lines — Remove duplicate lines from text | ToolCraftKit',
    description: 'Remove duplicate lines from text. Keep only unique entries, sort, and trim whitespace.',
    url: 'https://toolcraftkit.com/tools/remove-duplicates',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Remove Duplicate Lines — Remove duplicate lines from text | ToolCraftKit',
    description: 'Remove duplicate lines from text. Keep only unique entries, sort, and trim whitespace.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/remove-duplicates',
  },
};

export default function Page() {
  return <ClientPage />;
}

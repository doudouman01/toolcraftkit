import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Timestamp Converter — Convert Unix timestamps to dates and back | ToolCraftKit',
  description: 'Convert Unix timestamps to dates and back. Live clock with multiple timezone formats.',
  openGraph: {
    title: 'Timestamp Converter — Convert Unix timestamps to dates and back | ToolCraftKit',
    description: 'Convert Unix timestamps to dates and back. Live clock with multiple timezone formats.',
    url: 'https://toolcraftkit.com/tools/timestamp-converter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Timestamp Converter — Convert Unix timestamps to dates and back | ToolCraftKit',
    description: 'Convert Unix timestamps to dates and back. Live clock with multiple timezone formats.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/timestamp-converter',
  },
};

export default function Page() {
  return <ClientPage />;
}

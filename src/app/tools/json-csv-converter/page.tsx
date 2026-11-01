import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'JSON to CSV Converter — Convert JSON to CSV and CSV to JSON Online | ToolCraftKit',
  description: 'Free online JSON to CSV converter. Convert JSON arrays to CSV files or CSV to JSON instantly. Handles nested objects, custom delimiters. No signup required.',
  openGraph: {
    title: 'JSON to CSV Converter — Convert JSON to CSV and CSV to JSON Online | ToolCraftKit',
    description: 'Free online JSON to CSV converter. Convert JSON arrays to CSV files or CSV to JSON instantly. Handles nested objects, custom delimiters. No signup required.',
    url: 'https://toolcraftkit.com/tools/json-csv-converter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JSON to CSV Converter — Convert JSON to CSV and CSV to JSON Online | ToolCraftKit',
    description: 'Free online JSON to CSV converter. Convert JSON arrays to CSV files or CSV to JSON instantly. Handles nested objects, custom delimiters. No signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/json-csv-converter',
  },
};

export default function Page() {
  return <ClientPage />;
}

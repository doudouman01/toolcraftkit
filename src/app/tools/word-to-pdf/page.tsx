import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Word to PDF — Convert Text to PDF Document Free | ToolCraftKit',
  description: 'Convert text and rich content to PDF documents. Support for bold, italic, and headings. Free, runs entirely in your browser.',
  openGraph: {
    title: 'Word to PDF — Convert Text to PDF Document Free | ToolCraftKit',
    description: 'Convert text and rich content to PDF documents. Support for bold, italic, and headings. Free, runs entirely in your browser.',
    url: 'https://toolcraftkit.com/tools/word-to-pdf',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Word to PDF — Convert Text to PDF Document Free | ToolCraftKit',
    description: 'Convert text and rich content to PDF documents. Support for bold, italic, and headings. Free, runs entirely in your browser.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/word-to-pdf',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Markdown to PDF — Convert Markdown to PDF Free | ToolCraftKit',
  description: 'Convert Markdown text to PDF. Live preview with headers, bold, italic, lists, and code blocks. Download as PDF. Free, no signup.',
  openGraph: {
    title: 'Markdown to PDF — Convert Markdown to PDF Free | ToolCraftKit',
    description: 'Convert Markdown text to PDF. Live preview with headers, bold, italic, lists, and code blocks. Download as PDF. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/markdown-to-pdf',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Markdown to PDF — Convert Markdown to PDF Free | ToolCraftKit',
    description: 'Convert Markdown text to PDF. Live preview with headers, bold, italic, lists, and code blocks. Download as PDF. Free, no signup.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/markdown-to-pdf',
  },
};

export default function Page() {
  return <ClientPage />;
}

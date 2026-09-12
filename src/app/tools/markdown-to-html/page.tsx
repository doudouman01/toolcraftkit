import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter — Convert Markdown to clean HTML with live preview | ToolCraftKit',
  description: 'Convert Markdown to clean HTML with live preview. Copy or download the output.',
  openGraph: {
    title: 'Markdown to HTML Converter — Convert Markdown to clean HTML with live preview | ToolCraftKit',
    description: 'Convert Markdown to clean HTML with live preview. Copy or download the output.',
    url: 'https://toolcraftkit.com/tools/markdown-to-html',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Markdown to HTML Converter — Convert Markdown to clean HTML with live preview | ToolCraftKit',
    description: 'Convert Markdown to clean HTML with live preview. Copy or download the output.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/markdown-to-html',
  },
};

export default function Page() {
  return <ClientPage />;
}

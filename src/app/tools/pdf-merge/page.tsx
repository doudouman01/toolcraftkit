import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'PDF Merge — Merge multiple PDF files into one document | ToolCraftKit',
  description: 'Merge multiple PDF files into one document. Free, no upload to server. Reorder pages before merging.',
  openGraph: {
    title: 'PDF Merge — Merge multiple PDF files into one document | ToolCraftKit',
    description: 'Merge multiple PDF files into one document. Free, no upload to server. Reorder pages before merging.',
    url: 'https://toolcraftkit.com/tools/pdf-merge',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PDF Merge — Merge multiple PDF files into one document | ToolCraftKit',
    description: 'Merge multiple PDF files into one document. Free, no upload to server. Reorder pages before merging.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/pdf-merge',
  },
};

export default function Page() {
  return <ClientPage />;
}

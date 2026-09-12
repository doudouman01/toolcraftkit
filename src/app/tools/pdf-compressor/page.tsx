import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'PDF Compressor — Compress PDF files online for free | ToolCraftKit',
  description: 'Compress PDF files online for free. Reduce PDF file size without losing quality. No upload to server.',
  openGraph: {
    title: 'PDF Compressor — Compress PDF files online for free | ToolCraftKit',
    description: 'Compress PDF files online for free. Reduce PDF file size without losing quality. No upload to server.',
    url: 'https://toolcraftkit.com/tools/pdf-compressor',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PDF Compressor — Compress PDF files online for free | ToolCraftKit',
    description: 'Compress PDF files online for free. Reduce PDF file size without losing quality. No upload to server.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/pdf-compressor',
  },
};

export default function Page() {
  return <ClientPage />;
}

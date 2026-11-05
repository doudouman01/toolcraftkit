import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'PDF to Word Converter — Convert PDF to DOCX Online Free | ToolCraftKit',
  description: 'Convert PDF files to editable Word documents (.docx) online for free. Preserves text structure, headings, and formatting. No signup required.',
  openGraph: {
    title: 'PDF to Word Converter — Convert PDF to DOCX Online Free | ToolCraftKit',
    description: 'Convert PDF files to editable Word documents (.docx) online for free. Preserves text structure, headings, and formatting. No signup required.',
    url: 'https://toolcraftkit.com/tools/pdf-to-word',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PDF to Word Converter — Convert PDF to DOCX Online Free | ToolCraftKit',
    description: 'Convert PDF files to editable Word documents (.docx) online for free. Preserves text structure, headings, and formatting. No signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/pdf-to-word',
  },
};

export default function Page() {
  return <ClientPage />;
}

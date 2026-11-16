import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'PDF Split — Extract Pages from PDF Files Free | ToolCraftKit',
  description: 'Split PDF files into individual pages or extract page ranges. Free, no upload to server. Select pages and download as a new PDF.',
  openGraph: {
    title: 'PDF Split — Extract Pages from PDF Files Free | ToolCraftKit',
    description: 'Split PDF files into individual pages or extract page ranges. Free, no upload to server. Select pages and download as a new PDF.',
    url: 'https://toolcraftkit.com/tools/pdf-split',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'PDF Split — Extract Pages from PDF Files Free | ToolCraftKit',
    description: 'Split PDF files into individual pages or extract page ranges. Free, no upload to server. Select pages and download as a new PDF.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/pdf-split',
  },
};

export default function Page() {
  return <ClientPage />;
}

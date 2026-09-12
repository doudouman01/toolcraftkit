import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Text to PDF — Convert text to PDF online | ToolCraftKit',
  description: 'Convert text to PDF online. Add a title, choose font size, and download as a formatted PDF document.',
  openGraph: {
    title: 'Text to PDF — Convert text to PDF online | ToolCraftKit',
    description: 'Convert text to PDF online. Add a title, choose font size, and download as a formatted PDF document.',
    url: 'https://toolcraftkit.com/tools/text-to-pdf',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Text to PDF — Convert text to PDF online | ToolCraftKit',
    description: 'Convert text to PDF online. Add a title, choose font size, and download as a formatted PDF document.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/text-to-pdf',
  },
};

export default function Page() {
  return <ClientPage />;
}

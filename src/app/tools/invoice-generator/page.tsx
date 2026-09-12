import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Invoice Generator — Create professional invoices instantly | ToolCraftKit',
  description: 'Create professional invoices instantly. Print or save as PDF for free. No signup required.',
  openGraph: {
    title: 'Invoice Generator — Create professional invoices instantly | ToolCraftKit',
    description: 'Create professional invoices instantly. Print or save as PDF for free. No signup required.',
    url: 'https://toolcraftkit.com/tools/invoice-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Invoice Generator — Create professional invoices instantly | ToolCraftKit',
    description: 'Create professional invoices instantly. Print or save as PDF for free. No signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/invoice-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Email Signature Generator — Create a professional email signature for free | ToolCraftKit',
  description: 'Create a professional email signature for free. Copy and paste into Gmail, Outlook, or any email client.',
  openGraph: {
    title: 'Email Signature Generator — Create a professional email signature for free | ToolCraftKit',
    description: 'Create a professional email signature for free. Copy and paste into Gmail, Outlook, or any email client.',
    url: 'https://toolcraftkit.com/tools/email-signature-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Email Signature Generator — Create a professional email signature for free | ToolCraftKit',
    description: 'Create a professional email signature for free. Copy and paste into Gmail, Outlook, or any email client.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/email-signature-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

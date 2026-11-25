import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'GDPR Data Request Generator — Free GDPR/CCPA Request Letter | ToolCraftKit',
  description: 'Generate formal GDPR or CCPA data access, deletion, rectification, or portability request letters. Free, no signup required.',
  openGraph: {
    title: 'GDPR Data Request Generator — Free GDPR/CCPA Request Letter | ToolCraftKit',
    description: 'Generate formal GDPR or CCPA data access, deletion, rectification, or portability request letters. Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/gdpr-request-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'GDPR Data Request Generator — Free GDPR/CCPA Request Letter | ToolCraftKit',
    description: 'Generate formal GDPR or CCPA data access, deletion, rectification, or portability request letters. Free, no signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/gdpr-request-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

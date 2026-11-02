import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Terms of Service Generator — Create Free ToS for Your Website | ToolCraftKit',
  description: 'Generate professional Terms of Service for your website or app in seconds. Jurisdiction-aware for US, EU, Canada, Australia. Free, no signup required.',
  openGraph: {
    title: 'Terms of Service Generator — Create Free ToS for Your Website | ToolCraftKit',
    description: 'Generate professional Terms of Service for your website or app in seconds. Jurisdiction-aware for US, EU, Canada, Australia. Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/terms-of-service-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service Generator — Create Free ToS for Your Website | ToolCraftKit',
    description: 'Generate professional Terms of Service for your website or app in seconds. Jurisdiction-aware for US, EU, Canada, Australia. Free, no signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/terms-of-service-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

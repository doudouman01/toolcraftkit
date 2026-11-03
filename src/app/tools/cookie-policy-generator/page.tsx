import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Cookie Policy Generator — Create a free cookie policy for your website | ToolCraftKit',
  description: 'Generate a professional cookie policy for your website in seconds. Covers essential, analytics, marketing cookies. GDPR compliant. Free, no signup.',
  openGraph: {
    title: 'Cookie Policy Generator — Create a free cookie policy for your website | ToolCraftKit',
    description: 'Generate a professional cookie policy for your website in seconds. Covers essential, analytics, marketing cookies. GDPR compliant. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/cookie-policy-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Policy Generator — Create a free cookie policy for your website | ToolCraftKit',
    description: 'Generate a professional cookie policy for your website in seconds. Covers essential, analytics, marketing cookies. GDPR compliant. Free, no signup.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/cookie-policy-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Privacy Policy Generator — Create a free privacy policy for your website | ToolCraftKit',
  description: 'Generate a professional privacy policy for your website in seconds. Covers GDPR, CCPA, cookies, analytics. Free, no signup required.',
  openGraph: {
    title: 'Privacy Policy Generator — Create a free privacy policy for your website | ToolCraftKit',
    description: 'Generate a professional privacy policy for your website in seconds. Covers GDPR, CCPA, cookies, analytics. Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/privacy-policy-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy Generator — Create a free privacy policy for your website | ToolCraftKit',
    description: 'Generate a professional privacy policy for your website in seconds. Covers GDPR, CCPA, cookies, analytics. Free, no signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/privacy-policy-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

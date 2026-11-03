import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Cookie Consent Banner Generator — Free HTML/CSS code for your website | ToolCraftKit',
  description: 'Generate a GDPR-compliant cookie consent banner for your website. Get ready-to-use HTML, CSS, and JavaScript code. Free, no signup.',
  openGraph: {
    title: 'Cookie Consent Banner Generator — Free HTML/CSS code for your website | ToolCraftKit',
    description: 'Generate a GDPR-compliant cookie consent banner for your website. Get ready-to-use HTML, CSS, and JavaScript code. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/cookie-consent-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cookie Consent Banner Generator — Free HTML/CSS code for your website | ToolCraftKit',
    description: 'Generate a GDPR-compliant cookie consent banner for your website. Get ready-to-use HTML, CSS, and JavaScript code. Free, no signup.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/cookie-consent-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

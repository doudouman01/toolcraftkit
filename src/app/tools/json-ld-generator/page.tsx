import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'JSON-LD Schema Generator — Create structured data for SEO | ToolCraftKit',
  description: 'Generate JSON-LD structured data markup for your website. Support for Article, Product, FAQ, HowTo, Organization, LocalBusiness, and more. Free, no signup.',
  openGraph: {
    title: 'JSON-LD Schema Generator — Create structured data for SEO | ToolCraftKit',
    description: 'Generate JSON-LD structured data markup for your website. Support for Article, Product, FAQ, HowTo, Organization, LocalBusiness, and more. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/json-ld-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'JSON-LD Schema Generator — Create structured data for SEO | ToolCraftKit',
    description: 'Generate JSON-LD structured data markup for your website. Support for Article, Product, FAQ, HowTo, Organization, LocalBusiness, and more. Free, no signup.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/json-ld-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

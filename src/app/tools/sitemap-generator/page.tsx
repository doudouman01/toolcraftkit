import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Sitemap XML Generator — Create XML Sitemaps for SEO | ToolCraftKit',
  description: 'Generate valid XML sitemaps for your website. Add URLs, set priority, change frequency, and last modified dates. Download as sitemap.xml. Free.',
  openGraph: {
    title: 'Sitemap XML Generator — Create XML Sitemaps for SEO | ToolCraftKit',
    description: 'Generate valid XML sitemaps for your website. Add URLs, set priority, change frequency, and last modified dates. Download as sitemap.xml. Free.',
    url: 'https://toolcraftkit.com/tools/sitemap-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Sitemap XML Generator — Create XML Sitemaps for SEO | ToolCraftKit',
    description: 'Generate valid XML sitemaps for your website. Add URLs, set priority, change frequency, and last modified dates. Download as sitemap.xml. Free.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/sitemap-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

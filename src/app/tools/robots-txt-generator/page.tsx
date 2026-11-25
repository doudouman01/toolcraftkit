import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Robots.txt Generator — Create a robots.txt file for your website | ToolCraftKit',
  description: 'Generate a robots.txt file for your website. Control search engine crawling, block specific paths, set crawl delays, and add your sitemap URL. Free.',
  openGraph: {
    title: 'Robots.txt Generator — Create a robots.txt file for your website | ToolCraftKit',
    description: 'Generate a robots.txt file. Control crawling, block paths, set delays. Free, no signup.',
    url: 'https://toolcraftkit.com/tools/robots-txt-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Robots.txt Generator — Create a robots.txt for your website | ToolCraftKit',
    description: 'Generate a robots.txt file. Control crawling, block paths. Free.',
  },
  alternates: { canonical: 'https://toolcraftkit.com/tools/robots-txt-generator' },
};

export default function Page() { return <ClientPage />; }

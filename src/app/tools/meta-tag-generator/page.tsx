import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Meta Tag Generator — Create SEO Meta Tags for HTML | ToolCraftKit',
  description: 'Free meta tag generator. Create title, description, Open Graph, Twitter Card meta tags for SEO. Live Google preview, copy HTML code. No signup required.',
  openGraph: {
    title: 'Meta Tag Generator — Create SEO Meta Tags for HTML | ToolCraftKit',
    description: 'Free meta tag generator. Create title, description, Open Graph, Twitter Card meta tags for SEO. Live Google preview, copy HTML code. No signup required.',
    url: 'https://toolcraftkit.com/tools/meta-tag-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Meta Tag Generator — Create SEO Meta Tags for HTML | ToolCraftKit',
    description: 'Free meta tag generator. Create title, description, Open Graph, Twitter Card meta tags for SEO. Live Google preview, copy HTML code.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/meta-tag-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

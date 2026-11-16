import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Business Name Generator — Creative Name Ideas | ToolCraftKit',
  description: 'Free business name generator. Enter keywords and industry, get 20+ creative business name suggestions. Modern, professional, techy, and fun styles.',
  openGraph: {
    title: 'Business Name Generator — Creative Name Ideas | ToolCraftKit',
    description: 'Generate creative business name ideas. Enter keywords, choose a style, get 20+ suggestions.',
    url: 'https://toolcraftkit.com/tools/business-name-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Business Name Generator | ToolCraftKit', description: 'Generate creative business name ideas instantly.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/business-name-generator' },
};

export default function Page() {
  return <ClientPage />;
}

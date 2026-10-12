import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Paraphrasing Tool — Rewrite Text Instantly | ToolCraftKit',
  description: 'Premium paraphrasing tool. Rewrite sentences and paragraphs with synonym replacement and sentence restructuring. Multiple writing modes.',
  openGraph: {
    title: 'Paraphrasing Tool — Rewrite Text Instantly | ToolCraftKit',
    description: 'Premium paraphrasing tool with synonym replacement and multiple writing modes.',
    url: 'https://toolcraftkit.com/tools/paraphrasing-tool',
    siteName: 'ToolCraftKit', type: 'website',
  },
  twitter: { card: 'summary', title: 'Paraphrasing Tool — Rewrite Text Instantly | ToolCraftKit', description: 'Premium text rewriting with multiple modes.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/paraphrasing-tool' },
};
export default function Page() { return <ClientPage />; }

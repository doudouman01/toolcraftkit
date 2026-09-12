import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Book Description Formatter — Amazon-Ready HTML From Plain Text | ToolCraftKit',
  description: 'Free book description formatter for Amazon KDP. Write your blurb in plain text, get Amazon-ready HTML. Templates included.',
  openGraph: {
    title: 'Book Description Formatter — Amazon-Ready HTML From Plain Text | ToolCraftKit',
    description: 'Free book description formatter for Amazon KDP. Write your blurb in plain text, get Amazon-ready HTML. Templates included.',
    url: 'https://toolcraftkit.com/tools/book-description-formatter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Book Description Formatter — Amazon-Ready HTML From Plain Text | ToolCraftKit',
    description: 'Free book description formatter for Amazon KDP. Write your blurb in plain text, get Amazon-ready HTML. Templates included.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/book-description-formatter',
  },
};

export default function Page() {
  return <ClientPage />;
}

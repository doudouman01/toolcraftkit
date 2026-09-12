import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Author Productivity Planner — Plan Your Manuscript Timeline | ToolCraftKit',
  description: 'Plan your manuscript timeline, track writing progress, and build a publication calendar. For self-published authors.',
  openGraph: {
    title: 'Author Productivity Planner — Plan Your Manuscript Timeline | ToolCraftKit',
    description: 'Plan your manuscript timeline, track writing progress, and build a publication calendar. For self-published authors.',
    url: 'https://toolcraftkit.com/tools/author-productivity-planner',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Author Productivity Planner — Plan Your Manuscript Timeline | ToolCraftKit',
    description: 'Plan your manuscript timeline, track writing progress, and build a publication calendar. For self-published authors.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/author-productivity-planner',
  },
};

export default function Page() {
  return <ClientPage />;
}

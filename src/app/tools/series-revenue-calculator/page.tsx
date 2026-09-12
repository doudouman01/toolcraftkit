import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Series Revenue Calculator — Project Total Series Revenue | ToolCraftKit',
  description: 'Project total book series revenue based on read-through rates and KU page reads. Plan your series strategy with data.',
  openGraph: {
    title: 'Series Revenue Calculator — Project Total Series Revenue | ToolCraftKit',
    description: 'Project total book series revenue based on read-through rates and KU page reads. Plan your series strategy with data.',
    url: 'https://toolcraftkit.com/tools/series-revenue-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Series Revenue Calculator — Project Total Series Revenue | ToolCraftKit',
    description: 'Project total book series revenue based on read-through rates and KU page reads. Plan your series strategy with data.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/series-revenue-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

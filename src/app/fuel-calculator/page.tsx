import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Fuel Cost Calculator — Calculate Annual Fuel Costs and Savings | ToolCraftKit',
  description: 'Calculate annual fuel costs, efficiency gap, and savings potential. Compare vehicles and find out how much you can save.',
  openGraph: {
    title: 'Fuel Cost Calculator — Calculate Annual Fuel Costs and Savings | ToolCraftKit',
    description: 'Calculate annual fuel costs, efficiency gap, and savings potential. Compare vehicles and find out how much you can save.',
    url: 'https://toolcraftkit.com/fuel-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Fuel Cost Calculator — Calculate Annual Fuel Costs and Savings | ToolCraftKit',
    description: 'Calculate annual fuel costs, efficiency gap, and savings potential. Compare vehicles and find out how much you can save.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/fuel-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

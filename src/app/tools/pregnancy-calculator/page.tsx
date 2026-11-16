import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Pregnancy Calculator — Due Date, Week & Trimester | ToolCraftKit',
  description: 'Calculate your due date from your last menstrual period. See current pregnancy week, trimester, milestone timeline, and countdown to due date.',
  openGraph: {
    title: 'Pregnancy Calculator — Due Date, Week & Trimester | ToolCraftKit',
    description: 'Calculate your due date from your last menstrual period. See current pregnancy week, trimester, milestone timeline, and countdown to due date.',
    url: 'https://toolcraftkit.com/tools/pregnancy-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pregnancy Calculator — Due Date, Week & Trimester | ToolCraftKit',
    description: 'Calculate your due date from your last menstrual period. See current pregnancy week, trimester, milestone timeline, and countdown to due date.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/pregnancy-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

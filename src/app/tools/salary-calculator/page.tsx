import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Salary Calculator — Convert annual salary to hourly rate and back | ToolCraftKit',
  description: 'Convert annual salary to hourly rate and back. Monthly, weekly, and daily breakdown.',
  openGraph: {
    title: 'Salary Calculator — Convert annual salary to hourly rate and back | ToolCraftKit',
    description: 'Convert annual salary to hourly rate and back. Monthly, weekly, and daily breakdown.',
    url: 'https://toolcraftkit.com/tools/salary-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Salary Calculator — Convert annual salary to hourly rate and back | ToolCraftKit',
    description: 'Convert annual salary to hourly rate and back. Monthly, weekly, and daily breakdown.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/salary-calculator',
  },
};

export default function Page() {
  return <ClientPage />;
}

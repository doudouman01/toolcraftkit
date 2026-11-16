import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Paycheck Calculator — Estimate Take-Home Pay | ToolCraftKit',
  description: 'Free paycheck calculator. Enter salary or hourly rate, see federal tax, state tax, Social Security, Medicare deductions, and net take-home pay.',
  openGraph: {
    title: 'Paycheck Calculator — Estimate Take-Home Pay | ToolCraftKit',
    description: 'Free paycheck calculator. See gross pay, deductions, and net take-home pay breakdown.',
    url: 'https://toolcraftkit.com/tools/paycheck-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Paycheck Calculator | ToolCraftKit', description: 'Estimate your take-home pay after taxes and deductions.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/paycheck-calculator' },
};

export default function Page() {
  return <ClientPage />;
}

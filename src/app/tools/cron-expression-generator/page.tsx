import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Cron Expression Generator — Build Cron Jobs Visually | ToolCraftKit',
  description: 'Build cron expressions with a visual interface. See human-readable descriptions and next run times. Free, no signup required.',
  openGraph: {
    title: 'Cron Expression Generator — Build Cron Jobs Visually | ToolCraftKit',
    description: 'Build cron expressions with a visual interface. See human-readable descriptions and next run times. Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/cron-expression-generator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Cron Expression Generator — Build Cron Jobs Visually | ToolCraftKit',
    description: 'Build cron expressions with a visual interface. See human-readable descriptions and next run times. Free, no signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/cron-expression-generator',
  },
};

export default function Page() {
  return <ClientPage />;
}

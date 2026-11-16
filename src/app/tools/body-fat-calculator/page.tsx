import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Body Fat Calculator — US Navy Method | ToolCraftKit',
  description: 'Free body fat calculator using the US Navy method. Enter height, neck, waist measurements. Visual gauge, lean mass breakdown. Metric and imperial.',
  openGraph: {
    title: 'Body Fat Calculator — US Navy Method | ToolCraftKit',
    description: 'Calculate body fat percentage using the US Navy method. Visual gauge and lean mass breakdown.',
    url: 'https://toolcraftkit.com/tools/body-fat-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: { card: 'summary', title: 'Body Fat Calculator | ToolCraftKit', description: 'Calculate body fat percentage with the US Navy method.' },
  alternates: { canonical: 'https://toolcraftkit.com/tools/body-fat-calculator' },
};

export default function Page() {
  return <ClientPage />;
}

import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Stopwatch — Online Stopwatch with Lap Timer | ToolCraftKit',
  description: 'Free online stopwatch with lap times. Start, stop, reset, and record laps. Millisecond precision. Clean minimal design.',
  openGraph: {
    title: 'Stopwatch — Online Stopwatch with Lap Timer | ToolCraftKit',
    description: 'Free online stopwatch with lap times. Start, stop, reset, and record laps. Millisecond precision. Clean minimal design.',
    url: 'https://toolcraftkit.com/tools/stopwatch',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Stopwatch — Online Stopwatch with Lap Timer | ToolCraftKit',
    description: 'Free online stopwatch with lap times. Start, stop, reset, and record laps. Millisecond precision. Clean minimal design.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/stopwatch',
  },
};

export default function Page() {
  return <ClientPage />;
}

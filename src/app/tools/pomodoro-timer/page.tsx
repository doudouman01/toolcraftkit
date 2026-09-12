import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Pomodoro Timer — Free online Pomodoro timer | ToolCraftKit',
  description: 'Free online Pomodoro timer. Stay focused with timed work sessions and breaks. No signup required.',
  openGraph: {
    title: 'Pomodoro Timer — Free online Pomodoro timer | ToolCraftKit',
    description: 'Free online Pomodoro timer. Stay focused with timed work sessions and breaks. No signup required.',
    url: 'https://toolcraftkit.com/tools/pomodoro-timer',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pomodoro Timer — Free online Pomodoro timer | ToolCraftKit',
    description: 'Free online Pomodoro timer. Stay focused with timed work sessions and breaks. No signup required.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/pomodoro-timer',
  },
};

export default function Page() {
  return <ClientPage />;
}

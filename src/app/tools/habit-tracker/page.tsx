import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Habit Tracker — Track Daily Habits & Streaks Free | ToolCraftKit',
  description: 'Track your daily habits with a 7-day grid. Add habits, check off days, and build streaks. Stored locally in your browser.',
  openGraph: {
    title: 'Habit Tracker — Track Daily Habits & Streaks Free | ToolCraftKit',
    description: 'Track your daily habits with a 7-day grid. Add habits, check off days, and build streaks. Stored locally in your browser.',
    url: 'https://toolcraftkit.com/tools/habit-tracker',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Habit Tracker — Track Daily Habits & Streaks Free | ToolCraftKit',
    description: 'Track your daily habits with a 7-day grid. Add habits, check off days, and build streaks. Stored locally in your browser.',
  },
  alternates: {
    canonical: 'https://toolcraftkit.com/tools/habit-tracker',
  },
};

export default function Page() {
  return <ClientPage />;
}

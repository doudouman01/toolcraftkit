import { Metadata } from 'next';
import ClientPage from './ClientPage';

export const metadata: Metadata = {
  title: 'Flashcard Creator — Free Online Flashcard Maker | ToolCraftKit',
  description: 'Create, study, and export flashcards online. Add terms and definitions, flip to study, shuffle, import from text. Free, no signup required.',
  openGraph: {
    title: 'Flashcard Creator — Free Online Flashcard Maker | ToolCraftKit',
    description: 'Create, study, and export flashcards online. Free, no signup required.',
    url: 'https://toolcraftkit.com/tools/flashcard-creator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Flashcard Creator — Free Online Flashcard Maker | ToolCraftKit',
    description: 'Create, study, and export flashcards online. Free, no signup required.',
  },
  alternates: { canonical: 'https://toolcraftkit.com/tools/flashcard-creator' },
};

export default function Page() { return <ClientPage />; }

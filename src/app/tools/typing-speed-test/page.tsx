import type { Metadata } from "next";
import TypingTest from "./TypingTest";

export const metadata: Metadata = {
  title: "Typing Speed Test — Test Your WPM Free | ToolCraftKit",
  description: "Free online typing speed test. Measure your words per minute (WPM) and accuracy with real-time feedback. 30s, 60s, and 120s modes. No signup required.",
  openGraph: {
    title: "Typing Speed Test — Test Your WPM Free | ToolCraftKit",
    description: "Free online typing speed test. Measure your words per minute (WPM) and accuracy with real-time feedback. 30s, 60s, and 120s modes. No signup required.",
    url: "https://toolcraftkit.com/tools/typing-speed-test",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Typing Speed Test — Test Your WPM Free | ToolCraftKit",
    description: "Free online typing speed test. Measure your words per minute (WPM) and accuracy with real-time feedback. 30s, 60s, and 120s modes. No signup required.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/typing-speed-test",
  },
};

export default function Page() {
  return <TypingTest />;
}

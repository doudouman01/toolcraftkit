import type { Metadata } from "next";
import CountdownTimer from "./CountdownTimer";

export const metadata: Metadata = {
  title: "Countdown Timer — Free Online Countdown Timer | ToolCraftKit",
  description: "Free online countdown timer with audio alerts, quick presets, and a visual progress ring. Set custom hours, minutes, and seconds. No signup required.",
  openGraph: {
    title: "Countdown Timer — Free Online Countdown Timer | ToolCraftKit",
    description: "Free online countdown timer with audio alerts, quick presets, and a visual progress ring. Set custom hours, minutes, and seconds. No signup required.",
    url: "https://toolcraftkit.com/tools/countdown-timer",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Countdown Timer — Free Online Countdown Timer | ToolCraftKit",
    description: "Free online countdown timer with audio alerts, presets, and progress ring.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/countdown-timer",
  },
};

export default function Page() {
  return <CountdownTimer />;
}

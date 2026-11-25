import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Medication Reminder Planner — Organize Your Medication Schedule Free | ToolCraftKit",
  description: "Create a visual weekly medication schedule. Add medications, dosages, times, and print your plan. Free, no signup, data stays on your device.",
  openGraph: {
    title: "Medication Reminder Planner — Organize Your Medication Schedule Free | ToolCraftKit",
    description: "Create a visual weekly medication schedule. Add medications, dosages, times, and print your plan.",
    url: "https://toolcraftkit.com/tools/medication-reminder",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Medication Reminder Planner — Organize Your Medication Schedule Free | ToolCraftKit",
    description: "Create a visual weekly medication schedule. Free, private, printable.",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/medication-reminder" },
};

export default function Page() {
  return <ClientPage />;
}

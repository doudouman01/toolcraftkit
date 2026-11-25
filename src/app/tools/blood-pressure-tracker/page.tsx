import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Blood Pressure Tracker — Log & Analyze BP Readings Free | ToolCraftKit",
  description: "Track blood pressure readings with AHA category classification. View trends, averages, and export history as CSV. Free, private, stored on your device.",
  openGraph: {
    title: "Blood Pressure Tracker — Log & Analyze BP Readings Free | ToolCraftKit",
    description: "Track blood pressure readings with AHA category classification. View trends and export CSV.",
    url: "https://toolcraftkit.com/tools/blood-pressure-tracker",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Blood Pressure Tracker — Log & Analyze BP Readings Free | ToolCraftKit",
    description: "Track blood pressure with AHA categories, trend charts, and CSV export.",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/blood-pressure-tracker" },
};

export default function Page() {
  return <ClientPage />;
}

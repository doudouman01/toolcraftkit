import type { Metadata } from "next";
import DateCalc from "./DateCalc";

export const metadata: Metadata = {
  title: "Date Calculator — Days Between Dates, Add/Subtract Days Free | ToolCraftKit",
  description: "Free date calculator. Find the number of days, weeks, months between two dates. Add or subtract days from any date. Business days calculator included.",
  openGraph: {
    title: "Date Calculator — Days Between Dates, Add/Subtract Days Free | ToolCraftKit",
    description: "Free date calculator. Find the number of days, weeks, months between two dates. Add or subtract days from any date. Business days calculator included.",
    url: "https://toolcraftkit.com/tools/date-calculator",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Date Calculator — Days Between Dates, Add/Subtract Days Free | ToolCraftKit",
    description: "Free date calculator with days between dates, add/subtract days, and business days.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/date-calculator",
  },
};

export default function Page() {
  return <DateCalc />;
}

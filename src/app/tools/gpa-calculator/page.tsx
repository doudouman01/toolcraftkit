import type { Metadata } from "next";
import GpaCalc from "./GpaCalc";

export const metadata: Metadata = {
  title: "GPA Calculator — Calculate Your Grade Point Average Free | ToolCraftKit",
  description: "Free GPA calculator. Enter your courses, grades, and credits to calculate your semester GPA on a 4.0 scale. Instant results with honor roll classification.",
  openGraph: {
    title: "GPA Calculator — Calculate Your Grade Point Average Free | ToolCraftKit",
    description: "Free GPA calculator. Enter courses, grades, and credits to calculate your semester GPA on a 4.0 scale.",
    url: "https://toolcraftkit.com/tools/gpa-calculator",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GPA Calculator — Calculate Your Grade Point Average Free | ToolCraftKit",
    description: "Free GPA calculator with honor roll classification and grade scale reference.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/gpa-calculator",
  },
};

export default function Page() {
  return <GpaCalc />;
}

import type { Metadata } from "next";
import ReadabilityChecker from "./ReadabilityChecker";

export const metadata: Metadata = {
  title: "Readability Score Checker — Flesch-Kincaid & More Free | ToolCraftKit",
  description:
    "Free readability score checker. Analyze Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and ARI scores instantly. No signup required.",
  openGraph: {
    title: "Readability Score Checker — Flesch-Kincaid & More Free | ToolCraftKit",
    description:
      "Free readability score checker. Analyze Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and ARI scores instantly. No signup required.",
    url: "https://toolcraftkit.com/tools/readability-score",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Readability Score Checker — Flesch-Kincaid & More Free | ToolCraftKit",
    description:
      "Free readability score checker. Analyze Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, Coleman-Liau, and ARI scores instantly.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/readability-score",
  },
};

export default function Page() {
  return (
    <>
      <ReadabilityChecker />
    </>
  );
}

import type { Metadata } from "next";
import AspectRatioCalc from "./AspectRatioCalc";

export const metadata: Metadata = {
  title: "Aspect Ratio Calculator — Calculate & Convert Ratios Free | ToolCraftKit",
  description: "Free aspect ratio calculator. Enter width and height to find the ratio, lock a ratio and calculate missing dimensions, preview common resolutions, and use presets for 16:9, 4:3, 1:1, and more.",
  openGraph: {
    title: "Aspect Ratio Calculator — Calculate & Convert Ratios Free | ToolCraftKit",
    description: "Free aspect ratio calculator. Find ratios from dimensions, lock ratios, preview resolutions, and use presets for 16:9, 4:3, 1:1, and more.",
    url: "https://toolcraftkit.com/tools/aspect-ratio-calculator",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aspect Ratio Calculator — Calculate & Convert Ratios Free | ToolCraftKit",
    description: "Free aspect ratio calculator with visual preview, common presets, and resolution suggestions.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/aspect-ratio-calculator",
  },
};

export default function Page() {
  return <AspectRatioCalc />;
}

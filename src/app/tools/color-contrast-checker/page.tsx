import type { Metadata } from "next";
import ContrastChecker from "./ContrastChecker";

export const metadata: Metadata = {
  title: "Color Contrast Checker — WCAG Accessibility Test Free | ToolCraftKit",
  description: "Check color contrast ratios for WCAG AA and AAA compliance. Test foreground and background colors for accessibility with live preview. Free online tool.",
  openGraph: {
    title: "Color Contrast Checker — WCAG Accessibility Test Free | ToolCraftKit",
    description: "Check color contrast ratios for WCAG AA and AAA compliance. Test foreground and background colors for accessibility with live preview. Free online tool.",
    url: "https://toolcraftkit.com/tools/color-contrast-checker",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Color Contrast Checker — WCAG Accessibility Test Free | ToolCraftKit",
    description: "Check color contrast ratios for WCAG AA and AAA compliance. Test foreground and background colors for accessibility with live preview. Free online tool.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/color-contrast-checker",
  },
};

export default function Page() {
  return <ContrastChecker />;
}

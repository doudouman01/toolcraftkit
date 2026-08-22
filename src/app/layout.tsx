import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ToolCraftKit — Free Online Tools for Creators & Entrepreneurs",
    template: "%s | ToolCraftKit",
  },
  description:
    "Free online tools for creators and entrepreneurs. Word counter, character counter, text converter, calculators, color tools, JSON formatter, and more. No signup required.",
  keywords: [
    "free online tools", "word counter", "character counter",
    "text case converter", "percentage calculator",
    "profit margin calculator", "hex to rgb", "json formatter",
  ],
  metadataBase: new URL("https://toolcraftkit.com"),
  openGraph: {
    title: "ToolCraftKit — Free Online Tools for Creators & Entrepreneurs",
    description: "Free online tools. No signup required. Just tools that work.",
    url: "https://toolcraftkit.com",
    siteName: "ToolCraftKit",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7225007611886114"
          crossOrigin="anonymous"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>{children}</body>
    </html>
  );
}

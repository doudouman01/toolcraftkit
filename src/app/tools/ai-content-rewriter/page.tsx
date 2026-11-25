import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "AI Content Rewriter — Rewrite Text in Multiple Styles | ToolCraftKit Pro",
  description: "Rewrite text in 5 modes: Simplify, Formal, Casual, Shorten, Expand. Side-by-side comparison with original. Premium tool for ToolCraftKit Pro subscribers.",
  openGraph: {
    title: "AI Content Rewriter — Rewrite Text in Multiple Styles | ToolCraftKit Pro",
    description: "Rewrite text in 5 modes: Simplify, Formal, Casual, Shorten, Expand. Premium tool.",
    url: "https://toolcraftkit.com/tools/ai-content-rewriter",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "AI Content Rewriter — Rewrite Text in Multiple Styles | ToolCraftKit Pro",
    description: "Rewrite text in 5 styles. Side-by-side comparison. ToolCraftKit Pro.",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/ai-content-rewriter" },
};

export default function Page() {
  return <ClientPage />;
}

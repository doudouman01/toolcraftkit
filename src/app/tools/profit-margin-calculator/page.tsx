import type { Metadata } from "next";
import ProfitMargin from "./ProfitMargin.jsx";

export const metadata: Metadata = {
  title: "Profit Margin Calculator — Margin, Markup & Revenue",
  description: "Free profit margin calculator. Calculate margin, markup, and selling price from costs. Three modes, visual breakdown. For entrepreneurs and small businesses.",
  openGraph: {
    title: 'Profit Margin Calculator — Margin, Markup & Revenue',
    description: 'Free profit margin calculator. Calculate margin, markup, and selling price from costs. Three modes, visual breakdown. For entrepreneurs and small businesses.',
    url: 'https://toolcraftkit.com/tools/profit-margin-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <ProfitMargin />
    </>
  );
}

import type { Metadata } from "next";
import PercentageCalc from "./PercentageCalc.jsx";

export const metadata: Metadata = {
  title: "Percentage Calculator — Find Percentages, Discounts, Tips",
  description: "Free percentage calculator. What is X% of Y? Percentage change, increase, decrease, tip calculator. Six calculators in one page.",
  openGraph: {
    title: 'Percentage Calculator — Find Percentages, Discounts, Tips',
    description: 'Free percentage calculator. What is X% of Y? Percentage change, increase, decrease, tip calculator. Six calculators in one page.',
    url: 'https://toolcraftkit.com/tools/percentage-calculator',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <PercentageCalc />
    </>
  );
}

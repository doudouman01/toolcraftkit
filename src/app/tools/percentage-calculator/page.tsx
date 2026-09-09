import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import PercentageCalc from "./PercentageCalc.jsx";

export const metadata: Metadata = {
  title: "Percentage Calculator — Find Percentages, Discounts, Tips",
  description: "Free percentage calculator. What is X% of Y? Percentage change, increase, decrease, tip calculator. Six calculators in one page.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb toolSlug="percentage-calculator" toolName="Percentage Calculator" />
      <PercentageCalc />
    </>
  );
}

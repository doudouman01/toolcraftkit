"use client";

import PremiumGate from "@/components/PremiumGate";
import SeriesRevenueCalculatorTool from "./SeriesRevenueCalculator";

export default function SeriesRevenueCalculatorPage() {
  return (
    <PremiumGate
      toolName="Series Revenue Calculator"
      toolDescription="Project your total series revenue based on read-through rates, KU page reads, and sales per book."
      features={[
        "Calculate revenue per reader across your entire series",
        "Model read-through rates from Book 1 through Book 20",
        "Include Kindle Unlimited page read revenue",
        "Visual revenue-per-book chart with detailed breakdown",
        "ROI analysis for adding new books to your series",
        "Monthly and annual revenue projections",
      ]}
    >
      <SeriesRevenueCalculatorTool />
    </PremiumGate>
  );
}

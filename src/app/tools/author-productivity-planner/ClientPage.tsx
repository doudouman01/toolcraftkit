"use client";

import PremiumGate from "@/components/PremiumGate";
import AuthorProductivityPlannerTool from "./AuthorProductivityPlanner";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  return (
    <PremiumGate
      toolName="Author Productivity Planner"
      toolDescription="Plan your manuscript timeline, track your progress, and build a realistic publication calendar."
      features={[
        "Calculate your manuscript completion date based on your writing pace",
        "Visual project timeline: writing → editing → publishing",
        "12-month publication calendar with exact dates",
        "Progress tracker with milestone indicators (25%, 50%, 75%, 100%)",
        "Books-per-year projection based on your current pace",
        "Productivity insights and optimization suggestions",
      ]}
    >
      <AuthorProductivityPlannerTool />
    </PremiumGate>
  );
}

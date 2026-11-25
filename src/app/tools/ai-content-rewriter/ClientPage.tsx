"use client";

import PremiumGate from "@/components/PremiumGate";
import AIContentRewriter from "./AIContentRewriter";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  return (
    <PremiumGate
      toolName="AI Content Rewriter"
      toolDescription="Rewrite any text in 5 different styles with side-by-side comparison."
      features={[
        "Rewrite text in 5 modes: Simplify, Formal, Casual, Shorten, Expand",
        "Side-by-side comparison of original and rewritten text",
        "Word count tracking and change percentage",
        "One-click copy of rewritten content",
        "No word limits — rewrite any length of text",
        "Combine with AI Content Detector for complete content workflow",
      ]}
    >
      <AIContentRewriter />
    </PremiumGate>
  );
}

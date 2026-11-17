"use client";
import PremiumGate from "@/components/PremiumGate";
import AiDetectorTool from "./AiDetector";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  return (
    <PremiumGate
      toolName="AI Content Detector"
      toolDescription="Analyze any text to detect AI-generated content. Get confidence scores, writing pattern analysis, and detailed reports."
      features={[
        "Paste any text to analyze for AI-generated patterns",
        "Confidence score with percentage breakdown",
        "Sentence-by-sentence analysis with highlighting",
        "Vocabulary diversity and complexity metrics",
        "Perplexity and burstiness analysis",
        "Detailed report with actionable suggestions",
      ]}
    >
      <AiDetectorTool />
    </PremiumGate>
  );
}

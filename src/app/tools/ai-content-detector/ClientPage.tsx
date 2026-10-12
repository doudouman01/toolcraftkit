"use client";
import PremiumGate from "@/components/PremiumGate";
import AiDetectorTool from "./AiDetector";

export default function ClientPage() {
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

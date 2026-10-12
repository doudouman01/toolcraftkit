"use client";
import PremiumGate from "@/components/PremiumGate";
import ParaphrasingTool from "./Paraphraser";

export default function ClientPage() {
  return (
    <PremiumGate
      toolName="Paraphrasing Tool"
      toolDescription="Rewrite any text with intelligent synonym replacement and sentence restructuring. Choose from multiple writing modes."
      features={[
        "Paste text and get instant paraphrased versions",
        "Four writing modes: Standard, Formal, Simple, Creative",
        "Word-level synonym replacement with highlighting",
        "Sentence restructuring for variety",
        "Side-by-side original vs paraphrased comparison",
        "Copy result with one click",
      ]}
    >
      <ParaphrasingTool />
    </PremiumGate>
  );
}

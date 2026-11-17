"use client";
import PremiumGate from "@/components/PremiumGate";
import AtsChecker from "./AtsChecker";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  return (
    <PremiumGate
      toolName="ATS Resume Score Checker"
      toolDescription="Paste your resume and a job description to get an ATS compatibility score with keyword analysis and optimization suggestions."
      features={[
        "Paste resume and job description for instant analysis",
        "ATS compatibility score out of 100",
        "Keyword match analysis with found and missing keywords",
        "Section detection: Contact, Experience, Education, Skills",
        "Formatting and structure recommendations",
        "Actionable tips to improve your ATS score",
      ]}
    >
      <AtsChecker />
    </PremiumGate>
  );
}

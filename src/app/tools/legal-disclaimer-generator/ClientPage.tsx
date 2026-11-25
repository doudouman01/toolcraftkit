"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

type DisclaimerType = "general" | "medical" | "financial" | "fitness" | "affiliate" | "legal-advice";

interface FormData {
  businessName: string;
  websiteUrl: string;
  disclaimerType: DisclaimerType;
  includeViews: boolean;
  includeExternal: boolean;
  includeErrors: boolean;
  includeAI: boolean;
}

const DISCLAIMER_TITLES: Record<DisclaimerType, string> = {
  general: "General Disclaimer",
  medical: "Medical Disclaimer",
  financial: "Financial Disclaimer",
  fitness: "Fitness & Health Disclaimer",
  affiliate: "Affiliate Disclosure",
  "legal-advice": "Legal Advice Disclaimer",
};

function generateDisclaimer(form: FormData): string {
  const entity = form.businessName || "[Your Business Name]";
  const site = form.websiteUrl || "[Your Website]";
  const lines: string[] = [];

  lines.push(`DISCLAIMER`);
  lines.push(`Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`);
  lines.push(``);

  if (form.disclaimerType === "general") {
    lines.push(`GENERAL DISCLAIMER`);
    lines.push(``);
    lines.push(`The information provided by ${entity} ("we", "us", or "our") on ${site} (the "Site") is for general informational purposes only. All information on the Site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.`);
    lines.push(``);
    lines.push(`Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the Site or reliance on any information provided on the Site. Your use of the Site and your reliance on any information on the Site is solely at your own risk.`);
  } else if (form.disclaimerType === "medical") {
    lines.push(`MEDICAL DISCLAIMER`);
    lines.push(``);
    lines.push(`The information provided on ${site} by ${entity} is for general informational and educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.`);
    lines.push(``);
    lines.push(`Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this Site.`);
    lines.push(``);
    lines.push(`If you think you may have a medical emergency, call your doctor or emergency services immediately. ${entity} does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Site.`);
    lines.push(``);
    lines.push(`Reliance on any information provided by ${entity}, its employees, contracted writers, or medical professionals presenting content for publication to ${entity} is solely at your own risk.`);
  } else if (form.disclaimerType === "financial") {
    lines.push(`FINANCIAL DISCLAIMER`);
    lines.push(``);
    lines.push(`The information provided on ${site} by ${entity} is for general informational and educational purposes only and does not constitute financial, investment, tax, or legal advice.`);
    lines.push(``);
    lines.push(`You should not make any financial decision based solely on the information provided on this Site. We strongly recommend consulting with a qualified financial advisor, accountant, or attorney before making any investment, financial, or legal decision.`);
    lines.push(``);
    lines.push(`${entity} is not a registered investment advisor, broker-dealer, or financial planner. Any opinions, analyses, or recommendations expressed on this Site are those of the author(s) and do not necessarily reflect the views of ${entity}.`);
    lines.push(``);
    lines.push(`Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal.`);
  } else if (form.disclaimerType === "fitness") {
    lines.push(`FITNESS & HEALTH DISCLAIMER`);
    lines.push(``);
    lines.push(`The fitness, nutrition, and health information provided on ${site} by ${entity} is for educational and informational purposes only and is not intended as medical advice.`);
    lines.push(``);
    lines.push(`You should consult your physician or other qualified health care professional before starting any fitness program, diet, or health regimen to determine if it is right for your needs. Do not start a fitness program if your physician or health care provider advises against it.`);
    lines.push(``);
    lines.push(`If you experience faintness, dizziness, pain, or shortness of breath at any time while exercising, you should stop immediately and seek medical attention.`);
    lines.push(``);
    lines.push(`${entity} is not responsible or liable for any injury, harm, or adverse outcome that may result from following the fitness or nutritional information presented on this Site.`);
  } else if (form.disclaimerType === "affiliate") {
    lines.push(`AFFILIATE DISCLOSURE`);
    lines.push(``);
    lines.push(`${site} operated by ${entity} may contain affiliate links. This means that if you click on certain links on our Site and make a purchase, we may receive a commission at no additional cost to you.`);
    lines.push(``);
    lines.push(`We only recommend products and services that we believe will add value to our readers. The compensation received may influence the advertising content, topics, or posts made on this Site. However, that content, advertising space, or post will be clearly identified as paid or sponsored content.`);
    lines.push(``);
    lines.push(`We are a participant in various affiliate programs, including the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to amazon.com.`);
    lines.push(``);
    lines.push(`Any product claims, statistics, quotes, or other representations about products or services should be verified with the manufacturer, provider, or party in question.`);
  } else if (form.disclaimerType === "legal-advice") {
    lines.push(`LEGAL ADVICE DISCLAIMER`);
    lines.push(``);
    lines.push(`The information provided on ${site} by ${entity} is for general informational purposes only and does not constitute legal advice.`);
    lines.push(``);
    lines.push(`No attorney-client relationship is formed by your use of this Site or by any communication through this Site. You should not act or refrain from acting based on any content on this Site without seeking legal advice from a licensed attorney in your jurisdiction.`);
    lines.push(``);
    lines.push(`The law varies by jurisdiction and is constantly changing. The information on this Site may not reflect the most current legal developments and may not apply to your specific situation.`);
    lines.push(``);
    lines.push(`${entity} expressly disclaims all liability with respect to actions taken or not taken based on the content of this Site.`);
  }

  lines.push(``);

  if (form.includeViews) {
    lines.push(`PERSONAL VIEWS DISCLAIMER`);
    lines.push(``);
    lines.push(`The views and opinions expressed on this Site are those of the authors and do not necessarily reflect the official policy or position of ${entity}. Any content provided by our contributors, bloggers, or authors is of their opinion and is not intended to malign any religion, ethnic group, club, organization, company, individual, or anyone or anything.`);
    lines.push(``);
  }

  if (form.includeExternal) {
    lines.push(`EXTERNAL LINKS DISCLAIMER`);
    lines.push(``);
    lines.push(`${site} may contain links to external websites that are not provided or maintained by or in any way affiliated with ${entity}. Please note that ${entity} does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. Links to third-party sites do not constitute an endorsement by ${entity}.`);
    lines.push(``);
  }

  if (form.includeErrors) {
    lines.push(`ERRORS AND OMISSIONS DISCLAIMER`);
    lines.push(``);
    lines.push(`While we have made every attempt to ensure that the information contained on this Site is correct, ${entity} is not responsible for any errors or omissions, or for the results obtained from the use of this information. All information on this Site is provided "as is", with no guarantee of completeness, accuracy, timeliness, or of the results obtained from the use of this information.`);
    lines.push(``);
  }

  if (form.includeAI) {
    lines.push(`AI-GENERATED CONTENT DISCLAIMER`);
    lines.push(``);
    lines.push(`Some content on this Site may be created, assisted, or enhanced using artificial intelligence (AI) tools. While we review AI-generated content for accuracy, we cannot guarantee that all AI-assisted information is free from errors, omissions, or inaccuracies. AI-generated content should not be considered a substitute for professional advice in any field.`);
    lines.push(``);
  }

  lines.push(`CONTACT US`);
  lines.push(``);
  lines.push(`If you have any questions about this disclaimer, please contact us at:`);
  lines.push(entity);
  if (form.websiteUrl) lines.push(`Website: ${form.websiteUrl}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`Generated using ToolCraftKit.com`);

  return lines.join("\n");
}

const s = {
  page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff" },
  select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", cursor: "pointer" as const },
  checkRow: { display: "flex" as const, alignItems: "center" as const, gap: 10, marginBottom: 10, cursor: "pointer" as const },
  checkLabel: { fontSize: 14, color: "#1C1917", cursor: "pointer" as const, userSelect: "none" as const },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  outputText: { width: "100%", minHeight: 400, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
};

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>({
    businessName: "", websiteUrl: "", disclaimerType: "general",
    includeViews: false, includeExternal: true, includeErrors: true, includeAI: false,
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (key: keyof FormData, value: string | boolean) => setForm((p) => ({ ...p, [key]: value }));

  const handleGenerate = () => {
    if (!form.businessName.trim()) { alert("Please enter your business name."); return; }
    setOutput(generateDisclaimer(form));
  };

  const handleCopy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { alert("Copy failed."); }
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Legal Disclaimer Generator" slug="legal-disclaimer-generator" description="Generate professional legal disclaimers for your website." category="BusinessApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Legal Disclaimer Generator", url: "https://toolcraftkit.com/tools/legal-disclaimer-generator" }]} />

      <h1 style={s.h1}>{toolUI?.name || "Legal Disclaimer Generator"}</h1>
      <p style={s.sub}>"Generate professional disclaimers for your website or business."</p>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Business Details</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Business / Website Name<span style={s.required}>*</span></label>
            <input style={s.input} value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="My Company LLC" />
          </div>
          <div>
            <label style={s.label}>Website URL</label>
            <input style={s.input} value={form.websiteUrl} onChange={(e) => update("websiteUrl", e.target.value)} placeholder="https://example.com" />
          </div>
        </div>

        <label style={s.label}>Disclaimer Type<span style={s.required}>*</span></label>
        <select style={s.select} value={form.disclaimerType} onChange={(e) => update("disclaimerType", e.target.value)}>
          {Object.entries(DISCLAIMER_TITLES).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>

        <h2 style={{ ...s.cardTitle, marginTop: 20 }}>Additional Sections</h2>
        <div style={s.checkRow} onClick={() => update("includeViews", !form.includeViews)}>
          <input type="checkbox" checked={form.includeViews} readOnly style={{ width: 18, height: 18, accentColor: "#0D9488" }} />
          <span style={s.checkLabel}>Personal Views Disclaimer</span>
        </div>
        <div style={s.checkRow} onClick={() => update("includeExternal", !form.includeExternal)}>
          <input type="checkbox" checked={form.includeExternal} readOnly style={{ width: 18, height: 18, accentColor: "#0D9488" }} />
          <span style={s.checkLabel}>External Links Disclaimer</span>
        </div>
        <div style={s.checkRow} onClick={() => update("includeErrors", !form.includeErrors)}>
          <input type="checkbox" checked={form.includeErrors} readOnly style={{ width: 18, height: 18, accentColor: "#0D9488" }} />
          <span style={s.checkLabel}>Errors and Omissions Disclaimer</span>
        </div>
        <div style={s.checkRow} onClick={() => update("includeAI", !form.includeAI)}>
          <input type="checkbox" checked={form.includeAI} readOnly style={{ width: 18, height: 18, accentColor: "#0D9488" }} />
          <span style={s.checkLabel}>AI-Generated Content Disclaimer</span>
        </div>

        <button style={{ ...s.btn, marginTop: 12 }} onClick={handleGenerate}>Generate Disclaimer</button>
      </div>

      {output && (
        <div style={s.output}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>Your Disclaimer</h2>
            <button style={s.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy to Clipboard"}</button>
          </div>
          <textarea style={s.outputText} value={output} readOnly />
        </div>
      )}

      <SeoContent />
    </div>
  );
}

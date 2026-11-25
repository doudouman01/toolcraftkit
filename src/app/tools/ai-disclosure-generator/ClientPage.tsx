"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useTranslation } from "@/lib/i18n/useTranslation";

type DocType = "court" | "academic" | "business" | "blog";
type UsageType = "drafting" | "research" | "editing" | "translation" | "analysis";
type Format = "sb574" | "euai" | "general";

interface FormData {
  docType: DocType;
  format: Format;
  toolsUsed: { chatgpt: boolean; claude: boolean; gemini: boolean; copilot: boolean; other: string };
  usageTypes: Record<UsageType, boolean>;
  authorName: string;
  date: string;
  documentTitle: string;
}

const DOC_LABELS: Record<DocType, string> = { court: "Court Filing / Legal Brief", academic: "Academic Paper / Thesis", business: "Business Report / Memo", blog: "Blog Post / Article" };
const FORMAT_LABELS: Record<Format, string> = { sb574: "California SB 574 (Legal)", euai: "EU AI Act (Transparency)", general: "General Best Practice" };
const USAGE_LABELS: Record<UsageType, string> = { drafting: "Drafting / Writing", research: "Research / Information Gathering", editing: "Editing / Proofreading", translation: "Translation", analysis: "Data Analysis" };

function getToolList(tools: FormData["toolsUsed"]): string {
  const names: string[] = [];
  if (tools.chatgpt) names.push("ChatGPT (OpenAI)");
  if (tools.claude) names.push("Claude (Anthropic)");
  if (tools.gemini) names.push("Gemini (Google)");
  if (tools.copilot) names.push("Microsoft Copilot");
  if (tools.other.trim()) names.push(tools.other.trim());
  return names.length ? names.join(", ") : "AI tools";
}

function getUsageList(usages: Record<UsageType, boolean>): string {
  const list: string[] = [];
  if (usages.drafting) list.push("drafting and writing assistance");
  if (usages.research) list.push("research and information gathering");
  if (usages.editing) list.push("editing and proofreading");
  if (usages.translation) list.push("translation");
  if (usages.analysis) list.push("data analysis");
  return list.length ? list.join(", ") : "content assistance";
}

function generate(form: FormData): string {
  const tools = getToolList(form.toolsUsed);
  const usage = getUsageList(form.usageTypes);
  const lines: string[] = [];

  if (form.format === "sb574") {
    lines.push(`AI DISCLOSURE STATEMENT`);
    lines.push(`Pursuant to California Senate Bill 574`);
    lines.push(``);
    lines.push(`Document: ${form.documentTitle || "[Document Title]"}`);
    lines.push(`Date: ${form.date}`);
    lines.push(`Author: ${form.authorName || "[Author Name]"}`);
    lines.push(``);
    lines.push(`DISCLOSURE OF ARTIFICIAL INTELLIGENCE ASSISTANCE`);
    lines.push(``);
    lines.push(`In compliance with California Senate Bill 574, effective January 1, 2027, the undersigned hereby discloses the following:`);
    lines.push(``);
    lines.push(`1. AI Tools Used: ${tools}`);
    lines.push(`2. Nature of AI Assistance: The above AI tool(s) were used for ${usage} in the preparation of this document.`);
    lines.push(`3. Verification: All AI-generated content, including citations, case law references, factual claims, and legal analysis, has been independently verified by the undersigned for accuracy and completeness.`);
    lines.push(`4. Professional Responsibility: The undersigned takes full responsibility for all content in this document, including any portions where AI assistance was utilized. The legal analysis, conclusions, and professional judgment reflected herein are solely those of the undersigned.`);
    lines.push(``);
    lines.push(`Signature: ____________________________`);
    lines.push(`Name: ${form.authorName || "[Attorney Name]"}`);
    lines.push(`Date: ${form.date}`);
  } else if (form.format === "euai") {
    lines.push(`AI TRANSPARENCY DISCLOSURE`);
    lines.push(`In Accordance with the EU Artificial Intelligence Act`);
    lines.push(``);
    lines.push(`Document: ${form.documentTitle || "[Document Title]"}`);
    lines.push(`Date: ${form.date}`);
    lines.push(`Author: ${form.authorName || "[Author Name]"}`);
    lines.push(``);
    lines.push(`This document was prepared with the assistance of artificial intelligence systems. In accordance with the transparency requirements of the EU AI Act (Regulation 2024/1689), the following information is disclosed:`);
    lines.push(``);
    lines.push(`AI Systems Used: ${tools}`);
    lines.push(`Purpose of Use: ${usage}`);
    lines.push(``);
    lines.push(`The AI systems were used as assistive tools under human oversight. All outputs were reviewed, verified, and approved by the author. The final content, conclusions, and any decisions or recommendations contained herein are the responsibility of the author.`);
    lines.push(``);
    lines.push(`This disclosure is provided to ensure transparency and inform readers that AI technology contributed to the preparation of this document.`);
  } else {
    lines.push(`AI DISCLOSURE`);
    lines.push(``);
    lines.push(`Document: ${form.documentTitle || "[Document Title]"}`);
    lines.push(`Date: ${form.date}`);
    lines.push(`Author: ${form.authorName || "[Author Name]"}`);
    lines.push(``);
    lines.push(`This ${DOC_LABELS[form.docType].toLowerCase()} was prepared with the assistance of the following AI tool(s): ${tools}.`);
    lines.push(``);
    lines.push(`AI was used for: ${usage}.`);
    lines.push(``);
    lines.push(`All AI-generated content has been reviewed and verified by the author for accuracy. The author takes full responsibility for the final content of this document.`);
  }

  lines.push(``);
  lines.push(`---`);
  lines.push(`Generated using ToolCraftKit.com AI Disclosure Generator`);
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
  outputTextarea: { width: "100%", minHeight: 350, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
};

export default function ClientPage() {
  const { t } = useTranslation();
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<FormData>({
    docType: "court",
    format: "sb574",
    toolsUsed: { chatgpt: false, claude: false, gemini: false, copilot: false, other: "" },
    usageTypes: { drafting: true, research: false, editing: false, translation: false, analysis: false },
    authorName: "",
    date: today,
    documentTitle: "",
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleTool = (key: keyof FormData["toolsUsed"]) => {
    if (key === "other") return;
    setForm(prev => ({ ...prev, toolsUsed: { ...prev.toolsUsed, [key]: !prev.toolsUsed[key] } }));
  };
  const toggleUsage = (key: UsageType) => setForm(prev => ({ ...prev, usageTypes: { ...prev.usageTypes, [key]: !prev.usageTypes[key] } }));

  const handleGenerate = useCallback(() => { setOutput(generate(form)); setCopied(false); }, [form]);
  const handleCopy = useCallback(async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }, [output]);

  return (
    <div style={s.page}>
      <ToolSchema name="AI Disclosure Statement Generator" description="Generate AI disclosure statements compliant with California SB 574, EU AI Act, and general best practices." slug="ai-disclosure-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "AI Disclosure Generator", url: "https://toolcraftkit.com/tools/ai-disclosure-generator" }]} />

      <h1 style={s.h1}>"AI Disclosure Statement Generator"</h1>
      <p style={s.sub}>"Generate compliant AI disclosure statements for legal, academic, and business documents."</p>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Document Details</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Document Type</label>
            <select style={s.select} value={form.docType} onChange={e => setForm(p => ({ ...p, docType: e.target.value as DocType }))}>{Object.entries(DOC_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          </div>
          <div>
            <label style={s.label}>Disclosure Format</label>
            <select style={s.select} value={form.format} onChange={e => setForm(p => ({ ...p, format: e.target.value as Format }))}>{Object.entries(FORMAT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          </div>
        </div>
        <label style={s.label}>Document Title</label>
        <input style={s.input} placeholder="e.g. Motion to Compel Discovery" value={form.documentTitle} onChange={e => setForm(p => ({ ...p, documentTitle: e.target.value }))} />
        <div style={s.grid2}>
          <div><label style={s.label}>Author Name</label><input style={s.input} placeholder="Your name" value={form.authorName} onChange={e => setForm(p => ({ ...p, authorName: e.target.value }))} /></div>
          <div><label style={s.label}>Date</label><input style={s.input} type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
        </div>
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>AI Tools Used</h2>
        {(["chatgpt", "claude", "gemini", "copilot"] as const).map(key => (
          <label key={key} style={s.checkRow} onClick={() => toggleTool(key)}>
            <input type="checkbox" checked={form.toolsUsed[key]} readOnly style={{ accentColor: "#0D9488" }} />
            <span style={s.checkLabel}>{key === "chatgpt" ? "ChatGPT (OpenAI)" : key === "claude" ? "Claude (Anthropic)" : key === "gemini" ? "Gemini (Google)" : "Microsoft Copilot"}</span>
          </label>
        ))}
        <label style={s.label}>Other AI Tool(s)</label>
        <input style={s.input} placeholder="e.g. Jasper, Perplexity, Cursor..." value={form.toolsUsed.other} onChange={e => setForm(p => ({ ...p, toolsUsed: { ...p.toolsUsed, other: e.target.value } }))} />
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>How AI Was Used</h2>
        {(Object.entries(USAGE_LABELS) as [UsageType, string][]).map(([key, label]) => (
          <label key={key} style={s.checkRow} onClick={() => toggleUsage(key)}>
            <input type="checkbox" checked={form.usageTypes[key]} readOnly style={{ accentColor: "#0D9488" }} />
            <span style={s.checkLabel}>{label}</span>
          </label>
        ))}
      </div>

      <button style={s.btn} onClick={handleGenerate}>Generate Disclosure Statement</button>

      {output && (
        <div style={{ ...s.output, marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>Your Disclosure Statement</h2>
            <button style={s.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy to Clipboard"}</button>
          </div>
          <textarea style={s.outputTextarea} value={output} readOnly />
        </div>
      )}

      <SeoContent />
    </div>
  );
}

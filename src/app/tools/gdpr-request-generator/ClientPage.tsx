"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

type RequestType = "access" | "deletion" | "rectification" | "portability" | "objection";

interface FormData {
  requestType: RequestType;
  requesterName: string;
  requesterEmail: string;
  organizationName: string;
  specificData: string;
  reason: string;
  regulation: "gdpr" | "ccpa";
}

const REQUEST_LABELS: Record<RequestType, string> = {
  access: "Right of Access (Article 15 GDPR / §1798.100 CCPA)",
  deletion: "Right to Erasure (Article 17 GDPR / §1798.105 CCPA)",
  rectification: "Right to Rectification (Article 16 GDPR)",
  portability: "Right to Data Portability (Article 20 GDPR / §1798.100 CCPA)",
  objection: "Right to Object (Article 21 GDPR / §1798.120 CCPA)",
};

function generateLetter(form: FormData): string {
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const reg = form.regulation === "gdpr" ? "GDPR" : "CCPA";
  const lines: string[] = [];

  lines.push(`DATA SUBJECT REQUEST`);
  lines.push(`Pursuant to the ${reg === "GDPR" ? "General Data Protection Regulation (EU) 2016/679" : "California Consumer Privacy Act (CCPA)"}`);
  lines.push(``);
  lines.push(`Date: ${today}`);
  lines.push(``);
  lines.push(`To: ${form.organizationName || "[Organization Name]"}`);
  lines.push(`Data Protection Officer / Privacy Team`);
  lines.push(``);
  lines.push(`From: ${form.requesterName || "[Your Name]"}`);
  lines.push(`Email: ${form.requesterEmail || "[Your Email]"}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
  lines.push(`Dear Data Protection Officer,`);
  lines.push(``);
  lines.push(`I am writing to exercise my ${REQUEST_LABELS[form.requestType]} under the ${reg}.`);
  lines.push(``);

  if (form.requestType === "access") {
    lines.push(`I hereby request confirmation as to whether you are processing my personal data, and if so, I request access to the following information:`);
    lines.push(``);
    lines.push(`- The categories of personal data you hold about me`);
    lines.push(`- The purposes of the processing`);
    lines.push(`- The recipients or categories of recipients to whom my data has been disclosed`);
    lines.push(`- The envisaged period for which the data will be stored`);
    lines.push(`- The source of the data if it was not collected directly from me`);
    lines.push(`- Whether any automated decision-making, including profiling, is applied to my data`);
  } else if (form.requestType === "deletion") {
    lines.push(`I hereby request the erasure of all personal data you hold about me. I believe this request is justified because:`);
    lines.push(``);
    lines.push(`- The data is no longer necessary for the purpose for which it was collected`);
    lines.push(`- I withdraw my consent to the processing of my data`);
    lines.push(`- The data has been unlawfully processed`);
  } else if (form.requestType === "rectification") {
    lines.push(`I hereby request the rectification of inaccurate personal data you hold about me. Specifically:`);
  } else if (form.requestType === "portability") {
    lines.push(`I hereby request that you provide me with a copy of my personal data in a structured, commonly used, and machine-readable format (such as CSV or JSON). I also request that you transmit this data directly to another controller if technically feasible.`);
  } else if (form.requestType === "objection") {
    lines.push(`I hereby object to the processing of my personal data for the following reasons:`);
  }

  lines.push(``);
  if (form.specificData) {
    lines.push(`Specific data or details related to this request:`);
    lines.push(form.specificData);
    lines.push(``);
  }
  if (form.reason) {
    lines.push(`Additional context:`);
    lines.push(form.reason);
    lines.push(``);
  }

  lines.push(`---`);
  lines.push(``);
  if (form.regulation === "gdpr") {
    lines.push(`Under Article 12(3) of the GDPR, you are required to respond to this request without undue delay and in any event within one month of receipt. If you are unable to comply, you must inform me of the reasons and of my right to lodge a complaint with a supervisory authority.`);
  } else {
    lines.push(`Under the CCPA (§1798.130), you are required to respond to this request within 45 days of receipt. If you need an extension, you must notify me within the initial 45-day period.`);
  }
  lines.push(``);
  lines.push(`To verify my identity, I can be reached at the email address provided above. I am prepared to provide additional identification if necessary.`);
  lines.push(``);
  lines.push(`Please confirm receipt of this request and your expected timeline for compliance.`);
  lines.push(``);
  lines.push(`Sincerely,`);
  lines.push(`${form.requesterName || "[Your Name]"}`);
  lines.push(`${form.requesterEmail || "[Your Email]"}`);
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
  textarea: { width: "100%", minHeight: 120, border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", resize: "vertical" as const, lineHeight: 1.6 },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  outputText: { width: "100%", minHeight: 400, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
  badge: { display: "inline-block" as const, background: "#F0FDFA", color: "#0D9488", fontSize: 12, fontWeight: 600 as const, padding: "2px 8px", borderRadius: 4, marginLeft: 8 },
};

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>({
    requestType: "access",
    requesterName: "",
    requesterEmail: "",
    organizationName: "",
    specificData: "",
    reason: "",
    regulation: "gdpr",
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (key: keyof FormData, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleGenerate = () => {
    if (!form.requesterName.trim()) { alert("Please enter your name."); return; }
    setOutput(generateLetter(form));
  };

  const handleCopy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { alert("Copy failed — please select and copy manually."); }
  };

  return (
    <div style={s.page}>
      <ToolSchema name="GDPR Data Request Generator" slug="gdpr-request-generator" description="Generate formal GDPR or CCPA data subject request letters." category="BusinessApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "GDPR Request Generator", url: "https://toolcraftkit.com/tools/gdpr-request-generator" }]} />

      <h1 style={s.h1}>{toolUI?.name || "GDPR Data Request Generator"}</h1>
      <p style={s.sub}>"Generate a formal GDPR or CCPA data request letter in seconds."</p>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Request Details</h2>

        <div style={s.grid2}>
          <div>
            <label style={s.label}>Regulation<span style={s.required}>*</span></label>
            <select style={s.select} value={form.regulation} onChange={(e) => update("regulation", e.target.value)}>
              <option value="gdpr">GDPR (EU)</option>
              <option value="ccpa">CCPA (California)</option>
            </select>
          </div>
          <div>
            <label style={s.label}>Request Type<span style={s.required}>*</span></label>
            <select style={s.select} value={form.requestType} onChange={(e) => update("requestType", e.target.value)}>
              <option value="access">Data Access</option>
              <option value="deletion">Data Deletion / Erasure</option>
              <option value="rectification">Data Rectification</option>
              <option value="portability">Data Portability</option>
              <option value="objection">Object to Processing</option>
            </select>
          </div>
        </div>

        <div style={s.grid2}>
          <div>
            <label style={s.label}>Your Full Name<span style={s.required}>*</span></label>
            <input style={s.input} value={form.requesterName} onChange={(e) => update("requesterName", e.target.value)} placeholder="John Doe" />
          </div>
          <div>
            <label style={s.label}>Your Email<span style={s.required}>*</span></label>
            <input style={s.input} type="email" value={form.requesterEmail} onChange={(e) => update("requesterEmail", e.target.value)} placeholder="john@example.com" />
          </div>
        </div>

        <label style={s.label}>Organization / Company Name<span style={s.required}>*</span></label>
        <input style={s.input} value={form.organizationName} onChange={(e) => update("organizationName", e.target.value)} placeholder="Company you're sending the request to" />

        <label style={s.label}>Specific Data or Details (optional)</label>
        <textarea style={s.textarea} value={form.specificData} onChange={(e) => update("specificData", e.target.value)} placeholder="Describe the specific data you want accessed, deleted, corrected, etc." />

        <label style={s.label}>Additional Context (optional)</label>
        <textarea style={{ ...s.textarea, minHeight: 80 }} value={form.reason} onChange={(e) => update("reason", e.target.value)} placeholder="Any additional reasons or context for your request" />

        <button style={s.btn} onClick={handleGenerate}>Generate Request Letter</button>
      </div>

      {output && (
        <div style={s.output}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>Your Request Letter</h2>
            <button style={s.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy to Clipboard"}</button>
          </div>
          <textarea style={s.outputText} value={output} readOnly />
        </div>
      )}

      <SeoContent />
    </div>
  );
}

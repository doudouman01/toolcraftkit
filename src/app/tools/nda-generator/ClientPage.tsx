"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useTranslation } from "@/lib/i18n/useTranslation";

type NdaType = "mutual" | "oneway";

interface FormData {
  ndaType: NdaType;
  disclosingParty: string;
  receivingParty: string;
  purpose: string;
  duration: string;
  jurisdiction: string;
  effectiveDate: string;
}

function generateNda(form: FormData): string {
  const lines: string[] = [];
  const isMutual = form.ndaType === "mutual";
  const dp = form.disclosingParty || "[DISCLOSING PARTY]";
  const rp = form.receivingParty || "[RECEIVING PARTY]";

  lines.push(`NON-DISCLOSURE AGREEMENT`);
  lines.push(isMutual ? `(Mutual)` : `(One-Way)`);
  lines.push(``);
  lines.push(`Effective Date: ${form.effectiveDate}`);
  lines.push(``);
  lines.push(`This Non-Disclosure Agreement ("Agreement") is entered into as of the Effective Date above by and between:`);
  lines.push(``);
  if (isMutual) {
    lines.push(`Party A: ${dp}`);
    lines.push(`Party B: ${rp}`);
    lines.push(``);
    lines.push(`(each a "Party" and collectively the "Parties")`);
  } else {
    lines.push(`Disclosing Party: ${dp}`);
    lines.push(`Receiving Party: ${rp}`);
  }
  lines.push(``);
  lines.push(`RECITALS`);
  lines.push(``);
  if (isMutual) {
    lines.push(`WHEREAS, the Parties wish to explore a potential business relationship concerning: ${form.purpose || "[describe purpose]"} (the "Purpose"); and`);
    lines.push(`WHEREAS, in connection with the Purpose, each Party may disclose Confidential Information to the other Party;`);
  } else {
    lines.push(`WHEREAS, the Disclosing Party possesses certain confidential and proprietary information relating to: ${form.purpose || "[describe purpose]"} (the "Purpose"); and`);
    lines.push(`WHEREAS, the Receiving Party desires to receive certain Confidential Information for the Purpose;`);
  }
  lines.push(``);
  lines.push(`NOW, THEREFORE, in consideration of the mutual promises and covenants contained herein, the Parties agree as follows:`);
  lines.push(``);

  lines.push(`1. DEFINITION OF CONFIDENTIAL INFORMATION`);
  lines.push(``);
  lines.push(`"Confidential Information" means any and all non-public information, in any form or medium, whether written, oral, electronic, or visual, that is disclosed by ${isMutual ? "either Party" : "the Disclosing Party"} to ${isMutual ? "the other Party" : "the Receiving Party"}, including but not limited to:`);
  lines.push(`(a) Trade secrets, inventions, patents, copyrights, and other intellectual property;`);
  lines.push(`(b) Business plans, strategies, financial information, and projections;`);
  lines.push(`(c) Customer lists, vendor relationships, and market data;`);
  lines.push(`(d) Technical data, designs, algorithms, source code, and product specifications;`);
  lines.push(`(e) Any other information marked as "confidential" or that a reasonable person would consider confidential given the nature of the information and the circumstances of disclosure.`);
  lines.push(``);

  lines.push(`2. OBLIGATIONS OF ${isMutual ? "THE PARTIES" : "THE RECEIVING PARTY"}`);
  lines.push(``);
  lines.push(`${isMutual ? "Each Party" : "The Receiving Party"} agrees to:`);
  lines.push(`(a) Hold all Confidential Information in strict confidence;`);
  lines.push(`(b) Not disclose Confidential Information to any third party without prior written consent;`);
  lines.push(`(c) Use Confidential Information solely for the Purpose described above;`);
  lines.push(`(d) Protect Confidential Information using the same degree of care used to protect its own confidential information, but in no event less than reasonable care;`);
  lines.push(`(e) Limit access to Confidential Information to those employees, agents, or advisors who need to know such information for the Purpose and who are bound by confidentiality obligations at least as restrictive as those in this Agreement.`);
  lines.push(``);

  lines.push(`3. EXCLUSIONS`);
  lines.push(``);
  lines.push(`Confidential Information does not include information that:`);
  lines.push(`(a) Is or becomes publicly available through no fault of ${isMutual ? "the receiving Party" : "the Receiving Party"};`);
  lines.push(`(b) Was already known to ${isMutual ? "the receiving Party" : "the Receiving Party"} prior to disclosure, as demonstrated by written records;`);
  lines.push(`(c) Is independently developed by ${isMutual ? "the receiving Party" : "the Receiving Party"} without use of or reference to the Confidential Information;`);
  lines.push(`(d) Is received from a third party without restriction and without breach of any obligation of confidentiality.`);
  lines.push(``);

  lines.push(`4. TERM AND TERMINATION`);
  lines.push(``);
  lines.push(`This Agreement shall remain in effect for a period of ${form.duration || "2"} year(s) from the Effective Date. The obligations of confidentiality shall survive termination of this Agreement for a period of ${form.duration || "2"} year(s) after termination.`);
  lines.push(``);

  lines.push(`5. RETURN OF INFORMATION`);
  lines.push(``);
  lines.push(`Upon written request or termination of this Agreement, ${isMutual ? "each Party" : "the Receiving Party"} shall promptly return or destroy all Confidential Information, including copies, and shall certify in writing that all such information has been returned or destroyed.`);
  lines.push(``);

  lines.push(`6. REMEDIES`);
  lines.push(``);
  lines.push(`${isMutual ? "Each Party acknowledges" : "The Receiving Party acknowledges"} that any breach of this Agreement may cause irreparable harm for which monetary damages would be inadequate. Accordingly, ${isMutual ? "either Party" : "the Disclosing Party"} shall be entitled to seek injunctive relief in addition to any other remedies available at law or in equity.`);
  lines.push(``);

  lines.push(`7. GOVERNING LAW`);
  lines.push(``);
  lines.push(`This Agreement shall be governed by and construed in accordance with the laws of ${form.jurisdiction || "[State/Province/Country]"}, without regard to its conflict of law principles.`);
  lines.push(``);

  lines.push(`8. ENTIRE AGREEMENT`);
  lines.push(``);
  lines.push(`This Agreement constitutes the entire agreement between the Parties with respect to the subject matter hereof and supersedes all prior negotiations, representations, and agreements.`);
  lines.push(``);

  lines.push(`IN WITNESS WHEREOF, the Parties have executed this Agreement as of the Effective Date.`);
  lines.push(``);
  lines.push(`${isMutual ? "Party A" : "Disclosing Party"}: ${dp}`);
  lines.push(`Signature: ____________________________`);
  lines.push(`Date: ____________________________`);
  lines.push(``);
  lines.push(`${isMutual ? "Party B" : "Receiving Party"}: ${rp}`);
  lines.push(`Signature: ____________________________`);
  lines.push(`Date: ____________________________`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`Generated using ToolCraftKit.com NDA Generator`);

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
  textarea: { width: "100%", minHeight: 80, border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, lineHeight: 1.6, color: "#1C1917", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, fontFamily: "inherit" },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  outputTextarea: { width: "100%", minHeight: 500, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
  btnRow: { display: "flex" as const, gap: 8, marginTop: 8 },
};

export default function ClientPage() {
  const { t } = useTranslation();
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<FormData>({
    ndaType: "mutual",
    disclosingParty: "",
    receivingParty: "",
    purpose: "",
    duration: "2",
    jurisdiction: "",
    effectiveDate: today,
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => { setOutput(generateNda(form)); setCopied(false); }, [form]);
  const handleCopy = useCallback(async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }, [output]);
  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "NDA.txt"; a.click();
    URL.revokeObjectURL(url);
  }, [output]);

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => setForm(p => ({ ...p, [key]: value }));

  return (
    <div style={s.page}>
      <ToolSchema name="NDA Generator" description="Generate a professional Non-Disclosure Agreement for free." slug="nda-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "NDA Generator", url: "https://toolcraftkit.com/tools/nda-generator" }]} />

      <h1 style={s.h1}>"NDA Generator"</h1>
      <p style={s.sub}>"Generate a professional Non-Disclosure Agreement in seconds. Free, no signup."</p>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Agreement Details</h2>
        <label style={s.label}>Agreement Type</label>
        <select style={s.select} value={form.ndaType} onChange={e => setField("ndaType", e.target.value as NdaType)}>
          <option value="mutual">Mutual NDA (both parties share confidential information)</option>
          <option value="oneway">One-Way NDA (one party discloses to the other)</option>
        </select>
        <div style={s.grid2}>
          <div><label style={s.label}>{form.ndaType === "mutual" ? "Party A Name" : "Disclosing Party"}<span style={s.required}>*</span></label><input style={s.input} placeholder="Company or individual name" value={form.disclosingParty} onChange={e => setField("disclosingParty", e.target.value)} /></div>
          <div><label style={s.label}>{form.ndaType === "mutual" ? "Party B Name" : "Receiving Party"}<span style={s.required}>*</span></label><input style={s.input} placeholder="Company or individual name" value={form.receivingParty} onChange={e => setField("receivingParty", e.target.value)} /></div>
        </div>
        <label style={s.label}>Purpose of Disclosure<span style={s.required}>*</span></label>
        <textarea style={s.textarea} placeholder="e.g. Exploring a potential partnership in AI-powered analytics software..." value={form.purpose} onChange={e => setField("purpose", e.target.value)} />
        <div style={s.grid2}>
          <div><label style={s.label}>Duration (years)</label><select style={s.select} value={form.duration} onChange={e => setField("duration", e.target.value)}>{["1","2","3","4","5"].map(y=><option key={y} value={y}>{y} year{+y>1?"s":""}</option>)}</select></div>
          <div><label style={s.label}>Effective Date</label><input style={s.input} type="date" value={form.effectiveDate} onChange={e => setField("effectiveDate", e.target.value)} /></div>
        </div>
        <label style={s.label}>Governing Jurisdiction</label>
        <input style={s.input} placeholder="e.g. State of California, USA" value={form.jurisdiction} onChange={e => setField("jurisdiction", e.target.value)} />
        <button style={s.btn} onClick={handleGenerate}>Generate NDA</button>
      </div>

      {output && (
        <div style={s.output}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>Your NDA</h2>
            <div style={s.btnRow}>
              <button style={s.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy"}</button>
              <button style={s.btnSecondary} onClick={handleDownload}>Download .txt</button>
            </div>
          </div>
          <textarea style={s.outputTextarea} value={output} readOnly />
        </div>
      )}

      <SeoContent />
    </div>
  );
}

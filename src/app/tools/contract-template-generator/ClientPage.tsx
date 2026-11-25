"use client";
import { useState, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "contract-template-generator";

type ContractType = "freelance" | "consulting" | "service" | "employment";

interface FormData {
  contractType: ContractType;
  partyAName: string;
  partyAAddress: string;
  partyBName: string;
  partyBAddress: string;
  scopeOfWork: string;
  paymentAmount: string;
  paymentCurrency: string;
  paymentSchedule: string;
  startDate: string;
  endDate: string;
  terminationNotice: string;
  governingLaw: string;
  confidentiality: boolean;
  intellectualProperty: boolean;
}

const CONTRACT_TITLES: Record<ContractType, string> = {
  freelance: "FREELANCE SERVICE AGREEMENT",
  consulting: "CONSULTING AGREEMENT",
  service: "SERVICE AGREEMENT",
  employment: "EMPLOYMENT CONTRACT",
};

function generateContract(f: FormData): string {
  const partyA = f.partyAName || "[Client Name]";
  const partyB = f.partyBName || "[Service Provider Name]";
  const title = CONTRACT_TITLES[f.contractType];
  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const lines: string[] = [];
  let sn = 1;

  lines.push(title);
  lines.push(``);
  lines.push(`This ${title} ("Agreement") is entered into as of ${f.startDate || today} ("Effective Date") by and between:`);
  lines.push(``);
  lines.push(`Party A (${f.contractType === "freelance" || f.contractType === "consulting" ? "Client" : "Company"}):`);
  lines.push(`Name: ${partyA}`);
  if (f.partyAAddress) lines.push(`Address: ${f.partyAAddress}`);
  lines.push(``);
  lines.push(`Party B (${f.contractType === "freelance" ? "Freelancer" : f.contractType === "consulting" ? "Consultant" : f.contractType === "employment" ? "Employee" : "Service Provider"}):`);
  lines.push(`Name: ${partyB}`);
  if (f.partyBAddress) lines.push(`Address: ${f.partyBAddress}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);

  lines.push(`${sn}. SCOPE OF WORK`);
  lines.push(``);
  if (f.scopeOfWork) {
    lines.push(f.scopeOfWork);
  } else {
    lines.push(`${partyB} agrees to provide the following services to ${partyA}:`);
    lines.push(`[Describe the services, deliverables, and milestones in detail]`);
  }
  lines.push(``);
  sn++;

  lines.push(`${sn}. COMPENSATION`);
  lines.push(``);
  lines.push(`${partyA} agrees to compensate ${partyB} as follows:`);
  lines.push(`- Amount: ${f.paymentAmount ? f.paymentCurrency + " " + f.paymentAmount : "[Amount]"}`);
  lines.push(`- Payment Schedule: ${f.paymentSchedule || "Upon completion of deliverables"}`);
  if (f.contractType === "freelance" || f.contractType === "consulting") {
    lines.push(`- Payment Method: Bank transfer or as mutually agreed`);
    lines.push(`- Late Payment: Invoices unpaid after 30 days will incur a late fee of 1.5% per month`);
  }
  if (f.contractType === "employment") {
    lines.push(`- Pay Frequency: ${f.paymentSchedule || "Bi-weekly"}`);
    lines.push(`- Benefits: As outlined in the company benefits package`);
  }
  lines.push(``);
  sn++;

  lines.push(`${sn}. TERM AND DURATION`);
  lines.push(``);
  lines.push(`This Agreement begins on ${f.startDate || "[Start Date]"} and ${f.endDate ? "ends on " + f.endDate : "continues until terminated by either party as described in the Termination section"}.`);
  lines.push(``);
  sn++;

  lines.push(`${sn}. TERMINATION`);
  lines.push(``);
  lines.push(`Either party may terminate this Agreement by providing ${f.terminationNotice || "30 days"} written notice to the other party.`);
  lines.push(``);
  if (f.contractType === "freelance" || f.contractType === "consulting") {
    lines.push(`Upon termination:`);
    lines.push(`- ${partyA} shall pay ${partyB} for all work completed up to the date of termination`);
    lines.push(`- ${partyB} shall deliver all completed and in-progress work to ${partyA}`);
  }
  if (f.contractType === "employment") {
    lines.push(`Either party may terminate this Agreement for cause immediately upon written notice if the other party materially breaches this Agreement and fails to cure such breach within 14 days of written notification.`);
  }
  lines.push(``);
  sn++;

  if (f.confidentiality) {
    lines.push(`${sn}. CONFIDENTIALITY`);
    lines.push(``);
    lines.push(`Both parties agree to keep confidential all proprietary information, trade secrets, business plans, client lists, and other non-public information disclosed during the term of this Agreement. This obligation survives termination of the Agreement for a period of two (2) years.`);
    lines.push(``);
    lines.push(`Confidential information does not include information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was already known to the receiving party before disclosure; (c) is independently developed without use of the confidential information; or (d) is required to be disclosed by law.`);
    lines.push(``);
    sn++;
  }

  if (f.intellectualProperty) {
    lines.push(`${sn}. INTELLECTUAL PROPERTY`);
    lines.push(``);
    if (f.contractType === "freelance" || f.contractType === "consulting") {
      lines.push(`All intellectual property, including but not limited to code, designs, documentation, and other deliverables created by ${partyB} under this Agreement shall be the exclusive property of ${partyA} upon full payment.`);
      lines.push(``);
      lines.push(`${partyB} retains the right to use general knowledge, skills, and experience gained during the engagement, as well as any pre-existing intellectual property brought to the project.`);
    } else {
      lines.push(`Any intellectual property created by ${partyB} during the course of employment and within the scope of their duties shall be the exclusive property of ${partyA}.`);
    }
    lines.push(``);
    sn++;
  }

  lines.push(`${sn}. GOVERNING LAW`);
  lines.push(``);
  lines.push(`This Agreement shall be governed by and construed in accordance with the laws of ${f.governingLaw || "[State/Province/Country]"}.`);
  lines.push(``);
  sn++;

  lines.push(`${sn}. ENTIRE AGREEMENT`);
  lines.push(``);
  lines.push(`This Agreement constitutes the entire agreement between the parties and supersedes all prior negotiations, representations, or agreements relating to this subject matter.`);
  lines.push(``);
  sn++;

  lines.push(`${sn}. AMENDMENTS`);
  lines.push(``);
  lines.push(`This Agreement may only be amended in writing, signed by both parties.`);
  lines.push(``);

  lines.push(`---`);
  lines.push(``);
  lines.push(`IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.`);
  lines.push(``);
  lines.push(`${partyA}`);
  lines.push(`Signature: ___________________________`);
  lines.push(`Date: ___________________________`);
  lines.push(``);
  lines.push(`${partyB}`);
  lines.push(`Signature: ___________________________`);
  lines.push(`Date: ___________________________`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`Generated using ToolCraftKit.com — This is a template for reference purposes and should be reviewed by a legal professional.`);

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
  textarea: { width: "100%", minHeight: 100, border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", resize: "vertical" as const, lineHeight: 1.6 },
  checkRow: { display: "flex" as const, alignItems: "center" as const, gap: 10, marginBottom: 10, cursor: "pointer" as const },
  checkLabel: { fontSize: 14, color: "#1C1917", cursor: "pointer" as const, userSelect: "none" as const },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  outputText: { width: "100%", minHeight: 500, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
};

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [period, setPeriod] = useState("month");
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<FormData>({
    contractType: "freelance", partyAName: "", partyAAddress: "", partyBName: "", partyBAddress: "",
    scopeOfWork: "", paymentAmount: "", paymentCurrency: "USD", paymentSchedule: "",
    startDate: today, endDate: "", terminationNotice: "30 days", governingLaw: "",
    confidentiality: true, intellectualProperty: true,
  });
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch("/api/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "check" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.usage !== undefined) setUsage(data.usage);
        if (data.limit !== undefined) setLimit(data.limit);
        if (data.period) setPeriod(data.period);
      })
      .catch(() => {});
  }, [user]);

  const update = (key: keyof FormData, value: string | boolean) => setForm((p) => ({ ...p, [key]: value }));

  const handleGenerate = async () => {
    if (!form.partyAName.trim() && !form.partyBName.trim()) { alert("Please enter at least one party name."); return; }
    if (!isPro && user) {
      const res = await fetch("/api/usage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "record" }),
      });
      const data = await res.json();
      if (data.error) { alert(data.error); return; }
      setUsage(data.usage || usage + 1);
    }
    setOutput(generateContract(form));
  };

  const handleCopy = async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { alert("Copy failed."); }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${form.contractType}-contract.txt`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Contract Template Generator" slug="contract-template-generator" description="Generate professional contract templates for freelance, consulting, and service agreements." category="BusinessApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Contract Template Generator", url: "https://toolcraftkit.com/tools/contract-template-generator" }]} />

      <h1 style={s.h1}>{toolUI?.name || "Contract Template Generator"}</h1>
      <p style={s.sub}>"Generate professional contract templates in seconds."</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      <div style={s.card}>
        <h2 style={s.cardTitle}>Contract Type</h2>
        <select style={s.select} value={form.contractType} onChange={(e) => update("contractType", e.target.value)}>
          <option value="freelance">Freelance Service Agreement</option>
          <option value="consulting">Consulting Agreement</option>
          <option value="service">Service Agreement</option>
          <option value="employment">Employment Contract</option>
        </select>
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Parties</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Party A (Client / Company)</label>
            <input style={s.input} value={form.partyAName} onChange={(e) => update("partyAName", e.target.value)} placeholder="Company Name" />
            <input style={s.input} value={form.partyAAddress} onChange={(e) => update("partyAAddress", e.target.value)} placeholder="Address (optional)" />
          </div>
          <div>
            <label style={s.label}>Party B (Provider / Employee)</label>
            <input style={s.input} value={form.partyBName} onChange={(e) => update("partyBName", e.target.value)} placeholder="Provider Name" />
            <input style={s.input} value={form.partyBAddress} onChange={(e) => update("partyBAddress", e.target.value)} placeholder="Address (optional)" />
          </div>
        </div>
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Scope & Payment</h2>
        <label style={s.label}>Scope of Work</label>
        <textarea style={s.textarea} value={form.scopeOfWork} onChange={(e) => update("scopeOfWork", e.target.value)} placeholder="Describe the services, deliverables, and milestones..." />

        <div style={s.grid2}>
          <div>
            <label style={s.label}>Payment Amount</label>
            <input style={s.input} value={form.paymentAmount} onChange={(e) => update("paymentAmount", e.target.value)} placeholder="5000" />
          </div>
          <div>
            <label style={s.label}>Currency</label>
            <select style={s.select} value={form.paymentCurrency} onChange={(e) => update("paymentCurrency", e.target.value)}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="AUD">AUD (A$)</option>
            </select>
          </div>
        </div>

        <label style={s.label}>Payment Schedule</label>
        <input style={s.input} value={form.paymentSchedule} onChange={(e) => update("paymentSchedule", e.target.value)} placeholder="e.g., 50% upfront, 50% on completion" />
      </div>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Duration & Terms</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Start Date</label>
            <input style={s.input} type="date" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} />
          </div>
          <div>
            <label style={s.label}>End Date (optional)</label>
            <input style={s.input} type="date" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} />
          </div>
        </div>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Termination Notice Period</label>
            <input style={s.input} value={form.terminationNotice} onChange={(e) => update("terminationNotice", e.target.value)} placeholder="30 days" />
          </div>
          <div>
            <label style={s.label}>Governing Law (jurisdiction)</label>
            <input style={s.input} value={form.governingLaw} onChange={(e) => update("governingLaw", e.target.value)} placeholder="State of California, USA" />
          </div>
        </div>

        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 12, marginTop: 16 }}>Optional Clauses</h3>
        <div style={s.checkRow} onClick={() => update("confidentiality", !form.confidentiality)}>
          <input type="checkbox" checked={form.confidentiality} readOnly style={{ width: 18, height: 18, accentColor: "#0D9488" }} />
          <span style={s.checkLabel}>Confidentiality / NDA Clause</span>
        </div>
        <div style={s.checkRow} onClick={() => update("intellectualProperty", !form.intellectualProperty)}>
          <input type="checkbox" checked={form.intellectualProperty} readOnly style={{ width: 18, height: 18, accentColor: "#0D9488" }} />
          <span style={s.checkLabel}>Intellectual Property Clause</span>
        </div>
      </div>

      <button style={s.btn} onClick={handleGenerate}>Generate Contract</button>

      {output && (
        <div style={{ ...s.output, marginTop: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>Your Contract</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={s.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy"}</button>
              <button style={s.btnSecondary} onClick={handleDownload}>Download .txt</button>
            </div>
          </div>
          <textarea style={s.outputText} value={output} readOnly />
          <p style={{ fontSize: 12, color: "#78716C", marginTop: 8 }}>⚠️ This is a template for reference purposes. We recommend having it reviewed by a legal professional before signing.</p>
        </div>
      )}

      <SeoContent />
    </div>
  );
}

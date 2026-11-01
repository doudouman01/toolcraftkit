"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── TYPES ─── */
interface FormData {
  websiteName: string;
  websiteUrl: string;
  contactEmail: string;
  companyName: string;
  effectiveDate: string;
}

interface DataCollection {
  personalInfo: boolean;
  cookies: boolean;
  analytics: boolean;
  thirdParty: boolean;
  emailMarketing: boolean;
  paymentProcessing: boolean;
}

type Audience = "general" | "gdpr" | "ccpa" | "coppa";

/* ─── POLICY GENERATOR ─── */
function generatePolicy(form: FormData, data: DataCollection, audience: Audience): string {
  const entity = form.companyName || form.websiteName;
  const lines: string[] = [];

  lines.push(`PRIVACY POLICY`);
  lines.push(``);
  lines.push(`Effective Date: ${form.effectiveDate}`);
  lines.push(``);
  lines.push(`This Privacy Policy describes how ${entity} ("we", "us", or "our") collects, uses, and protects your personal information when you visit ${form.websiteUrl || "our website"} ("the Site"). By using the Site, you agree to the practices described in this policy.`);
  lines.push(``);

  /* ─── Information We Collect ─── */
  lines.push(`1. INFORMATION WE COLLECT`);
  lines.push(``);

  if (data.personalInfo) {
    lines.push(`Personal Information`);
    lines.push(`We may collect personal information that you voluntarily provide to us, including but not limited to:`);
    lines.push(`- Name`);
    lines.push(`- Email address`);
    lines.push(`- Phone number`);
    lines.push(`- Mailing address`);
    lines.push(`- Any other information you choose to provide through forms, account registration, or direct communication`);
    lines.push(``);
  }

  if (data.cookies) {
    lines.push(`Cookies and Tracking Technologies`);
    lines.push(`We use cookies and similar tracking technologies to enhance your experience on our Site. Cookies are small data files stored on your device. We use:`);
    lines.push(`- Essential cookies: Required for the Site to function properly`);
    lines.push(`- Preference cookies: Remember your settings and preferences`);
    lines.push(`- Analytics cookies: Help us understand how visitors interact with the Site`);
    lines.push(`You can control cookie preferences through your browser settings. Disabling cookies may affect the functionality of the Site.`);
    lines.push(``);
  }

  if (data.analytics) {
    lines.push(`Analytics Data`);
    lines.push(`We use analytics services (such as Google Analytics) to collect information about how visitors use our Site. This may include:`);
    lines.push(`- IP address (anonymized where required by law)`);
    lines.push(`- Browser type and version`);
    lines.push(`- Operating system`);
    lines.push(`- Referring URLs`);
    lines.push(`- Pages visited and time spent on each page`);
    lines.push(`- Device information`);
    lines.push(`This data is collected in aggregate form and is used to improve our Site and services.`);
    lines.push(``);
  }

  if (data.paymentProcessing) {
    lines.push(`Payment Information`);
    lines.push(`When you make a purchase on our Site, your payment information (such as credit card numbers) is processed by our third-party payment processor. We do not store your full payment card details on our servers. Our payment processor adheres to PCI-DSS standards to ensure the security of your financial information.`);
    lines.push(``);
  }

  if (!data.personalInfo && !data.cookies && !data.analytics && !data.paymentProcessing) {
    lines.push(`We may collect information that you voluntarily provide to us when using our Site, such as your name and email address when you contact us.`);
    lines.push(``);
  }

  /* ─── How We Use Your Information ─── */
  lines.push(`2. HOW WE USE YOUR INFORMATION`);
  lines.push(``);
  lines.push(`We use the information we collect for the following purposes:`);
  lines.push(`- To provide, operate, and maintain the Site`);
  lines.push(`- To improve and personalize your experience`);
  lines.push(`- To respond to your inquiries, comments, or questions`);
  if (data.emailMarketing) {
    lines.push(`- To send you marketing communications, newsletters, and promotional materials (with your consent)`);
  }
  if (data.analytics) {
    lines.push(`- To analyze usage trends and improve the performance of our Site`);
  }
  if (data.paymentProcessing) {
    lines.push(`- To process transactions and send related information such as purchase confirmations and invoices`);
  }
  lines.push(`- To detect, prevent, and address technical issues or fraudulent activity`);
  lines.push(`- To comply with legal obligations`);
  lines.push(``);

  /* ─── Third-Party Services ─── */
  if (data.thirdParty) {
    lines.push(`3. THIRD-PARTY SERVICES`);
    lines.push(``);
    lines.push(`We may employ third-party companies and services to facilitate our Site, provide services on our behalf, or assist us in analyzing how the Site is used. These third parties may have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.`);
    lines.push(``);
    lines.push(`Examples of third-party services we may use include:`);
    if (data.analytics) lines.push(`- Analytics providers (e.g., Google Analytics)`);
    if (data.paymentProcessing) lines.push(`- Payment processors (e.g., Stripe, PayPal)`);
    if (data.emailMarketing) lines.push(`- Email marketing platforms (e.g., Mailchimp, ConvertKit)`);
    lines.push(`- Hosting and cloud infrastructure providers`);
    lines.push(``);
    lines.push(`We recommend reviewing the privacy policies of these third-party services to understand their data practices.`);
    lines.push(``);
  }

  /* ─── Email Marketing ─── */
  if (data.emailMarketing) {
    const sectionNum = data.thirdParty ? 4 : 3;
    lines.push(`${sectionNum}. EMAIL MARKETING`);
    lines.push(``);
    lines.push(`With your consent, we may send you emails about our products, services, promotions, and updates. Each marketing email will include an option to unsubscribe. You can opt out at any time by:`);
    lines.push(`- Clicking the "unsubscribe" link in any marketing email`);
    lines.push(`- Contacting us at ${form.contactEmail}`);
    lines.push(``);
    lines.push(`Please note that even after opting out of marketing emails, you may still receive transactional emails related to your account or purchases.`);
    lines.push(``);
  }

  /* ─── Data Security ─── */
  let sn = 3;
  if (data.thirdParty) sn++;
  if (data.emailMarketing) sn++;
  lines.push(`${sn}. DATA SECURITY`);
  lines.push(``);
  lines.push(`We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.`);
  lines.push(``);
  sn++;

  /* ─── Data Retention ─── */
  lines.push(`${sn}. DATA RETENTION`);
  lines.push(``);
  lines.push(`We retain your personal information only for as long as is necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.`);
  lines.push(``);
  sn++;

  /* ─── GDPR Section ─── */
  if (audience === "gdpr") {
    lines.push(`${sn}. YOUR RIGHTS UNDER THE GDPR (EUROPEAN USERS)`);
    lines.push(``);
    lines.push(`If you are a resident of the European Economic Area (EEA), you have the following data protection rights under the General Data Protection Regulation (GDPR):`);
    lines.push(`- Right of access: You can request a copy of the personal data we hold about you.`);
    lines.push(`- Right to rectification: You can request that we correct any inaccurate or incomplete personal data.`);
    lines.push(`- Right to erasure: You can request that we delete your personal data under certain circumstances.`);
    lines.push(`- Right to restrict processing: You can request that we limit the processing of your personal data.`);
    lines.push(`- Right to data portability: You can request a copy of your data in a structured, machine-readable format.`);
    lines.push(`- Right to object: You can object to the processing of your personal data for direct marketing purposes.`);
    lines.push(`- Right to withdraw consent: If we rely on your consent to process your personal data, you can withdraw it at any time.`);
    lines.push(``);
    lines.push(`To exercise any of these rights, please contact us at ${form.contactEmail}. We will respond to your request within 30 days.`);
    lines.push(``);
    lines.push(`Legal Basis for Processing (GDPR)`);
    lines.push(`We process your personal data on the following legal bases:`);
    lines.push(`- Your consent (e.g., for marketing emails)`);
    lines.push(`- Performance of a contract (e.g., providing services you requested)`);
    lines.push(`- Our legitimate interests (e.g., improving our Site)`);
    lines.push(`- Compliance with legal obligations`);
    lines.push(``);
    sn++;
  }

  /* ─── CCPA Section ─── */
  if (audience === "ccpa") {
    lines.push(`${sn}. YOUR RIGHTS UNDER THE CCPA (CALIFORNIA RESIDENTS)`);
    lines.push(``);
    lines.push(`If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):`);
    lines.push(`- Right to know: You can request that we disclose what personal information we have collected, used, disclosed, and sold about you in the past 12 months.`);
    lines.push(`- Right to delete: You can request that we delete the personal information we have collected from you, subject to certain exceptions.`);
    lines.push(`- Right to opt out: You can opt out of the sale of your personal information. We do not sell personal information.`);
    lines.push(`- Right to non-discrimination: We will not discriminate against you for exercising your CCPA rights.`);
    lines.push(``);
    lines.push(`To exercise your rights, please contact us at ${form.contactEmail}. We will verify your identity before processing your request and respond within 45 days.`);
    lines.push(``);
    lines.push(`We do not sell your personal information to third parties.`);
    lines.push(``);
    sn++;
  }

  /* ─── COPPA Section ─── */
  if (audience === "coppa") {
    lines.push(`${sn}. CHILDREN'S PRIVACY (COPPA COMPLIANCE)`);
    lines.push(``);
    lines.push(`Our Site is intended for users who are at least 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal data from a child under 13 without verifiable parental consent, we will take steps to delete that information as soon as possible.`);
    lines.push(``);
    lines.push(`If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us at ${form.contactEmail} so that we can take appropriate action.`);
    lines.push(``);
    sn++;
  }

  /* ─── Children (general if not COPPA) ─── */
  if (audience !== "coppa") {
    lines.push(`${sn}. CHILDREN'S PRIVACY`);
    lines.push(``);
    lines.push(`Our Site is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us at ${form.contactEmail} and we will promptly delete it.`);
    lines.push(``);
    sn++;
  }

  /* ─── Changes to This Policy ─── */
  lines.push(`${sn}. CHANGES TO THIS PRIVACY POLICY`);
  lines.push(``);
  lines.push(`We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.`);
  lines.push(``);
  sn++;

  /* ─── Contact Us ─── */
  lines.push(`${sn}. CONTACT US`);
  lines.push(``);
  lines.push(`If you have any questions or concerns about this Privacy Policy, please contact us at:`);
  lines.push(``);
  lines.push(entity);
  if (form.contactEmail) lines.push(`Email: ${form.contactEmail}`);
  if (form.websiteUrl) lines.push(`Website: ${form.websiteUrl}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`This privacy policy was generated using ToolCraftKit.com`);

  return lines.join("\n");
}

/* ─── STYLES ─── */
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
  checkDesc: { fontSize: 12, color: "#78716C", marginLeft: 28, marginTop: -6, marginBottom: 10 },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  textarea: { width: "100%", minHeight: 400, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  required: { color: "#EF4444", marginLeft: 2 },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
};

/* ─── MAIN COMPONENT ─── */
export default function ClientPage() {
  const today = new Date().toISOString().split("T")[0];
  const [form, setForm] = useState<FormData>({
    websiteName: "",
    websiteUrl: "",
    contactEmail: "",
    companyName: "",
    effectiveDate: today,
  });
  const [data, setData] = useState<DataCollection>({
    personalInfo: true,
    cookies: true,
    analytics: false,
    thirdParty: false,
    emailMarketing: false,
    paymentProcessing: false,
  });
  const [audience, setAudience] = useState<Audience>("general");
  const [policy, setPolicy] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleData = (field: keyof DataCollection) => {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleGenerate = () => {
    if (!form.websiteName.trim()) { setError("Please enter your website name."); return; }
    if (!form.contactEmail.trim()) { setError("Please enter a contact email address."); return; }
    setError("");
    const result = generatePolicy(form, data, audience);
    setPolicy(result);
  };

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(policy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [policy]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([policy], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `privacy-policy-${form.websiteName.replace(/\s+/g, "-").toLowerCase() || "website"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [policy, form.websiteName]);

  const dataOptions: { key: keyof DataCollection; label: string; desc: string }[] = [
    { key: "personalInfo", label: "Personal Information", desc: "Name, email, phone, address collected via forms or account registration" },
    { key: "cookies", label: "Cookies", desc: "Essential, preference, and analytics cookies stored on visitor devices" },
    { key: "analytics", label: "Analytics", desc: "Google Analytics or similar tools tracking page views, sessions, and visitor behavior" },
    { key: "thirdParty", label: "Third-Party Services", desc: "External services such as payment processors, CDNs, or embedded content" },
    { key: "emailMarketing", label: "Email Marketing", desc: "Newsletter subscriptions and promotional emails via Mailchimp, ConvertKit, etc." },
    { key: "paymentProcessing", label: "Payment Processing", desc: "Credit card or payment data handled by Stripe, PayPal, or similar processors" },
  ];

  return (
    <div style={s.page}>
      <ToolSchema
        name="Privacy Policy Generator"
        description="Generate a professional privacy policy for your website in seconds. Covers GDPR, CCPA, cookies, analytics. Free, no signup required."
        slug="privacy-policy-generator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://toolcraftkit.com" },
        { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" },
        { name: "Privacy Policy Generator", url: "https://toolcraftkit.com/tools/privacy-policy-generator" },
      ]} />

      <h1 style={s.h1}>Privacy Policy Generator</h1>
      <p style={s.sub}>Generate a professional privacy policy for your website. Free, no signup required.</p>

      {/* ─── Website Details ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Website Details</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Website Name <span style={s.required}>*</span></label>
            <input
              type="text"
              value={form.websiteName}
              onChange={(e) => updateForm("websiteName", e.target.value)}
              placeholder="My Website"
              style={s.input}
            />
          </div>
          <div>
            <label style={s.label}>Website URL</label>
            <input
              type="text"
              value={form.websiteUrl}
              onChange={(e) => updateForm("websiteUrl", e.target.value)}
              placeholder="https://example.com"
              style={s.input}
            />
          </div>
        </div>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Contact Email <span style={s.required}>*</span></label>
            <input
              type="email"
              value={form.contactEmail}
              onChange={(e) => updateForm("contactEmail", e.target.value)}
              placeholder="privacy@example.com"
              style={s.input}
            />
          </div>
          <div>
            <label style={s.label}>Company Name <span style={{ color: "#78716C", fontWeight: 400 }}>(optional)</span></label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => updateForm("companyName", e.target.value)}
              placeholder="Acme Inc."
              style={s.input}
            />
          </div>
        </div>
        <label style={s.label}>Effective Date</label>
        <input
          type="date"
          value={form.effectiveDate}
          onChange={(e) => updateForm("effectiveDate", e.target.value)}
          style={{ ...s.input, maxWidth: 220 }}
        />
      </div>

      {/* ─── Data Collection ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>What Data Does Your Site Collect?</h2>
        {dataOptions.map((opt) => (
          <div key={opt.key}>
            <div style={s.checkRow} onClick={() => toggleData(opt.key)}>
              <input
                type="checkbox"
                checked={data[opt.key]}
                onChange={() => toggleData(opt.key)}
                style={{ width: 18, height: 18, accentColor: "#0D9488", cursor: "pointer", flexShrink: 0 }}
              />
              <span style={s.checkLabel}>{opt.label}</span>
            </div>
            <p style={s.checkDesc}>{opt.desc}</p>
          </div>
        ))}
      </div>

      {/* ─── Target Audience ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Target Audience / Regulation</h2>
        <label style={s.label}>Select the primary regulation that applies to your visitors</label>
        <select
          value={audience}
          onChange={(e) => setAudience(e.target.value as Audience)}
          style={s.select}
        >
          <option value="general">General (worldwide, no specific regulation)</option>
          <option value="gdpr">EU / GDPR (European Union users)</option>
          <option value="ccpa">California / CCPA (California residents)</option>
          <option value="coppa">Children under 13 / COPPA</option>
        </select>
        <p style={{ fontSize: 12, color: "#78716C", marginTop: 0 }}>
          {audience === "gdpr" && "Adds GDPR-specific rights: access, rectification, erasure, portability, objection, and legal basis for processing."}
          {audience === "ccpa" && "Adds CCPA-specific rights: right to know, right to delete, right to opt out, and non-discrimination."}
          {audience === "coppa" && "Adds COPPA-specific protections for children under 13, including parental consent requirements."}
          {audience === "general" && "Generates a standard privacy policy suitable for most websites worldwide."}
        </p>
      </div>

      {/* ─── Generate Button ─── */}
      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#DC2626" }}>
          {error}
        </div>
      )}
      <button onClick={handleGenerate} style={s.btn}>
        Generate Privacy Policy
      </button>

      {/* ─── Output ─── */}
      {policy && (
        <div style={{ ...s.output, marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", margin: 0 }}>Your Privacy Policy</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleCopy} style={s.btnSecondary}>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button onClick={handleDownload} style={s.btnSecondary}>
                Download .txt
              </button>
            </div>
          </div>
          <textarea
            value={policy}
            readOnly
            style={s.textarea}
          />
          <p style={{ fontSize: 12, color: "#78716C", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
            Disclaimer: This generated privacy policy is provided as a starting point and general template. It is not legal advice. We recommend having a qualified legal professional review your privacy policy before publishing it to ensure full compliance with applicable laws and regulations.
          </p>
        </div>
      )}

      {/* ─── SEO Content ─── */}
      <SeoContent />
    </div>
  );
}

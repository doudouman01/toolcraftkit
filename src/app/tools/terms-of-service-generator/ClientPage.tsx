"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── TYPES ─── */
interface FormData {
  websiteName: string;
  websiteUrl: string;
  companyName: string;
  contactEmail: string;
  jurisdiction: string;
  effectiveDate: string;
}

interface Features {
  userAccounts: boolean;
  userContent: boolean;
  ecommerce: boolean;
  subscriptions: boolean;
  apiAccess: boolean;
  thirdPartyIntegrations: boolean;
}

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6", primaryDark: "#0F766E",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444", warning: "#F59E0B",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4", primaryDark: "#14B8A6",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171", warning: "#FBBF24",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

/* ─── JURISDICTIONS ─── */
const JURISDICTIONS = [
  { value: "us", label: "United States" },
  { value: "eu", label: "European Union" },
  { value: "ca", label: "Canada" },
  { value: "au", label: "Australia" },
  { value: "general", label: "General / International" },
];

/* ─── ToS GENERATOR ─── */
function generateToS(form: FormData, features: Features): string {
  const entity = form.companyName || form.websiteName;
  const site = form.websiteUrl || "our website";
  const j = form.jurisdiction;
  const lines: string[] = [];

  lines.push(`TERMS OF SERVICE`);
  lines.push(``);
  lines.push(`Effective Date: ${form.effectiveDate}`);
  lines.push(``);
  lines.push(`Welcome to ${form.websiteName}. These Terms of Service ("Terms") govern your access to and use of ${site} (the "Service"), operated by ${entity} ("we", "us", or "our"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Service.`);
  lines.push(``);

  /* 1. Acceptance of Terms */
  let section = 1;
  lines.push(`${section}. ACCEPTANCE OF TERMS`);
  lines.push(``);
  lines.push(`By accessing, browsing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. We reserve the right to modify these Terms at any time. Your continued use of the Service after any changes constitutes your acceptance of the revised Terms.`);
  lines.push(``);
  if (j === "eu") {
    lines.push(`In accordance with European Union regulations, we will notify you of material changes to these Terms via email or through a prominent notice on the Service at least 30 days before the changes take effect. You have the right to terminate your use of the Service if you do not agree to the modified Terms.`);
    lines.push(``);
  }
  lines.push(`You must be at least 18 years of age, or the age of legal majority in your jurisdiction, to use this Service. By using the Service, you represent and warrant that you meet this eligibility requirement.`);
  lines.push(``);

  /* 2. User Obligations */
  section++;
  lines.push(`${section}. USER OBLIGATIONS`);
  lines.push(``);
  lines.push(`When using the Service, you agree to:`);
  lines.push(`- Comply with all applicable local, state, national, and international laws and regulations`);
  lines.push(`- Provide accurate, current, and complete information when required`);
  lines.push(`- Not use the Service for any unlawful, harmful, or fraudulent purpose`);
  lines.push(`- Not interfere with or disrupt the integrity or performance of the Service`);
  lines.push(`- Not attempt to gain unauthorized access to the Service, other accounts, or computer systems`);
  lines.push(`- Not transmit any viruses, malware, or other harmful code`);
  lines.push(`- Not use automated tools, bots, or scripts to access the Service without our express written permission`);
  lines.push(`- Not harass, abuse, or harm another person or entity through the Service`);
  lines.push(``);

  /* 3. User Accounts (conditional) */
  if (features.userAccounts) {
    section++;
    lines.push(`${section}. USER ACCOUNTS`);
    lines.push(``);
    lines.push(`To access certain features of the Service, you may be required to create an account. When creating an account, you agree to:`);
    lines.push(`- Provide accurate and complete registration information`);
    lines.push(`- Maintain the security and confidentiality of your login credentials`);
    lines.push(`- Promptly update your account information if it changes`);
    lines.push(`- Accept responsibility for all activities that occur under your account`);
    lines.push(`- Notify us immediately at ${form.contactEmail} if you suspect unauthorized use of your account`);
    lines.push(``);
    lines.push(`We reserve the right to suspend or terminate your account at any time, with or without notice, for conduct that we determine, in our sole discretion, violates these Terms or is harmful to other users, us, or third parties.`);
    lines.push(``);
  }

  /* 4. User-Generated Content (conditional) */
  if (features.userContent) {
    section++;
    lines.push(`${section}. USER-GENERATED CONTENT`);
    lines.push(``);
    lines.push(`The Service may allow you to post, submit, publish, display, or transmit content, including but not limited to text, images, videos, comments, reviews, and other materials ("User Content"). By submitting User Content, you:`);
    lines.push(``);
    lines.push(`a) Grant ${entity} a worldwide, non-exclusive, royalty-free, transferable, sublicensable license to use, reproduce, modify, adapt, publish, translate, distribute, and display your User Content in connection with the Service.`);
    lines.push(``);
    lines.push(`b) Represent and warrant that you own or have the necessary rights, licenses, and permissions to submit such User Content and grant the above license.`);
    lines.push(``);
    lines.push(`c) Acknowledge that you are solely responsible for your User Content and the consequences of posting or publishing it.`);
    lines.push(``);
    lines.push(`We reserve the right, but are not obligated, to monitor, edit, or remove any User Content that we determine, in our sole discretion, violates these Terms, is objectionable, or may expose ${entity} to liability.`);
    lines.push(``);
    if (j === "eu") {
      lines.push(`In accordance with the EU Digital Services Act, we provide transparent mechanisms for reporting illegal content and will act promptly upon receipt of valid reports. You have the right to appeal any content moderation decision.`);
      lines.push(``);
    }
  }

  /* 5. E-Commerce / Payments (conditional) */
  if (features.ecommerce) {
    section++;
    lines.push(`${section}. PAYMENTS AND TRANSACTIONS`);
    lines.push(``);
    lines.push(`Certain products or services offered through the Service may require payment. By making a purchase, you agree to:`);
    lines.push(`- Provide current, complete, and accurate billing and payment information`);
    lines.push(`- Pay all charges incurred through your account at the prices in effect when such charges are incurred`);
    lines.push(`- Pay any applicable taxes related to your purchases`);
    lines.push(``);
    lines.push(`All prices are displayed in the currency indicated on the Service. We reserve the right to change prices at any time without prior notice. Price changes will not affect orders that have already been confirmed.`);
    lines.push(``);
    lines.push(`Refund Policy: Unless otherwise stated, refund requests must be submitted within 30 days of purchase. We reserve the right to approve or deny refund requests at our sole discretion, in compliance with applicable consumer protection laws.`);
    lines.push(``);
    if (j === "eu") {
      lines.push(`European Union Consumers: Under EU consumer protection law, you have a 14-day right of withdrawal from the date of purchase for digital content that has not been fully downloaded or streamed. If you wish to begin accessing digital content immediately, you may be asked to waive your right of withdrawal.`);
      lines.push(``);
    }
    if (j === "au") {
      lines.push(`Australian Consumers: Our goods and services come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and compensation for any other reasonably foreseeable loss or damage.`);
      lines.push(``);
    }
  }

  /* 6. Subscriptions (conditional) */
  if (features.subscriptions) {
    section++;
    lines.push(`${section}. SUBSCRIPTIONS`);
    lines.push(``);
    lines.push(`Some features of the Service may be offered on a subscription basis. By subscribing, you agree to the following:`);
    lines.push(``);
    lines.push(`a) Billing Cycle: Your subscription will be billed on a recurring basis (monthly or annually, as selected at the time of purchase) until you cancel.`);
    lines.push(``);
    lines.push(`b) Automatic Renewal: Your subscription will automatically renew at the end of each billing cycle unless you cancel before the renewal date. You will be charged the then-current subscription fee upon renewal.`);
    lines.push(``);
    lines.push(`c) Cancellation: You may cancel your subscription at any time through your account settings or by contacting us at ${form.contactEmail}. Cancellation will take effect at the end of the current billing cycle. No prorated refunds will be issued for partial billing periods, unless required by applicable law.`);
    lines.push(``);
    lines.push(`d) Price Changes: We may change subscription fees upon reasonable notice. If you do not agree to a price change, you may cancel your subscription before the change takes effect.`);
    lines.push(``);
    if (j === "eu") {
      lines.push(`EU Subscribers: You have the right to cancel your subscription within 14 days of the initial subscription date without giving any reason, in accordance with the EU Consumer Rights Directive.`);
      lines.push(``);
    }
  }

  /* 7. API Access (conditional) */
  if (features.apiAccess) {
    section++;
    lines.push(`${section}. API ACCESS AND USE`);
    lines.push(``);
    lines.push(`If you access the Service through an Application Programming Interface ("API"), the following additional terms apply:`);
    lines.push(``);
    lines.push(`a) API Keys: You may be issued API keys or tokens to authenticate your access. You are responsible for keeping your API keys confidential and must not share them with unauthorized parties.`);
    lines.push(``);
    lines.push(`b) Rate Limits: We may impose rate limits on API calls. You agree to comply with any rate limits communicated through the API documentation or response headers. Exceeding rate limits may result in temporary or permanent suspension of your API access.`);
    lines.push(``);
    lines.push(`c) Acceptable Use: You agree not to use the API to:`);
    lines.push(`   - Build a competing product or service`);
    lines.push(`   - Resell or redistribute API access without our prior written consent`);
    lines.push(`   - Overload, flood, or disrupt the Service infrastructure`);
    lines.push(`   - Scrape, harvest, or collect data beyond what is necessary for your authorized use`);
    lines.push(``);
    lines.push(`d) Changes to the API: We reserve the right to modify, deprecate, or discontinue the API or any part of it at any time, with or without notice. We will make reasonable efforts to provide advance notice of significant changes.`);
    lines.push(``);
  }

  /* 8. Third-Party Integrations (conditional) */
  if (features.thirdPartyIntegrations) {
    section++;
    lines.push(`${section}. THIRD-PARTY INTEGRATIONS AND LINKS`);
    lines.push(``);
    lines.push(`The Service may contain links to third-party websites, services, or integrations ("Third-Party Services") that are not owned or controlled by ${entity}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any Third-Party Services.`);
    lines.push(``);
    lines.push(`By using Third-Party Services through or in connection with our Service, you acknowledge and agree that:`);
    lines.push(`- Your use of Third-Party Services is at your own risk and subject to the terms and conditions of those services`);
    lines.push(`- We are not responsible for any damage or loss caused or alleged to be caused by your use of Third-Party Services`);
    lines.push(`- Any data you share with Third-Party Services is governed by their respective privacy policies`);
    lines.push(``);
  }

  /* Intellectual Property */
  section++;
  lines.push(`${section}. INTELLECTUAL PROPERTY`);
  lines.push(``);
  lines.push(`All content, features, and functionality of the Service, including but not limited to text, graphics, logos, icons, images, audio clips, software, and the compilation thereof, are the exclusive property of ${entity} or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.`);
  lines.push(``);
  lines.push(`You may not reproduce, distribute, modify, create derivative works from, publicly display, publicly perform, republish, download, store, or transmit any of the material on the Service, except as follows:`);
  lines.push(`- Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials`);
  lines.push(`- You may store files that are automatically cached by your web browser for display enhancement purposes`);
  lines.push(`- You may print or download one copy of a reasonable number of pages of the Service for your own personal, non-commercial use`);
  lines.push(``);

  /* Disclaimer of Warranties */
  section++;
  lines.push(`${section}. DISCLAIMER OF WARRANTIES`);
  lines.push(``);
  lines.push(`THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ${entity.toUpperCase()} DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:`);
  lines.push(`- IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT`);
  lines.push(`- WARRANTIES THAT THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE`);
  lines.push(`- WARRANTIES REGARDING THE ACCURACY, RELIABILITY, OR COMPLETENESS OF ANY CONTENT ON THE SERVICE`);
  lines.push(``);
  if (j === "au") {
    lines.push(`Australian Consumers: Nothing in these Terms is intended to exclude, restrict, or modify any consumer guarantee or right under the Australian Consumer Law that cannot be excluded, restricted, or modified by agreement.`);
    lines.push(``);
  }

  /* Limitation of Liability */
  section++;
  lines.push(`${section}. LIMITATION OF LIABILITY`);
  lines.push(``);
  lines.push(`TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL ${entity.toUpperCase()}, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO:`);
  lines.push(`- LOSS OF PROFITS, DATA, BUSINESS, OR GOODWILL`);
  lines.push(`- SERVICE INTERRUPTION OR COMPUTER DAMAGE`);
  lines.push(`- COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES`);
  lines.push(``);
  lines.push(`WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE. OUR TOTAL LIABILITY FOR ANY CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR ONE HUNDRED DOLLARS ($100), WHICHEVER IS GREATER.`);
  lines.push(``);
  if (j === "eu") {
    lines.push(`EU Users: This limitation of liability does not affect your statutory rights under applicable EU consumer protection legislation. Nothing in these Terms shall limit our liability for death or personal injury caused by our negligence, fraud, or fraudulent misrepresentation.`);
    lines.push(``);
  }

  /* Indemnification */
  section++;
  lines.push(`${section}. INDEMNIFICATION`);
  lines.push(``);
  lines.push(`You agree to defend, indemnify, and hold harmless ${entity}, its affiliates, officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from:`);
  lines.push(`- Your use of the Service`);
  lines.push(`- Your violation of these Terms`);
  lines.push(`- Your violation of any third-party right, including any intellectual property or privacy right`);
  lines.push(`- Any claim that your User Content caused damage to a third party`);
  lines.push(``);

  /* Termination */
  section++;
  lines.push(`${section}. TERMINATION`);
  lines.push(``);
  lines.push(`We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.`);
  lines.push(``);
  lines.push(`Upon termination:`);
  lines.push(`- Your right to use the Service will immediately cease`);
  if (features.userAccounts) {
    lines.push(`- We may delete your account and all associated data, unless we are required by law to retain it`);
  }
  lines.push(`- All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability`);
  lines.push(``);
  lines.push(`You may terminate your use of the Service at any time by discontinuing use and, if applicable, by deleting your account or contacting us at ${form.contactEmail}.`);
  lines.push(``);

  /* Governing Law */
  section++;
  lines.push(`${section}. GOVERNING LAW AND DISPUTE RESOLUTION`);
  lines.push(``);
  if (j === "us") {
    lines.push(`These Terms shall be governed by and construed in accordance with the laws of the State in which ${entity} is incorporated, United States of America, without regard to its conflict of law provisions.`);
    lines.push(``);
    lines.push(`Any disputes arising out of or relating to these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If the dispute cannot be resolved informally, it shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall be conducted in the state in which ${entity} is headquartered. Each party shall bear its own costs of arbitration.`);
    lines.push(``);
    lines.push(`CLASS ACTION WAIVER: TO THE EXTENT PERMITTED BY LAW, YOU AGREE THAT ANY CLAIMS SHALL BE BROUGHT IN YOUR INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.`);
  } else if (j === "eu") {
    lines.push(`These Terms shall be governed by and construed in accordance with the laws of the European Union member state in which ${entity} is established, without prejudice to mandatory consumer protection provisions of your country of residence.`);
    lines.push(``);
    lines.push(`If you are a consumer residing in the European Union, you may bring proceedings in the courts of the member state in which you are domiciled. You may also use the European Commission's Online Dispute Resolution platform at https://ec.europa.eu/consumers/odr/ to resolve disputes online.`);
  } else if (j === "ca") {
    lines.push(`These Terms shall be governed by and construed in accordance with the laws of the Province in which ${entity} operates and the federal laws of Canada applicable therein, without regard to conflict of law principles.`);
    lines.push(``);
    lines.push(`Any disputes arising out of or relating to these Terms shall be resolved through the courts of the applicable Province of Canada. The parties irrevocably submit to the exclusive jurisdiction of such courts.`);
  } else if (j === "au") {
    lines.push(`These Terms shall be governed by and construed in accordance with the laws of the State or Territory in which ${entity} is registered, Australia. Nothing in these Terms excludes, restricts, or modifies any consumer rights under the Australian Consumer Law.`);
    lines.push(``);
    lines.push(`Any disputes arising out of or relating to these Terms shall be resolved through the courts of the applicable State or Territory of Australia.`);
  } else {
    lines.push(`These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which ${entity} is established. Any disputes arising out of or relating to these Terms shall be resolved through the courts of competent jurisdiction in that location.`);
    lines.push(``);
    lines.push(`Both parties agree to attempt to resolve any dispute informally before initiating formal proceedings.`);
  }
  lines.push(``);

  /* Severability */
  section++;
  lines.push(`${section}. SEVERABILITY`);
  lines.push(``);
  lines.push(`If any provision of these Terms is held to be unenforceable or invalid by a court of competent jurisdiction, such provision shall be modified and interpreted to accomplish the objectives of the original provision to the greatest extent possible under applicable law, and the remaining provisions shall continue in full force and effect.`);
  lines.push(``);

  /* Entire Agreement */
  section++;
  lines.push(`${section}. ENTIRE AGREEMENT`);
  lines.push(``);
  lines.push(`These Terms, together with our Privacy Policy and any other legal notices published on the Service, constitute the entire agreement between you and ${entity} regarding the use of the Service. These Terms supersede any prior agreements, communications, or understandings, whether written or oral, relating to the subject matter hereof.`);
  lines.push(``);

  /* Changes to Terms */
  section++;
  lines.push(`${section}. CHANGES TO THESE TERMS`);
  lines.push(``);
  lines.push(`We reserve the right to update or modify these Terms at any time at our sole discretion. If we make material changes, we will notify you by posting the revised Terms on the Service and updating the "Effective Date" at the top of this document. Your continued use of the Service after the posting of revised Terms constitutes your acceptance of those changes.`);
  lines.push(``);
  lines.push(`We encourage you to review these Terms periodically to stay informed about your rights and obligations.`);
  lines.push(``);

  /* Contact Information */
  section++;
  lines.push(`${section}. CONTACT INFORMATION`);
  lines.push(``);
  lines.push(`If you have any questions about these Terms of Service, please contact us at:`);
  lines.push(``);
  lines.push(`${entity}`);
  if (form.websiteUrl) lines.push(`Website: ${form.websiteUrl}`);
  lines.push(`Email: ${form.contactEmail}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`Generated by ToolCraftKit.com — This is a template and does not constitute legal advice.`);

  return lines.join("\n");
}

/* ─── FAQ ITEM ─── */
function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>
      )}
    </div>
  );
}

/* ─── AD SLOT ─── */
function AdSlot({ position, theme }: { position: string; theme: typeof LIGHT }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8,
      padding: "12px", textAlign: "center", color: theme.textLight,
      fontSize: 11, fontStyle: "italic", background: theme.surfaceAlt,
      margin: position === "header" ? "0 0 20px" : "20px 0",
      opacity: 0.5,
    }}>
      Ad Slot — {position}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function ClientPage() {
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState<FormData>({
    websiteName: "",
    websiteUrl: "",
    companyName: "",
    contactEmail: "",
    jurisdiction: "us",
    effectiveDate: today,
  });

  const [features, setFeatures] = useState<Features>({
    userAccounts: false,
    userContent: false,
    ecommerce: false,
    subscriptions: false,
    apiAccess: false,
    thirdPartyIntegrations: false,
  });

  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;

  const updateForm = (key: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => { const n = { ...prev }; delete n[key]; return n; });
  };

  const toggleFeature = (key: keyof Features) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!form.websiteName.trim()) e.websiteName = "Website or app name is required";
    if (!form.contactEmail.trim()) e.contactEmail = "Contact email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)) e.contactEmail = "Enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleGenerate = useCallback(() => {
    if (!validate()) return;
    const tos = generateToS(form, features);
    setOutput(tos);
  }, [form, features]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [output]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `terms-of-service-${form.websiteName.replace(/\s+/g, "-").toLowerCase() || "document"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [output, form.websiteName]);

  /* ─── INPUT STYLE HELPERS ─── */
  const inputStyle = (hasError?: boolean): React.CSSProperties => ({
    width: "100%", padding: "10px 14px", fontSize: 14, borderRadius: 8,
    border: `1.5px solid ${hasError ? theme.danger : theme.border}`,
    background: theme.inputBg, color: theme.text, outline: "none",
    boxSizing: "border-box" as const, transition: "border-color 0.2s ease",
    fontFamily: "'Inter', system-ui, sans-serif",
  });

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 13, fontWeight: 600, color: theme.text,
    marginBottom: 6,
  };

  const checkboxRowStyle: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
    borderRadius: 8, cursor: "pointer", transition: "background 0.15s ease",
    background: theme.surface, border: `1px solid ${theme.border}`,
  };

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <ToolSchema
        name="Terms of Service Generator"
        description="Generate professional Terms of Service for your website or app. Covers user obligations, intellectual property, liability, termination, governing law. Jurisdiction-aware for US, EU, Canada, Australia."
        slug="terms-of-service-generator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Business Tools", url: "https://toolcraftkit.com/categories#business-tools" },
          { name: "Terms of Service Generator", url: "https://toolcraftkit.com/tools/terms-of-service-generator" },
        ]}
      />

      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        <AdSlot position="header" theme={theme} />

        {/* ─── TITLE ─── */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Terms of Service Generator
          </h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Create comprehensive, jurisdiction-aware Terms of Service for your website or app. Free, no signup required.
          </p>
        </div>

        {/* ─── LEGAL DISCLAIMER ─── */}
        <div style={{
          background: dark ? "rgba(251,191,36,0.1)" : "#FFFBEB",
          border: `1px solid ${dark ? "rgba(251,191,36,0.3)" : "#FDE68A"}`,
          borderRadius: 10, padding: "14px 16px", marginBottom: 24,
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>&#9888;</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: theme.warning, marginBottom: 4 }}>Legal Disclaimer</div>
            <p style={{ fontSize: 12, color: theme.textMuted, margin: 0, lineHeight: 1.6 }}>
              This tool generates a template for informational purposes only. It does not constitute legal advice and should not be relied upon as such. We strongly recommend having a qualified attorney review any legal document before publishing it on your website. Laws and regulations vary by jurisdiction and change over time.
            </p>
          </div>
        </div>

        {/* ─── FORM ─── */}
        <div style={{
          background: theme.surface, borderRadius: 12,
          border: `1px solid ${theme.border}`, padding: 24,
          boxShadow: theme.shadow, marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 20px", letterSpacing: "-0.02em" }}>
            Your Information
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            {/* Website Name */}
            <div>
              <label style={labelStyle}>Website / App Name <span style={{ color: theme.danger }}>*</span></label>
              <input
                type="text"
                value={form.websiteName}
                onChange={(e) => updateForm("websiteName", e.target.value)}
                placeholder="e.g. MyApp"
                style={inputStyle(!!errors.websiteName)}
                onFocus={(e) => { e.target.style.borderColor = theme.primary; }}
                onBlur={(e) => { e.target.style.borderColor = errors.websiteName ? theme.danger : theme.border; }}
              />
              {errors.websiteName && <div style={{ fontSize: 12, color: theme.danger, marginTop: 4 }}>{errors.websiteName}</div>}
            </div>

            {/* Website URL */}
            <div>
              <label style={labelStyle}>Website URL</label>
              <input
                type="url"
                value={form.websiteUrl}
                onChange={(e) => updateForm("websiteUrl", e.target.value)}
                placeholder="e.g. https://myapp.com"
                style={inputStyle()}
                onFocus={(e) => { e.target.style.borderColor = theme.primary; }}
                onBlur={(e) => { e.target.style.borderColor = theme.border; }}
              />
            </div>

            {/* Company Name */}
            <div>
              <label style={labelStyle}>Company / Entity Name</label>
              <input
                type="text"
                value={form.companyName}
                onChange={(e) => updateForm("companyName", e.target.value)}
                placeholder="e.g. MyApp Inc. (defaults to website name)"
                style={inputStyle()}
                onFocus={(e) => { e.target.style.borderColor = theme.primary; }}
                onBlur={(e) => { e.target.style.borderColor = theme.border; }}
              />
            </div>

            {/* Contact Email */}
            <div>
              <label style={labelStyle}>Contact Email <span style={{ color: theme.danger }}>*</span></label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => updateForm("contactEmail", e.target.value)}
                placeholder="e.g. legal@myapp.com"
                style={inputStyle(!!errors.contactEmail)}
                onFocus={(e) => { e.target.style.borderColor = theme.primary; }}
                onBlur={(e) => { e.target.style.borderColor = errors.contactEmail ? theme.danger : theme.border; }}
              />
              {errors.contactEmail && <div style={{ fontSize: 12, color: theme.danger, marginTop: 4 }}>{errors.contactEmail}</div>}
            </div>

            {/* Jurisdiction */}
            <div>
              <label style={labelStyle}>Jurisdiction</label>
              <select
                value={form.jurisdiction}
                onChange={(e) => updateForm("jurisdiction", e.target.value)}
                style={{ ...inputStyle(), cursor: "pointer", appearance: "auto" as const }}
              >
                {JURISDICTIONS.map((j) => (
                  <option key={j.value} value={j.value}>{j.label}</option>
                ))}
              </select>
            </div>

            {/* Effective Date */}
            <div>
              <label style={labelStyle}>Effective Date</label>
              <input
                type="date"
                value={form.effectiveDate}
                onChange={(e) => updateForm("effectiveDate", e.target.value)}
                style={inputStyle()}
              />
            </div>
          </div>

          {/* ─── FEATURES CHECKBOXES ─── */}
          <h3 style={{ fontSize: 15, fontWeight: 600, margin: "24px 0 12px", color: theme.text }}>
            Platform Features
          </h3>
          <p style={{ fontSize: 12, color: theme.textMuted, margin: "0 0 14px", lineHeight: 1.5 }}>
            Select the features your website or app offers. The generated Terms of Service will include relevant clauses for each.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {([
              { key: "userAccounts" as const, label: "User Accounts", desc: "Registration, login, account management" },
              { key: "userContent" as const, label: "User-Generated Content", desc: "Comments, posts, reviews, uploads" },
              { key: "ecommerce" as const, label: "E-Commerce / Payments", desc: "Product sales, payment processing, refunds" },
              { key: "subscriptions" as const, label: "Subscriptions", desc: "Recurring billing, plan management" },
              { key: "apiAccess" as const, label: "API Access", desc: "Developer API, rate limits, keys" },
              { key: "thirdPartyIntegrations" as const, label: "Third-Party Integrations", desc: "External services, plugins, embeds" },
            ]).map((item) => (
              <label key={item.key} style={checkboxRowStyle}>
                <input
                  type="checkbox"
                  checked={features[item.key]}
                  onChange={() => toggleFeature(item.key)}
                  style={{ width: 18, height: 18, accentColor: theme.primary, cursor: "pointer", flexShrink: 0 }}
                />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: theme.text }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: theme.textMuted }}>{item.desc}</div>
                </div>
              </label>
            ))}
          </div>

          {/* ─── GENERATE BUTTON ─── */}
          <button
            onClick={handleGenerate}
            style={{
              width: "100%", marginTop: 24, padding: "14px 24px",
              fontSize: 15, fontWeight: 700, color: "#FFFFFF",
              background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
              border: "none", borderRadius: 10, cursor: "pointer",
              transition: "opacity 0.2s ease, transform 0.1s ease",
              letterSpacing: "-0.01em",
            }}
            onMouseOver={(e) => { (e.target as HTMLButtonElement).style.opacity = "0.9"; }}
            onMouseOut={(e) => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
            onMouseDown={(e) => { (e.target as HTMLButtonElement).style.transform = "scale(0.99)"; }}
            onMouseUp={(e) => { (e.target as HTMLButtonElement).style.transform = "scale(1)"; }}
          >
            Generate Terms of Service
          </button>
        </div>

        {/* ─── OUTPUT ─── */}
        {output && (
          <div style={{
            background: theme.surface, borderRadius: 12,
            border: `1px solid ${theme.border}`, overflow: "hidden",
            boxShadow: theme.shadow, marginBottom: 24,
          }}>
            {/* Output header */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "14px 18px", borderBottom: `1px solid ${theme.border}`,
              background: theme.surfaceAlt,
            }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>Generated Terms of Service</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleCopy}
                  style={{
                    padding: "7px 16px", fontSize: 13, fontWeight: 600,
                    color: copied ? "#FFFFFF" : theme.primary,
                    background: copied ? theme.success : "transparent",
                    border: copied ? "none" : `1.5px solid ${theme.primary}`,
                    borderRadius: 7, cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
                <button
                  onClick={handleDownload}
                  style={{
                    padding: "7px 16px", fontSize: 13, fontWeight: 600,
                    color: "#FFFFFF",
                    background: `linear-gradient(135deg, ${theme.primary}, ${theme.primaryDark})`,
                    border: "none", borderRadius: 7, cursor: "pointer",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseOver={(e) => { (e.target as HTMLButtonElement).style.opacity = "0.9"; }}
                  onMouseOut={(e) => { (e.target as HTMLButtonElement).style.opacity = "1"; }}
                >
                  Download .txt
                </button>
              </div>
            </div>

            {/* Output text */}
            <pre style={{
              padding: "18px", margin: 0, fontSize: 13, lineHeight: 1.7,
              color: theme.text, whiteSpace: "pre-wrap", wordWrap: "break-word",
              maxHeight: 600, overflowY: "auto",
              fontFamily: "'Inter', system-ui, sans-serif",
              background: theme.surface,
            }}>
              {output}
            </pre>

            {/* Word count bar */}
            <div style={{
              padding: "10px 18px", borderTop: `1px solid ${theme.border}`,
              background: theme.surfaceAlt, display: "flex", gap: 16,
              fontSize: 12, color: theme.textMuted,
            }}>
              <span><strong style={{ color: theme.text }}>{output.split(/\s+/).length.toLocaleString()}</strong> words</span>
              <span><strong style={{ color: theme.text }}>{output.length.toLocaleString()}</strong> characters</span>
              <span><strong style={{ color: theme.text }}>{output.split("\n").filter((l) => l.match(/^\d+\./)).length}</strong> sections</span>
            </div>
          </div>
        )}

        <AdSlot position="middle" theme={theme} />

        {/* ─── ABOUT SECTION ─── */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 14px", letterSpacing: "-0.02em" }}>
            About This Terms of Service Generator
          </h2>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            This tool creates a comprehensive Terms of Service document tailored to your website or application. Enter your business details, select the features your platform offers, and choose your jurisdiction to generate a professional ToS with properly numbered sections.
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: "0 0 10px" }}>
            The generated document covers essential legal provisions including acceptance of terms, user obligations, intellectual property rights, disclaimer of warranties, limitation of liability, indemnification, termination, and governing law. Jurisdiction-specific clauses are added for the United States (including arbitration and class action waiver), European Union (including DSA compliance and consumer withdrawal rights), Canada, and Australia (including Australian Consumer Law provisions).
          </p>
          <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.7, margin: 0 }}>
            Everything runs entirely in your browser. Your data is never sent to any server. Copy the output to your clipboard or download it as a .txt file to use on your website.
          </p>
        </section>

        {/* ─── FAQ ─── */}
        <section style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em" }}>
            Frequently Asked Questions
          </h2>
          <FAQItem theme={theme}
            q="Are these Terms of Service legally binding?"
            a="This generator produces a template intended as a starting point. While it covers standard legal provisions, every business is unique. We strongly recommend having a licensed attorney review and customize the document for your specific situation, jurisdiction, and business model before publishing."
          />
          <FAQItem theme={theme}
            q="Which jurisdiction should I choose?"
            a="Select the jurisdiction where your business is legally established or incorporated. If you serve users globally and are unsure, select 'General / International' for broadly applicable terms. If you have significant users in the EU, consider selecting 'European Union' to include GDPR and Digital Services Act provisions."
          />
          <FAQItem theme={theme}
            q="Do I need both Terms of Service and a Privacy Policy?"
            a="Yes. Terms of Service govern the use of your website or app, while a Privacy Policy explains how you collect and handle personal data. Most jurisdictions require both documents. Many app stores, payment processors, and ad networks will not approve your application without them."
          />
          <FAQItem theme={theme}
            q="How often should I update my Terms of Service?"
            a="Review your Terms of Service whenever you add new features, change your business model, enter new markets, or when relevant laws change. At minimum, review them annually. Always update the effective date and notify users of material changes."
          />
          <FAQItem theme={theme}
            q="What is a limitation of liability clause?"
            a="A limitation of liability clause caps the amount of damages a user can claim against your business. It typically excludes indirect, consequential, and punitive damages and sets a maximum recovery amount. This clause is one of the most important protections in your Terms of Service."
          />
          <FAQItem theme={theme}
            q="What is the difference between arbitration and litigation?"
            a="Arbitration is a private dispute resolution process where a neutral third party makes a binding decision, typically faster and less expensive than court litigation. Many US-based Terms of Service include mandatory arbitration clauses and class action waivers. EU consumer law generally preserves the right to bring disputes to local courts."
          />
          <FAQItem theme={theme}
            q="Does this tool store my data?"
            a="No. Everything runs entirely in your browser. Your business details, email, and the generated document are never uploaded, stored, or logged on any server. You can use this tool with complete privacy."
          />
          <FAQItem theme={theme}
            q="Can I use this for a mobile app?"
            a="Yes. The generated Terms of Service apply to websites, web applications, mobile apps, and SaaS platforms. The document uses the term 'Service' broadly to cover any digital product or platform."
          />
        </section>

        <AdSlot position="footer" theme={theme} />

        {/* ─── FOOTER ─── */}
        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>
            &copy; 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.
          </span>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: theme.textMuted }}>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </footer>
      </main>

      <SeoContent />
    </div>
  );
}

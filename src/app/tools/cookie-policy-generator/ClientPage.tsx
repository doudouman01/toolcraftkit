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

interface CookieTypes {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  socialMedia: boolean;
  preference: boolean;
}

type ConsentMechanism = "banner" | "popup" | "implicit";
type Region = "general" | "gdpr" | "uk" | "ccpa";

/* ─── COOKIE POLICY GENERATOR ─── */
function generateCookiePolicy(
  form: FormData,
  cookies: CookieTypes,
  consent: ConsentMechanism,
  region: Region
): string {
  const entity = form.companyName || form.websiteName;
  const lines: string[] = [];

  lines.push(`COOKIE POLICY`);
  lines.push(``);
  lines.push(`Effective Date: ${form.effectiveDate}`);
  lines.push(``);
  lines.push(`This Cookie Policy explains how ${entity} ("we", "us", or "our") uses cookies and similar tracking technologies when you visit ${form.websiteUrl || "our website"} ("the Site"). This policy provides you with clear and comprehensive information about the cookies we use and the purposes for using them.`);
  lines.push(``);

  /* ─── 1. What Are Cookies ─── */
  lines.push(`1. WHAT ARE COOKIES`);
  lines.push(``);
  lines.push(`Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information about how their site is being used.`);
  lines.push(``);
  lines.push(`Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device after you close your browser, while session cookies are deleted as soon as you close your browser.`);
  lines.push(``);

  /* ─── 2. Types of Cookies We Use ─── */
  lines.push(`2. TYPES OF COOKIES WE USE`);
  lines.push(``);

  if (cookies.essential) {
    lines.push(`Strictly Necessary (Essential) Cookies`);
    lines.push(`These cookies are required for the Site to function properly. They enable core features such as page navigation, secure access, and basic functionality. Without these cookies, the Site cannot operate correctly. These cookies do not collect personal information and cannot be disabled.`);
    lines.push(``);
    lines.push(`Examples:`);
    lines.push(`- Session management cookies`);
    lines.push(`- Authentication cookies`);
    lines.push(`- Security cookies (e.g., CSRF protection)`);
    lines.push(`- Load balancing cookies`);
    lines.push(``);
  }

  if (cookies.analytics) {
    lines.push(`Analytics and Performance Cookies`);
    lines.push(`These cookies help us understand how visitors interact with the Site by collecting and reporting information anonymously. They allow us to measure and improve the performance of the Site.`);
    lines.push(``);
    lines.push(`Examples:`);
    lines.push(`- Google Analytics (_ga, _gid, _gat) — tracks page views, session duration, bounce rate, and traffic sources`);
    lines.push(`- Performance monitoring cookies that measure page load times`);
    lines.push(`- A/B testing cookies used to improve user experience`);
    lines.push(``);
    lines.push(`These cookies collect data in aggregate form and do not identify you personally. You can opt out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.`);
    lines.push(``);
  }

  if (cookies.marketing) {
    lines.push(`Marketing and Advertising Cookies`);
    lines.push(`These cookies are used to track visitors across websites. They are set to display ads that are relevant and engaging for individual users, thereby making them more valuable for publishers and third-party advertisers.`);
    lines.push(``);
    lines.push(`Examples:`);
    lines.push(`- Google Ads remarketing cookies`);
    lines.push(`- Facebook Pixel (_fbp) for ad targeting and conversion tracking`);
    lines.push(`- LinkedIn Insight Tag for B2B marketing analytics`);
    lines.push(`- Retargeting cookies from advertising networks`);
    lines.push(``);
    lines.push(`These cookies may share your data with third-party advertising networks. You can manage your ad preferences through the settings of each advertising platform or through industry opt-out tools such as the Digital Advertising Alliance (DAA) or the Network Advertising Initiative (NAI).`);
    lines.push(``);
  }

  if (cookies.socialMedia) {
    lines.push(`Social Media Cookies`);
    lines.push(`These cookies are set by social media platforms embedded on the Site. They allow you to share content directly on social media, and they may track your browsing activity across other websites to build a profile of your interests.`);
    lines.push(``);
    lines.push(`Examples:`);
    lines.push(`- Facebook, Instagram, and Twitter sharing and tracking cookies`);
    lines.push(`- YouTube embedded video cookies`);
    lines.push(`- Pinterest save button cookies`);
    lines.push(`- LinkedIn sharing cookies`);
    lines.push(``);
    lines.push(`These cookies are managed by the respective social media platforms. We recommend reviewing their privacy policies for more information.`);
    lines.push(``);
  }

  if (cookies.preference) {
    lines.push(`Preference and Functionality Cookies`);
    lines.push(`These cookies allow the Site to remember choices you make (such as your language preference, region, or display settings) and provide enhanced, more personalized features. They may also be used to provide services you have requested.`);
    lines.push(``);
    lines.push(`Examples:`);
    lines.push(`- Language preference cookies`);
    lines.push(`- Theme or display setting cookies (e.g., dark mode)`);
    lines.push(`- Font size preference cookies`);
    lines.push(`- Previously viewed or saved content cookies`);
    lines.push(``);
  }

  if (!cookies.essential && !cookies.analytics && !cookies.marketing && !cookies.socialMedia && !cookies.preference) {
    lines.push(`We may use cookies and similar technologies on the Site to improve your experience. The specific cookies used may vary as we update and improve our services.`);
    lines.push(``);
  }

  /* ─── 3. How We Use Cookies ─── */
  lines.push(`3. HOW WE USE COOKIES`);
  lines.push(``);
  lines.push(`We use cookies for the following purposes:`);
  if (cookies.essential) lines.push(`- To ensure the Site functions correctly and securely`);
  if (cookies.preference) lines.push(`- To remember your preferences and settings across visits`);
  if (cookies.analytics) lines.push(`- To analyze website traffic and understand how visitors use the Site`);
  if (cookies.marketing) lines.push(`- To deliver personalized advertisements and measure their effectiveness`);
  if (cookies.socialMedia) lines.push(`- To enable social media features and content sharing`);
  lines.push(`- To improve the overall user experience and performance of the Site`);
  lines.push(``);

  /* ─── 4. Third-Party Cookies ─── */
  if (cookies.analytics || cookies.marketing || cookies.socialMedia) {
    lines.push(`4. THIRD-PARTY COOKIES`);
    lines.push(``);
    lines.push(`In addition to our own cookies, we may use cookies set by third parties. These third-party services operate their own privacy and cookie policies, which we encourage you to review:`);
    lines.push(``);
    if (cookies.analytics) {
      lines.push(`- Google Analytics: https://policies.google.com/privacy`);
    }
    if (cookies.marketing) {
      lines.push(`- Google Ads: https://policies.google.com/technologies/ads`);
      lines.push(`- Facebook/Meta: https://www.facebook.com/privacy/policy`);
    }
    if (cookies.socialMedia) {
      lines.push(`- Twitter/X: https://twitter.com/en/privacy`);
      lines.push(`- YouTube: https://policies.google.com/privacy`);
    }
    lines.push(``);
    lines.push(`We do not control the cookies set by third-party services and are not responsible for their data practices.`);
    lines.push(``);
  }

  /* ─── 5. Cookie Consent ─── */
  let sn = cookies.analytics || cookies.marketing || cookies.socialMedia ? 5 : 4;
  lines.push(`${sn}. YOUR COOKIE CONSENT`);
  lines.push(``);
  if (consent === "banner") {
    lines.push(`When you first visit our Site, you will be presented with a cookie consent banner that allows you to accept or reject non-essential cookies. Your choice is stored and remembered for future visits.`);
    lines.push(``);
    lines.push(`You can change your cookie preferences at any time by clearing your browser cookies and revisiting the Site, which will trigger the consent banner again.`);
  } else if (consent === "popup") {
    lines.push(`When you first visit our Site, a cookie consent popup will appear asking for your explicit permission before any non-essential cookies are placed on your device. You can accept all cookies, reject non-essential cookies, or customize your preferences by category.`);
    lines.push(``);
    lines.push(`You can update your cookie preferences at any time by clicking the "Cookie Settings" link in the footer of the Site.`);
  } else {
    lines.push(`By continuing to browse and use the Site, you consent to our use of cookies as described in this Cookie Policy. You can withdraw your consent at any time by adjusting your browser settings to refuse cookies.`);
  }
  lines.push(``);
  sn++;

  /* ─── 6. How to Manage Cookies ─── */
  lines.push(`${sn}. HOW TO MANAGE AND DELETE COOKIES`);
  lines.push(``);
  lines.push(`You can control and manage cookies in several ways. Please note that removing or blocking cookies may impact your user experience and some features of the Site may no longer function as intended.`);
  lines.push(``);
  lines.push(`Browser Settings`);
  lines.push(`Most browsers allow you to view, manage, delete, and block cookies. Instructions for common browsers:`);
  lines.push(`- Google Chrome: Settings > Privacy and Security > Cookies and other site data`);
  lines.push(`- Mozilla Firefox: Settings > Privacy & Security > Cookies and Site Data`);
  lines.push(`- Safari: Preferences > Privacy > Manage Website Data`);
  lines.push(`- Microsoft Edge: Settings > Cookies and site permissions > Manage and delete cookies`);
  lines.push(``);
  lines.push(`Opt-Out Tools`);
  lines.push(`You can also opt out of certain third-party cookies using these tools:`);
  lines.push(`- Google Analytics Opt-out: https://tools.google.com/dlpage/gaoptout`);
  lines.push(`- Digital Advertising Alliance: https://optout.aboutads.info`);
  lines.push(`- Network Advertising Initiative: https://optout.networkadvertising.org`);
  lines.push(`- European Interactive Digital Advertising Alliance: https://www.youronlinechoices.eu`);
  lines.push(``);
  sn++;

  /* ─── GDPR Section ─── */
  if (region === "gdpr") {
    lines.push(`${sn}. YOUR RIGHTS UNDER THE GDPR (EUROPEAN USERS)`);
    lines.push(``);
    lines.push(`If you are located in the European Economic Area (EEA), the General Data Protection Regulation (GDPR) provides you with specific rights regarding the use of cookies and processing of your personal data:`);
    lines.push(``);
    lines.push(`- Right to be informed: You have the right to know what cookies are being used and why (this Cookie Policy).`);
    lines.push(`- Right to consent: Non-essential cookies will not be placed on your device without your prior, explicit consent.`);
    lines.push(`- Right to withdraw consent: You can withdraw your consent at any time by adjusting your cookie settings or browser preferences.`);
    lines.push(`- Right to access: You can request information about the data collected through cookies.`);
    lines.push(`- Right to erasure: You can request deletion of data collected through cookies by contacting us.`);
    lines.push(``);
    lines.push(`Under the GDPR, we rely on your consent as the legal basis for processing data through non-essential cookies. Essential cookies are processed based on our legitimate interest in providing a functional website.`);
    lines.push(``);
    lines.push(`For any requests regarding your data rights, please contact us at ${form.contactEmail}.`);
    lines.push(``);
    sn++;
  }

  /* ─── UK Section ─── */
  if (region === "uk") {
    lines.push(`${sn}. YOUR RIGHTS UNDER UK PRIVACY REGULATIONS`);
    lines.push(``);
    lines.push(`If you are located in the United Kingdom, the UK GDPR and the Privacy and Electronic Communications Regulations (PECR) apply to the use of cookies on the Site.`);
    lines.push(``);
    lines.push(`Under UK law:`);
    lines.push(`- We are required to obtain your consent before placing non-essential cookies on your device.`);
    lines.push(`- You have the right to withdraw your consent at any time.`);
    lines.push(`- You can request access to, correction of, or deletion of any personal data collected through cookies.`);
    lines.push(`- You have the right to lodge a complaint with the Information Commissioner's Office (ICO) at https://ico.org.uk.`);
    lines.push(``);
    lines.push(`For any requests, please contact us at ${form.contactEmail}.`);
    lines.push(``);
    sn++;
  }

  /* ─── CCPA Section ─── */
  if (region === "ccpa") {
    lines.push(`${sn}. YOUR RIGHTS UNDER THE CCPA (CALIFORNIA RESIDENTS)`);
    lines.push(``);
    lines.push(`If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with specific rights regarding the personal information collected through cookies:`);
    lines.push(``);
    lines.push(`- Right to know: You can request that we disclose what personal information has been collected through cookies.`);
    lines.push(`- Right to delete: You can request deletion of personal data collected through cookies.`);
    lines.push(`- Right to opt out: If cookies are used to "sell" personal information (as defined by the CCPA), you have the right to opt out. We do not sell personal information.`);
    lines.push(`- Right to non-discrimination: We will not discriminate against you for exercising your CCPA rights.`);
    lines.push(``);
    lines.push(`To exercise your rights, please contact us at ${form.contactEmail}. We will respond within 45 days.`);
    lines.push(``);
    sn++;
  }

  /* ─── Changes ─── */
  lines.push(`${sn}. CHANGES TO THIS COOKIE POLICY`);
  lines.push(``);
  lines.push(`We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. We encourage you to periodically review this page for the latest information on our cookie practices. The effective date at the top of this policy indicates when it was last updated.`);
  lines.push(``);
  sn++;

  /* ─── Contact ─── */
  lines.push(`${sn}. CONTACT US`);
  lines.push(``);
  lines.push(`If you have any questions about our use of cookies or this Cookie Policy, please contact us at:`);
  lines.push(``);
  lines.push(entity);
  if (form.contactEmail) lines.push(`Email: ${form.contactEmail}`);
  if (form.websiteUrl) lines.push(`Website: ${form.websiteUrl}`);
  lines.push(``);
  lines.push(`---`);
  lines.push(`This cookie policy was generated using ToolCraftKit.com`);

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
  const [cookies, setCookies] = useState<CookieTypes>({
    essential: true,
    analytics: true,
    marketing: false,
    socialMedia: false,
    preference: true,
  });
  const [consent, setConsent] = useState<ConsentMechanism>("banner");
  const [region, setRegion] = useState<Region>("general");
  const [policy, setPolicy] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCookie = (field: keyof CookieTypes) => {
    if (field === "essential") return;
    setCookies((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleGenerate = () => {
    if (!form.websiteName.trim()) { setError("Please enter your website name."); return; }
    if (!form.contactEmail.trim()) { setError("Please enter a contact email address."); return; }
    setError("");
    const result = generateCookiePolicy(form, cookies, consent, region);
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
    a.download = `cookie-policy-${form.websiteName.replace(/\s+/g, "-").toLowerCase() || "website"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [policy, form.websiteName]);

  const cookieOptions: { key: keyof CookieTypes; label: string; desc: string; locked?: boolean }[] = [
    { key: "essential", label: "Essential Cookies", desc: "Required for the site to function. Session management, authentication, security. Always enabled.", locked: true },
    { key: "analytics", label: "Analytics Cookies", desc: "Google Analytics or similar services. Track page views, sessions, bounce rate, and visitor behavior." },
    { key: "marketing", label: "Marketing / Advertising Cookies", desc: "Google Ads, Facebook Pixel, retargeting. Used to deliver personalized ads and measure campaign effectiveness." },
    { key: "socialMedia", label: "Social Media Cookies", desc: "Facebook, Twitter, YouTube, Pinterest. Enable sharing features and may track browsing across sites." },
    { key: "preference", label: "Preference / Functionality Cookies", desc: "Remember your language, theme, font size, and other display settings across visits." },
  ];

  return (
    <div style={s.page}>
      <ToolSchema
        name="Cookie Policy Generator"
        description="Generate a professional cookie policy for your website in seconds. Covers essential, analytics, marketing cookies. GDPR compliant. Free, no signup."
        slug="cookie-policy-generator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://toolcraftkit.com" },
        { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" },
        { name: "Cookie Policy Generator", url: "https://toolcraftkit.com/tools/cookie-policy-generator" },
      ]} />

      <h1 style={s.h1}>Cookie Policy Generator</h1>
      <p style={s.sub}>Generate a professional cookie policy for your website. GDPR, UK, and CCPA compliant. Free, no signup required.</p>

      {/* ─── Website Details ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Website Details</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Website Name <span style={s.required}>*</span></label>
            <input type="text" value={form.websiteName} onChange={(e) => updateForm("websiteName", e.target.value)} placeholder="My Website" style={s.input} />
          </div>
          <div>
            <label style={s.label}>Website URL</label>
            <input type="text" value={form.websiteUrl} onChange={(e) => updateForm("websiteUrl", e.target.value)} placeholder="https://example.com" style={s.input} />
          </div>
        </div>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Contact Email <span style={s.required}>*</span></label>
            <input type="email" value={form.contactEmail} onChange={(e) => updateForm("contactEmail", e.target.value)} placeholder="privacy@example.com" style={s.input} />
          </div>
          <div>
            <label style={s.label}>Company Name <span style={{ color: "#78716C", fontWeight: 400 }}>(optional)</span></label>
            <input type="text" value={form.companyName} onChange={(e) => updateForm("companyName", e.target.value)} placeholder="Acme Inc." style={s.input} />
          </div>
        </div>
        <label style={s.label}>Effective Date</label>
        <input type="date" value={form.effectiveDate} onChange={(e) => updateForm("effectiveDate", e.target.value)} style={{ ...s.input, maxWidth: 220 }} />
      </div>

      {/* ─── Cookie Types ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>What Cookies Does Your Site Use?</h2>
        {cookieOptions.map((opt) => (
          <div key={opt.key}>
            <div style={{ ...s.checkRow, opacity: opt.locked ? 0.7 : 1 }} onClick={() => toggleCookie(opt.key)}>
              <input
                type="checkbox"
                checked={cookies[opt.key]}
                onChange={() => toggleCookie(opt.key)}
                disabled={opt.locked}
                style={{ width: 18, height: 18, accentColor: "#0D9488", cursor: opt.locked ? "not-allowed" : "pointer", flexShrink: 0 }}
              />
              <span style={s.checkLabel}>{opt.label}</span>
            </div>
            <p style={s.checkDesc}>{opt.desc}</p>
          </div>
        ))}
      </div>

      {/* ─── Consent Mechanism ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Cookie Consent Mechanism</h2>
        <label style={s.label}>How do you collect cookie consent?</label>
        <select value={consent} onChange={(e) => setConsent(e.target.value as ConsentMechanism)} style={s.select}>
          <option value="banner">Cookie Banner (bottom bar with Accept/Reject)</option>
          <option value="popup">Cookie Popup (modal with granular controls)</option>
          <option value="implicit">Implicit Consent (continued browsing = consent)</option>
        </select>
        <p style={{ fontSize: 12, color: "#78716C", marginTop: 0 }}>
          {consent === "banner" && "A non-intrusive bar at the top or bottom of the page. Recommended for most websites."}
          {consent === "popup" && "A modal dialog with options to accept, reject, or customize cookie categories. Best for GDPR compliance."}
          {consent === "implicit" && "Consent is assumed when the user continues browsing. Not recommended for EU/UK audiences."}
        </p>
      </div>

      {/* ─── Region ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Target Region / Regulation</h2>
        <label style={s.label}>Select the primary regulation that applies to your visitors</label>
        <select value={region} onChange={(e) => setRegion(e.target.value as Region)} style={s.select}>
          <option value="general">General (worldwide, no specific regulation)</option>
          <option value="gdpr">EU / GDPR (European Union users)</option>
          <option value="uk">UK (United Kingdom — UK GDPR + PECR)</option>
          <option value="ccpa">California / CCPA (California residents)</option>
        </select>
        <p style={{ fontSize: 12, color: "#78716C", marginTop: 0 }}>
          {region === "gdpr" && "Adds GDPR-specific consent requirements, user rights, and legal basis for cookie processing."}
          {region === "uk" && "Adds UK GDPR and PECR-specific requirements, including ICO complaint rights."}
          {region === "ccpa" && "Adds CCPA-specific rights: right to know, delete, opt out, and non-discrimination."}
          {region === "general" && "Generates a standard cookie policy suitable for most websites worldwide."}
        </p>
      </div>

      {/* ─── Generate Button ─── */}
      {error && (
        <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: "#DC2626" }}>
          {error}
        </div>
      )}
      <button onClick={handleGenerate} style={s.btn}>
        Generate Cookie Policy
      </button>

      {/* ─── Output ─── */}
      {policy && (
        <div style={{ ...s.output, marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", margin: 0 }}>Your Cookie Policy</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleCopy} style={s.btnSecondary}>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button onClick={handleDownload} style={s.btnSecondary}>
                Download .txt
              </button>
            </div>
          </div>
          <textarea value={policy} readOnly style={s.textarea} />
          <p style={{ fontSize: 12, color: "#78716C", marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
            Disclaimer: This generated cookie policy is provided as a starting point and general template. It is not legal advice. We recommend having a qualified legal professional review your cookie policy before publishing it to ensure full compliance with applicable laws and regulations.
          </p>
        </div>
      )}

      {/* ─── SEO Content ─── */}
      <SeoContent />
    </div>
  );
}

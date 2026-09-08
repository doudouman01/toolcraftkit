"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [color, setColor] = useState("#0D9488");
  const [copied, setCopied] = useState(false);

  const sigHtml = `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#333;line-height:1.5"><tr><td style="border-right:3px solid ${color};padding-right:16px;vertical-align:top"><strong style="font-size:16px;color:${color}">${name || "Your Name"}</strong><br/>${title ? `<span style="color:#666">${title}</span><br/>` : ""}${company ? `<strong>${company}</strong><br/>` : ""}</td><td style="padding-left:16px;vertical-align:top">${phone ? `📞 ${phone}<br/>` : ""}${email ? `✉️ <a href="mailto:${email}" style="color:${color};text-decoration:none">${email}</a><br/>` : ""}${website ? `🌐 <a href="${website.startsWith("http") ? website : "https://" + website}" style="color:${color};text-decoration:none">${website}</a><br/>` : ""}${linkedin ? `💼 <a href="${linkedin.startsWith("http") ? linkedin : "https://" + linkedin}" style="color:${color};text-decoration:none">LinkedIn</a>` : ""}</td></tr></table>`;

  const copyHtml = () => {
    const blob = new Blob([sigHtml], { type: "text/html" });
    navigator.clipboard.write([new ClipboardItem({ "text/html": blob })]).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    }).catch(() => {
      navigator.clipboard.writeText(sigHtml);
      setCopied(true); setTimeout(() => setCopied(false), 1500);
    });
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12 } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    preview: { background: "#f9fafb", border: "1px solid #E7E5E4", borderRadius: 8, padding: 20, marginBottom: 16 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Email Signature Generator" description="Create a professional email signature for free. Copy and paste into Gmail, Outlook, or any email client." slug="email-signature-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" }, { name: "Email Signature Generator", url: "https://toolcraftkit.com/tools/email-signature-generator" }]} />
      <h1 style={s.h1}>Email Signature Generator</h1>
      <p style={s.sub}>Create a professional email signature. Copy and paste into Gmail, Outlook, or any email client.</p>

      <div style={s.card}>
        <label style={s.label}>Full Name *</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" style={s.input} />
        <label style={s.label}>Job Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Marketing Manager" style={s.input} />
        <label style={s.label}>Company</label>
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Inc." style={s.input} />
        <label style={s.label}>Phone</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 234 567 8900" style={s.input} />
        <label style={s.label}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@acme.com" style={s.input} />
        <label style={s.label}>Website</label>
        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="www.acme.com" style={s.input} />
        <label style={s.label}>LinkedIn URL</label>
        <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="linkedin.com/in/johndoe" style={s.input} />
        <div style={{ marginBottom: 0 }}>
          <label style={s.label}>Accent Color</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: 48, height: 38, border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer" }} />
        </div>
      </div>

      <div style={s.card}>
        <label style={s.label}>Preview</label>
        <div style={s.preview} dangerouslySetInnerHTML={{ __html: sigHtml }} />
        <button onClick={copyHtml} style={s.btn}>{copied ? "Copied!" : "Copy Signature"}</button>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Create a clean, professional email signature in seconds. Works with Gmail, Outlook, Apple Mail, Yahoo, and any HTML-compatible email client. Just fill in your details, choose a color, and copy-paste into your email settings.</p>
      </div>
    </div>
  );
}

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Secure Your Online Accounts: A Complete Security Checklist",
  description: "Protect your email, social media, banking, and cloud accounts. Step-by-step security checklist with free tools.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Secure Your Online Accounts: A Complete Security Checklist</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Account security is not just for tech-savvy people — it is for everyone who has an email address, social media profile, or online banking account. A compromised email account can cascade into identity theft, financial fraud, and privacy violations. These steps take 30 minutes to implement and protect you for years.</p>

        <h2 style={s.h2}>Step 1: Audit Your Passwords</h2>
        <p style={s.p}>Check haveibeenpwned.com to see if your email appears in known data breaches. If it does, change the password on every account that uses the breached password. Going forward, use a unique password for every account. Our Password Generator creates secure passwords that you store in a password manager.</p>

        <h2 style={s.h2}>Step 2: Enable Two-Factor Authentication</h2>
        <p style={s.p}>Enable 2FA on your most important accounts first: email, banking, and social media. Use an authenticator app (Google Authenticator, Authy) rather than SMS codes — SIM swapping attacks can intercept text messages. Store backup codes in a safe place (not on your phone) in case you lose access to your authenticator.</p>

        <h2 style={s.h2}>Step 3: Review Connected Apps</h2>
        <p style={s.p}>Check which third-party apps have access to your accounts (Google Account {'>'} Security {'>'} Third-party apps, Twitter {'>'} Settings {'>'} Security {'>'} Apps). Revoke access for any app you no longer use. Each connected app is a potential entry point if that app is compromised.</p>

        <h2 style={s.h2}>Step 4: Ongoing Maintenance</h2>
        <p style={s.p}>Update passwords for critical accounts annually. Review 2FA settings when you change phones. Monitor your accounts for unauthorized activity. Set up login notifications so you are alerted when someone accesses your account from a new device. These maintenance tasks take 15 minutes quarterly and prevent the vast majority of account compromises.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Password Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/password-generator" style={s.cta}>Open Password Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/qr-code" style={{ color: "#0D9488" }}>QR Code Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

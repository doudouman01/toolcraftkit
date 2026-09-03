import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a Strong Password in 2026 (Best Practices)",
  description: "Learn what makes a password strong, how long it takes hackers to crack weak passwords, and best practices for creating secure passwords you can actually remember.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    table: { width: "100%", borderCollapse: "collapse" as const, marginBottom: 20, fontSize: 14 },
    th: { padding: "10px 12px", background: "#F5F5F4", textAlign: "left" as const, fontWeight: 600, fontSize: 13, borderBottom: "2px solid #E7E5E4" },
    td: { padding: "10px 12px", borderBottom: "1px solid #F5F5F4" },
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Create a Strong Password in 2026</h1>
        <p style={s.meta}>September 3, 2026 · 5 min read</p>

        <p style={s.p}>Most people use passwords that can be cracked in seconds. The average data breach exposes millions of credentials, and reused passwords mean one breach can compromise dozens of your accounts. Creating strong, unique passwords is no longer optional — it is a basic requirement for digital safety.</p>

        <h2 style={s.h2}>How Fast Can a Password Be Cracked?</h2>
        <table style={s.table}>
          <thead>
            <tr><th style={s.th}>Password Type</th><th style={s.th}>Example</th><th style={s.th}>Time to Crack</th></tr>
          </thead>
          <tbody>
            {[
              ["6 lowercase letters", "hello1", "Instant"],
              ["8 mixed case", "Hello123", "~1 minute"],
              ["10 mixed + symbols", "H3llo!W0rk", "~2 weeks"],
              ["12 mixed + symbols", "T#9kL$mP2!xQ", "~200 years"],
              ["16 mixed + symbols", "w$K9#pL2mN!xQr7&", "Millions of years"],
              ["4-word passphrase", "correct-horse-battery-staple", "~550 years"],
            ].map(([type, ex, time], i) => (
              <tr key={i}><td style={s.td}>{type}</td><td style={s.td}>{ex}</td><td style={s.td}>{time}</td></tr>
            ))}
          </tbody>
        </table>
        <p style={s.p}>These estimates assume a brute-force attack using modern hardware. Dictionary attacks and leaked password databases make common passwords vulnerable regardless of length.</p>

        <h2 style={s.h2}>What Makes a Password Strong</h2>
        <p style={s.p}><strong>Length is the most important factor.</strong> A 16-character password is exponentially harder to crack than an 8-character one, even if the shorter one uses special characters. Aim for at least 12 characters, ideally 16 or more.</p>
        <p style={s.p}><strong>Mix character types</strong> — uppercase, lowercase, numbers, and symbols. Each type multiplies the number of possible combinations a brute-force attack must try.</p>
        <p style={s.p}><strong>Avoid dictionary words, names, dates, and patterns.</strong> Attackers test common substitutions (@ for a, 3 for e, 1 for l) before resorting to brute force. &quot;P@ssw0rd&quot; is not secure.</p>
        <p style={s.p}><strong>Never reuse passwords.</strong> If one account is breached, every account sharing that password is compromised. Use a unique password for every service.</p>

        <h2 style={s.h2}>The Passphrase Method</h2>
        <p style={s.p}>A passphrase is a sequence of random, unrelated words — like &quot;purple-hammer-ocean-bicycle.&quot; It is long enough to resist brute force, random enough to resist dictionary attacks, and far easier to remember than a string of random characters. Add a number and symbol between words for extra strength.</p>

        <h2 style={s.h2}>Why You Need a Password Manager</h2>
        <p style={s.p}>The only practical way to use strong, unique passwords for every account is with a password manager. These tools generate random passwords, store them encrypted, and auto-fill them when you log in. You only need to remember one master password. Popular options include Bitwarden (free, open-source), 1Password, and KeePass.</p>

        <h2 style={s.h2}>Two-Factor Authentication (2FA)</h2>
        <p style={s.p}>Even the strongest password can be phished or leaked. Two-factor authentication adds a second layer — typically a code from an app like Google Authenticator or a hardware key like YubiKey. Enable 2FA on every account that supports it, especially email, banking, and social media.</p>

        <h2 style={s.h2}>Generate a Strong Password Now</h2>
        <p style={s.p}>Use our free Password Generator to create cryptographically secure passwords instantly. Customize length, character types, and format — no data is ever stored or transmitted.</p>
        <Link href="/tools/password-generator" style={s.cta}>Open Password Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need a QR code for your WiFi password? Our <Link href="/tools/qr-code" style={{ color: "#0D9488" }}>QR Code Generator</Link> creates shareable WiFi codes so guests can connect without typing the password.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

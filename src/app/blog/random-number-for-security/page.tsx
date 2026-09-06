import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Random Number Generator for Passwords, PINs & Security Tokens",
  description: "Generate cryptographically secure random numbers for passwords, PINs, verification codes, and API keys. Why true randomness matters for security.",
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
        <h1 style={s.h1}>Random Number Generator for Passwords, PINs & Security Tokens</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>In security, randomness is everything. A password that follows a pattern can be guessed. A PIN that is a birthday can be cracked. An API key generated from a weak random source can be predicted. Understanding the difference between casual randomness and cryptographic randomness is essential for anyone handling sensitive data.</p>

        <h2 style={s.h2}>True Random vs Pseudo-Random</h2>
        <p style={s.p}>Most random number generators use algorithms that produce sequences that look random but are actually deterministic — given the same seed, they produce the same sequence. Cryptographically secure random number generators (CSPRNGs) use system entropy (mouse movements, hardware noise, timing variations) to produce numbers that cannot be predicted even with full knowledge of the algorithm.</p>

        <h2 style={s.h2}>PINs and Verification Codes</h2>
        <p style={s.p}>A 4-digit PIN has 10,000 possible combinations. If the digits are truly random, an attacker must try all 10,000. But if the PIN follows a pattern (1234, 0000, birth year), the search space collapses to a few hundred guesses. Always generate PINs randomly, and avoid obvious patterns like sequential numbers or repeated digits.</p>

        <h2 style={s.h2}>API Keys and Tokens</h2>
        <p style={s.p}>API keys should be generated using cryptographic random generators with enough length to prevent brute-force attacks. A 32-character hexadecimal key has 16^32 possible values — computationally infeasible to guess. Never generate API keys by hand or from timestamps. Use a proper CSPRNG or a purpose-built key generation function.</p>

        <h2 style={s.h2}>Session Tokens and OTPs</h2>
        <p style={s.p}>One-time passwords (OTPs) must be random and time-limited. A 6-digit OTP valid for 30 seconds provides reasonable security for two-factor authentication. The key is that each OTP must be independently generated — knowing the current OTP should reveal nothing about the next one. This requires cryptographic randomness, not simple sequential generation.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Random Number Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/random-number-generator" style={s.cta}>Open Random Number Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/password-generator" style={{ color: "#0D9488" }}>Password Generator</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

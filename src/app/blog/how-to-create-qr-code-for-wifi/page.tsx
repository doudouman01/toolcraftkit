import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Create a QR Code for Your WiFi Network (Free, No App)",
  description: "Generate a free WiFi QR code so guests can connect by scanning. Step-by-step guide with no app or signup required.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
    step: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: "16px 20px", marginBottom: 12 } as const,
    stepNum: { fontSize: 13, fontWeight: 700, color: "#0D9488", marginBottom: 4 } as const,
    stepText: { fontSize: 14, color: "#1C1917", lineHeight: 1.6 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>How to Create a QR Code for Your WiFi Network</h1>
        <p style={s.meta}>August 22, 2026 · 3 min read</p>

        <p style={s.p}>Tired of spelling out your WiFi password to every guest, customer, or Airbnb visitor? A WiFi QR code lets people connect to your network instantly — they just scan it with their phone camera and they&apos;re online. No typing, no mistakes, no repeating yourself.</p>

        <p style={s.p}>The best part: you can create one for free in under 30 seconds, right in your browser, with no app to install and no signup required.</p>

        <h2 style={s.h2}>Step-by-Step: Create Your WiFi QR Code</h2>

        <div style={s.step}><div style={s.stepNum}>STEP 1</div><div style={s.stepText}>Open the <Link href="/tools/qr-code-generator" style={{ color: "#0D9488", fontWeight: 600 }}>QR Code Generator</Link> and click the <strong>WiFi</strong> tab.</div></div>
        <div style={s.step}><div style={s.stepNum}>STEP 2</div><div style={s.stepText}>Enter your <strong>Network Name (SSID)</strong> — this is the name that appears when you search for WiFi on your phone.</div></div>
        <div style={s.step}><div style={s.stepNum}>STEP 3</div><div style={s.stepText}>Enter your <strong>WiFi password</strong>. Don&apos;t worry — this stays in your browser and is never sent to any server.</div></div>
        <div style={s.step}><div style={s.stepNum}>STEP 4</div><div style={s.stepText}>Select your <strong>security type</strong> — WPA is the most common (used by almost all modern routers). If unsure, WPA is the safe choice.</div></div>
        <div style={s.step}><div style={s.stepNum}>STEP 5</div><div style={s.stepText}><strong>Download the QR code</strong> as a PNG image. Print it and place it near your router, on the fridge, at the reception desk, or in your Airbnb welcome packet.</div></div>

        <Link href="/tools/qr-code-generator" style={s.cta}>Create Your WiFi QR Code →</Link>

        <h2 style={s.h2}>Where to Use Your WiFi QR Code</h2>
        <p style={s.p}><strong>At home:</strong> Print it on a small card and stick it on the fridge or near the router. No more dictating passwords to guests.</p>
        <p style={s.p}><strong>In a cafe or restaurant:</strong> Put it on table tents, menus, or the wall near the counter. Customers connect themselves without asking staff.</p>
        <p style={s.p}><strong>In an Airbnb or rental:</strong> Include it in your welcome guide. Guests love not having to type a random 20-character password.</p>
        <p style={s.p}><strong>At the office:</strong> Print it in the meeting room or reception area for visitors.</p>

        <h2 style={s.h2}>How Does It Work?</h2>
        <p style={s.p}>A WiFi QR code encodes your network name, password, and security type in a standard format that smartphones understand. When someone scans it with their camera app (iPhone) or Google Lens (Android), the phone automatically prompts them to join the network — no manual typing needed.</p>

        <h2 style={s.h2}>Is It Secure?</h2>
        <p style={s.p}>The QR code itself contains your WiFi password, so treat it like you would the password itself — display it where your intended users can see it, but not publicly if your network should be private. If you change your WiFi password, you&apos;ll need to generate a new QR code.</p>

        <p style={s.p}>Our generator runs entirely in your browser. Your password is never uploaded to any server.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

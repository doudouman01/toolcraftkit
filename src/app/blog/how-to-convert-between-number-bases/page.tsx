import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Convert Between Binary, Decimal, Hexadecimal & Octal",
  description: "Understand number bases used in computing. Convert between binary, decimal, hex, and octal with explanations and a free converter.",
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
        <h1 style={s.h1}>How to Convert Between Binary, Decimal, Hexadecimal & Octal</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Computers think in binary. Programmers think in decimal. Memory addresses use hexadecimal. File permissions use octal. Understanding how to convert between these number systems is a foundational skill for anyone working with computers at a technical level.</p>

        <h2 style={s.h2}>Why Different Bases Exist</h2>
        <p style={s.p}>Binary (base 2) is how computers actually store and process data — everything is 0s and 1s. Decimal (base 10) is how humans naturally count. Hexadecimal (base 16) is a compact way to represent binary — each hex digit represents exactly 4 binary digits. Octal (base 8) represents 3 binary digits and is used for Unix file permissions.</p>

        <h2 style={s.h2}>Binary to Decimal</h2>
        <p style={s.p}>Each binary digit represents a power of 2 from right to left: 1, 2, 4, 8, 16, 32, 64, 128. The binary number 11010110 = 128+64+16+4+2 = 214 in decimal. Add up the values where the binary digit is 1, skip where it is 0.</p>

        <h2 style={s.h2}>Hexadecimal Essentials</h2>
        <p style={s.p}>Hex uses digits 0-9 plus letters A-F (10-15). The hex number FF = 15×16 + 15 = 255 in decimal. Colors use hex because each channel (R, G, B) ranges from 0 to 255, which is 00 to FF in hex. Memory addresses use hex because it is much more compact than binary: FF is easier to read than 11111111.</p>

        <h2 style={s.h2}>Practical Applications</h2>
        <p style={s.p}>Web colors: #0D9488 is three hex pairs representing RGB. File permissions: chmod 755 means owner rwx (7=111), group rx (5=101), others rx (5=101). IP addresses: internally stored as 32-bit binary numbers. MAC addresses: displayed as hex pairs separated by colons. Understanding these conversions makes you a more effective developer.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Base64 Encoder handles this instantly — no signup, no limits.</p>
        <Link href="/tools/base64" style={s.cta}>Open Base64 Encoder →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/regex-tester" style={{ color: "#0D9488" }}>Regex Tester</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

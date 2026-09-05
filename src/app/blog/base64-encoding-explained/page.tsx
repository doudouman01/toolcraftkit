import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Base64 Encoding Explained: How to Encode and Decode Data Online",
  description: "Learn what Base64 encoding is, how it works, and when to use it. Encode and decode strings, images, and data instantly with a free online tool.",
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
        <h1 style={s.h1}>Base64 Encoding Explained: How to Encode and Decode Data Online</h1>
        <p style={s.meta}>September 5, 2026 · 5 min read</p>

        <p style={s.p}>Base64 encoding is everywhere in modern development, yet many developers use it without fully understanding how it works or when it is appropriate. From JWT tokens and API payloads to email attachments and inline images in CSS, Base64 is the standard way to represent binary data as text-safe characters.</p>

        <h2 style={s.h2}>What Is Base64?</h2>
        <p style={s.p}>Base64 is a binary-to-text encoding method that converts any type of data — files, images, or raw bytes — into a sequence of ASCII-friendly characters. It uses a 64-character alphabet (A-Z, a-z, 0-9, +, /) plus padding with the = character. The result is a text string that can safely travel through systems designed for text, like email protocols, JSON payloads, and URL parameters.</p>

        <h2 style={s.h2}>How It Works</h2>
        <p style={s.p}>Base64 takes three bytes of binary data (24 bits) and splits them into four groups of 6 bits each. Each 6-bit group maps to one of the 64 characters in the Base64 alphabet. This means the encoded output is always about 33 percent larger than the original data — three bytes become four characters.</p>
        <p style={s.p}>When the input is not a multiple of three bytes, padding characters (=) are added to complete the final group. One padding character means two bytes were encoded; two padding characters mean one byte was encoded.</p>

        <h2 style={s.h2}>When to Use Base64</h2>
        <p style={s.p}><strong>Email attachments</strong> — email protocols were designed for text. Binary files like PDFs, images, and documents are Base64-encoded before being embedded in email messages.</p>
        <p style={s.p}><strong>Data URIs</strong> — small images can be embedded directly in HTML or CSS as Base64 strings, eliminating the need for separate image file requests. This can improve page load time for small icons and logos.</p>
        <p style={s.p}><strong>API communication</strong> — when sending binary data through JSON APIs, Base64 encoding ensures the data survives the text-based transmission without corruption.</p>
        <p style={s.p}><strong>JWT tokens</strong> — JSON Web Tokens use Base64URL encoding (a URL-safe variant) for their header and payload sections.</p>

        <h2 style={s.h2}>When NOT to Use Base64</h2>
        <p style={s.p}>Base64 is not encryption. It provides zero security — anyone can decode a Base64 string instantly. Never use it to protect sensitive information. It is also not compression — it actually makes data 33 percent larger. For large files, use proper binary transfer methods instead of Base64 encoding.</p>

        <h2 style={s.h2}>Common Pitfalls</h2>
        <p style={s.p}><strong>Padding errors</strong> — mixing standard Base64 (with = padding) and Base64URL (without padding) causes decoding failures. Know which variant your system expects.</p>
        <p style={s.p}><strong>Character set confusion</strong> — standard Base64 uses + and /, while Base64URL uses - and _. Using the wrong alphabet produces corrupt output.</p>
        <p style={s.p}><strong>Large file encoding</strong> — Base64-encoding a 10 MB image produces a 13.3 MB string. For large files, this overhead is significant and usually unnecessary.</p>

        <h2 style={s.h2}>Encode and Decode Now</h2>
        <p style={s.p}>Our free Base64 Encoder/Decoder handles both encoding and decoding in your browser. Paste a string, encode it, or paste a Base64 string and decode it — instantly and privately.</p>
        <Link href="/tools/base64" style={s.cta}>Open Base64 Encoder →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Need to test patterns in your decoded data? Our <Link href="/tools/regex-tester" style={{ color: "#0D9488" }}>Regex Tester</Link> lets you search and match text with regular expressions.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

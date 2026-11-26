import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JWT Decoder: Decode and Inspect JSON Web Tokens Online | ToolCraftKit",
  description:
    "Decode JWT tokens instantly in your browser. Inspect header, payload, claims, and expiration status. Free, private, no data sent to any server.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    ul: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14, paddingLeft: 24 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>
          ← Back to Blog
        </Link>

        <h1 style={s.h1}>Free JWT Decoder: Decode and Inspect JSON Web Tokens Online</h1>
        <p style={s.meta}>November 25, 2026 · 8 min read</p>

        <p style={s.p}>
          If you have ever stared at a long string of Base64 gibberish in an Authorization header and wondered what it
          actually says, you are not alone. <strong>JSON Web Tokens (JWTs)</strong> are the backbone of modern
          authentication — used by OAuth, OpenID Connect, and virtually every API that issues session tokens — but their
          encoded format makes debugging painful without a proper tool. A <strong>JWT decoder</strong> cracks open that
          token so you can see the header, payload, and claims in plain JSON, right in your browser, without sending
          sensitive credentials to any third-party server.
        </p>

        <h2 style={s.h2}>What Is a JWT, and Why Should You Care?</h2>
        <p style={s.p}>
          A JSON Web Token is a compact, URL-safe string that carries a set of claims between two parties. When you log
          in to a web application, the server typically issues a JWT that your browser stores and sends back with every
          subsequent request. The server verifies the token&apos;s signature and grants access without hitting a database
          on every call. That stateless architecture is what makes JWTs fast and scalable — and what makes understanding
          them essential for every developer.
        </p>
        <p style={s.p}>
          A JWT has three parts separated by dots: <strong>header</strong>, <strong>payload</strong>, and{" "}
          <strong>signature</strong>. Each part is Base64URL-encoded, which is why the raw token looks like random
          characters. Decoding the first two parts reveals ordinary JSON objects; the third part is a cryptographic hash
          that proves the token has not been tampered with.
        </p>

        <h2 style={s.h2}>The Three Parts of a JWT Explained</h2>
        <p style={s.p}>
          <strong>Header:</strong> This tiny JSON object tells you two things — the signing algorithm (usually HS256 or
          RS256) and the token type (always &quot;JWT&quot;). If you see an unexpected algorithm — like &quot;none&quot;
          — that is a red flag. The &quot;none&quot; algorithm attack is a classic JWT vulnerability where an attacker
          strips the signature entirely and the server accepts the token because it was configured to allow unsigned
          tokens.
        </p>
        <p style={s.p}>
          <strong>Payload:</strong> This is where the useful data lives. It contains claims — key-value pairs that
          describe the user and the session. Standard claims include <code>iss</code> (issuer), <code>sub</code>{" "}
          (subject — usually the user ID), <code>aud</code> (audience — who the token is intended for),{" "}
          <code>exp</code> (expiration timestamp), <code>iat</code> (issued at), and <code>nbf</code> (not before). You
          can also find custom claims like roles, permissions, or tenant IDs. The payload is not encrypted — anyone who
          intercepts the token can read it. Never put passwords, credit card numbers, or sensitive secrets in the
          payload.
        </p>
        <p style={s.p}>
          <strong>Signature:</strong> This is what makes JWTs trustworthy. The server signs the header and payload using
          a secret key (HS256) or a private key (RS256). When the token comes back, the server recalculates the
          signature and compares. If a single character in the header or payload was changed, the signatures will not
          match, and the server rejects the token.
        </p>

        <h2 style={s.h2}>Common JWT Claims Every Developer Should Know</h2>
        <ul style={s.ul}>
          <li><strong>exp (expiration):</strong> A Unix timestamp after which the token is invalid. If your API returns 401 errors randomly, the first thing to check is whether the token has expired.</li>
          <li><strong>iat (issued at):</strong> When the token was created. Useful for detecting tokens that are suspiciously old.</li>
          <li><strong>sub (subject):</strong> Usually the user&apos;s unique identifier. This is what your backend uses to look up the user&apos;s profile and permissions.</li>
          <li><strong>iss (issuer):</strong> Identifies which server or service issued the token. In multi-service architectures, this prevents one service from accepting tokens issued by another.</li>
          <li><strong>aud (audience):</strong> Specifies who the token is intended for. A token with <code>aud: &quot;api.example.com&quot;</code> should be rejected by <code>dashboard.example.com</code>.</li>
          <li><strong>nbf (not before):</strong> The token is invalid before this timestamp. Less common but useful for pre-issued tokens that should activate at a specific time.</li>
        </ul>

        <h2 style={s.h2}>Debugging JWT Issues: A Practical Workflow</h2>
        <p style={s.p}>
          When authentication breaks, the token is usually the first suspect. Here is a systematic approach:
        </p>
        <p style={s.p}>
          <strong>Step 1: Decode the token.</strong> Paste it into the{" "}
          <Link href="/tools/jwt-decoder" style={{ color: "#0D9488" }}>JWT Decoder</Link>. Check the{" "}
          <code>exp</code> claim first — an expired token is the most common cause of random 401 errors.
        </p>
        <p style={s.p}>
          <strong>Step 2: Verify the claims.</strong> Is the <code>sub</code> the right user? Is the <code>aud</code>{" "}
          correct for the service you are calling? Mismatched audience claims are a frequent source of cross-service
          authentication failures.
        </p>
        <p style={s.p}>
          <strong>Step 3: Check the algorithm.</strong> If your server expects RS256 but the token was signed with HS256,
          verification will fail silently. This mismatch often happens when switching between identity providers.
        </p>
        <p style={s.p}>
          <strong>Step 4: Look at the timestamps.</strong> Compare <code>iat</code> and <code>exp</code>. If the
          difference is only 300 seconds (5 minutes), your tokens expire aggressively. Consider whether your refresh
          token flow is working correctly.
        </p>

        <h2 style={s.h2}>Security Considerations When Decoding JWTs</h2>
        <p style={s.p}>
          Never paste production JWTs into online tools that send your token to a server. Even if the service claims to
          be secure, you are handing over session credentials that could grant full access to a user&apos;s account. Our{" "}
          <Link href="/tools/jwt-decoder" style={{ color: "#0D9488" }}>JWT Decoder</Link> runs entirely in your browser.
          The token never leaves your machine — there is no API call, no server-side processing, no logging. Open your
          browser&apos;s network tab while using it and you will see zero outbound requests.
        </p>
        <p style={s.p}>
          This matters especially in regulated environments. If you work in healthcare, fintech, or government, sending a
          JWT to an external service could violate your organization&apos;s security policies. A client-side decoder
          eliminates that risk entirely.
        </p>

        <h2 style={s.h2}>JWTs vs. Sessions: When to Use Which</h2>
        <p style={s.p}>
          JWTs are not always the right choice. Server-side sessions (stored in a database or Redis) give you instant
          revocation — log a user out and their session is gone. With JWTs, the token remains valid until it expires,
          even after a password change or account suspension. That is why short expiration times and refresh token
          rotation are critical when using JWTs.
        </p>
        <p style={s.p}>
          Use JWTs when you need stateless authentication across multiple services. Use server-side sessions when you
          need fine-grained control over active sessions and instant revocation.
        </p>

        <h2 style={s.h2}>Pair It With Other Developer Tools</h2>
        <p style={s.p}>
          Debugging rarely involves just one tool. If you are inspecting API responses, the{" "}
          <Link href="/tools/json-formatter" style={{ color: "#0D9488" }}>JSON Formatter</Link> cleans up raw JSON
          payloads. If you are encoding or decoding arbitrary data, the{" "}
          <Link href="/tools/base64" style={{ color: "#0D9488" }}>Base64 Encoder/Decoder</Link> handles that. And if you
          are building the API itself, check our{" "}
          <Link href="/tools/code-formatter" style={{ color: "#0D9488" }}>Code Formatter</Link> for clean, readable
          source code. For a full picture of the AI-powered tools reshaping development workflows, visit{" "}
          <a href="https://aigradelab.com/en/blog/best-ai-coding-tools-2026" style={{ color: "#0D9488" }} target="_blank" rel="noopener">AIGradeLab&apos;s Best AI Coding Tools guide</a>.
        </p>

        <Link href="/tools/jwt-decoder" style={s.cta}>
          Decode a JWT Now — Free →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}

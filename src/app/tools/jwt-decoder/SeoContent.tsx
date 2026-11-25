"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the JWT Decoder</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Paste any JSON Web Token into the input field. The decoder automatically splits the token into its three parts — header, payload, and signature — and displays each in formatted JSON. Standard claims like issuer (iss), subject (sub), expiration (exp), and issued-at (iat) are highlighted in a table with timestamps converted to human-readable dates.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why JWT Decoding Matters</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>JSON Web Tokens are the backbone of modern authentication. When debugging login issues, verifying API access, or inspecting OAuth flows, you need to see what is inside the token. This decoder lets you inspect any JWT instantly — checking which algorithm was used, whether the token has expired, and what claims it carries — without installing anything or sending your token to a server.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Debugging authentication issues in web and mobile applications</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Verifying token expiration before making API calls</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Inspecting OAuth 2.0 and OpenID Connect tokens during development</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Checking which claims and scopes an API token carries</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Teaching and learning about JWT structure and security</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `After decoding your JWT, format nested JSON payloads with our <a href='/tools/json-formatter' style='color:#0D9488'>JSON Formatter</a>, or encode/decode Base64 strings with our <a href='/tools/base64' style='color:#0D9488'>Base64 Encoder</a>.` }} />
      </div>
    </section>
  );
}

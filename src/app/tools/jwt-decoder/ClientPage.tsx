"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

const STANDARD_CLAIMS: Record<string, string> = {
  iss: "Issuer",
  sub: "Subject",
  aud: "Audience",
  exp: "Expiration Time",
  nbf: "Not Before",
  iat: "Issued At",
  jti: "JWT ID",
};

function base64UrlDecode(str: string): string {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return atob(s);
}

function formatTimestamp(ts: number): string {
  return new Date(ts * 1000).toLocaleString();
}

export default function ClientPage() {
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState("");

  const decoded = useMemo(() => {
    if (!token.trim()) return null;
    const parts = token.trim().split(".");
    if (parts.length !== 3) return { error: "Invalid JWT: expected 3 parts separated by dots, got " + parts.length };
    try {
      const header = JSON.parse(base64UrlDecode(parts[0]));
      const payload = JSON.parse(base64UrlDecode(parts[1]));
      const signature = parts[2];
      let expStatus: "valid" | "expired" | "none" = "none";
      if (payload.exp) {
        expStatus = payload.exp * 1000 > Date.now() ? "valid" : "expired";
      }
      return { header, payload, signature, expStatus, error: null };
    } catch (e: unknown) {
      return { error: "Failed to decode JWT: " + (e as Error).message };
    }
  }, [token]);

  const copy = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(""), 1500);
  };

  const s = {
    page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" as const },
    ta: { width: "100%", minHeight: 100, border: "1px solid #E7E5E4", borderRadius: 8, padding: 12, fontSize: 13, fontFamily: "'Courier New', monospace", resize: "vertical" as const, outline: "none", lineHeight: 1.6 } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    pre: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 8, padding: 14, fontSize: 13, fontFamily: "'Courier New', monospace", whiteSpace: "pre-wrap" as const, wordBreak: "break-all" as const, overflow: "auto", maxHeight: 300, lineHeight: 1.6 },
    badge: (bg: string, color: string) => ({ display: "inline-block", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, background: bg, color } as const),
  };

  return (
    <div style={s.page}>
      <ToolSchema name="JWT Decoder" description="Decode and inspect JSON Web Tokens. View header, payload, signature, and expiration status." slug="jwt-decoder" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "JWT Decoder", url: "https://toolcraftkit.com/tools/jwt-decoder" }]} />

      <h1 style={s.h1}>JWT Decoder</h1>
      <p style={s.sub}>Paste a JSON Web Token to decode and inspect its header, payload, and claims.</p>

      <div style={s.card}>
        <label style={s.label}>Paste JWT Token</label>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          style={s.ta}
        />
        {token.trim() && (
          <button onClick={() => setToken("")} style={{ ...s.btnSm, marginTop: 8 }}>Clear</button>
        )}
      </div>

      {decoded?.error && (
        <div style={{ ...s.card, background: "#FEF2F2", borderColor: "#FECACA" }}>
          <span style={{ color: "#DC2626", fontSize: 14, fontWeight: 600 }}>⚠ {decoded.error}</span>
        </div>
      )}

      {decoded && !decoded.error && (
        <>
          {/* Expiration Status */}
          <div style={{ ...s.card, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={s.label}>Status:</span>
            {decoded.expStatus === "valid" && <span style={s.badge("#DCFCE7", "#166534")}>✓ Valid (not expired)</span>}
            {decoded.expStatus === "expired" && <span style={s.badge("#FEE2E2", "#991B1B")}>✗ Expired</span>}
            {decoded.expStatus === "none" && <span style={s.badge("#FEF3C7", "#92400E")}>No exp claim</span>}
            {decoded.payload?.exp && (
              <span style={{ fontSize: 12, color: "#78716C" }}>
                Expires: {formatTimestamp(decoded.payload.exp)}
              </span>
            )}
          </div>

          {/* Header */}
          <div style={s.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ ...s.label, marginBottom: 0, fontSize: 15 }}>Header</span>
              <button onClick={() => copy(JSON.stringify(decoded.header, null, 2), "header")} style={s.btnSm}>
                {copied === "header" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre style={s.pre}>{JSON.stringify(decoded.header, null, 2)}</pre>
          </div>

          {/* Payload */}
          <div style={s.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ ...s.label, marginBottom: 0, fontSize: 15 }}>Payload</span>
              <button onClick={() => copy(JSON.stringify(decoded.payload, null, 2), "payload")} style={s.btnSm}>
                {copied === "payload" ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre style={s.pre}>{JSON.stringify(decoded.payload, null, 2)}</pre>
          </div>

          {/* Standard Claims Table */}
          {Object.keys(decoded.payload).some((k) => k in STANDARD_CLAIMS) && (
            <div style={s.card}>
              <span style={{ ...s.label, fontSize: 15, marginBottom: 12 }}>Standard Claims</span>
              <div style={{ overflow: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #E7E5E4" }}>
                      <th style={{ textAlign: "left", padding: "8px 12px", color: "#78716C", fontWeight: 600 }}>Claim</th>
                      <th style={{ textAlign: "left", padding: "8px 12px", color: "#78716C", fontWeight: 600 }}>Name</th>
                      <th style={{ textAlign: "left", padding: "8px 12px", color: "#78716C", fontWeight: 600 }}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(decoded.payload)
                      .filter(([k]) => k in STANDARD_CLAIMS)
                      .map(([k, v]) => (
                        <tr key={k} style={{ borderBottom: "1px solid #F5F5F4" }}>
                          <td style={{ padding: "8px 12px", fontFamily: "'Courier New', monospace", color: "#0D9488", fontWeight: 600 }}>{k}</td>
                          <td style={{ padding: "8px 12px", color: "#57534E" }}>{STANDARD_CLAIMS[k]}</td>
                          <td style={{ padding: "8px 12px", fontFamily: "'Courier New', monospace", color: "#1C1917" }}>
                            {(k === "exp" || k === "iat" || k === "nbf") && typeof v === "number"
                              ? `${v} (${formatTimestamp(v)})`
                              : typeof v === "object" ? JSON.stringify(v) : String(v)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Signature */}
          <div style={s.card}>
            <span style={{ ...s.label, fontSize: 15, marginBottom: 10 }}>Signature</span>
            <div style={{ ...s.pre, fontSize: 12, color: "#78716C", wordBreak: "break-all" as const }}>
              {decoded.signature}
            </div>
            <p style={{ fontSize: 12, color: "#A8A29E", marginTop: 8, marginBottom: 0 }}>
              Note: Signature verification requires the secret key and is not performed client-side.
            </p>
          </div>
        </>
      )}

      <SeoContent />
    </div>
  );
}

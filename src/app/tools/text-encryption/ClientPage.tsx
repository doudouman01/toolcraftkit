"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"] as KeyUsage[]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt.buffer as ArrayBuffer, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"] as KeyUsage[]
  );
}

function toBase64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function fromBase64(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr.buffer as ArrayBuffer;
}

export default function ClientPage() {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleEncrypt = async () => {
    if (!input.trim() || !password) { setError("Please enter text and a password."); return; }
    setError(""); setProcessing(true);
    try {
      const enc = new TextEncoder();
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);
      const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: iv.buffer as ArrayBuffer }, key, enc.encode(input));
      // Format: base64(salt) . base64(iv) . base64(ciphertext)
      setOutput(`${toBase64(salt.buffer as ArrayBuffer)}.${toBase64(iv.buffer as ArrayBuffer)}.${toBase64(encrypted)}`);
    } catch {
      setError("Encryption failed.");
    }
    setProcessing(false);
  };

  const handleDecrypt = async () => {
    if (!input.trim() || !password) { setError("Please enter encrypted text and the password."); return; }
    setError(""); setProcessing(true);
    try {
      const parts = input.split(".");
      if (parts.length !== 3) throw new Error("Invalid encrypted format.");
      const salt = new Uint8Array(fromBase64(parts[0]));
      const iv = fromBase64(parts[1]);
      const ciphertext = fromBase64(parts[2]);
      const key = await deriveKey(password, salt);
      const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
      setOutput(new TextDecoder().decode(decrypted));
    } catch {
      setError("Decryption failed. Check your password and encrypted text.");
    }
    setProcessing(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnActive: React.CSSProperties = { padding: "8px 20px", fontSize: 14, fontWeight: 600, background: "#0D9488", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" };
  const btnInactive: React.CSSProperties = { ...btnActive, background: "#F5F5F4", color: "#57534E" };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 20px 60px" }}>
      <ToolSchema name="Text Encryption" description="Encrypt and decrypt text with a password using AES-GCM. 100% client-side." slug="text-encryption" category="UtilityApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Text Tools", url: "https://toolcraftkit.com/#text-tools" }, { name: "Text Encryption", url: "https://toolcraftkit.com/tools/text-encryption" }]} />

      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1C1917", marginBottom: 6 }}>Text Encryption</h1>
      <p style={{ fontSize: 15, color: "#78716C", marginBottom: 24 }}>Encrypt or decrypt text with a password. Uses AES-GCM, runs entirely in your browser.</p>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button onClick={() => { setMode("encrypt"); setOutput(""); setError(""); }} style={mode === "encrypt" ? btnActive : btnInactive}>Encrypt</button>
        <button onClick={() => { setMode("decrypt"); setOutput(""); setError(""); }} style={mode === "decrypt" ? btnActive : btnInactive}>Decrypt</button>
      </div>

      {/* Input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" }}>
          {mode === "encrypt" ? "Text to Encrypt" : "Encrypted Text"}
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === "encrypt" ? "Enter your secret message..." : "Paste encrypted text here..."}
          rows={5}
          style={{
            width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid #E7E5E4",
            borderRadius: 8, outline: "none", background: "#fff", color: "#1C1917",
            fontFamily: mode === "decrypt" ? "monospace" : "inherit", resize: "vertical", boxSizing: "border-box",
          }}
        />
      </div>

      {/* Password */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a strong password"
          style={{
            width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid #E7E5E4",
            borderRadius: 8, outline: "none", background: "#fff", color: "#1C1917", boxSizing: "border-box",
          }}
        />
      </div>

      <button
        onClick={mode === "encrypt" ? handleEncrypt : handleDecrypt}
        disabled={processing}
        style={{
          width: "100%", padding: "12px", fontSize: 15, fontWeight: 700, background: "#0D9488",
          color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", marginBottom: 16,
          opacity: processing ? 0.7 : 1,
        }}
      >
        {processing ? "Processing..." : mode === "encrypt" ? "Encrypt" : "Decrypt"}
      </button>

      {error && (
        <div style={{ padding: "10px 14px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, color: "#DC2626", fontSize: 14, marginBottom: 16 }}>
          {error}
        </div>
      )}

      {output && (
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" }}>
            {mode === "encrypt" ? "Encrypted Output" : "Decrypted Text"}
          </label>
          <textarea
            readOnly
            value={output}
            rows={5}
            style={{
              width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid #E7E5E4",
              borderRadius: 8, background: "#F5F5F4", color: "#1C1917",
              fontFamily: mode === "encrypt" ? "monospace" : "inherit", resize: "vertical", boxSizing: "border-box",
            }}
          />
          <button onClick={handleCopy} style={{
            marginTop: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, background: "#0D9488",
            color: "#fff", border: "none", borderRadius: 6, cursor: "pointer",
          }}>
            {copied ? "Copied!" : "Copy Output"}
          </button>
        </div>
      )}

      <div style={{ padding: "12px 16px", background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: 8, marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#0D9488", marginBottom: 4 }}>How It Works</div>
        <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>
          Your password is turned into a 256-bit AES key using PBKDF2 (100,000 iterations, SHA-256). Text is encrypted with AES-GCM. A random salt and IV are generated each time, so the same text + password produces different output. Everything runs in your browser &mdash; nothing is sent to any server.
        </p>
      </div>

      <SeoContent />
    </div>
  );
}

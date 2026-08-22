"use client";
import { useState, useEffect, useRef } from "react";

const MODES = [
  { key: "url", label: "URL", placeholder: "https://example.com" },
  { key: "text", label: "Text", placeholder: "Enter any text..." },
  { key: "wifi", label: "WiFi", placeholder: "" },
  { key: "email", label: "Email", placeholder: "hello@example.com" },
  { key: "phone", label: "Phone", placeholder: "+1234567890" },
] as const;

export default function Page() {
  const [mode, setMode] = useState<string>("url");
  const [input, setInput] = useState("");
  const [wifiName, setWifiName] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiType, setWifiType] = useState("WPA");
  const [emailSubject, setEmailSubject] = useState("");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getQrData = () => {
    switch (mode) {
      case "wifi": return `WIFI:T:${wifiType};S:${wifiName};P:${wifiPass};;`;
      case "email": return emailSubject ? `mailto:${input}?subject=${encodeURIComponent(emailSubject)}` : `mailto:${input}`;
      case "phone": return `tel:${input}`;
      default: return input;
    }
  };

  useEffect(() => {
    const data = getQrData();
    if (!data || (mode === "wifi" && !wifiName)) { setQrDataUrl(""); return; }

    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(data, {
        width: size,
        margin: 2,
        color: { dark: fgColor, light: bgColor },
        errorCorrectionLevel: "M",
      }).then((url: string) => setQrDataUrl(url)).catch(() => setQrDataUrl(""));
    });
  }, [input, wifiName, wifiPass, wifiType, emailSubject, mode, size, fgColor, bgColor]);

  const download = (format: "png" | "svg") => {
    if (!qrDataUrl) return;
    const a = document.createElement("a");
    a.download = `qrcode.${format}`;
    a.href = qrDataUrl;
    a.click();
  };

  const copyImage = async () => {
    if (!qrDataUrl) return;
    try {
      const res = await fetch(qrDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      navigator.clipboard.writeText(getQrData());
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
  };

  return (
    <div style={s.page}>
      <h1 style={s.h1}>QR Code Generator</h1>
      <p style={s.sub}>Generate free QR codes for URLs, text, WiFi, email, and phone numbers.</p>

      <div style={s.card}>
        <div style={s.row}>
          {MODES.map((m) => (
            <button key={m.key} onClick={() => { setMode(m.key); setInput(""); }} style={{ ...s.btnSm, background: mode === m.key ? "#0D9488" : "#F5F5F4", color: mode === m.key ? "#fff" : "#1C1917", border: mode === m.key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{m.label}</button>
          ))}
        </div>

        {mode === "wifi" ? (
          <>
            <div style={{ marginBottom: 10 }}>
              <label style={s.label}>Network Name (SSID)</label>
              <input type="text" value={wifiName} onChange={(e) => setWifiName(e.target.value)} placeholder="MyWiFiNetwork" style={s.input} />
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={s.label}>Password</label>
              <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="password123" style={s.input} />
            </div>
            <div style={s.row}>
              <label style={s.label}>Security:</label>
              {["WPA", "WEP", "nopass"].map((t) => (
                <button key={t} onClick={() => setWifiType(t)} style={{ ...s.btnSm, background: wifiType === t ? "#6366F1" : "#F5F5F4", color: wifiType === t ? "#fff" : "#1C1917" }}>{t === "nopass" ? "None" : t}</button>
              ))}
            </div>
          </>
        ) : (
          <div style={{ marginBottom: 10 }}>
            <label style={s.label}>{MODES.find((m) => m.key === mode)?.label} Content</label>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder={MODES.find((m) => m.key === mode)?.placeholder} style={s.input} />
          </div>
        )}

        {mode === "email" && (
          <div style={{ marginBottom: 10 }}>
            <label style={s.label}>Subject (optional)</label>
            <input type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Hello!" style={s.input} />
          </div>
        )}

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
          <div style={{ flex: 1, minWidth: 120 }}>
            <label style={s.label}>Size</label>
            <select value={size} onChange={(e) => setSize(+e.target.value)} style={{ ...s.input, cursor: "pointer" }}>
              {[128, 256, 512, 1024].map((n) => <option key={n} value={n}>{n}×{n}px</option>)}
            </select>
          </div>
          <div style={{ minWidth: 80 }}>
            <label style={s.label}>Color</label>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} style={{ width: 48, height: 38, border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer", padding: 2 }} />
          </div>
          <div style={{ minWidth: 80 }}>
            <label style={s.label}>Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: 48, height: 38, border: "1px solid #E7E5E4", borderRadius: 6, cursor: "pointer", padding: 2 }} />
          </div>
        </div>
      </div>

      {qrDataUrl && (
        <div style={{ ...s.card, textAlign: "center" }}>
          <img src={qrDataUrl} alt="QR Code" style={{ maxWidth: 280, width: "100%", borderRadius: 8, border: "1px solid #E7E5E4", marginBottom: 16 }} />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => download("png")} style={s.btn}>Download PNG</button>
            <button onClick={copyImage} style={s.btnSm}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
          </div>
        </div>
      )}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Generate QR codes instantly for any purpose — share a website URL, connect to WiFi without typing passwords, send a pre-filled email, or share your phone number. Customize colors and size to match your brand or design.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Everything runs in your browser. No data is sent to any server. Your QR codes are generated locally and never stored anywhere.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "Are these QR codes free to use?", a: "Yes. All QR codes generated here are completely free for personal and commercial use. There are no watermarks, no limits, and no signup required." },
          { q: "Do the QR codes expire?", a: "No. QR codes are static — they encode data directly. As long as the URL or content they point to exists, the QR code will work forever." },
          { q: "What is a WiFi QR code?", a: "A WiFi QR code contains your network name, password, and security type. When someone scans it with their phone camera, they connect to your WiFi automatically without typing the password." },
          { q: "Can I customize the colors?", a: "Yes. Use the color pickers to change the foreground and background colors. Make sure there is enough contrast between them for the QR code to remain scannable." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

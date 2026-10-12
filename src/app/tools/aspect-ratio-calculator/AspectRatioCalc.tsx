"use client";
import { useState, useEffect } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

/* ─── PRESETS ─── */
const PRESETS = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "21:9", w: 21, h: 9 },
  { label: "9:16", w: 9, h: 16 },
  { label: "3:2", w: 3, h: 2 },
];

/* ─── RESOLUTION DATABASE ─── */
const RESOLUTIONS: Record<string, { label: string; w: number; h: number }[]> = {
  "16:9": [
    { label: "HD 720p", w: 1280, h: 720 },
    { label: "Full HD 1080p", w: 1920, h: 1080 },
    { label: "QHD 1440p", w: 2560, h: 1440 },
    { label: "4K UHD", w: 3840, h: 2160 },
    { label: "8K UHD", w: 7680, h: 4320 },
  ],
  "4:3": [
    { label: "VGA", w: 640, h: 480 },
    { label: "SVGA", w: 800, h: 600 },
    { label: "XGA", w: 1024, h: 768 },
    { label: "UXGA", w: 1600, h: 1200 },
    { label: "QXGA", w: 2048, h: 1536 },
  ],
  "1:1": [
    { label: "Instagram Post", w: 1080, h: 1080 },
    { label: "Profile Photo", w: 400, h: 400 },
    { label: "Thumbnail", w: 150, h: 150 },
    { label: "HD Square", w: 2048, h: 2048 },
  ],
  "21:9": [
    { label: "UltraWide FHD", w: 2560, h: 1080 },
    { label: "UltraWide QHD", w: 3440, h: 1440 },
    { label: "UltraWide 5K", w: 5120, h: 2160 },
  ],
  "9:16": [
    { label: "Phone Portrait", w: 1080, h: 1920 },
    { label: "Story / Reel", w: 1080, h: 1920 },
    { label: "TikTok", w: 1080, h: 1920 },
    { label: "Phone HD", w: 720, h: 1280 },
  ],
  "3:2": [
    { label: "6x4 Print", w: 1800, h: 1200 },
    { label: "DSLR Standard", w: 6000, h: 4000 },
    { label: "MacBook Display", w: 2560, h: 1700 },
    { label: "Surface Pro", w: 2736, h: 1824 },
  ],
};

/* ─── GCD UTILITY ─── */
function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) { const t = b; b = a % b; a = t; }
  return a;
}

function simplifyRatio(w: number, h: number): [number, number] {
  if (w <= 0 || h <= 0) return [0, 0];
  const d = gcd(w, h);
  return [w / d, h / d];
}

/* ─── FAQ ─── */
function FAQItem({ q, a, theme }: { q: string; a: string; theme: typeof LIGHT }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && <p style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>}
    </div>
  );
}

/* ─── SEO CONTENT ─── */
function SeoContent({ theme }: { theme: typeof LIGHT }) {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>How to Use the Aspect Ratio Calculator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>
        Enter a width and height to instantly see the simplified aspect ratio. You can also select a preset ratio like 16:9 or 4:3, then enter one dimension to calculate the other automatically. The visual preview updates in real time so you can see the exact shape of your frame.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Why Aspect Ratios Matter</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "12px" }}>
        Every screen, camera, and social media platform uses a specific aspect ratio. Using the wrong ratio means your content gets cropped, stretched, or letterboxed. Video editors need 16:9 for YouTube, photographers work in 3:2 or 4:3, and social media managers juggle 1:1 posts with 9:16 stories. Getting the ratio right from the start saves time and prevents quality loss from resizing later.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: theme.text, marginBottom: "16px", borderBottom: `2px solid ${theme.primary}`, paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Video producers calculating frame dimensions for different delivery formats</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Web designers ensuring images maintain proportions across responsive layouts</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Photographers converting between print sizes while preserving composition</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Social media managers preparing content at platform-specific ratios</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: theme.textMuted, marginBottom: "6px" }}>Game developers setting viewport dimensions for different screen types</li>
      </ul>
      <div style={{ background: theme.surfaceAlt, border: `1px solid ${theme.border}`, borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: theme.primary, marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: theme.textMuted, margin: 0 }}>
          Once you know the right dimensions, resize your images to match with our <a href="/tools/image-resizer" style={{ color: theme.primary }}>Image Resizer</a>.
        </p>
      </div>
    </section>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function AspectRatioCalc() {
  const [dark, setDark] = useState(false);
  const theme = dark ? DARK : LIGHT;

  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [locked, setLocked] = useState(false);
  const [lockedRatioW, setLockedRatioW] = useState(0);
  const [lockedRatioH, setLockedRatioH] = useState(0);
  const [activePreset, setActivePreset] = useState("");

  // Detect system dark mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => setDark(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  const w = parseFloat(width) || 0;
  const h = parseFloat(height) || 0;
  const [ratioW, ratioH] = w > 0 && h > 0 ? simplifyRatio(w, h) : [0, 0];

  // Display ratio: if locked, show locked ratio; otherwise computed
  const displayRatioW = locked ? lockedRatioW : ratioW;
  const displayRatioH = locked ? lockedRatioH : ratioH;
  const ratioLabel = displayRatioW > 0 && displayRatioH > 0 ? `${displayRatioW}:${displayRatioH}` : "";

  // Resolution suggestions
  const resolutions = ratioLabel ? RESOLUTIONS[ratioLabel] || [] : [];

  // Lock a ratio from preset
  const applyPreset = (pw: number, ph: number, label: string) => {
    setLockedRatioW(pw);
    setLockedRatioH(ph);
    setLocked(true);
    setActivePreset(label);
    // If width is set, recalculate height
    const curW = parseFloat(width) || 0;
    if (curW > 0) {
      setHeight(String(Math.round(curW * ph / pw)));
    } else {
      setWidth("");
      setHeight("");
    }
  };

  const handleWidthChange = (val: string) => {
    setWidth(val);
    if (locked && lockedRatioW > 0 && lockedRatioH > 0) {
      const v = parseFloat(val) || 0;
      if (v > 0) setHeight(String(Math.round(v * lockedRatioH / lockedRatioW)));
      else setHeight("");
    }
  };

  const handleHeightChange = (val: string) => {
    setHeight(val);
    if (locked && lockedRatioW > 0 && lockedRatioH > 0) {
      const v = parseFloat(val) || 0;
      if (v > 0) setWidth(String(Math.round(v * lockedRatioW / lockedRatioH)));
      else setWidth("");
    }
  };

  const toggleLock = () => {
    if (!locked && w > 0 && h > 0) {
      // Lock current ratio
      const [rw, rh] = simplifyRatio(w, h);
      setLockedRatioW(rw);
      setLockedRatioH(rh);
      setLocked(true);
      setActivePreset("");
    } else {
      setLocked(false);
      setLockedRatioW(0);
      setLockedRatioH(0);
      setActivePreset("");
    }
  };

  // Preview rectangle dimensions (max 280px on either side)
  const previewMaxW = 280;
  const previewMaxH = 180;
  let prevW = previewMaxW;
  let prevH = previewMaxH;
  const dw = displayRatioW || 16;
  const dh = displayRatioH || 9;
  if (dw / dh > previewMaxW / previewMaxH) {
    prevW = previewMaxW;
    prevH = Math.round(previewMaxW * dh / dw);
  } else {
    prevH = previewMaxH;
    prevW = Math.round(previewMaxH * dw / dh);
  }

  const inputStyle = {
    width: 130, padding: "10px 12px", fontSize: 15, borderRadius: 8,
    border: `1.5px solid ${theme.border}`, background: theme.inputBg,
    color: theme.text, outline: "none", fontWeight: 500 as const,
    fontVariantNumeric: "tabular-nums" as const,
  };

  const cardStyle = {
    background: theme.surface, borderRadius: 12, padding: 24,
    border: `1px solid ${theme.border}`, boxShadow: theme.shadow, marginBottom: 20,
  };

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px 60px" }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: theme.textLight, marginBottom: 14, display: "flex", gap: 6, alignItems: "center" }}>
          <a href="/" style={{ color: theme.textMuted, textDecoration: "none" }}>Home</a><span>›</span>
          <a href="/#image-tools" style={{ color: theme.textMuted, textDecoration: "none" }}>Image Tools</a><span>›</span>
          <span style={{ color: theme.primary, fontWeight: 500 }}>Aspect Ratio Calculator</span>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.03em" }}>Aspect Ratio Calculator</h1>
          <p style={{ fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5 }}>
            Find aspect ratios from dimensions, lock a ratio to calculate missing values, and browse common resolutions.
          </p>
        </div>

        {/* Preset Buttons */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
          {PRESETS.map(p => (
            <button key={p.label} onClick={() => applyPreset(p.w, p.h, p.label)}
              style={{
                padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600,
                border: `1.5px solid ${activePreset === p.label ? theme.primary : theme.border}`,
                background: activePreset === p.label ? theme.primary : theme.surface,
                color: activePreset === p.label ? "#fff" : theme.textMuted,
                cursor: "pointer", transition: "all 0.2s",
              }}>
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Card */}
        <div style={cardStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Width (px)</label>
              <input type="number" value={width} onChange={e => handleWidthChange(e.target.value)}
                placeholder="e.g. 1920" style={inputStyle}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border} />
            </div>

            <button onClick={toggleLock} title={locked ? "Unlock ratio" : "Lock ratio"} style={{
              background: "none", border: "none", fontSize: 22, cursor: "pointer",
              marginTop: 20, color: locked ? theme.primary : theme.textLight,
              transition: "color 0.2s",
            }}>
              {locked ? "🔗" : "🔓"}
            </button>

            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, marginBottom: 6, display: "block" }}>Height (px)</label>
              <input type="number" value={height} onChange={e => handleHeightChange(e.target.value)}
                placeholder="e.g. 1080" style={inputStyle}
                onFocus={e => e.target.style.borderColor = theme.primary}
                onBlur={e => e.target.style.borderColor = theme.border} />
            </div>
          </div>

          {/* Ratio Display */}
          {ratioLabel && (
            <div style={{
              display: "flex", alignItems: "center", gap: 12,
              background: theme.surfaceAlt, borderRadius: 10, padding: "14px 18px",
            }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: theme.textMuted }}>Aspect Ratio</span>
              <span style={{
                fontSize: 28, fontWeight: 800, color: theme.primary, letterSpacing: "-0.02em",
              }}>{ratioLabel}</span>
              {locked && <span style={{
                fontSize: 11, fontWeight: 600, color: theme.primary,
                background: theme.primary + "18", padding: "3px 8px", borderRadius: 6,
              }}>LOCKED</span>}
            </div>
          )}
        </div>

        {/* Visual Preview */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 16px", color: theme.text }}>Preview</h2>
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            minHeight: previewMaxH + 20,
          }}>
            <div style={{
              width: prevW, height: prevH,
              border: `2px solid ${theme.primary}`,
              borderRadius: 6,
              background: theme.primary + "10",
              display: "flex", justifyContent: "center", alignItems: "center",
              position: "relative", transition: "all 0.3s ease",
            }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: theme.primary }}>
                {ratioLabel || "16:9"}
              </span>
              {w > 0 && h > 0 && (
                <span style={{
                  position: "absolute", bottom: -22, fontSize: 11, color: theme.textMuted, fontWeight: 500,
                }}>
                  {w} x {h} px
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Resolution Suggestions */}
        {resolutions.length > 0 && (
          <div style={cardStyle}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 14px", color: theme.text }}>
              Common Resolutions for {ratioLabel}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {resolutions.map((r, i) => (
                <div key={i} onClick={() => { setWidth(String(r.w)); setHeight(String(r.h)); }}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                    transition: "background 0.15s",
                    background: (w === r.w && h === r.h) ? theme.primary + "14" : "transparent",
                  }}
                  onMouseEnter={e => { if (!(w === r.w && h === r.h)) (e.currentTarget.style.background = theme.surfaceAlt); }}
                  onMouseLeave={e => { if (!(w === r.w && h === r.h)) (e.currentTarget.style.background = "transparent"); }}
                >
                  <span style={{ fontSize: 14, fontWeight: 500, color: theme.text }}>{r.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: theme.textMuted, fontVariantNumeric: "tabular-nums" }}>
                    {r.w} x {r.h}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 12px", color: theme.text }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="What is an aspect ratio?"
            a="An aspect ratio is the proportional relationship between the width and height of an image or screen, expressed as two numbers separated by a colon. For example, 16:9 means the width is 16 units for every 9 units of height. It defines the shape of the frame, not the actual pixel count." />
          <FAQItem theme={theme}
            q="What is the standard aspect ratio for video?"
            a="16:9 is the standard widescreen ratio used for YouTube, streaming platforms, and most modern displays. 4:3 was the old TV standard. Cinematic films often use 21:9 (2.35:1). Vertical video for TikTok, Instagram Reels, and YouTube Shorts uses 9:16." />
          <FAQItem theme={theme}
            q="How do I maintain aspect ratio when resizing?"
            a="Lock the aspect ratio by clicking the lock icon, then change either the width or the height — the other dimension adjusts automatically to keep the proportions. This prevents stretching or distortion when scaling images or video." />
          <FAQItem theme={theme}
            q="What aspect ratio should I use for social media?"
            a="Instagram feed posts use 1:1 (square) or 4:5 (portrait). Stories and Reels use 9:16 (vertical). YouTube thumbnails and videos use 16:9. Facebook and LinkedIn posts work well with 1.91:1 or 16:9. Twitter/X images perform best at 16:9 or 2:1." />
        </div>

        <SeoContent theme={theme} />
      </main>
    </div>
  );
}

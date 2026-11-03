"use client";
import { useState, useCallback, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── TYPES ─── */
type Position = "bottom" | "top" | "center" | "bottom-left";
type Theme = "light" | "dark" | "custom";

interface FormData {
  websiteName: string;
  privacyUrl: string;
  cookieUrl: string;
}

interface StyleOptions {
  position: Position;
  theme: Theme;
  primaryColor: string;
  textColor: string;
}

interface ButtonOptions {
  acceptText: string;
  rejectText: string;
  manageText: string;
  showReject: boolean;
  showManage: boolean;
  showClose: boolean;
  autoHide: boolean;
}

/* ─── CODE GENERATOR ─── */
function getThemeColors(opts: StyleOptions) {
  if (opts.theme === "dark") return { bg: "#1a1a2e", text: "#e0e0e0", border: "#333", btnBg: opts.primaryColor, btnText: "#fff" };
  if (opts.theme === "light") return { bg: "#ffffff", text: "#333333", border: "#e0e0e0", btnBg: opts.primaryColor, btnText: "#fff" };
  return { bg: "#ffffff", text: opts.textColor, border: "#e0e0e0", btnBg: opts.primaryColor, btnText: "#fff" };
}

function generateCSS(opts: StyleOptions): string {
  const c = getThemeColors(opts);
  const pos = opts.position;

  let posCSS = "";
  if (pos === "bottom") posCSS = "bottom:0;left:0;right:0;";
  else if (pos === "top") posCSS = "top:0;left:0;right:0;";
  else if (pos === "center") posCSS = "top:50%;left:50%;transform:translate(-50%,-50%);max-width:520px;width:90%;border-radius:12px;";
  else if (pos === "bottom-left") posCSS = "bottom:20px;left:20px;max-width:400px;width:90%;border-radius:12px;";

  return `/* Cookie Consent Banner */
#tck-cookie-banner {
  position: fixed;
  ${posCSS}
  background: ${c.bg};
  color: ${c.text};
  border: 1px solid ${c.border};
  padding: 18px 24px;
  z-index: 99999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 -2px 16px rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
#tck-cookie-banner p {
  margin: 0;
  flex: 1;
  min-width: 200px;
}
#tck-cookie-banner a {
  color: ${c.btnBg};
  text-decoration: underline;
}
#tck-cookie-banner .tck-btn-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
#tck-cookie-banner .tck-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
#tck-cookie-banner .tck-btn-accept {
  background: ${c.btnBg};
  color: ${c.btnText};
}
#tck-cookie-banner .tck-btn-reject {
  background: transparent;
  color: ${c.text};
  border: 1px solid ${c.border};
}
#tck-cookie-banner .tck-btn-manage {
  background: transparent;
  color: ${c.text};
  border: 1px solid ${c.border};
}
#tck-cookie-banner .tck-close {
  position: absolute;
  top: 8px;
  right: 12px;
  background: none;
  border: none;
  font-size: 18px;
  color: ${c.text};
  cursor: pointer;
  opacity: 0.6;
}
#tck-cookie-banner .tck-close:hover { opacity: 1; }`;
}

function generateHTML(form: FormData, btns: ButtonOptions): string {
  const links: string[] = [];
  if (form.privacyUrl) links.push(`<a href="${form.privacyUrl}" target="_blank" rel="noopener">Privacy Policy</a>`);
  if (form.cookieUrl) links.push(`<a href="${form.cookieUrl}" target="_blank" rel="noopener">Cookie Policy</a>`);
  const linkText = links.length ? ` Read our ${links.join(" and ")}.` : "";

  let buttons = `    <button class="tck-btn tck-btn-accept" onclick="tckAcceptCookies()">${btns.acceptText}</button>`;
  if (btns.showReject) buttons += `\n    <button class="tck-btn tck-btn-reject" onclick="tckRejectCookies()">${btns.rejectText}</button>`;
  if (btns.showManage) buttons += `\n    <button class="tck-btn tck-btn-manage" onclick="tckManageCookies()">${btns.manageText}</button>`;

  const closeBtn = btns.showClose ? `\n  <button class="tck-close" onclick="tckCloseBanner()" aria-label="Close">&times;</button>` : "";

  return `<div id="tck-cookie-banner" role="dialog" aria-label="Cookie consent">${closeBtn}
  <p>We use cookies to enhance your experience on ${form.websiteName || "our website"}. By continuing to browse, you agree to our use of cookies.${linkText}</p>
  <div class="tck-btn-group">
${buttons}
  </div>
</div>`;
}

function generateJS(btns: ButtonOptions): string {
  return `<script>
(function() {
  // Check if user already made a choice
  if (document.cookie.indexOf('tck_cookie_consent=') !== -1) {
    var banner = document.getElementById('tck-cookie-banner');
    if (banner) banner.style.display = 'none';
  }
})();

function tckSetCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + '=' + value + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
}

function tckCloseBanner() {
  var banner = document.getElementById('tck-cookie-banner');
  if (banner) banner.style.display = 'none';
}

function tckAcceptCookies() {
  tckSetCookie('tck_cookie_consent', 'accepted', 365);
  tckCloseBanner();${btns.autoHide ? "" : "\n  // Reload to activate tracking scripts if needed\n  // window.location.reload();"}
}

function tckRejectCookies() {
  tckSetCookie('tck_cookie_consent', 'rejected', 365);
  tckCloseBanner();
}

function tckManageCookies() {
  // Replace this with your cookie preferences modal or page
  alert('Cookie preferences management — customize this function to open your preferences panel.');
}
</script>`;
}

/* ─── STYLES ─── */
const s = {
  page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff" },
  select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", cursor: "pointer" as const },
  checkRow: { display: "flex" as const, alignItems: "center" as const, gap: 10, marginBottom: 10, cursor: "pointer" as const },
  checkLabel: { fontSize: 14, color: "#1C1917", cursor: "pointer" as const, userSelect: "none" as const },
  checkDesc: { fontSize: 12, color: "#78716C", marginLeft: 28, marginTop: -6, marginBottom: 10 },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  textarea: { width: "100%", minHeight: 300, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  colorInput: { width: 48, height: 36, border: "1px solid #E7E5E4", borderRadius: 6, padding: 2, cursor: "pointer" as const, background: "#fff" },
};

/* ─── MAIN COMPONENT ─── */
export default function ClientPage() {
  const [form, setForm] = useState<FormData>({ websiteName: "", privacyUrl: "", cookieUrl: "" });
  const [style, setStyle] = useState<StyleOptions>({ position: "bottom", theme: "light", primaryColor: "#0D9488", textColor: "#333333" });
  const [btns, setBtns] = useState<ButtonOptions>({ acceptText: "Accept All", rejectText: "Reject", manageText: "Manage Preferences", showReject: true, showManage: false, showClose: true, autoHide: true });
  const [generated, setGenerated] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  const cssCode = useMemo(() => generateCSS(style), [style]);
  const htmlCode = useMemo(() => generateHTML(form, btns), [form, btns]);
  const jsCode = useMemo(() => generateJS(btns), [btns]);
  const fullCode = `<!-- Cookie Consent Banner — Generated by ToolCraftKit.com -->\n<style>\n${cssCode}\n</style>\n\n${htmlCode}\n\n${jsCode}`;

  const handleCopy = useCallback((text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(label);
      setTimeout(() => setCopiedField(""), 2000);
    });
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([fullCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cookie-consent-banner.html";
    a.click();
    URL.revokeObjectURL(url);
  }, [fullCode]);

  /* ─── Preview HTML ─── */
  const previewStyle = useMemo(() => {
    const c = getThemeColors(style);
    const base: React.CSSProperties = {
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      padding: "16px 20px", borderRadius: 10, fontSize: 13, lineHeight: 1.5,
      display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      position: "relative",
    };
    return base;
  }, [style]);

  const checkOptions: { key: keyof ButtonOptions; label: string; desc: string }[] = [
    { key: "showReject", label: "Show Reject Button", desc: "Lets users decline non-essential cookies" },
    { key: "showManage", label: "Show Manage Preferences", desc: "Links to a cookie preferences panel" },
    { key: "showClose", label: "Show Close (×) Button", desc: "Adds a close button in the corner" },
    { key: "autoHide", label: "Auto-hide After Accept", desc: "Banner disappears immediately after clicking Accept" },
  ];

  return (
    <div style={s.page}>
      <ToolSchema
        name="Cookie Consent Banner Generator"
        description="Generate a GDPR-compliant cookie consent banner for your website. Get ready-to-use HTML, CSS, and JavaScript code. Free, no signup."
        slug="cookie-consent-generator"
        category="WebApplication"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://toolcraftkit.com" },
        { name: "Dev Tools", url: "https://toolcraftkit.com/#dev-tools" },
        { name: "Cookie Consent Banner Generator", url: "https://toolcraftkit.com/tools/cookie-consent-generator" },
      ]} />

      <h1 style={s.h1}>Cookie Consent Banner Generator</h1>
      <p style={s.sub}>Generate a GDPR-compliant cookie consent banner with ready-to-use HTML, CSS &amp; JavaScript. Free, no signup.</p>

      {/* ─── Website Details ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Website Details</h2>
        <label style={s.label}>Website Name</label>
        <input type="text" value={form.websiteName} onChange={(e) => setForm({ ...form, websiteName: e.target.value })} placeholder="My Website" style={s.input} />
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Privacy Policy URL</label>
            <input type="text" value={form.privacyUrl} onChange={(e) => setForm({ ...form, privacyUrl: e.target.value })} placeholder="https://example.com/privacy" style={s.input} />
          </div>
          <div>
            <label style={s.label}>Cookie Policy URL</label>
            <input type="text" value={form.cookieUrl} onChange={(e) => setForm({ ...form, cookieUrl: e.target.value })} placeholder="https://example.com/cookies" style={s.input} />
          </div>
        </div>
      </div>

      {/* ─── Style Options ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Appearance</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Position</label>
            <select value={style.position} onChange={(e) => setStyle({ ...style, position: e.target.value as Position })} style={s.select}>
              <option value="bottom">Bottom Bar</option>
              <option value="top">Top Bar</option>
              <option value="center">Center Popup</option>
              <option value="bottom-left">Bottom-Left Corner</option>
            </select>
          </div>
          <div>
            <label style={s.label}>Theme</label>
            <select value={style.theme} onChange={(e) => setStyle({ ...style, theme: e.target.value as Theme })} style={s.select}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="custom">Custom Colors</option>
            </select>
          </div>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div>
            <label style={s.label}>Primary / Button Color</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="color" value={style.primaryColor} onChange={(e) => setStyle({ ...style, primaryColor: e.target.value })} style={s.colorInput} />
              <span style={{ fontSize: 13, color: "#78716C" }}>{style.primaryColor}</span>
            </div>
          </div>
          {style.theme === "custom" && (
            <div>
              <label style={s.label}>Text Color</label>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="color" value={style.textColor} onChange={(e) => setStyle({ ...style, textColor: e.target.value })} style={s.colorInput} />
                <span style={{ fontSize: 13, color: "#78716C" }}>{style.textColor}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Button Options ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Buttons</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Accept Button Text</label>
            <input type="text" value={btns.acceptText} onChange={(e) => setBtns({ ...btns, acceptText: e.target.value })} style={s.input} />
          </div>
          <div>
            <label style={s.label}>Reject Button Text</label>
            <input type="text" value={btns.rejectText} onChange={(e) => setBtns({ ...btns, rejectText: e.target.value })} style={s.input} />
          </div>
        </div>
        <label style={s.label}>Manage Preferences Text</label>
        <input type="text" value={btns.manageText} onChange={(e) => setBtns({ ...btns, manageText: e.target.value })} style={{ ...s.input, maxWidth: 340 }} />

        <div style={{ marginTop: 8 }}>
          {checkOptions.map((opt) => (
            <div key={opt.key}>
              <div style={s.checkRow} onClick={() => setBtns((p) => ({ ...p, [opt.key]: !p[opt.key as keyof ButtonOptions] }))}>
                <input type="checkbox" checked={btns[opt.key as keyof ButtonOptions] as boolean} onChange={() => {}} style={{ width: 18, height: 18, accentColor: "#0D9488", cursor: "pointer", flexShrink: 0 }} />
                <span style={s.checkLabel}>{opt.label}</span>
              </div>
              <p style={s.checkDesc}>{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Live Preview ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Live Preview</h2>
        <div style={{ background: "#f0f0f0", borderRadius: 10, padding: 20, position: "relative", minHeight: 80 }}>
          <div style={previewStyle}>
            {btns.showClose && (
              <span style={{ position: "absolute", top: 6, right: 10, fontSize: 16, opacity: 0.5, cursor: "pointer" }}>&times;</span>
            )}
            <p style={{ margin: 0, flex: 1, minWidth: 180 }}>
              We use cookies to enhance your experience on {form.websiteName || "our website"}. By continuing to browse, you agree to our use of cookies.
              {form.privacyUrl && <> Read our <span style={{ color: style.primaryColor, textDecoration: "underline" }}>Privacy Policy</span>.</>}
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button style={{ padding: "7px 16px", borderRadius: 6, border: "none", fontSize: 12, fontWeight: 600, background: style.primaryColor, color: "#fff", cursor: "pointer" }}>{btns.acceptText}</button>
              {btns.showReject && <button style={{ padding: "7px 16px", borderRadius: 6, border: "1px solid #ccc", fontSize: 12, fontWeight: 600, background: "transparent", cursor: "pointer" }}>{btns.rejectText}</button>}
              {btns.showManage && <button style={{ padding: "7px 16px", borderRadius: 6, border: "1px solid #ccc", fontSize: 12, fontWeight: 600, background: "transparent", cursor: "pointer" }}>{btns.manageText}</button>}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Generate ─── */}
      <button onClick={() => setGenerated(true)} style={s.btn}>Generate Cookie Consent Code</button>

      {/* ─── Output ─── */}
      {generated && (
        <div style={{ ...s.output, marginTop: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", margin: 0 }}>Your Cookie Consent Banner Code</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={() => handleCopy(cssCode, "css")} style={s.btnSecondary}>{copiedField === "css" ? "Copied!" : "Copy CSS"}</button>
              <button onClick={() => handleCopy(htmlCode, "html")} style={s.btnSecondary}>{copiedField === "html" ? "Copied!" : "Copy HTML"}</button>
              <button onClick={() => handleCopy(fullCode, "all")} style={s.btnSecondary}>{copiedField === "all" ? "Copied!" : "Copy All"}</button>
              <button onClick={handleDownload} style={s.btnSecondary}>Download .html</button>
            </div>
          </div>

          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 8, marginTop: 20 }}>CSS</h3>
          <textarea value={cssCode} readOnly style={{ ...s.textarea, minHeight: 160 }} />

          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 8, marginTop: 20 }}>HTML</h3>
          <textarea value={htmlCode} readOnly style={{ ...s.textarea, minHeight: 120 }} />

          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 8, marginTop: 20 }}>JavaScript</h3>
          <textarea value={jsCode} readOnly style={{ ...s.textarea, minHeight: 160 }} />

          <p style={{ fontSize: 12, color: "#78716C", marginTop: 14, marginBottom: 0, lineHeight: 1.6 }}>
            Paste the complete code before the closing <code>&lt;/body&gt;</code> tag of your website. The banner stores consent in a cookie for 365 days. No external dependencies required.
          </p>
        </div>
      )}

      {/* ─── SEO Content ─── */}
      <SeoContent />
    </div>
  );
}

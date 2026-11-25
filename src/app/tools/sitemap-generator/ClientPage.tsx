"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

interface SitemapEntry {
  id: string;
  url: string;
  priority: string;
  changefreq: string;
  lastmod: string;
}

const FREQ_OPTIONS = ["always","hourly","daily","weekly","monthly","yearly","never"];

function newEntry(): SitemapEntry {
  return { id: Math.random().toString(36).slice(2), url: "", priority: "0.5", changefreq: "weekly", lastmod: new Date().toISOString().slice(0, 10) };
}

export default function ClientPage() {
  const [entries, setEntries] = useState<SitemapEntry[]>([newEntry()]);
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkText, setBulkText] = useState("");
  const [copied, setCopied] = useState(false);

  const updateEntry = (id: string, field: keyof SitemapEntry, value: string) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, [field]: value } : e)));
  };

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));
  const addEntry = () => setEntries((prev) => [...prev, newEntry()]);

  const importBulk = () => {
    const urls = bulkText.split("\n").map((u) => u.trim()).filter((u) => u && (u.startsWith("http://") || u.startsWith("https://")));
    if (urls.length) {
      setEntries(urls.map((url) => ({ ...newEntry(), url })));
      setBulkMode(false);
      setBulkText("");
    }
  };

  const xml = useMemo(() => {
    const validEntries = entries.filter((e) => e.url.trim());
    if (!validEntries.length) return "";
    let out = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    out += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    for (const e of validEntries) {
      out += `  <url>\n`;
      out += `    <loc>${escapeXml(e.url.trim())}</loc>\n`;
      if (e.lastmod) out += `    <lastmod>${e.lastmod}</lastmod>\n`;
      if (e.changefreq) out += `    <changefreq>${e.changefreq}</changefreq>\n`;
      if (e.priority) out += `    <priority>${e.priority}</priority>\n`;
      out += `  </url>\n`;
    }
    out += `</urlset>`;
    return out;
  }, [entries]);

  const download = () => {
    if (!xml) return;
    const blob = new Blob([xml], { type: "application/xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "sitemap.xml"; a.click();
    URL.revokeObjectURL(url);
  };

  const copy = () => { navigator.clipboard.writeText(xml); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const validCount = entries.filter((e) => e.url.trim()).length;

  const s = {
    page: { maxWidth: 800, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "8px 12px", fontSize: 14, outline: "none" } as const,
    select: { border: "1px solid #E7E5E4", borderRadius: 8, padding: "8px 10px", fontSize: 13, outline: "none", background: "#fff", cursor: "pointer" } as const,
    ta: { width: "100%", minHeight: 120, border: "1px solid #E7E5E4", borderRadius: 8, padding: 12, fontSize: 13, fontFamily: "'Courier New', monospace", resize: "vertical" as const, outline: "none", lineHeight: 1.6 } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    btnDanger: { background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 6, padding: "6px 10px", fontSize: 12, cursor: "pointer" } as const,
    pre: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 8, padding: 14, fontSize: 12, fontFamily: "'Courier New', monospace", whiteSpace: "pre-wrap" as const, wordBreak: "break-all" as const, overflow: "auto", maxHeight: 400, lineHeight: 1.5 },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Sitemap XML Generator" description="Create valid XML sitemaps with URL, priority, change frequency, and last modified. Download as sitemap.xml." slug="sitemap-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Sitemap Generator", url: "https://toolcraftkit.com/tools/sitemap-generator" }]} />

      <h1 style={s.h1}>Sitemap XML Generator</h1>
      <p style={s.sub}>Create valid XML sitemaps to help search engines discover and index your pages.</p>

      {/* Toggle bulk mode */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setBulkMode(false)} style={{ ...s.btnSm, background: !bulkMode ? "#0D9488" : "#F5F5F4", color: !bulkMode ? "#fff" : "#1C1917" }}>One by One</button>
        <button onClick={() => setBulkMode(true)} style={{ ...s.btnSm, background: bulkMode ? "#0D9488" : "#F5F5F4", color: bulkMode ? "#fff" : "#1C1917" }}>Bulk Import</button>
      </div>

      {bulkMode ? (
        <div style={s.card}>
          <label style={s.label}>Paste URLs (one per line)</label>
          <textarea value={bulkText} onChange={(e) => setBulkText(e.target.value)} placeholder={"https://example.com/\nhttps://example.com/about\nhttps://example.com/blog"} style={s.ta} />
          <button onClick={importBulk} style={{ ...s.btn, marginTop: 10 }}>Import URLs</button>
        </div>
      ) : (
        <>
          {entries.map((entry, idx) => (
            <div key={entry.id} style={{ ...s.card, position: "relative" as const }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#78716C" }}>URL #{idx + 1}</span>
                {entries.length > 1 && (
                  <button onClick={() => removeEntry(entry.id)} style={s.btnDanger}>✕ Remove</button>
                )}
              </div>
              <input value={entry.url} onChange={(e) => updateEntry(entry.id, "url", e.target.value)} placeholder="https://example.com/page" style={{ ...s.input, marginBottom: 10 }} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" as const }}>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <label style={{ fontSize: 11, color: "#78716C" }}>Priority</label>
                  <select value={entry.priority} onChange={(e) => updateEntry(entry.id, "priority", e.target.value)} style={s.select}>
                    {["1.0","0.9","0.8","0.7","0.6","0.5","0.4","0.3","0.2","0.1","0.0"].map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <label style={{ fontSize: 11, color: "#78716C" }}>Change Frequency</label>
                  <select value={entry.changefreq} onChange={(e) => updateEntry(entry.id, "changefreq", e.target.value)} style={s.select}>
                    {FREQ_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <label style={{ fontSize: 11, color: "#78716C" }}>Last Modified</label>
                  <input type="date" value={entry.lastmod} onChange={(e) => updateEntry(entry.id, "lastmod", e.target.value)} style={{ ...s.input, padding: "6px 10px", fontSize: 13 }} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addEntry} style={{ ...s.btnSm, marginBottom: 20 }}>+ Add URL</button>
        </>
      )}

      {/* XML Output */}
      {xml && (
        <div style={{ ...s.card, background: "#F0FDFA", borderColor: "#99F6E4" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap" as const, gap: 8 }}>
            <span style={{ ...s.label, fontSize: 15, marginBottom: 0 }}>Generated Sitemap ({validCount} URL{validCount !== 1 ? "s" : ""})</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={copy} style={s.btnSm}>{copied ? "Copied!" : "Copy XML"}</button>
              <button onClick={download} style={s.btn}>Download sitemap.xml</button>
            </div>
          </div>
          <pre style={s.pre}>{xml}</pre>
        </div>
      )}

      <SeoContent />
    </div>
  );
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

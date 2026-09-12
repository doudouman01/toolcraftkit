"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function ClientPage() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [diff, setDiff] = useState<{ type: string; line: string }[]>([]);
  const [compared, setCompared] = useState(false);

  const compare = () => {
    const a = textA.split("\n");
    const b = textB.split("\n");
    const maxLen = Math.max(a.length, b.length);
    const results: { type: string; line: string }[] = [];
    for (let i = 0; i < maxLen; i++) {
      const la = a[i] ?? undefined;
      const lb = b[i] ?? undefined;
      if (la === lb) { results.push({ type: "same", line: la || "" }); }
      else {
        if (la !== undefined) results.push({ type: "removed", line: la });
        if (lb !== undefined) results.push({ type: "added", line: lb });
      }
    }
    setDiff(results);
    setCompared(true);
  };

  const stats = { added: diff.filter((d) => d.type === "added").length, removed: diff.filter((d) => d.type === "removed").length, same: diff.filter((d) => d.type === "same").length };

  const s = {
    page: { maxWidth: 900, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 } as const,
    textarea: { width: "100%", minHeight: 200, padding: 12, border: "1px solid #E7E5E4", borderRadius: 8, fontSize: 13, fontFamily: "monospace", resize: "vertical" as const, boxSizing: "border-box" as const } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    line: (type: string) => ({ padding: "4px 12px", fontFamily: "monospace", fontSize: 13, borderLeft: `4px solid ${type === "added" ? "#22c55e" : type === "removed" ? "#ef4444" : "transparent"}`, background: type === "added" ? "#f0fdf4" : type === "removed" ? "#fef2f2" : "transparent", color: type === "same" ? "#78716C" : "#1C1917", whiteSpace: "pre-wrap" as const }),
    badge: (color: string) => ({ display: "inline-block", padding: "4px 12px", borderRadius: 6, fontSize: 13, fontWeight: 600, color: "#fff", background: color, marginRight: 8 }),
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Text Compare" description="Compare two texts side by side. Find differences instantly. Free online diff tool." slug="text-compare" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Text Tools", url: "https://toolcraftkit.com/#text-tools" }, { name: "Text Compare", url: "https://toolcraftkit.com/tools/text-compare" }]} />
      <h1 style={s.h1}>Text Compare / Diff</h1>
      <p style={s.sub}>Paste two texts and find the differences instantly. Line-by-line comparison.</p>

      <div style={s.grid}>
        <div>
          <label style={s.label}>Original Text</label>
          <textarea value={textA} onChange={(e) => setTextA(e.target.value)} placeholder="Paste original text here..." style={s.textarea} />
        </div>
        <div>
          <label style={s.label}>Modified Text</label>
          <textarea value={textB} onChange={(e) => setTextB(e.target.value)} placeholder="Paste modified text here..." style={s.textarea} />
        </div>
      </div>

      <button onClick={compare} style={s.btn}>Compare</button>

      {compared && (
        <div style={{ ...s.card, marginTop: 16 }}>
          <div style={{ marginBottom: 12 }}>
            <span style={s.badge("#22c55e")}>+{stats.added} added</span>
            <span style={s.badge("#ef4444")}>-{stats.removed} removed</span>
            <span style={s.badge("#9ca3af")}>{stats.same} unchanged</span>
          </div>
          <div style={{ border: "1px solid #E7E5E4", borderRadius: 8, overflow: "hidden" }}>
            {diff.map((d, i) => (
              <div key={i} style={s.line(d.type)}>{d.type === "added" ? "+ " : d.type === "removed" ? "- " : "  "}{d.line}</div>
            ))}
          </div>
        </div>
      )}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Compare two texts and see exactly what changed. Added lines are highlighted in green, removed lines in red. Perfect for comparing code, documents, emails, or any text. Everything runs in your browser.</p>
      </div>
    </div>
  );
}

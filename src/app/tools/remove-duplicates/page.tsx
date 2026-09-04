"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [input, setInput] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(true);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [sortOutput, setSortOutput] = useState(false);
  const [copied, setCopied] = useState(false);

  const processText = () => {
    if (!input) return { output: "", stats: { total: 0, unique: 0, duplicates: 0, empty: 0 } };
    let lines = input.split("\n");
    const total = lines.length;
    let empty = 0;

    if (removeEmpty) {
      const before = lines.length;
      lines = lines.filter((l) => l.trim() !== "");
      empty = before - lines.length;
    }

    const seen = new Set<string>();
    const unique: string[] = [];
    let duplicates = 0;

    for (const line of lines) {
      const key = caseSensitive ? (trimWhitespace ? line.trim() : line) : (trimWhitespace ? line.trim().toLowerCase() : line.toLowerCase());
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(trimWhitespace ? line.trim() : line);
      } else {
        duplicates++;
      }
    }

    const result = sortOutput ? [...unique].sort((a, b) => a.localeCompare(b)) : unique;
    return { output: result.join("\n"), stats: { total, unique: unique.length, duplicates, empty } };
  };

  const { output, stats } = processText();

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); };
  const download = () => { const blob = new Blob([output], { type: "text/plain" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "unique-lines.txt"; a.click(); };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    ta: { width: "100%", minHeight: 160, border: "1px solid #E7E5E4", borderRadius: 8, padding: 12, fontSize: 14, fontFamily: "'Courier New', monospace", resize: "vertical" as const, outline: "none", lineHeight: 1.6 } as const,
    check: { display: "flex" as const, alignItems: "center" as const, gap: 6, cursor: "pointer", fontSize: 13, color: "#1C1917" } as const,
    stat: { textAlign: "center" as const, padding: "8px 12px" },
    statVal: { fontSize: 20, fontWeight: 700, color: "#0D9488" } as const,
    statLabel: { fontSize: 11, color: "#78716C" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Remove Duplicate Lines"
        description="Remove duplicate lines from text. Keep only unique entries, sort, and trim whitespace."
        slug="remove-duplicates"
        category="UtilitiesApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Text Tools", url: "https://toolcraftkit.com/#text-tools" },
          { name: "Remove Duplicate Lines", url: "https://toolcraftkit.com/tools/remove-duplicates" },
        ]}
      />
      <h1 style={s.h1}>Remove Duplicate Lines</h1>
      <p style={s.sub}>Remove duplicate lines from text. Keep only unique entries.</p>

      <div style={s.card}>
        <div style={{ ...s.row, marginBottom: 16 }}>
          <label style={s.check}>
            <input type="checkbox" checked={caseSensitive} onChange={() => setCaseSensitive(!caseSensitive)} style={{ accentColor: "#0D9488" }} />
            Case sensitive
          </label>
          <label style={s.check}>
            <input type="checkbox" checked={trimWhitespace} onChange={() => setTrimWhitespace(!trimWhitespace)} style={{ accentColor: "#0D9488" }} />
            Trim whitespace
          </label>
          <label style={s.check}>
            <input type="checkbox" checked={removeEmpty} onChange={() => setRemoveEmpty(!removeEmpty)} style={{ accentColor: "#0D9488" }} />
            Remove empty lines
          </label>
          <label style={s.check}>
            <input type="checkbox" checked={sortOutput} onChange={() => setSortOutput(!sortOutput)} style={{ accentColor: "#0D9488" }} />
            Sort A→Z
          </label>
        </div>

        <label style={s.label}>Input — paste your text (one item per line)</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={"apple\nbanana\napple\ncherry\nbanana\ndate"} style={s.ta} />

        {input && (
          <div style={{ display: "flex", justifyContent: "center", gap: 24, margin: "16px 0", padding: "12px 0", background: "#FAFAF9", borderRadius: 8 }}>
            <div style={s.stat}><div style={s.statVal}>{stats.total}</div><div style={s.statLabel}>Total Lines</div></div>
            <div style={s.stat}><div style={s.statVal}>{stats.unique}</div><div style={s.statLabel}>Unique</div></div>
            <div style={s.stat}><div style={{ ...s.statVal, color: stats.duplicates > 0 ? "#EF4444" : "#0D9488" }}>{stats.duplicates}</div><div style={s.statLabel}>Duplicates</div></div>
            {stats.empty > 0 && <div style={s.stat}><div style={{ ...s.statVal, color: "#F59E0B" }}>{stats.empty}</div><div style={s.statLabel}>Empty</div></div>}
          </div>
        )}

        <label style={{ ...s.label, marginTop: 14 }}>Output — unique lines only</label>
        <textarea value={output} readOnly style={{ ...s.ta, background: "#FAFAF9" }} />

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <button onClick={copy} style={s.btn}>{copied ? "Copied!" : "Copy Output"}</button>
          <button onClick={download} style={s.btnSm}>Download .txt</button>
          <button onClick={() => setInput("")} style={s.btnSm}>Clear</button>
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Paste a list of lines and instantly see only the unique entries. Perfect for cleaning up email lists, keyword lists, product SKUs, data exports, or any text that has repeated lines.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Options let you control whether matching is case-sensitive, whether whitespace is trimmed, and whether the output should be sorted alphabetically. Everything runs in your browser — nothing is uploaded.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "Does this tool change the order of my lines?", a: "By default, the original order is preserved (first occurrence kept). Enable the 'Sort A→Z' option if you want alphabetical output." },
          { q: "Is the matching case-sensitive?", a: "By default yes — 'Apple' and 'apple' are treated as different. Uncheck 'Case sensitive' to treat them as the same." },
          { q: "Can I use this for large files?", a: "Yes. The tool runs in your browser and handles tens of thousands of lines efficiently. For very large files (100K+ lines), processing may take a second." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

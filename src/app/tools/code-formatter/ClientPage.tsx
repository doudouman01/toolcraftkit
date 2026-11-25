"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useTranslation } from "@/lib/i18n/useTranslation";

type Lang = "javascript" | "typescript" | "json" | "html" | "css" | "python" | "sql";

const LANG_LABELS: Record<Lang, string> = {
  javascript: "JavaScript",
  typescript: "TypeScript",
  json: "JSON",
  html: "HTML",
  css: "CSS",
  python: "Python",
  sql: "SQL",
};

function formatJSON(code: string, indent: number): string {
  try { return JSON.stringify(JSON.parse(code), null, indent); } catch { return code; }
}

function formatHTML(code: string, indent: number): string {
  const tab = " ".repeat(indent);
  let formatted = "";
  let level = 0;
  const selfClosing = /^(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/i;
  const tokens = code.replace(/>\s*</g, ">\n<").split("\n");
  for (const raw of tokens) {
    const token = raw.trim();
    if (!token) continue;
    if (token.startsWith("</")) { level = Math.max(0, level - 1); formatted += tab.repeat(level) + token + "\n"; }
    else if (token.startsWith("<") && !token.startsWith("<!")) {
      formatted += tab.repeat(level) + token + "\n";
      const tagMatch = token.match(/^<(\w+)/);
      if (tagMatch && !selfClosing.test(tagMatch[1]) && !token.endsWith("/>") && !token.includes("</")) level++;
    } else { formatted += tab.repeat(level) + token + "\n"; }
  }
  return formatted.trimEnd();
}

function formatCSS(code: string, indent: number): string {
  const tab = " ".repeat(indent);
  let result = code
    .replace(/\s*{\s*/g, " {\n")
    .replace(/\s*}\s*/g, "\n}\n\n")
    .replace(/;\s*/g, ";\n");
  const lines = result.split("\n");
  let level = 0;
  const formatted: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { if (formatted.length && formatted[formatted.length - 1] !== "") formatted.push(""); continue; }
    if (line === "}") { level = Math.max(0, level - 1); formatted.push(tab.repeat(level) + line); }
    else if (line.endsWith("{")) { formatted.push(tab.repeat(level) + line); level++; }
    else { formatted.push(tab.repeat(level) + line); }
  }
  return formatted.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd();
}

function formatSQL(code: string, indent: number): string {
  const tab = " ".repeat(indent);
  const kw = ["SELECT", "FROM", "WHERE", "AND", "OR", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "ON", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "OFFSET", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "UNION", "UNION ALL"];
  let result = code.replace(/\s+/g, " ").trim();
  for (const k of kw) { result = result.replace(new RegExp(`\\b${k}\\b`, "gi"), `\n${k.toUpperCase()}`); }
  const lines = result.split("\n").map(l => l.trim()).filter(Boolean);
  const formatted: string[] = [];
  for (const line of lines) {
    const upper = line.toUpperCase();
    if (["SELECT", "FROM", "WHERE", "GROUP BY", "ORDER BY", "HAVING", "LIMIT", "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE", "ALTER TABLE", "DROP TABLE", "UNION", "UNION ALL"].some(k => upper.startsWith(k))) {
      formatted.push(line);
    } else { formatted.push(tab + line); }
  }
  return formatted.join("\n").trimEnd();
}

function formatPython(code: string, indent: number): string {
  const tab = " ".repeat(indent);
  const lines = code.split("\n");
  const formatted: string[] = [];
  for (const raw of lines) {
    const stripped = raw.trimEnd();
    const leading = raw.length - raw.trimStart().length;
    const currentIndent = Math.round(leading / indent) || (leading > 0 ? Math.round(leading / 4) : 0);
    formatted.push(tab.repeat(currentIndent) + stripped.trimStart());
  }
  return formatted.join("\n");
}

function formatJS(code: string, indent: number): string {
  const tab = " ".repeat(indent);
  let result = code
    .replace(/\s*{\s*/g, " {\n")
    .replace(/\s*}\s*/g, "\n}\n")
    .replace(/;\s*/g, ";\n")
    .replace(/,\s*/g, ",\n");
  const lines = result.split("\n");
  let level = 0;
  const formatted: string[] = [];
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    if (line === "}" || line === "};") { level = Math.max(0, level - 1); formatted.push(tab.repeat(level) + line); }
    else if (line.endsWith("{")) { formatted.push(tab.repeat(level) + line); level++; }
    else { formatted.push(tab.repeat(level) + line); }
  }
  return formatted.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd();
}

function formatCode(code: string, lang: Lang, indent: number): string {
  if (!code.trim()) return "";
  switch (lang) {
    case "json": return formatJSON(code, indent);
    case "html": return formatHTML(code, indent);
    case "css": return formatCSS(code, indent);
    case "sql": return formatSQL(code, indent);
    case "python": return formatPython(code, indent);
    case "javascript": case "typescript": return formatJS(code, indent);
    default: return code;
  }
}

const s = {
  page: { maxWidth: 900, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  select: { border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", color: "#1C1917", background: "#fff", cursor: "pointer" as const },
  textarea: { width: "100%", minHeight: 300, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.6, color: "#1C1917", fontFamily: "'Courier New', Consolas, monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, tabSize: 4 },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  toolbar: { display: "flex" as const, gap: 12, alignItems: "center" as const, marginBottom: 12, flexWrap: "wrap" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  grid: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 16 },
};

export default function ClientPage() {
  const { t } = useTranslation();
  const [lang, setLang] = useState<Lang>("javascript");
  const [indent, setIndent] = useState(2);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFormat = useCallback(() => {
    setOutput(formatCode(input, lang, indent));
    setCopied(false);
  }, [input, lang, indent]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  }, [output]);

  return (
    <div style={s.page}>
      <ToolSchema name="Code Formatter" description="Format and beautify code in JavaScript, TypeScript, JSON, HTML, CSS, Python, and SQL." slug="code-formatter" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Code Formatter", url: "https://toolcraftkit.com/tools/code-formatter" }]} />

      <h1 style={s.h1}>"Code Formatter & Beautifier"</h1>
      <p style={s.sub}>"Format and beautify code in JavaScript, TypeScript, JSON, HTML, CSS, Python, and SQL."</p>

      <div style={s.toolbar}>
        <select style={s.select} value={lang} onChange={e => setLang(e.target.value as Lang)}>
          {Object.entries(LANG_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select style={s.select} value={indent} onChange={e => setIndent(+e.target.value)}>
          <option value={2}>2 spaces</option>
          <option value={4}>4 spaces</option>
        </select>
        <button style={s.btn} onClick={handleFormat}>Format Code</button>
        {output && <button style={s.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy Output"}</button>}
      </div>

      <div style={s.grid}>
        <div>
          <label style={s.label}>Input (paste your code)</label>
          <textarea style={s.textarea} value={input} onChange={e => setInput(e.target.value)} placeholder={`Paste your ${LANG_LABELS[lang]} code here...`} spellCheck={false} />
        </div>
        <div>
          <label style={s.label}>Formatted Output</label>
          <textarea style={{ ...s.textarea, background: "#FAFAF9" }} value={output} readOnly placeholder="Formatted code will appear here..." spellCheck={false} />
        </div>
      </div>

      <SeoContent />
    </div>
  );
}

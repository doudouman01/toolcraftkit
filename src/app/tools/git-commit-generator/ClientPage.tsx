"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

const TYPES = [
  { value: "feat", label: "feat", desc: "A new feature" },
  { value: "fix", label: "fix", desc: "A bug fix" },
  { value: "docs", label: "docs", desc: "Documentation changes" },
  { value: "style", label: "style", desc: "Code style (formatting, semicolons)" },
  { value: "refactor", label: "refactor", desc: "Code refactoring" },
  { value: "test", label: "test", desc: "Adding or fixing tests" },
  { value: "chore", label: "chore", desc: "Maintenance tasks" },
  { value: "perf", label: "perf", desc: "Performance improvements" },
  { value: "ci", label: "ci", desc: "CI/CD changes" },
  { value: "build", label: "build", desc: "Build system changes" },
  { value: "revert", label: "revert", desc: "Reverting a previous commit" },
];

export default function ClientPage() {
  const [type, setType] = useState("feat");
  const [scope, setScope] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [breaking, setBreaking] = useState(false);
  const [breakingDesc, setBreakingDesc] = useState("");
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    if (!description.trim()) return "";
    const scopePart = scope.trim() ? `(${scope.trim()})` : "";
    const bangPart = breaking ? "!" : "";
    let msg = `${type}${scopePart}${bangPart}: ${description.trim()}`;
    if (body.trim()) msg += `\n\n${body.trim()}`;
    if (breaking && breakingDesc.trim()) msg += `\n\nBREAKING CHANGE: ${breakingDesc.trim()}`;
    else if (breaking && !breakingDesc.trim()) msg += `\n\nBREAKING CHANGE: ${description.trim()}`;
    return msg;
  }, [type, scope, description, body, breaking, breakingDesc]);

  const copy = () => { navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const s = {
    page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    ta: { width: "100%", minHeight: 80, border: "1px solid #E7E5E4", borderRadius: 8, padding: 12, fontSize: 14, fontFamily: "'Courier New', monospace", resize: "vertical" as const, outline: "none", lineHeight: 1.6 } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", background: "#fff", cursor: "pointer" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Git Commit Message Generator" description="Generate conventional commit messages. Choose type, scope, description, and body." slug="git-commit-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Git Commit Generator", url: "https://toolcraftkit.com/tools/git-commit-generator" }]} />

      <h1 style={s.h1}>Git Commit Message Generator</h1>
      <p style={s.sub}>Create clean, conventional commit messages for your Git projects.</p>

      <div style={s.card}>
        {/* Type */}
        <label style={s.label}>Commit Type *</label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 8, marginBottom: 16 }}>
          {TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setType(t.value)}
              style={{
                ...s.btnSm,
                background: type === t.value ? "#0D9488" : "#F5F5F4",
                color: type === t.value ? "#fff" : "#1C1917",
                borderColor: type === t.value ? "#0D9488" : "#E7E5E4",
                textAlign: "left" as const,
                padding: "8px 12px",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: 13 }}>{t.label}</div>
              <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{t.desc}</div>
            </button>
          ))}
        </div>

        {/* Scope */}
        <label style={s.label}>Scope (optional)</label>
        <input value={scope} onChange={(e) => setScope(e.target.value)} placeholder="e.g., auth, api, ui, database" style={{ ...s.input, marginBottom: 16 }} />

        {/* Description */}
        <label style={s.label}>Description *</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g., add user authentication flow"
          style={{ ...s.input, marginBottom: 16 }}
          maxLength={100}
        />
        <div style={{ fontSize: 11, color: description.length > 72 ? "#EF4444" : "#A8A29E", marginTop: -12, marginBottom: 16, textAlign: "right" as const }}>
          {description.length}/100 {description.length > 72 && "(best practice: keep under 72 chars)"}
        </div>

        {/* Body */}
        <label style={s.label}>Body (optional)</label>
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Provide additional context, motivation, or implementation details..." style={{ ...s.ta, marginBottom: 16 }} />

        {/* Breaking change */}
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", marginBottom: 8 }}>
          <input type="checkbox" checked={breaking} onChange={() => setBreaking(!breaking)} style={{ accentColor: "#EF4444", width: 18, height: 18 }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: breaking ? "#DC2626" : "#1C1917" }}>⚠ Breaking Change</span>
        </label>
        {breaking && (
          <input
            value={breakingDesc}
            onChange={(e) => setBreakingDesc(e.target.value)}
            placeholder="Describe what breaks (optional — defaults to description)"
            style={{ ...s.input, borderColor: "#FECACA", marginBottom: 16 }}
          />
        )}
      </div>

      {/* Preview */}
      {message && (
        <div style={{ ...s.card, background: "#F0FDFA", borderColor: "#99F6E4" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ ...s.label, fontSize: 15, marginBottom: 0 }}>Generated Commit Message</span>
            <button onClick={copy} style={s.btn}>{copied ? "Copied!" : "Copy"}</button>
          </div>
          <pre style={{ background: "#fff", border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 14, fontFamily: "'Courier New', monospace", whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 1.6, margin: 0, color: "#1C1917" }}>
            {message}
          </pre>
        </div>
      )}

      {/* Git command */}
      {message && (
        <div style={s.card}>
          <span style={{ ...s.label, fontSize: 13 }}>Quick Git Command</span>
          <code style={{ display: "block", background: "#FAFAF9", padding: 12, borderRadius: 6, fontSize: 13, fontFamily: "'Courier New', monospace", color: "#57534E", wordBreak: "break-all" }}>
            git commit -m &quot;{message.split("\n")[0]}&quot;{message.includes("\n\n") ? ` -m "${message.split("\n\n").slice(1).join("\n\n")}"` : ""}
          </code>
        </div>
      )}

      <SeoContent />
    </div>
  );
}

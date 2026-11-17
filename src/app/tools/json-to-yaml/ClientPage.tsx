"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

// Simple JSON to YAML serializer
function jsonToYaml(obj: unknown, indent: number = 0): string {
  const pad = "  ".repeat(indent);
  if (obj === null) return "null";
  if (obj === undefined) return "null";
  if (typeof obj === "boolean") return obj ? "true" : "false";
  if (typeof obj === "number") return String(obj);
  if (typeof obj === "string") {
    if (obj === "" || obj.includes("\n") || obj.includes(":") || obj.includes("#") ||
        obj.includes("'") || obj.startsWith(" ") || obj.endsWith(" ") ||
        obj === "true" || obj === "false" || obj === "null" || !isNaN(Number(obj))) {
      return JSON.stringify(obj);
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    return obj.map((item) => {
      const val = jsonToYaml(item, indent + 1);
      if (typeof item === "object" && item !== null && !Array.isArray(item)) {
        const lines = val.split("\n");
        return `${pad}- ${lines[0]}\n${lines.slice(1).map((l) => `${pad}  ${l}`).join("\n")}`;
      }
      return `${pad}- ${val}`;
    }).join("\n");
  }
  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    return entries.map(([key, val]) => {
      const safeKey = key.includes(":") || key.includes(" ") || key.includes("#") ? JSON.stringify(key) : key;
      if (typeof val === "object" && val !== null) {
        return `${pad}${safeKey}:\n${jsonToYaml(val, indent + 1)}`;
      }
      return `${pad}${safeKey}: ${jsonToYaml(val, indent)}`;
    }).join("\n");
  }
  return String(obj);
}

// Simple YAML to JSON parser (handles common cases)
function yamlToJson(yaml: string): unknown {
  const lines = yaml.split("\n");
  // Simple approach: try to handle basic key: value, arrays, nesting
  // For robustness, we do a best-effort parse
  return parseYamlLines(lines, 0).value;
}

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parseYamlLines(lines: string[], startIndent: number): { value: unknown; consumed: number } {
  if (lines.length === 0) return { value: null, consumed: 0 };

  const firstLine = lines[0];
  const trimmed = firstLine.trim();

  // Empty or comment
  if (!trimmed || trimmed.startsWith("#")) {
    if (lines.length <= 1) return { value: null, consumed: 1 };
    const rest = parseYamlLines(lines.slice(1), startIndent);
    return { value: rest.value, consumed: 1 + rest.consumed };
  }

  // Array item at current level
  if (trimmed.startsWith("- ")) {
    const arr: unknown[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const lineT = line.trim();
      if (!lineT || lineT.startsWith("#")) { i++; continue; }
      const ind = getIndent(line);
      if (ind < startIndent) break;
      if (ind === startIndent && lineT.startsWith("- ")) {
        const val = parseYamlValue(lineT.slice(2).trim());
        arr.push(val);
        i++;
      } else if (ind > startIndent) {
        // Nested content of previous array item
        i++;
      } else {
        break;
      }
    }
    return { value: arr, consumed: i };
  }

  // Object
  if (trimmed.includes(":")) {
    const obj: Record<string, unknown> = {};
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const lineT = line.trim();
      if (!lineT || lineT.startsWith("#")) { i++; continue; }
      const ind = getIndent(line);
      if (ind < startIndent) break;
      if (ind > startIndent) { i++; continue; }
      const colonIdx = lineT.indexOf(":");
      if (colonIdx === -1) { i++; continue; }
      const key = lineT.slice(0, colonIdx).trim().replace(/^["']|["']$/g, "");
      const valStr = lineT.slice(colonIdx + 1).trim();
      if (valStr) {
        obj[key] = parseYamlValue(valStr);
        i++;
      } else {
        // Nested value on next lines
        i++;
        const nextLines = lines.slice(i);
        if (nextLines.length > 0 && getIndent(nextLines[0]) > ind) {
          const nested = parseYamlLines(nextLines, getIndent(nextLines[0]));
          obj[key] = nested.value;
          i += nested.consumed;
        } else {
          obj[key] = null;
        }
      }
    }
    return { value: obj, consumed: i };
  }

  return { value: parseYamlValue(trimmed), consumed: 1 };
}

function parseYamlValue(s: string): unknown {
  if (s === "null" || s === "~" || s === "") return null;
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "[]") return [];
  if (s === "{}") return {};
  if (/^-?\d+$/.test(s)) return parseInt(s, 10);
  if (/^-?\d+\.\d+$/.test(s)) return parseFloat(s);
  // Strip quotes
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function syntaxHighlight(text: string, type: "json" | "yaml"): React.ReactNode[] {
  return text.split("\n").map((line, i) => {
    let highlighted = line;
    if (type === "json") {
      highlighted = line
        .replace(/"([^"]+)":/g, '<span style="color:#0D9488">"$1"</span>:')
        .replace(/:\s*"([^"]*)"/g, ': <span style="color:#D97706">"$1"</span>')
        .replace(/:\s*(\d+\.?\d*)/g, ': <span style="color:#6366F1">$1</span>')
        .replace(/:\s*(true|false|null)/g, ': <span style="color:#DC2626">$1</span>');
    } else {
      highlighted = line
        .replace(/^(\s*)([^\s#-][^:]*?):/gm, '$1<span style="color:#0D9488">$2</span>:')
        .replace(/:\s+"([^"]*)"/g, ': <span style="color:#D97706">"$1"</span>')
        .replace(/:\s+(\d+\.?\d*)/g, ': <span style="color:#6366F1">$1</span>')
        .replace(/:\s+(true|false|null)/g, ': <span style="color:#DC2626">$1</span>');
    }
    return <div key={i} dangerouslySetInnerHTML={{ __html: highlighted || "&nbsp;" }} />;
  });
}

export default function ClientPage() {
  const [mode, setMode] = useState<"json-to-yaml" | "yaml-to-json">("json-to-yaml");
  const [input, setInput] = useState('{\n  "name": "John",\n  "age": 30,\n  "hobbies": ["reading", "coding"],\n  "active": true\n}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const convert = () => {
    setError("");
    try {
      if (mode === "json-to-yaml") {
        const parsed = JSON.parse(input);
        setOutput(jsonToYaml(parsed));
      } else {
        const parsed = yamlToJson(input);
        setOutput(JSON.stringify(parsed, null, 2));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid input.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const btnActive: React.CSSProperties = { padding: "8px 20px", fontSize: 14, fontWeight: 600, background: "#0D9488", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" };
  const btnInactive: React.CSSProperties = { ...btnActive, background: "#F5F5F4", color: "#57534E" };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px 60px" }}>
      <ToolSchema name="JSON to YAML Converter" description="Convert between JSON and YAML formats instantly. Client-side." slug="json-to-yaml" category="DeveloperApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" }, { name: "JSON to YAML", url: "https://toolcraftkit.com/tools/json-to-yaml" }]} />

      <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1C1917", marginBottom: 6 }}>JSON to YAML Converter</h1>
      <p style={{ fontSize: 15, color: "#78716C", marginBottom: 24 }}>Convert between JSON and YAML formats. 100% client-side.</p>

      {/* Mode toggle */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button onClick={() => { setMode("json-to-yaml"); setOutput(""); setError(""); }} style={mode === "json-to-yaml" ? btnActive : btnInactive}>JSON &rarr; YAML</button>
        <button onClick={() => { setMode("yaml-to-json"); setOutput(""); setError(""); }} style={mode === "yaml-to-json" ? btnActive : btnInactive}>YAML &rarr; JSON</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Input */}
        <div>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E", marginBottom: 4, display: "block" }}>
            {mode === "json-to-yaml" ? "JSON Input" : "YAML Input"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            spellCheck={false}
            style={{
              width: "100%", padding: "12px 14px", fontSize: 13, border: "1px solid #E7E5E4",
              borderRadius: 8, outline: "none", background: "#fff", color: "#1C1917",
              fontFamily: "monospace", resize: "vertical", boxSizing: "border-box", lineHeight: 1.5,
            }}
          />
        </div>

        {/* Output */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#57534E" }}>
              {mode === "json-to-yaml" ? "YAML Output" : "JSON Output"}
            </label>
            {output && (
              <button onClick={handleCopy} style={{
                padding: "4px 10px", fontSize: 12, fontWeight: 600, background: "#0D9488",
                color: "#fff", border: "none", borderRadius: 4, cursor: "pointer",
              }}>
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <div style={{
            width: "100%", minHeight: 320, padding: "12px 14px", fontSize: 13,
            border: "1px solid #E7E5E4", borderRadius: 8, background: "#FAFAF9", color: "#1C1917",
            fontFamily: "monospace", lineHeight: 1.5, overflowX: "auto", overflowY: "auto",
            whiteSpace: "pre", boxSizing: "border-box", maxHeight: 500,
          }}>
            {output ? syntaxHighlight(output, mode === "json-to-yaml" ? "yaml" : "json") : (
              <span style={{ color: "#A8A29E" }}>Output will appear here...</span>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div style={{ marginTop: 12, padding: "10px 14px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 8, color: "#DC2626", fontSize: 14 }}>
          {error}
        </div>
      )}

      <button onClick={convert} style={{
        marginTop: 16, width: "100%", padding: "12px", fontSize: 15, fontWeight: 700,
        background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
      }}>
        Convert
      </button>

      <SeoContent />
    </div>
  );
}

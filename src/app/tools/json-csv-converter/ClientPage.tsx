"use client";
import { useState, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── HELPERS ─── */

function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];
    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flattenObject(val as Record<string, unknown>, fullKey));
    } else if (Array.isArray(val)) {
      result[fullKey] = JSON.stringify(val);
    } else {
      result[fullKey] = val === null || val === undefined ? "" : String(val);
    }
  }
  return result;
}

function escapeCsvField(field: string): string {
  if (field.includes(",") || field.includes('"') || field.includes("\n") || field.includes("\r")) {
    return '"' + field.replace(/"/g, '""') + '"';
  }
  return field;
}

function jsonToCsv(jsonData: unknown[]): { csv: string; headers: string[]; rows: string[][] } {
  const flatRows = jsonData.map((item) =>
    flattenObject(item as Record<string, unknown>)
  );
  const headerSet = new Set<string>();
  flatRows.forEach((row) => Object.keys(row).forEach((k) => headerSet.add(k)));
  const headers = Array.from(headerSet);
  const rows = flatRows.map((row) => headers.map((h) => row[h] ?? ""));
  const csvLines = [
    headers.map(escapeCsvField).join(","),
    ...rows.map((row) => row.map(escapeCsvField).join(",")),
  ];
  return { csv: csvLines.join("\n"), headers, rows };
}

function parseCsvLine(line: string, delimiter: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        fields.push(current);
        current = "";
      } else {
        current += ch;
      }
    }
  }
  fields.push(current);
  return fields;
}

function csvToJson(csvText: string, delimiter: string, hasHeader: boolean): unknown[] {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim() !== "");
  if (lines.length === 0) return [];
  const delimChar = delimiter === "tab" ? "\t" : delimiter === "semicolon" ? ";" : ",";
  if (hasHeader) {
    const headers = parseCsvLine(lines[0], delimChar);
    return lines.slice(1).map((line) => {
      const values = parseCsvLine(line, delimChar);
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = (values[i] ?? "").trim();
      });
      return obj;
    });
  } else {
    return lines.map((line) => {
      const values = parseCsvLine(line, delimChar);
      const obj: Record<string, string> = {};
      values.forEach((v, i) => {
        obj[`column_${i + 1}`] = v.trim();
      });
      return obj;
    });
  }
}

/* ─── STYLES ─── */
const s = {
  page: { maxWidth: 780, margin: "0 auto", padding: "32px 20px" } as const,
  h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
  tabs: { display: "flex" as const, gap: 0, marginBottom: 20, borderRadius: 8, overflow: "hidden" as const, border: "1px solid #E7E5E4" },
  tab: (active: boolean) => ({
    flex: 1, padding: "11px 16px", fontSize: 14, fontWeight: 600, cursor: "pointer",
    border: "none", background: active ? "#0D9488" : "#FAFAF9", color: active ? "#fff" : "#78716C",
    transition: "background 0.15s ease, color 0.15s ease",
  }) as const,
  textarea: {
    width: "100%", minHeight: 160, padding: 12, fontSize: 13,
    fontFamily: "'Courier New', monospace", border: "1px solid #E7E5E4",
    borderRadius: 8, resize: "vertical" as const, outline: "none",
    boxSizing: "border-box" as const, lineHeight: 1.6, background: "#fff",
  } as const,
  textareaReadonly: {
    width: "100%", minHeight: 140, padding: 12, fontSize: 13,
    fontFamily: "'Courier New', monospace", border: "1px solid #E7E5E4",
    borderRadius: 8, resize: "vertical" as const, outline: "none",
    boxSizing: "border-box" as const, lineHeight: 1.6, background: "#FAFAF9",
  } as const,
  btn: {
    background: "#0D9488", color: "#fff", border: "none", borderRadius: 8,
    padding: "10px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer",
  } as const,
  btnSm: {
    background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4",
    borderRadius: 6, padding: "8px 14px", fontSize: 13, cursor: "pointer",
  } as const,
  btnOutline: {
    background: "#fff", color: "#0D9488", border: "1px solid #0D9488",
    borderRadius: 6, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer",
  } as const,
  error: {
    color: "#EF4444", fontSize: 13, marginTop: 8, padding: "10px 14px",
    background: "#FEF2F2", borderRadius: 6, border: "1px solid #FECACA",
  } as const,
  row: { display: "flex" as const, gap: 8, marginTop: 12, flexWrap: "wrap" as const, alignItems: "center" as const },
  optRow: { display: "flex" as const, gap: 12, marginBottom: 14, flexWrap: "wrap" as const, alignItems: "center" as const },
  select: {
    padding: "7px 12px", fontSize: 13, border: "1px solid #E7E5E4",
    borderRadius: 6, outline: "none", background: "#fff", color: "#1C1917", cursor: "pointer",
  } as const,
  checkbox: { marginRight: 6, accentColor: "#0D9488" } as const,
  tableWrap: {
    overflowX: "auto" as const, border: "1px solid #E7E5E4",
    borderRadius: 8, marginTop: 12, maxHeight: 360, overflowY: "auto" as const,
  },
  th: {
    padding: "8px 12px", fontSize: 12, fontWeight: 600, color: "#1C1917",
    background: "#F5F5F4", borderBottom: "1px solid #E7E5E4",
    textAlign: "left" as const, whiteSpace: "nowrap" as const,
    position: "sticky" as const, top: 0, zIndex: 1,
  } as const,
  td: {
    padding: "7px 12px", fontSize: 12, color: "#57534E",
    borderBottom: "1px solid #F5F5F4", whiteSpace: "nowrap" as const,
    maxWidth: 220, overflow: "hidden" as const, textOverflow: "ellipsis" as const,
  } as const,
  fileInput: {
    fontSize: 13, color: "#78716C",
  } as const,
  badge: {
    fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 5,
    background: "rgba(13,148,136,0.1)", color: "#0D9488",
  } as const,
};

/* ─── FAQ ITEM ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #E7E5E4", padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, textAlign: "left",
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", lineHeight: 1.4, paddingRight: 16 }}>{q}</span>
        <span style={{
          fontSize: 18, color: "#78716C", flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: "#78716C", lineHeight: 1.65, marginTop: 10, marginBottom: 0, paddingRight: 30 }}>{a}</p>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function ClientPage() {
  const [tab, setTab] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");

  /* JSON -> CSV state */
  const [jsonInput, setJsonInput] = useState("");
  const [csvOutput, setCsvOutput] = useState("");
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<string[][]>([]);
  const [jsonError, setJsonError] = useState("");
  const [jsonCopied, setJsonCopied] = useState(false);
  const jsonFileRef = useRef<HTMLInputElement>(null);

  /* CSV -> JSON state */
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState("");
  const [csvError, setCsvError] = useState("");
  const [csvCopied, setCsvCopied] = useState(false);
  const [delimiter, setDelimiter] = useState("comma");
  const [hasHeader, setHasHeader] = useState(true);
  const csvFileRef = useRef<HTMLInputElement>(null);

  /* ─── JSON -> CSV logic ─── */
  const convertJsonToCsv = useCallback(() => {
    setJsonError("");
    setCsvOutput("");
    setCsvHeaders([]);
    setCsvRows([]);
    if (!jsonInput.trim()) {
      setJsonError("Please paste JSON data or upload a file.");
      return;
    }
    try {
      const parsed = JSON.parse(jsonInput);
      let dataArray: unknown[];
      if (Array.isArray(parsed)) {
        dataArray = parsed;
      } else if (typeof parsed === "object" && parsed !== null) {
        dataArray = [parsed];
      } else {
        setJsonError("Input must be a JSON array of objects or a single object.");
        return;
      }
      if (dataArray.length === 0) {
        setJsonError("The JSON array is empty. Provide at least one object.");
        return;
      }
      if (typeof dataArray[0] !== "object" || dataArray[0] === null) {
        setJsonError("Each item in the array must be a JSON object (not a string or number).");
        return;
      }
      const { csv, headers, rows } = jsonToCsv(dataArray);
      setCsvOutput(csv);
      setCsvHeaders(headers);
      setCsvRows(rows);
    } catch (e) {
      setJsonError("Invalid JSON: " + (e instanceof Error ? e.message : "Could not parse input."));
    }
  }, [jsonInput]);

  const handleJsonFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setJsonInput(text);
      setJsonError("");
      setCsvOutput("");
      setCsvHeaders([]);
      setCsvRows([]);
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const copyCsvOutput = useCallback(() => {
    navigator.clipboard.writeText(csvOutput);
    setJsonCopied(true);
    setTimeout(() => setJsonCopied(false), 1500);
  }, [csvOutput]);

  const downloadCsv = useCallback(() => {
    const blob = new Blob([csvOutput], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }, [csvOutput]);

  /* ─── CSV -> JSON logic ─── */
  const convertCsvToJson = useCallback(() => {
    setCsvError("");
    setJsonOutput("");
    if (!csvInput.trim()) {
      setCsvError("Please paste CSV data or upload a file.");
      return;
    }
    try {
      const result = csvToJson(csvInput, delimiter, hasHeader);
      if (result.length === 0) {
        setCsvError("No data rows found in the CSV input.");
        return;
      }
      setJsonOutput(JSON.stringify(result, null, 2));
    } catch (e) {
      setCsvError("Parse error: " + (e instanceof Error ? e.message : "Could not parse CSV."));
    }
  }, [csvInput, delimiter, hasHeader]);

  const handleCsvFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setCsvInput(text);
      setCsvError("");
      setJsonOutput("");
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const copyJsonOutput = useCallback(() => {
    navigator.clipboard.writeText(jsonOutput);
    setCsvCopied(true);
    setTimeout(() => setCsvCopied(false), 1500);
  }, [jsonOutput]);

  const downloadJson = useCallback(() => {
    const blob = new Blob([jsonOutput], { type: "application/json;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [jsonOutput]);

  /* ─── Tab switch clears state ─── */
  const switchTab = (t: "json-to-csv" | "csv-to-json") => {
    setTab(t);
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="JSON to CSV Converter"
        description="Convert JSON arrays to CSV files or CSV data to JSON. Handles nested objects with dot notation flattening. Free, no signup."
        slug="json-csv-converter"
        category="ConvertAction"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Converter Tools", url: "https://toolcraftkit.com/#converter-tools" },
          { name: "JSON to CSV Converter", url: "https://toolcraftkit.com/tools/json-csv-converter" },
        ]}
      />

      <h1 style={s.h1}>JSON to CSV Converter</h1>
      <p style={s.sub}>Convert between JSON and CSV instantly. Handles nested objects, custom delimiters. Runs in your browser.</p>

      {/* ─── TABS ─── */}
      <div style={s.tabs}>
        <button style={s.tab(tab === "json-to-csv")} onClick={() => switchTab("json-to-csv")}>
          JSON → CSV
        </button>
        <button style={s.tab(tab === "csv-to-json")} onClick={() => switchTab("csv-to-json")}>
          CSV → JSON
        </button>
      </div>

      {/* ════════════════════════════════════════════
          TAB 1: JSON → CSV
          ════════════════════════════════════════════ */}
      {tab === "json-to-csv" && (
        <>
          <div style={s.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <label style={{ ...s.label, marginBottom: 0 }}>JSON Input</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  ref={jsonFileRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleJsonFile}
                  style={{ display: "none" }}
                />
                <button onClick={() => jsonFileRef.current?.click()} style={s.btnSm}>
                  Upload .json
                </button>
              </div>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => { setJsonInput(e.target.value); setJsonError(""); }}
              placeholder={'[\n  { "name": "Alice", "age": 30, "address": { "city": "Paris" } },\n  { "name": "Bob", "age": 25, "address": { "city": "London" } }\n]'}
              style={s.textarea}
            />
            {jsonError && <div style={s.error}>{jsonError}</div>}
            <div style={s.row}>
              <button onClick={convertJsonToCsv} style={s.btn}>Convert to CSV</button>
              <button onClick={() => { setJsonInput(""); setCsvOutput(""); setCsvHeaders([]); setCsvRows([]); setJsonError(""); }} style={s.btnSm}>Clear</button>
            </div>
          </div>

          {csvOutput && (
            <div style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <label style={{ ...s.label, marginBottom: 0 }}>CSV Output</label>
                  <span style={s.badge}>{csvRows.length} rows x {csvHeaders.length} cols</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={copyCsvOutput} style={s.btnSm}>{jsonCopied ? "Copied!" : "Copy"}</button>
                  <button onClick={downloadCsv} style={s.btnOutline}>Download .csv</button>
                </div>
              </div>

              {/* Preview table */}
              <div style={s.tableWrap}>
                <table style={{ borderCollapse: "collapse", width: "100%", minWidth: csvHeaders.length * 130 }}>
                  <thead>
                    <tr>
                      {csvHeaders.map((h, i) => (
                        <th key={i} style={s.th}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {csvRows.slice(0, 100).map((row, ri) => (
                      <tr key={ri}>
                        {row.map((cell, ci) => (
                          <td key={ci} style={s.td} title={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {csvRows.length > 100 && (
                <div style={{ fontSize: 12, color: "#78716C", marginTop: 8, fontStyle: "italic" }}>
                  Showing first 100 of {csvRows.length} rows. Download the file for the complete dataset.
                </div>
              )}

              {/* Raw CSV */}
              <details style={{ marginTop: 12 }}>
                <summary style={{ fontSize: 13, color: "#0D9488", cursor: "pointer", fontWeight: 500 }}>
                  Show raw CSV
                </summary>
                <textarea value={csvOutput} readOnly style={{ ...s.textareaReadonly, marginTop: 8 }} />
              </details>
            </div>
          )}
        </>
      )}

      {/* ════════════════════════════════════════════
          TAB 2: CSV → JSON
          ════════════════════════════════════════════ */}
      {tab === "csv-to-json" && (
        <>
          <div style={s.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
              <label style={{ ...s.label, marginBottom: 0 }}>CSV Input</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  ref={csvFileRef}
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCsvFile}
                  style={{ display: "none" }}
                />
                <button onClick={() => csvFileRef.current?.click()} style={s.btnSm}>
                  Upload .csv
                </button>
              </div>
            </div>
            <textarea
              value={csvInput}
              onChange={(e) => { setCsvInput(e.target.value); setCsvError(""); }}
              placeholder={"name,age,city\nAlice,30,Paris\nBob,25,London"}
              style={s.textarea}
            />

            {/* Options row */}
            <div style={{ ...s.optRow, marginTop: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 13, color: "#78716C", fontWeight: 500 }}>Delimiter:</span>
                <select value={delimiter} onChange={(e) => setDelimiter(e.target.value)} style={s.select}>
                  <option value="comma">Comma (,)</option>
                  <option value="semicolon">Semicolon (;)</option>
                  <option value="tab">Tab</option>
                </select>
              </div>
              <label style={{ display: "flex", alignItems: "center", fontSize: 13, color: "#1C1917", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={hasHeader}
                  onChange={(e) => setHasHeader(e.target.checked)}
                  style={s.checkbox}
                />
                First row is header
              </label>
            </div>

            {csvError && <div style={s.error}>{csvError}</div>}
            <div style={s.row}>
              <button onClick={convertCsvToJson} style={s.btn}>Convert to JSON</button>
              <button onClick={() => { setCsvInput(""); setJsonOutput(""); setCsvError(""); }} style={s.btnSm}>Clear</button>
            </div>
          </div>

          {jsonOutput && (
            <div style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <label style={{ ...s.label, marginBottom: 0 }}>JSON Output</label>
                  <span style={s.badge}>{JSON.parse(jsonOutput).length} objects</span>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={copyJsonOutput} style={s.btnSm}>{csvCopied ? "Copied!" : "Copy"}</button>
                  <button onClick={downloadJson} style={s.btnOutline}>Download .json</button>
                </div>
              </div>
              <textarea value={jsonOutput} readOnly style={s.textareaReadonly} />
            </div>
          )}
        </>
      )}

      {/* ─── ABOUT ─── */}
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>
          This converter handles both directions: JSON to CSV and CSV to JSON. When converting JSON to CSV, nested objects are flattened using dot notation.
          For example, <code style={{ background: "#F5F5F4", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>{`{"user": {"name": "Alice"}}`}</code> becomes
          the column <code style={{ background: "#F5F5F4", padding: "2px 6px", borderRadius: 4, fontSize: 13 }}>user.name</code>. Arrays are serialized as JSON strings.
        </p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>
          For CSV to JSON, you can choose your delimiter (comma, semicolon, or tab) and specify whether the first row contains headers.
          Without headers, columns are named column_1, column_2, etc.
        </p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
          Everything runs entirely in your browser. No data is sent to any server, stored, or logged.
        </p>
      </div>

      {/* ─── FAQ ─── */}
      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>Frequently Asked Questions</h2>
        <FAQItem
          q="What JSON format does this tool accept?"
          a='The tool accepts a JSON array of objects, for example: [{"name":"Alice","age":30},{"name":"Bob","age":25}]. A single object (not wrapped in an array) is also accepted and treated as a one-row dataset.'
        />
        <FAQItem
          q="How are nested objects handled?"
          a='Nested objects are flattened using dot notation. For example, {"address":{"city":"Paris","zip":"75001"}} produces two columns: address.city and address.zip. Nested arrays are kept as JSON strings in the CSV cell.'
        />
        <FAQItem
          q="Can I convert CSV with semicolons or tabs?"
          a="Yes. In the CSV to JSON tab, use the delimiter dropdown to select comma, semicolon, or tab. The parser handles quoted fields and escaped quotes correctly regardless of the delimiter."
        />
        <FAQItem
          q="Is there a size limit?"
          a="The tool runs in your browser, so the practical limit depends on your device memory. Files up to several megabytes convert without issues on modern devices."
        />
        <FAQItem
          q="Is my data secure?"
          a="Yes. Everything runs locally in your browser using JavaScript. No data is uploaded, stored, or logged on any server."
        />
        <FAQItem
          q="Can I convert CSV without a header row?"
          a='Yes. Uncheck the "First row is header" option. Columns will be named column_1, column_2, column_3, etc.'
        />
      </div>

      <SeoContent />
    </div>
  );
}

"use client";
import { useState, useCallback, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

/* ─── TYPES ─── */
interface SubtitleEntry {
  id: string;
  startH: number; startM: number; startS: number; startMs: number;
  endH: number; endM: number; endS: number; endMs: number;
  text: string;
}

/* ─── HELPERS ─── */
function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function pad2(n: number): string { return String(n).padStart(2, "0"); }
function pad3(n: number): string { return String(n).padStart(3, "0"); }

function toTimestamp(h: number, m: number, s: number, ms: number): string {
  return `${pad2(h)}:${pad2(m)}:${pad2(s)},${pad3(ms)}`;
}

function toTotalSeconds(h: number, m: number, s: number, ms: number): number {
  return h * 3600 + m * 60 + s + ms / 1000;
}

function fromTotalSeconds(total: number): { h: number; m: number; s: number; ms: number } {
  if (total < 0) total = 0;
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const sRaw = total % 60;
  const s = Math.floor(sRaw);
  const ms = Math.round((sRaw - s) * 1000);
  return { h, m, s, ms };
}

function parseSrtTimestamp(ts: string): { h: number; m: number; s: number; ms: number } {
  const match = ts.trim().match(/^(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})$/);
  if (!match) return { h: 0, m: 0, s: 0, ms: 0 };
  return {
    h: parseInt(match[1], 10),
    m: parseInt(match[2], 10),
    s: parseInt(match[3], 10),
    ms: parseInt(match[4].padEnd(3, "0"), 10),
  };
}

function parseSrt(content: string): SubtitleEntry[] {
  const blocks = content.trim().split(/\n\s*\n/);
  const entries: SubtitleEntry[] = [];
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;
    const timeLine = lines[1];
    const arrowIdx = timeLine.indexOf("-->");
    if (arrowIdx === -1) continue;
    const startPart = timeLine.slice(0, arrowIdx).trim();
    const endPart = timeLine.slice(arrowIdx + 3).trim();
    const start = parseSrtTimestamp(startPart);
    const end = parseSrtTimestamp(endPart);
    const text = lines.slice(2).join("\n");
    entries.push({
      id: uid(),
      startH: start.h, startM: start.m, startS: start.s, startMs: start.ms,
      endH: end.h, endM: end.m, endS: end.s, endMs: end.ms,
      text,
    });
  }
  return entries;
}

function entriesToSrt(entries: SubtitleEntry[]): string {
  return entries.map((e, i) => {
    const start = toTimestamp(e.startH, e.startM, e.startS, e.startMs);
    const end = toTimestamp(e.endH, e.endM, e.endS, e.endMs);
    return `${i + 1}\n${start} --> ${end}\n${e.text}`;
  }).join("\n\n") + "\n";
}

function emptyEntry(defaultDuration: number): SubtitleEntry {
  return {
    id: uid(),
    startH: 0, startM: 0, startS: 0, startMs: 0,
    endH: 0, endM: 0, endS: Math.floor(defaultDuration), endMs: Math.round((defaultDuration % 1) * 1000),
    text: "",
  };
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
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  btnSmall: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 500 as const, cursor: "pointer" as const },
  btnDanger: { background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: 6, padding: "6px 10px", fontSize: 13, fontWeight: 600 as const, cursor: "pointer" as const, flexShrink: 0 as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  textarea: { width: "100%", minHeight: 60, border: "1px solid #E7E5E4", borderRadius: 8, padding: "8px 12px", fontSize: 14, lineHeight: 1.5, color: "#1C1917", fontFamily: "inherit", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  timeInput: { width: 54, border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 4px", fontSize: 13, textAlign: "center" as const, outline: "none", color: "#1C1917", background: "#fff" },
  timeSep: { fontSize: 14, fontWeight: 600 as const, color: "#78716C", margin: "0 2px" },
  stat: { textAlign: "center" as const, flex: 1 } as const,
  statVal: { fontSize: 22, fontWeight: 700 as const, color: "#0D9488" },
  statLabel: { fontSize: 12, color: "#78716C", marginTop: 4 },
};

/* ─── TIME INPUT COMPONENT ─── */
function TimeInput({ h, m, sec, ms, onChange, label }: {
  h: number; m: number; sec: number; ms: number;
  onChange: (h: number, m: number, s: number, ms: number) => void;
  label: string;
}) {
  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
  return (
    <div>
      <span style={{ fontSize: 11, color: "#78716C", display: "block", marginBottom: 4 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input style={s.timeInput} type="number" min={0} max={99} value={h} onChange={e => onChange(clamp(+e.target.value, 0, 99), m, sec, ms)} />
        <span style={s.timeSep}>:</span>
        <input style={s.timeInput} type="number" min={0} max={59} value={m} onChange={e => onChange(h, clamp(+e.target.value, 0, 59), sec, ms)} />
        <span style={s.timeSep}>:</span>
        <input style={s.timeInput} type="number" min={0} max={59} value={sec} onChange={e => onChange(h, m, clamp(+e.target.value, 0, 59), ms)} />
        <span style={s.timeSep}>,</span>
        <input style={{ ...s.timeInput, width: 60 }} type="number" min={0} max={999} value={ms} onChange={e => onChange(h, m, sec, clamp(+e.target.value, 0, 999))} />
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function ClientPage() {
  const [entries, setEntries] = useState<SubtitleEntry[]>([]);
  const [defaultDuration, setDefaultDuration] = useState(3);
  const [shiftSeconds, setShiftSeconds] = useState(0);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* ─── CRUD ─── */
  const addEntry = () => {
    setEntries(prev => {
      const last = prev[prev.length - 1];
      const newE = emptyEntry(defaultDuration);
      if (last) {
        const lastEnd = toTotalSeconds(last.endH, last.endM, last.endS, last.endMs);
        const start = fromTotalSeconds(lastEnd + 0.5);
        const end = fromTotalSeconds(lastEnd + 0.5 + defaultDuration);
        newE.startH = start.h; newE.startM = start.m; newE.startS = start.s; newE.startMs = start.ms;
        newE.endH = end.h; newE.endM = end.m; newE.endS = end.s; newE.endMs = end.ms;
      }
      return [...prev, newE];
    });
  };

  const updateEntry = (id: string, patch: Partial<SubtitleEntry>) => {
    setEntries(prev => prev.map(e => e.id === id ? { ...e, ...patch } : e));
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  /* ─── ACTIONS ─── */
  const handleShift = () => {
    setEntries(prev => prev.map(e => {
      const st = fromTotalSeconds(toTotalSeconds(e.startH, e.startM, e.startS, e.startMs) + shiftSeconds);
      const en = fromTotalSeconds(toTotalSeconds(e.endH, e.endM, e.endS, e.endMs) + shiftSeconds);
      return { ...e, startH: st.h, startM: st.m, startS: st.s, startMs: st.ms, endH: en.h, endM: en.m, endS: en.s, endMs: en.ms };
    }));
  };

  const handleLoadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseSrt(text);
      if (parsed.length > 0) setEntries(parsed);
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const srtContent = entriesToSrt(entries);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(srtContent).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [srtContent]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([srtContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subtitles.srt";
    a.click();
    URL.revokeObjectURL(url);
  }, [srtContent]);

  /* ─── STATS ─── */
  const totalCount = entries.length;
  const totalDurationSec = entries.length > 0
    ? Math.max(...entries.map(e => toTotalSeconds(e.endH, e.endM, e.endS, e.endMs)))
    : 0;
  const totalDurationStr = `${pad2(Math.floor(totalDurationSec / 3600))}:${pad2(Math.floor((totalDurationSec % 3600) / 60))}:${pad2(Math.floor(totalDurationSec % 60))}`;
  const avgDuration = totalCount > 0
    ? (entries.reduce((sum, e) => {
        const st = toTotalSeconds(e.startH, e.startM, e.startS, e.startMs);
        const en = toTotalSeconds(e.endH, e.endM, e.endS, e.endMs);
        return sum + (en - st);
      }, 0) / totalCount).toFixed(1)
    : "0.0";

  return (
    <div style={s.page}>
      <ToolSchema
        name="Subtitle Generator"
        description="Create and edit SRT subtitle files for YouTube, social media, and video projects. Add timestamps, format text, preview and export. Free, no signup."
        slug="subtitle-generator"
        category="WebApplication"
      />
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://toolcraftkit.com" },
        { name: "Dev Tools", url: "https://toolcraftkit.com/#dev-tools" },
        { name: "Subtitle Generator", url: "https://toolcraftkit.com/tools/subtitle-generator" },
      ]} />

      <h1 style={s.h1}>Subtitle Generator</h1>
      <p style={s.sub}>Create and edit SRT subtitle files for your videos. Free, no signup required.</p>

      {/* ─── Quick Actions ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Settings &amp; Actions</h2>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <label style={s.label}>Default Duration (seconds)</label>
            <input
              type="number" min={0.5} max={30} step={0.5}
              value={defaultDuration}
              onChange={e => setDefaultDuration(Math.max(0.5, parseFloat(e.target.value) || 3))}
              style={{ ...s.input, width: 100, marginBottom: 0 }}
            />
          </div>
          <div>
            <label style={s.label}>Shift All Timecodes (sec)</label>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <input
                type="number" step={0.5}
                value={shiftSeconds}
                onChange={e => setShiftSeconds(parseFloat(e.target.value) || 0)}
                style={{ ...s.input, width: 100, marginBottom: 0 }}
              />
              <button onClick={handleShift} style={s.btnSmall} disabled={entries.length === 0}>Apply</button>
            </div>
          </div>
          <div>
            <input ref={fileRef} type="file" accept=".srt,.txt" onChange={handleLoadFile} style={{ display: "none" }} />
            <button onClick={() => fileRef.current?.click()} style={s.btnSmall}>Load SRT File</button>
          </div>
        </div>
      </div>

      {/* ─── Stats ─── */}
      {entries.length > 0 && (
        <div style={{ ...s.card, display: "flex", gap: 8 }}>
          <div style={s.stat}><div style={s.statVal}>{totalCount}</div><div style={s.statLabel}>Subtitles</div></div>
          <div style={s.stat}><div style={s.statVal}>{totalDurationStr}</div><div style={s.statLabel}>Total Duration</div></div>
          <div style={s.stat}><div style={s.statVal}>{avgDuration}s</div><div style={s.statLabel}>Avg Duration</div></div>
        </div>
      )}

      {/* ─── Subtitle Entries ─── */}
      <div style={s.card}>
        <h2 style={s.cardTitle}>Subtitles</h2>

        {entries.length === 0 && (
          <p style={{ fontSize: 14, color: "#78716C", textAlign: "center", padding: "20px 0" }}>
            No subtitles yet. Click &quot;Add Subtitle&quot; to start, or load an existing SRT file.
          </p>
        )}

        {entries.map((entry, idx) => (
          <div key={entry.id} style={{ border: "1px solid #E7E5E4", borderRadius: 8, padding: 14, marginBottom: 12, background: "#FAFAF9" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#0D9488" }}>#{idx + 1}</span>
              <button onClick={() => deleteEntry(entry.id)} style={s.btnDanger}>✕</button>
            </div>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 10 }}>
              <TimeInput
                label="Start"
                h={entry.startH} m={entry.startM} sec={entry.startS} ms={entry.startMs}
                onChange={(h, m, sec, ms) => {
                  const patch: Partial<SubtitleEntry> = { startH: h, startM: m, startS: sec, startMs: ms };
                  const startTotal = toTotalSeconds(h, m, sec, ms);
                  const endTotal = startTotal + defaultDuration;
                  const end = fromTotalSeconds(endTotal);
                  patch.endH = end.h; patch.endM = end.m; patch.endS = end.s; patch.endMs = end.ms;
                  updateEntry(entry.id, patch);
                }}
              />
              <TimeInput
                label="End"
                h={entry.endH} m={entry.endM} sec={entry.endS} ms={entry.endMs}
                onChange={(h, m, sec, ms) => updateEntry(entry.id, { endH: h, endM: m, endS: sec, endMs: ms })}
              />
            </div>

            <textarea
              value={entry.text}
              onChange={e => updateEntry(entry.id, { text: e.target.value })}
              placeholder="Enter subtitle text..."
              rows={2}
              style={s.textarea}
            />
          </div>
        ))}

        <button onClick={addEntry} style={{ ...s.btn, marginTop: 4 }}>
          + Add Subtitle
        </button>
      </div>

      {/* ─── Preview & Export ─── */}
      {entries.length > 0 && (
        <div style={s.output}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", margin: 0 }}>SRT Preview</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={handleCopy} style={s.btnSecondary}>
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button onClick={handleDownload} style={s.btnSecondary}>
                Download .srt
              </button>
            </div>
          </div>

          <div style={{
            background: "#18181B", color: "#F4F4F5", borderRadius: 8, padding: 20,
            fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.8,
            maxHeight: 400, overflowY: "auto" as const, whiteSpace: "pre-wrap" as const,
          }}>
            {entries.map((e, i) => (
              <div key={e.id} style={{ marginBottom: 16 }}>
                <div style={{ color: "#71717A" }}>{i + 1}</div>
                <div style={{ color: "#0D9488" }}>
                  {toTimestamp(e.startH, e.startM, e.startS, e.startMs)} --&gt; {toTimestamp(e.endH, e.endM, e.endS, e.endMs)}
                </div>
                <div>{e.text || <span style={{ color: "#52525B", fontStyle: "italic" }}>(empty)</span>}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── SEO Content ─── */}
      <SeoContent />
    </div>
  );
}

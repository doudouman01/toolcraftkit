"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

type Mode = "simplify" | "formal" | "casual" | "shorten" | "expand";

const MODES: { value: Mode; label: string; desc: string }[] = [
  { value: "simplify", label: "Simplify", desc: "Make text easier to read" },
  { value: "formal", label: "Make Formal", desc: "Professional, business tone" },
  { value: "casual", label: "Make Casual", desc: "Friendly, conversational tone" },
  { value: "shorten", label: "Shorten", desc: "Condense to key points" },
  { value: "expand", label: "Expand", desc: "Add detail and elaboration" },
];

/* Synonym maps for rewriting */
const FORMAL_MAP: Record<string, string> = {
  "get": "obtain", "got": "obtained", "use": "utilize", "used": "utilized",
  "help": "assist", "helped": "assisted", "big": "substantial", "small": "minimal",
  "good": "excellent", "bad": "unfavorable", "show": "demonstrate", "showed": "demonstrated",
  "think": "consider", "need": "require", "want": "desire", "try": "attempt",
  "start": "commence", "end": "conclude", "make": "create", "find": "identify",
  "give": "provide", "ask": "inquire", "buy": "purchase", "fix": "resolve",
  "look": "examine", "tell": "inform", "keep": "maintain", "let": "permit",
  "seem": "appear", "run": "operate", "set": "establish", "put": "place",
  "turn": "transform", "work": "function", "move": "proceed", "pay": "compensate",
  "play": "engage", "feel": "perceive", "leave": "depart", "hard": "challenging",
  "fast": "expeditious", "easy": "straightforward", "about": "regarding", "also": "additionally",
  "but": "however", "so": "therefore", "very": "exceptionally", "really": "particularly",
  "a lot": "considerably", "kind of": "somewhat", "right now": "currently", "anyway": "nevertheless",
  "pretty": "reasonably", "actually": "in fact", "basically": "fundamentally",
};

const CASUAL_MAP: Record<string, string> = {
  "obtain": "get", "utilize": "use", "assist": "help", "substantial": "big",
  "demonstrate": "show", "require": "need", "commence": "start", "conclude": "end",
  "identify": "find", "provide": "give", "inquire": "ask", "purchase": "buy",
  "resolve": "fix", "examine": "look at", "inform": "tell", "maintain": "keep",
  "permit": "let", "establish": "set up", "compensate": "pay", "perceive": "feel",
  "challenging": "tough", "expeditious": "quick", "straightforward": "easy",
  "regarding": "about", "additionally": "also", "however": "but", "therefore": "so",
  "exceptionally": "super", "particularly": "really", "considerable": "a lot of",
  "currently": "right now", "nevertheless": "anyway", "fundamentally": "basically",
  "furthermore": "plus", "consequently": "so", "approximately": "about",
};

const SIMPLE_MAP: Record<string, string> = {
  "utilize": "use", "demonstrate": "show", "implement": "do", "facilitate": "help",
  "subsequent": "next", "prior": "before", "commence": "begin", "terminate": "end",
  "endeavor": "try", "ascertain": "find out", "ameliorate": "improve", "elucidate": "explain",
  "ubiquitous": "everywhere", "dichotomy": "split", "paradigm": "model", "synergy": "teamwork",
  "leverage": "use", "optimize": "improve", "infrastructure": "system", "methodology": "method",
  "functionality": "feature", "aforementioned": "mentioned", "notwithstanding": "despite",
  "furthermore": "also", "subsequently": "then", "approximately": "about", "numerous": "many",
  "sufficient": "enough", "exemplify": "show", "perpetuate": "continue", "substantiate": "prove",
};

function rewriteText(text: string, mode: Mode): string {
  if (!text.trim()) return "";
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  switch (mode) {
    case "simplify": {
      return sentences.map(s => {
        let result = s;
        Object.entries(SIMPLE_MAP).forEach(([k, v]) => {
          result = result.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
        });
        return result;
      }).join(" ").replace(/\s+/g, " ").trim();
    }
    case "formal": {
      let result = text;
      Object.entries(FORMAL_MAP).forEach(([k, v]) => {
        result = result.replace(new RegExp(`\\b${k}\\b`, "gi"), (match) => {
          if (match[0] === match[0].toUpperCase()) return v.charAt(0).toUpperCase() + v.slice(1);
          return v;
        });
      });
      /* Remove contractions */
      result = result.replace(/\bdon't\b/gi, "do not").replace(/\bcan't\b/gi, "cannot")
        .replace(/\bwon't\b/gi, "will not").replace(/\bisn't\b/gi, "is not")
        .replace(/\baren't\b/gi, "are not").replace(/\bdidn't\b/gi, "did not")
        .replace(/\bwouldn't\b/gi, "would not").replace(/\bcouldn't\b/gi, "could not")
        .replace(/\bshouldn't\b/gi, "should not").replace(/\bhasn't\b/gi, "has not")
        .replace(/\bhaven't\b/gi, "have not").replace(/\bwasn't\b/gi, "was not")
        .replace(/\bweren't\b/gi, "were not").replace(/\bit's\b/gi, "it is")
        .replace(/\bthat's\b/gi, "that is").replace(/\bthere's\b/gi, "there is")
        .replace(/\bI'm\b/g, "I am").replace(/\bwe're\b/gi, "we are")
        .replace(/\bthey're\b/gi, "they are").replace(/\byou're\b/gi, "you are")
        .replace(/\bI've\b/g, "I have").replace(/\bwe've\b/gi, "we have")
        .replace(/\bthey've\b/gi, "they have").replace(/\byou've\b/gi, "you have")
        .replace(/\bI'll\b/g, "I will").replace(/\bwe'll\b/gi, "we will")
        .replace(/\bthey'll\b/gi, "they will").replace(/\byou'll\b/gi, "you will")
        .replace(/\blet's\b/gi, "let us").replace(/\bhere's\b/gi, "here is");
      return result.trim();
    }
    case "casual": {
      let result = text;
      Object.entries(CASUAL_MAP).forEach(([k, v]) => {
        result = result.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
      });
      /* Add contractions */
      result = result.replace(/\bdo not\b/gi, "don't").replace(/\bcannot\b/gi, "can't")
        .replace(/\bwill not\b/gi, "won't").replace(/\bis not\b/gi, "isn't")
        .replace(/\bare not\b/gi, "aren't").replace(/\bdid not\b/gi, "didn't")
        .replace(/\bwould not\b/gi, "wouldn't").replace(/\bcould not\b/gi, "couldn't")
        .replace(/\bshould not\b/gi, "shouldn't").replace(/\bhas not\b/gi, "hasn't")
        .replace(/\bhave not\b/gi, "haven't").replace(/\bI am\b/g, "I'm")
        .replace(/\bwe are\b/gi, "we're").replace(/\bthey are\b/gi, "they're")
        .replace(/\byou are\b/gi, "you're").replace(/\bI have\b/g, "I've")
        .replace(/\bI will\b/g, "I'll").replace(/\bwe will\b/gi, "we'll")
        .replace(/\bit is\b/gi, "it's").replace(/\bthat is\b/gi, "that's")
        .replace(/\bthere is\b/gi, "there's").replace(/\blet us\b/gi, "let's");
      return result.trim();
    }
    case "shorten": {
      /* Keep first sentence and last sentence, skip middle */
      if (sentences.length <= 2) return text.trim();
      const keyS = sentences.filter((_, i) => i === 0 || i === sentences.length - 1 || i % 2 === 0);
      return keyS.join(" ").replace(/\s+/g, " ").trim();
    }
    case "expand": {
      return sentences.map(s => {
        const trimmed = s.trim();
        if (trimmed.length < 20) return trimmed;
        /* Add transitional phrases */
        const transitions = ["In other words, ", "To elaborate, ", "More specifically, ", "It is worth noting that ", "To put it another way, "];
        const t = transitions[Math.floor(Math.random() * transitions.length)];
        return `${trimmed} ${t.toLowerCase()}this point is significant in the broader context.`;
      }).join(" ").replace(/\s+/g, " ").trim();
    }
    default:
      return text;
  }
}

export default function AIContentRewriter() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<Mode>("simplify");
  const [copied, setCopied] = useState(false);

  const handleRewrite = useCallback(() => {
    setOutput(rewriteText(input, mode));
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inputWords = input.trim() ? input.trim().split(/\s+/).length : 0;
  const outputWords = output.trim() ? output.trim().split(/\s+/).length : 0;

  const btn: React.CSSProperties = { padding: "10px 24px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: 600, cursor: "pointer" };
  const card: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb", marginBottom: "16px" };

  return (
    <>
      <ToolSchema name="AI Content Rewriter" description="Rewrite text in 5 modes: Simplify, Formal, Casual, Shorten, Expand." slug="ai-content-rewriter" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "AI Content Rewriter", url: "https://toolcraftkit.com/tools/ai-content-rewriter" }]} />
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>AI Content Rewriter</h1>
        <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "24px" }}>Rewrite your text in different styles. Compare original and rewritten versions side by side.</p>

        {/* Mode Selection */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
          {MODES.map(m => (
            <button key={m.value} onClick={() => setMode(m.value)} style={{ padding: "10px 18px", borderRadius: "8px", border: mode === m.value ? "2px solid #0D9488" : "1px solid #d1d5db", background: mode === m.value ? "#f0fdfa" : "#fff", cursor: "pointer", fontSize: "14px", fontWeight: mode === m.value ? 700 : 400, color: mode === m.value ? "#0D9488" : "#374151" }}>
              {m.label}
              <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: 400 }}>{m.desc}</div>
            </button>
          ))}
        </div>

        {/* Side by Side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontWeight: 600, fontSize: "14px" }}>Original</label>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>{inputWords} words</span>
            </div>
            <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your text here to rewrite..." style={{ width: "100%", height: "250px", padding: "14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", lineHeight: "1.7", resize: "vertical", outline: "none", fontFamily: "inherit" }} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontWeight: 600, fontSize: "14px" }}>Rewritten ({MODES.find(m => m.value === mode)?.label})</label>
              <span style={{ fontSize: "12px", color: "#9ca3af" }}>{outputWords} words</span>
            </div>
            <textarea value={output} readOnly placeholder="Rewritten text will appear here..." style={{ width: "100%", height: "250px", padding: "14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "14px", lineHeight: "1.7", resize: "vertical", outline: "none", fontFamily: "inherit", background: "#f9fafb" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleRewrite} disabled={!input.trim()} style={{ ...btn, opacity: input.trim() ? 1 : 0.5, cursor: input.trim() ? "pointer" : "default" }}>Rewrite Text</button>
          {output && <button onClick={handleCopy} style={{ ...btn, background: copied ? "#16a34a" : "#374151" }}>{copied ? "Copied!" : "Copy Result"}</button>}
          {(input || output) && <button onClick={() => { setInput(""); setOutput(""); }} style={{ ...btn, background: "#6b7280" }}>Clear</button>}
        </div>

        {output && inputWords !== outputWords && (
          <div style={{ marginTop: "16px", padding: "12px 16px", background: "#f0fdfa", borderRadius: "8px", border: "1px solid #99f6e4", fontSize: "13px", color: "#374151" }}>
            Word count changed from <strong>{inputWords}</strong> to <strong>{outputWords}</strong> ({outputWords > inputWords ? "+" : ""}{outputWords - inputWords} words, {Math.round(((outputWords - inputWords) / inputWords) * 100)}% change)
          </div>
        )}
      </div>
      <SeoContent />
    </>
  );
}

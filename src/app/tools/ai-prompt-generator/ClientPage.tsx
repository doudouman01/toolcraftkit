"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useTranslation } from "@/lib/i18n/useTranslation";

type TaskType = "writing" | "coding" | "marketing" | "research" | "creative";
type Tone = "professional" | "casual" | "formal" | "persuasive";
type Length = "short" | "medium" | "detailed";

const TASK_LABELS: Record<TaskType, string> = {
  writing: "Writing & Content",
  coding: "Coding & Development",
  marketing: "Marketing & Sales",
  research: "Research & Analysis",
  creative: "Creative & Brainstorming",
};

const TONE_LABELS: Record<Tone, string> = {
  professional: "Professional",
  casual: "Casual",
  formal: "Formal",
  persuasive: "Persuasive",
};

const LENGTH_LABELS: Record<Length, string> = {
  short: "Short (1-2 paragraphs)",
  medium: "Medium (3-5 paragraphs)",
  detailed: "Detailed (comprehensive)",
};

const ROLE_MAP: Record<TaskType, string> = {
  writing: "an expert content writer with 10+ years of experience in crafting engaging, well-structured content",
  coding: "a senior software engineer with deep expertise in clean code, architecture, and best practices",
  marketing: "a seasoned marketing strategist with expertise in conversion optimization and audience psychology",
  research: "a thorough research analyst with expertise in synthesizing complex information into actionable insights",
  creative: "a highly creative thinker and brainstorming facilitator with expertise in generating innovative ideas",
};

const FORMAT_MAP: Record<TaskType, string> = {
  writing: "Use clear headings, short paragraphs, and bullet points where appropriate. Include a strong introduction and conclusion.",
  coding: "Provide clean, well-commented code with explanations. Include error handling and edge cases. Use best practices for the language/framework.",
  marketing: "Structure the output with a compelling headline, key benefits, social proof elements, and a clear call-to-action.",
  research: "Organize findings with an executive summary, key findings with supporting evidence, methodology notes, and recommendations.",
  creative: "Present ideas in a numbered list with brief descriptions. Include both safe and bold options. Add implementation notes for each idea.",
};

function generatePrompt(task: TaskType, tone: Tone, length: Length, context: string, specificTask: string): string {
  const lines: string[] = [];
  lines.push(`## Role`);
  lines.push(`You are ${ROLE_MAP[task]}.`);
  lines.push(``);
  lines.push(`## Task`);
  lines.push(specificTask || `[Describe your specific task here]`);
  lines.push(``);
  if (context.trim()) {
    lines.push(`## Context`);
    lines.push(context);
    lines.push(``);
  }
  lines.push(`## Tone & Style`);
  lines.push(`Write in a ${tone} tone.${length === "short" ? " Keep the response concise — 1-2 paragraphs maximum." : length === "medium" ? " Aim for a medium-length response — 3-5 paragraphs." : " Provide a comprehensive, detailed response with thorough coverage of the topic."}`);
  lines.push(``);
  lines.push(`## Format`);
  lines.push(FORMAT_MAP[task]);
  lines.push(``);
  lines.push(`## Constraints`);
  lines.push(`- Be specific and actionable — avoid vague or generic advice`);
  lines.push(`- Use concrete examples where possible`);
  lines.push(`- If you're unsure about something, say so rather than making assumptions`);
  if (task === "coding") lines.push(`- Follow the DRY principle and write production-ready code`);
  if (task === "marketing") lines.push(`- Focus on benefits over features, and address objections`);
  if (task === "research") lines.push(`- Cite sources or note when claims need verification`);
  return lines.join("\n");
}

const s = {
  page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff" },
  select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", cursor: "pointer" as const },
  textarea: { width: "100%", minHeight: 120, border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, lineHeight: 1.6, color: "#1C1917", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, fontFamily: "inherit" },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  outputTextarea: { width: "100%", minHeight: 350, border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 13, lineHeight: 1.7, color: "#1C1917", fontFamily: "'Courier New', monospace", background: "#fff", resize: "vertical" as const, outline: "none", boxSizing: "border-box" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
  badge: { display: "inline-block" as const, background: "#F0FDFA", color: "#0D9488", fontSize: 12, fontWeight: 600 as const, padding: "2px 8px", borderRadius: 4, marginLeft: 8 },
};

export default function ClientPage() {
  const { t } = useTranslation();
  const [task, setTask] = useState<TaskType>("writing");
  const [tone, setTone] = useState<Tone>("professional");
  const [length, setLength] = useState<Length>("medium");
  const [context, setContext] = useState("");
  const [specificTask, setSpecificTask] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = useCallback(() => {
    setOutput(generatePrompt(task, tone, length, context, specificTask));
    setCopied(false);
  }, [task, tone, length, context, specificTask]);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* fallback */ }
  }, [output]);

  return (
    <div style={s.page}>
      <ToolSchema name="AI Prompt Generator" description="Generate structured, effective AI prompts for writing, coding, marketing, and research." slug="ai-prompt-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "AI Prompt Generator", url: "https://toolcraftkit.com/tools/ai-prompt-generator" }]} />

      <h1 style={s.h1}>"AI Prompt Generator"</h1>
      <p style={s.sub}>"Generate structured, effective AI prompts for ChatGPT, Claude, Gemini, and more."</p>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Configure Your Prompt</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Task Type</label>
            <select style={s.select} value={task} onChange={e => setTask(e.target.value as TaskType)}>
              {Object.entries(TASK_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
          <div>
            <label style={s.label}>Tone</label>
            <select style={s.select} value={tone} onChange={e => setTone(e.target.value as Tone)}>
              {Object.entries(TONE_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>
        <label style={s.label}>Response Length</label>
        <select style={s.select} value={length} onChange={e => setLength(e.target.value as Length)}>
          {Object.entries(LENGTH_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <label style={s.label}>What do you want the AI to do?<span style={s.required}>*</span></label>
        <textarea style={s.textarea} placeholder="e.g. Write a blog post about sustainable investing for beginners..." value={specificTask} onChange={e => setSpecificTask(e.target.value)} />
        <label style={s.label}>Additional Context (optional)</label>
        <textarea style={{ ...s.textarea, minHeight: 80 }} placeholder="e.g. Target audience is millennials, budget-conscious, prefer ETFs over individual stocks..." value={context} onChange={e => setContext(e.target.value)} />
        <button style={s.btn} onClick={handleGenerate}>Generate Prompt</button>
      </div>

      {output && (
        <div style={s.output}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>Your AI Prompt</h2>
            <button style={s.btnSecondary} onClick={handleCopy}>{copied ? "✓ Copied!" : "Copy to Clipboard"}</button>
          </div>
          <textarea style={s.outputTextarea} value={output} readOnly />
        </div>
      )}

      <SeoContent />
    </div>
  );
}

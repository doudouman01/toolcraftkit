"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";

const TOOL_SLUG = "video-transcription";

const LANGUAGES = [
  { code: "auto", label: "Auto-detect" },
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "nl", label: "Nederlands" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh", label: "中文" },
  { code: "ru", label: "Русский" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "tr", label: "Türkçe" },
  { code: "pl", label: "Polski" },
  { code: "ro", label: "Română" },
  { code: "sv", label: "Svenska" },
  { code: "da", label: "Dansk" },
  { code: "fi", label: "Suomi" },
];

const ACCEPTED_TYPES = ".mp3,.mp4,.m4a,.wav,.webm,.ogg,.flac,.wma,.aac";

type Tab = "youtube" | "upload";
type Status = "idle" | "loading" | "processing" | "done" | "error";

export default function ClientPage() {
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(3);
  const [period, setPeriod] = useState("month");

  const [tab, setTab] = useState<Tab>("youtube");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("auto");
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState("");
  const [transcript, setTranscript] = useState("");
  const [meta, setMeta] = useState<{ language?: string; wordCount?: number; charCount?: number; duration?: number; source?: string }>({});
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Check usage on mount
  useEffect(() => {
    if (!user) return;
    fetch("/api/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "check", userId: user.id }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.usage !== undefined) setUsage(data.usage);
        if (data.limit !== undefined) setLimit(data.limit);
        if (data.period) setPeriod(data.period);
      })
      .catch(() => {});
  }, [user]);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const reset = () => {
    setStatus("idle");
    setTranscript("");
    setMeta({});
    setError("");
    setProgress("");
  };

  // ─── YouTube transcription ──────────────────────────
  const handleYouTube = async () => {
    if (!youtubeUrl.trim()) return;
    if (!user) { setError("Please sign in to use this tool."); return; }

    reset();
    setStatus("loading");
    setProgress("Fetching captions from YouTube...");

    try {
      const res = await fetch("/api/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "youtube", url: youtubeUrl, userId: user.id, language }),
      });
      const data = await res.json();

      if (data.error === "limit_reached") {
        setError("You've reached your free limit. Upgrade to Pro for more transcriptions.");
        setStatus("error");
        return;
      }
      if (data.error === "no_captions") {
        setError("No captions found for this video. Try downloading the audio and using the file upload instead.");
        setStatus("error");
        return;
      }
      if (data.error) {
        setError(data.message || "Failed to fetch captions.");
        setStatus("error");
        return;
      }

      setTranscript(data.text);
      setMeta({ language: data.language, wordCount: data.wordCount, charCount: data.charCount, source: data.source });
      setUsage((u) => u + 1);
      setStatus("done");
    } catch (err: any) {
      setError(err.message || "Network error.");
      setStatus("error");
    }
  };

  // ─── File upload transcription ──────────────────────
  const handleUpload = async () => {
    if (!file) return;
    if (!user) { setError("Please sign in to use this tool."); return; }

    reset();
    setStatus("loading");
    setProgress("Uploading your file...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);
      if (language !== "auto") formData.append("language", language);

      const res = await fetch("/api/transcribe", { method: "POST", body: formData });
      const data = await res.json();

      if (data.error === "limit_reached") {
        setError("You've reached your free limit. Upgrade to Pro for more transcriptions.");
        setStatus("error");
        return;
      }
      if (data.error === "login_required") {
        setError("Please sign in to use this tool.");
        setStatus("error");
        return;
      }
      if (data.error) {
        setError(data.message || "Upload failed.");
        setStatus("error");
        return;
      }

      // Start polling for result
      setStatus("processing");
      setProgress("Transcribing your audio... This may take a few minutes.");
      const transcriptId = data.id;

      pollRef.current = setInterval(async () => {
        try {
          const statusRes = await fetch("/api/transcribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "status", id: transcriptId }),
          });
          const statusData = await statusRes.json();

          if (statusData.status === "completed") {
            if (pollRef.current) clearInterval(pollRef.current);
            setTranscript(statusData.text);
            setMeta({
              language: statusData.language,
              wordCount: statusData.wordCount,
              charCount: statusData.charCount,
              duration: statusData.duration,
              source: statusData.source,
            });
            setUsage((u) => u + 1);
            setStatus("done");
          } else if (statusData.status === "error") {
            if (pollRef.current) clearInterval(pollRef.current);
            setError(statusData.error || "Transcription failed.");
            setStatus("error");
          }
          // else still processing, keep polling
        } catch {
          // network blip, keep polling
        }
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Network error.");
      setStatus("error");
    }
  };

  const copyText = useCallback(() => {
    navigator.clipboard.writeText(transcript).catch(() => {});
  }, [transcript]);

  const downloadText = useCallback(() => {
    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcription.txt";
    a.click();
    URL.revokeObjectURL(url);
  }, [transcript]);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}m ${s}s`;
  };

  // ─── Styles ──────────────────────────────────────────
  const s = {
    page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 } as const,
    btnOutline: { background: "transparent", color: "#0D9488", border: "2px solid #0D9488", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 16px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "12px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" as const } as const,
    select: { border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 14px", fontSize: 14, outline: "none", cursor: "pointer", background: "#fff" } as const,
    tab: (active: boolean) => ({
      padding: "10px 24px",
      fontSize: 14,
      fontWeight: active ? 600 : 400,
      color: active ? "#0D9488" : "#78716C",
      background: active ? "#f0fdfa" : "transparent",
      border: "none",
      borderBottom: active ? "2px solid #0D9488" : "2px solid transparent",
      cursor: "pointer",
      transition: "all 0.2s",
    }),
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Video & Audio Transcription"
        description="Transcribe video and audio files to text online. Supports YouTube captions, MP3, MP4, WAV. 90+ languages. Fast AI-powered transcription."
        slug="video-transcription"
        category="WebApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Productivity Tools", url: "https://toolcraftkit.com/#productivity-tools" },
          { name: "Video Transcription", url: "https://toolcraftkit.com/tools/video-transcription" },
        ]}
      />

      <h1 style={s.h1}>Video & Audio Transcription</h1>
      <p style={s.sub}>Convert speech to text from YouTube videos or audio/video files. 90+ languages supported.</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      {/* ─── Tab selector ─── */}
      <div style={{ display: "flex", borderBottom: "1px solid #E7E5E4", marginBottom: 20 }}>
        <button onClick={() => { setTab("youtube"); reset(); }} style={s.tab(tab === "youtube")}>🔗 YouTube URL</button>
        <button onClick={() => { setTab("upload"); reset(); }} style={s.tab(tab === "upload")}>📁 Upload File</button>
      </div>

      {/* ─── Language selector ─── */}
      <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#1C1917" }}>Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={s.select}>
          {LANGUAGES.map((l) => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* ─── YouTube tab ─── */}
      {tab === "youtube" && (
        <div style={s.card}>
          <label style={s.label}>YouTube Video URL</label>
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            style={{ ...s.input, marginBottom: 16 }}
          />
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={handleYouTube}
              disabled={status === "loading" || !youtubeUrl.trim()}
              style={{ ...s.btn, opacity: status === "loading" || !youtubeUrl.trim() ? 0.6 : 1 }}
            >
              {status === "loading" ? "⏳ Fetching..." : "🎯 Transcribe"}
            </button>
            <span style={{ fontSize: 12, color: "#A8A29E" }}>Fetches available captions from YouTube</span>
          </div>
        </div>
      )}

      {/* ─── Upload tab ─── */}
      {tab === "upload" && (
        <div style={s.card}>
          <label style={s.label}>Upload Audio or Video File</label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              border: "2px dashed #D6D3D1",
              borderRadius: 10,
              padding: "40px 20px",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: 16,
              background: file ? "#f0fdfa" : "#FAFAF9",
              transition: "background 0.2s",
            }}
          >
            {file ? (
              <div>
                <span style={{ fontSize: 32 }}>📄</span>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", margin: "8px 0 4px" }}>{file.name}</p>
                <p style={{ fontSize: 12, color: "#78716C" }}>{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
              </div>
            ) : (
              <div>
                <span style={{ fontSize: 32 }}>🎵</span>
                <p style={{ fontSize: 14, color: "#57534E", margin: "8px 0 4px" }}>Click to select a file or drag & drop</p>
                <p style={{ fontSize: 12, color: "#A8A29E" }}>MP3, MP4, M4A, WAV, WEBM, OGG, FLAC — Max 25MB</p>
              </div>
            )}
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED_TYPES}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              style={{ display: "none" }}
            />
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={handleUpload}
              disabled={status === "loading" || status === "processing" || !file}
              style={{ ...s.btn, opacity: status === "loading" || status === "processing" || !file ? 0.6 : 1 }}
            >
              {status === "loading" ? "⏳ Uploading..." : status === "processing" ? "⏳ Transcribing..." : "🎯 Transcribe"}
            </button>
            <span style={{ fontSize: 12, color: "#A8A29E" }}>AI-powered transcription (AssemblyAI)</span>
          </div>
        </div>
      )}

      {/* ─── Progress ─── */}
      {(status === "loading" || status === "processing") && (
        <div style={{ ...s.card, background: "#f0fdfa", borderColor: "#99f6e4", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 20, height: 20, border: "3px solid #0D9488", borderTop: "3px solid transparent",
            borderRadius: "50%", animation: "spin 1s linear infinite",
          }} />
          <span style={{ fontSize: 14, color: "#0D9488", fontWeight: 500 }}>{progress}</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ─── Error ─── */}
      {status === "error" && error && (
        <div style={{ ...s.card, background: "#FEF2F2", borderColor: "#FECACA" }}>
          <p style={{ fontSize: 14, color: "#DC2626", margin: 0 }}>❌ {error}</p>
          {error.includes("Upgrade") && (
            <a href="/pricing" style={{ fontSize: 13, color: "#0D9488", fontWeight: 600, marginTop: 8, display: "inline-block" }}>
              View Pro Plans →
            </a>
          )}
        </div>
      )}

      {/* ─── Result ─── */}
      {status === "done" && transcript && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", margin: 0 }}>Transcription Result</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={copyText} style={s.btnSm}>📋 Copy</button>
              <button onClick={downloadText} style={s.btnSm}>💾 Download .txt</button>
            </div>
          </div>

          {/* Meta info */}
          <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap" }}>
            {meta.language && (
              <span style={{ fontSize: 12, color: "#78716C", background: "#F5F5F4", padding: "4px 10px", borderRadius: 12 }}>
                Language: {meta.language}
              </span>
            )}
            {meta.wordCount && (
              <span style={{ fontSize: 12, color: "#78716C", background: "#F5F5F4", padding: "4px 10px", borderRadius: 12 }}>
                {meta.wordCount.toLocaleString()} words
              </span>
            )}
            {meta.charCount && (
              <span style={{ fontSize: 12, color: "#78716C", background: "#F5F5F4", padding: "4px 10px", borderRadius: 12 }}>
                {meta.charCount.toLocaleString()} characters
              </span>
            )}
            {meta.duration && (
              <span style={{ fontSize: 12, color: "#78716C", background: "#F5F5F4", padding: "4px 10px", borderRadius: 12 }}>
                Duration: {formatDuration(meta.duration)}
              </span>
            )}
            {meta.source && (
              <span style={{ fontSize: 12, color: "#0D9488", background: "#f0fdfa", padding: "4px 10px", borderRadius: 12 }}>
                {meta.source === "youtube_captions" ? "YouTube Captions" : "AI Transcription"}
              </span>
            )}
          </div>

          {/* Transcript text */}
          <div style={{
            background: "#FAFAF9",
            border: "1px solid #E7E5E4",
            borderRadius: 8,
            padding: 16,
            maxHeight: 500,
            overflowY: "auto",
            fontSize: 14,
            lineHeight: 1.8,
            color: "#374151",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}>
            {transcript}
          </div>

          <button onClick={() => { reset(); setFile(null); setYoutubeUrl(""); }} style={{ ...s.btnOutline, marginTop: 16 }}>
            ↻ New Transcription
          </button>
        </div>
      )}

      {/* ─── About ─── */}
      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>
          Convert any video or audio content into accurate text. Paste a YouTube URL to grab existing captions instantly, or upload an audio/video file for AI-powered transcription with AssemblyAI — supporting 90+ languages with automatic language detection.
        </p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
          Perfect for content creators, journalists, students, researchers, and anyone who needs accurate text from spoken content. Download your transcript as a text file or copy it to your clipboard.
        </p>
      </div>

      {/* ─── FAQ ─── */}
      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "What file formats are supported?", a: "MP3, MP4, M4A, WAV, WEBM, OGG, FLAC, WMA, and AAC. Maximum file size is 25MB." },
          { q: "How does YouTube transcription work?", a: "We fetch the existing captions (auto-generated or manual) directly from YouTube. This is instant and works for most videos. If no captions are available, you can download the audio and upload it instead." },
          { q: "What languages are supported?", a: "Over 90 languages including English, French, Spanish, Portuguese, German, Italian, Japanese, Chinese, Korean, Arabic, Hindi, and many more. You can select the language or let the AI auto-detect it." },
          { q: "How accurate is the transcription?", a: "For file uploads, we use AssemblyAI's state-of-the-art AI models, which deliver industry-leading accuracy. YouTube captions depend on YouTube's own auto-generated quality." },
          { q: "Is my data private?", a: "Your uploaded files are processed securely and not stored after transcription is complete. YouTube caption fetching does not involve downloading the video." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 4 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>

      <SeoContent />
    </div>
  );
}

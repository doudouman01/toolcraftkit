"use client";
import { useState, useRef } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function ClientPage() {
  const [file, setFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<{ duration: number; size: number; type: string } | null>(null);
  const [outputFormat, setOutputFormat] = useState("wav");
  const [converting, setConverting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const resultRef = useRef<string | null>(null);

  const handleFile = async (f: File) => {
    setFile(f);
    setDone(false);
    setError("");
    resultRef.current = null;

    try {
      const arrayBuffer = await f.arrayBuffer();
      const audioCtx = new AudioContext();
      const buffer = await audioCtx.decodeAudioData(arrayBuffer);
      setFileInfo({ duration: buffer.duration, size: f.size, type: f.type || "unknown" });
      audioCtx.close();
    } catch {
      setFileInfo({ duration: 0, size: f.size, type: f.type || "unknown" });
    }
  };

  const convert = async () => {
    if (!file) return;
    setConverting(true);
    setError("");
    setDone(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioCtx = new OfflineAudioContext(2, 1, 44100);

      // Decode in a regular context first
      const tempCtx = new AudioContext();
      const decoded = await tempCtx.decodeAudioData(arrayBuffer);
      tempCtx.close();

      const offlineCtx = new OfflineAudioContext(
        decoded.numberOfChannels,
        decoded.length,
        decoded.sampleRate
      );

      const source = offlineCtx.createBufferSource();
      source.buffer = decoded;
      source.connect(offlineCtx.destination);
      source.start(0);

      const rendered = await offlineCtx.startRendering();

      if (outputFormat === "wav") {
        // Encode as WAV
        const wavBlob = audioBufferToWav(rendered);
        resultRef.current = URL.createObjectURL(wavBlob);
      } else {
        // WEBM via MediaRecorder
        const actx = new AudioContext({ sampleRate: rendered.sampleRate });
        const buf = actx.createBuffer(rendered.numberOfChannels, rendered.length, rendered.sampleRate);
        for (let ch = 0; ch < rendered.numberOfChannels; ch++) {
          buf.copyToChannel(rendered.getChannelData(ch), ch);
        }
        const src = actx.createBufferSource();
        src.buffer = buf;
        const dest = actx.createMediaStreamDestination();
        src.connect(dest);
        const recorder = new MediaRecorder(dest.stream, { mimeType: "audio/webm" });
        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };
        await new Promise<void>((resolve) => {
          recorder.onstop = () => resolve();
          recorder.start();
          src.start(0);
          src.onended = () => { setTimeout(() => recorder.stop(), 100); };
        });
        actx.close();
        const blob = new Blob(chunks, { type: "audio/webm" });
        resultRef.current = URL.createObjectURL(blob);
      }
      setDone(true);
    } catch (err) {
      setError("Conversion failed. The audio format may not be supported by your browser.");
    } finally {
      setConverting(false);
    }
  };

  const downloadResult = () => {
    if (!resultRef.current) return;
    const link = document.createElement("a");
    const baseName = file?.name.replace(/\.[^.]+$/, "") || "audio";
    link.download = `${baseName}.${outputFormat}`;
    link.href = resultRef.current;
    link.click();
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", background: "#fff", boxSizing: "border-box" as const },
    btn: (primary?: boolean) => ({ background: primary ? "#0D9488" : "#F5F5F4", color: primary ? "#fff" : "#1C1917", border: primary ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const, opacity: converting ? 0.6 : 1 }),
    dropzone: { border: "2px dashed #E7E5E4", borderRadius: 8, padding: "40px 20px", textAlign: "center" as const, cursor: "pointer" },
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, textAlign: "center" as const, marginTop: 16 },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Audio Converter" description="Convert audio files between WAV, OGG, WEBM, M4A formats in your browser." slug="audio-converter" category="Converter Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Audio Converter", url: "https://toolcraftkit.com/tools/audio-converter" }]} />
      <h1 style={s.h1}>Audio Converter</h1>
      <p style={s.sub}>Convert audio files between formats. 100% client-side, no server upload.</p>

      <div style={s.card}>
        <div
          style={s.dropzone}
          onClick={() => document.getElementById("audio-input")?.click()}
          onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
          onDrop={e => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        >
          <input id="audio-input" type="file" accept="audio/*" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          <div style={{ fontSize: 28, marginBottom: 8 }}>&#9835;</div>
          <div style={{ fontSize: 14, color: "#78716C" }}>{file ? file.name : "Click or drop an audio file (WAV, OGG, WEBM, M4A)"}</div>
        </div>

        {fileInfo && (
          <div style={{ display: "flex", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 13, color: "#78716C" }}>Size: <strong style={{ color: "#1C1917" }}>{formatSize(fileInfo.size)}</strong></div>
            {fileInfo.duration > 0 && <div style={{ fontSize: 13, color: "#78716C" }}>Duration: <strong style={{ color: "#1C1917" }}>{formatDuration(fileInfo.duration)}</strong></div>}
            <div style={{ fontSize: 13, color: "#78716C" }}>Format: <strong style={{ color: "#1C1917" }}>{fileInfo.type}</strong></div>
          </div>
        )}

        {file && (
          <div style={{ marginTop: 16 }}>
            <label style={s.label}>Output Format</label>
            <select value={outputFormat} onChange={e => setOutputFormat(e.target.value)} style={{ ...s.select, maxWidth: 200 }}>
              <option value="wav">WAV (uncompressed)</option>
              <option value="webm">WEBM (compressed)</option>
            </select>
          </div>
        )}

        {file && (
          <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
            <button onClick={convert} style={s.btn(true)} disabled={converting}>{converting ? "Converting..." : "Convert"}</button>
          </div>
        )}

        {error && <div style={{ marginTop: 12, color: "#EF4444", fontSize: 13 }}>{error}</div>}

        {done && (
          <div style={s.resultCard}>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#0D9488", marginBottom: 12 }}>Conversion Complete</div>
            <button onClick={downloadResult} style={s.btn(true)}>Download .{outputFormat}</button>
          </div>
        )}
      </div>
      <SeoContent />
    </div>
  );
}

function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const length = buffer.length * numChannels * 2 + 44;
  const out = new ArrayBuffer(length);
  const view = new DataView(out);
  let offset = 0;

  function writeString(s: string) { for (let i = 0; i < s.length; i++) { view.setUint8(offset++, s.charCodeAt(i)); } }
  function writeUint32(v: number) { view.setUint32(offset, v, true); offset += 4; }
  function writeUint16(v: number) { view.setUint16(offset, v, true); offset += 2; }

  writeString("RIFF");
  writeUint32(length - 8);
  writeString("WAVE");
  writeString("fmt ");
  writeUint32(16);
  writeUint16(1);
  writeUint16(numChannels);
  writeUint32(sampleRate);
  writeUint32(sampleRate * numChannels * 2);
  writeUint16(numChannels * 2);
  writeUint16(16);
  writeString("data");
  writeUint32(length - 44);

  const channels: Float32Array[] = [];
  for (let i = 0; i < numChannels; i++) channels.push(buffer.getChannelData(i));

  for (let i = 0; i < buffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, channels[ch][i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
      offset += 2;
    }
  }

  return new Blob([out], { type: "audio/wav" });
}

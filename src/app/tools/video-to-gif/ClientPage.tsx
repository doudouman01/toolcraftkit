"use client";
import { useState, useRef, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(3);
  const [fps, setFps] = useState(8);
  const [width, setWidth] = useState(320);
  const [frames, setFrames] = useState<string[]>([]);
  const [extracting, setExtracting] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const animRef = useRef<number>(0);

  const handleFile = (f: File) => {
    setFile(f);
    setFrames([]);
    setAnimating(false);
    const url = URL.createObjectURL(f);
    setVideoUrl(url);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    setEndTime(Math.min(v.duration, 5));
    setStartTime(0);
  };

  const extractFrames = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !file) return;
    setExtracting(true);
    setFrames([]);
    setAnimating(false);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const aspectRatio = video.videoHeight / video.videoWidth;
    canvas.width = width;
    canvas.height = Math.round(width * aspectRatio);

    const interval = 1 / fps;
    const extracted: string[] = [];
    let t = startTime;

    while (t <= endTime && extracted.length < 200) {
      video.currentTime = t;
      await new Promise<void>(resolve => {
        video.onseeked = () => resolve();
      });
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      extracted.push(canvas.toDataURL("image/png"));
      t += interval;
    }

    setFrames(extracted);
    setExtracting(false);
  }, [file, startTime, endTime, fps, width]);

  const toggleAnimation = () => {
    if (animating) {
      cancelAnimationFrame(animRef.current);
      setAnimating(false);
      return;
    }
    setAnimating(true);
    let idx = 0;
    const interval = 1000 / fps;
    let lastTime = 0;
    const animate = (time: number) => {
      if (time - lastTime >= interval) {
        idx = (idx + 1) % frames.length;
        setPreviewIdx(idx);
        lastTime = time;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
  };

  const downloadFrame = (dataUrl: string, index: number) => {
    const link = document.createElement("a");
    link.download = `frame-${(index + 1).toString().padStart(3, "0")}.png`;
    link.href = dataUrl;
    link.click();
  };

  const downloadAllFrames = () => {
    frames.forEach((f, i) => {
      setTimeout(() => downloadFrame(f, i), i * 100);
    });
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = (s % 60).toFixed(1);
    return `${m}:${sec.padStart(4, "0")}`;
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    btn: (primary?: boolean) => ({ background: primary ? "#0D9488" : "#F5F5F4", color: primary ? "#fff" : "#1C1917", border: primary ? "1px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const }),
    dropzone: { border: "2px dashed #E7E5E4", borderRadius: 8, padding: "40px 20px", textAlign: "center" as const, cursor: "pointer" },
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 },
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Video to GIF" description="Extract frames from video. Upload MP4 or WEBM, set frame rate, preview animation, download frames." slug="video-to-gif" category="Image Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Video to GIF", url: "https://toolcraftkit.com/tools/video-to-gif" }]} />
      <h1 style={s.h1}>{t(`tools./tools/video-to-gif.name`) !== `tools./tools/video-to-gif.name` ? t(`tools./tools/video-to-gif.name`) : "Video to GIF"}</h1>
      <p style={s.sub}>{t(`tools./tools/video-to-gif.desc`) !== `tools./tools/video-to-gif.desc` ? t(`tools./tools/video-to-gif.desc`) : "Upload a video, extract frames, and preview as animation. Download individual frames as PNG."}</p>

      <div style={s.card}>
        <div
          style={s.dropzone}
          onClick={() => document.getElementById("video-input")?.click()}
          onDragOver={e => { e.preventDefault(); }}
          onDrop={e => { e.preventDefault(); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
        >
          <input id="video-input" type="file" accept="video/mp4,video/webm" style={{ display: "none" }} onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }} />
          <div style={{ fontSize: 28, marginBottom: 8 }}>&#127910;</div>
          <div style={{ fontSize: 14, color: "#78716C" }}>{file ? file.name : "Click or drop a video file (MP4, WEBM)"}</div>
        </div>

        {videoUrl && (
          <video ref={videoRef} src={videoUrl} onLoadedMetadata={handleLoadedMetadata} style={{ display: "block", width: "100%", maxHeight: 300, marginTop: 12, borderRadius: 8 }} controls muted />
        )}

        {duration > 0 && (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={s.label}>Start Time: {fmt(startTime)}</label>
                <input type="range" min={0} max={duration} step={0.1} value={startTime} onChange={e => setStartTime(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
              <div>
                <label style={s.label}>End Time: {fmt(endTime)}</label>
                <input type="range" min={0} max={duration} step={0.1} value={endTime} onChange={e => setEndTime(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              <div>
                <label style={s.label}>Frame Rate: {fps} fps</label>
                <input type="range" min={3} max={15} value={fps} onChange={e => setFps(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
              <div>
                <label style={s.label}>Width: {width}px</label>
                <input type="range" min={120} max={640} step={10} value={width} onChange={e => setWidth(Number(e.target.value))} style={{ width: "100%" }} />
              </div>
            </div>
            <div style={{ fontSize: 12, color: "#78716C", marginBottom: 12 }}>
              Estimated frames: {Math.min(200, Math.ceil((endTime - startTime) * fps))} ({fmt(endTime - startTime)} duration)
            </div>
            <button onClick={extractFrames} style={s.btn(true)} disabled={extracting}>{extracting ? "Extracting..." : "Extract Frames"}</button>
          </div>
        )}
      </div>

      {frames.length > 0 && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#1C1917" }}>{frames.length} Frames Extracted</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={toggleAnimation} style={s.btn()}>{animating ? "Stop" : "Play Preview"}</button>
              <button onClick={downloadAllFrames} style={s.btn(true)}>{toolUI.downloadAll}</button>
            </div>
          </div>

          {/* Preview */}
          <div style={{ textAlign: "center", marginBottom: 16, background: "#F5F5F4", borderRadius: 8, padding: 12 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={frames[previewIdx]} alt={`Frame ${previewIdx + 1}`} style={{ maxWidth: "100%", borderRadius: 4 }} />
            <div style={{ fontSize: 12, color: "#78716C", marginTop: 6 }}>Frame {previewIdx + 1} of {frames.length}</div>
          </div>

          {/* Grid of frames */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 6, maxHeight: 300, overflowY: "auto" }}>
            {frames.map((f, i) => (
              <div key={i} onClick={() => { setPreviewIdx(i); downloadFrame(f, i); }} style={{ cursor: "pointer", borderRadius: 4, overflow: "hidden", border: i === previewIdx ? "2px solid #0D9488" : "1px solid #E7E5E4" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={f} alt={`Frame ${i + 1}`} style={{ width: "100%", display: "block" }} />
              </div>
            ))}
          </div>
        </div>
      )}
      <SeoContent />
    </div>
  );
}

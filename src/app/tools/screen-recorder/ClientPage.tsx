"use client";
import { useState, useRef, useEffect } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

export default function ClientPage() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [includeAudio, setIncludeAudio] = useState(false);
  const [error, setError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  const startRecording = async () => {
    setError("");
    setBlobUrl(null);
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: includeAudio,
      });

      let combinedStream = displayStream;

      if (includeAudio) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const tracks = [...displayStream.getTracks(), ...audioStream.getTracks()];
          combinedStream = new MediaStream(tracks);
        } catch {
          // audio not available, proceed with video only
        }
      }

      streamRef.current = combinedStream;
      chunksRef.current = [];
      const mr = new MediaRecorder(combinedStream, { mimeType: "video/webm" });
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        setBlobUrl(URL.createObjectURL(blob));
        combinedStream.getTracks().forEach((t) => t.stop());
      };

      // Stop when user clicks browser stop-sharing button
      displayStream.getVideoTracks()[0].onended = () => stopRecording();

      mr.start(100);
      setRecording(true);
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000);
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== "AbortError") {
        setError("Could not access screen. Please allow screen sharing.");
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
    setPaused(false);
  };

  const togglePause = () => {
    const mr = mediaRecorderRef.current;
    if (!mr) return;
    if (mr.state === "recording") { mr.pause(); setPaused(true); if (timerRef.current) clearInterval(timerRef.current); }
    else if (mr.state === "paused") { mr.resume(); setPaused(false); timerRef.current = setInterval(() => setElapsed((p) => p + 1), 1000); }
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); streamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, []);

  const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #E7E5E4", borderRadius: "12px", padding: "32px", marginBottom: "16px", textAlign: "center" };
  const btnStyle = (bg: string): React.CSSProperties => ({ padding: "12px 32px", background: bg, color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, fontSize: "15px", cursor: "pointer", margin: "6px" });

  return (
    <>
      <ToolSchema name="Screen Recorder" description="Record your screen with optional audio. Download as WebM. Free, no install." slug="screen-recorder" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "/" }, { name: "Productivity Tools", url: "/#productivity-tools" }, { name: "Screen Recorder", url: "/tools/screen-recorder" }]} />
      <div style={{ maxWidth: "700px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#1C1917", marginBottom: "6px" }}>Screen Recorder</h1>
        <p style={{ color: "#78716C", fontSize: "15px", marginBottom: "28px" }}>Record your screen directly in the browser. Download as WebM.</p>

        <div style={cardStyle}>
          {!recording && !blobUrl && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", cursor: "pointer", fontSize: "14px", color: "#1C1917" }}>
                  <input type="checkbox" checked={includeAudio} onChange={(e) => setIncludeAudio(e.target.checked)} />
                  Include audio (microphone)
                </label>
              </div>
              <button onClick={startRecording} style={btnStyle("#0D9488")}>
                Start Recording
              </button>
            </>
          )}

          {recording && (
            <>
              <div style={{ fontSize: "48px", fontWeight: 700, color: paused ? "#F59E0B" : "#EF4444", fontVariantNumeric: "tabular-nums", marginBottom: "8px" }}>
                {formatTime(elapsed)}
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: paused ? "#F59E0B" : "#EF4444", animation: paused ? "none" : "pulse 1.5s infinite" }} />
                <span style={{ fontSize: "14px", color: "#78716C" }}>{paused ? "Paused" : "Recording..."}</span>
              </div>
              <button onClick={togglePause} style={btnStyle("#F59E0B")}>{paused ? "Resume" : "Pause"}</button>
              <button onClick={stopRecording} style={btnStyle("#EF4444")}>Stop</button>
              <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>
            </>
          )}

          {blobUrl && (
            <>
              <video src={blobUrl} controls style={{ width: "100%", borderRadius: "8px", marginBottom: "16px", maxHeight: "400px" }} />
              <div>
                <a href={blobUrl} download="screen-recording.webm" style={{ ...btnStyle("#0D9488"), textDecoration: "none", display: "inline-block" }}>Download WebM</a>
                <button onClick={() => { setBlobUrl(null); setElapsed(0); }} style={btnStyle("#78716C")}>New Recording</button>
              </div>
            </>
          )}

          {error && <div style={{ color: "#EF4444", marginTop: "12px", fontSize: "14px" }}>{error}</div>}
        </div>
      </div>
      <SeoContent />
    </>
  );
}

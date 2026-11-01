"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

interface ThumbnailInfo {
  label: string;
  resolution: string;
  key: string;
  url: string;
}

function extractVideoId(url: string): string | null {
  const trimmed = url.trim();
  // Direct video ID (11 characters)
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const parsed = new URL(trimmed.startsWith("http") ? trimmed : "https://" + trimmed);
    // youtube.com/watch?v=
    if (parsed.hostname.includes("youtube.com") && parsed.searchParams.get("v")) {
      return parsed.searchParams.get("v");
    }
    // youtube.com/shorts/VIDEO_ID
    const shortsMatch = parsed.pathname.match(/\/shorts\/([A-Za-z0-9_-]{11})/);
    if (shortsMatch) return shortsMatch[1];
    // youtube.com/embed/VIDEO_ID
    const embedMatch = parsed.pathname.match(/\/embed\/([A-Za-z0-9_-]{11})/);
    if (embedMatch) return embedMatch[1];
    // youtube.com/v/VIDEO_ID
    const vMatch = parsed.pathname.match(/\/v\/([A-Za-z0-9_-]{11})/);
    if (vMatch) return vMatch[1];
    // youtu.be/VIDEO_ID
    if (parsed.hostname === "youtu.be") {
      const id = parsed.pathname.slice(1).split("/")[0];
      if (id && /^[A-Za-z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {
    // not a valid URL
  }
  // Fallback regex
  const fallback = trimmed.match(/(?:v=|youtu\.be\/|shorts\/|embed\/|\/v\/)([A-Za-z0-9_-]{11})/);
  return fallback ? fallback[1] : null;
}

function getThumbnails(videoId: string): ThumbnailInfo[] {
  return [
    { label: "Maximum Resolution", resolution: "1280 x 720", key: "maxresdefault", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` },
    { label: "High Quality", resolution: "480 x 360", key: "hqdefault", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
    { label: "Medium Quality", resolution: "320 x 180", key: "mqdefault", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    { label: "Standard Quality", resolution: "120 x 90", key: "sddefault", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg` },
    { label: "Default", resolution: "120 x 90", key: "default", url: `https://img.youtube.com/vi/${videoId}/default.jpg` },
  ];
}

export default function ClientPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [thumbnails, setThumbnails] = useState<ThumbnailInfo[]>([]);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);
  const [loadErrors, setLoadErrors] = useState<Record<string, boolean>>({});

  const handleFetch = () => {
    setError("");
    setLoadErrors({});
    const id = extractVideoId(inputUrl);
    if (!id) {
      setError("Invalid YouTube URL. Please enter a valid YouTube video link.");
      setVideoId(null);
      setThumbnails([]);
      return;
    }
    setVideoId(id);
    setThumbnails(getThumbnails(id));
  };

  const handleDownload = async (thumb: ThumbnailInfo) => {
    setDownloading(thumb.key);
    const filename = `youtube-thumbnail-${videoId}-${thumb.key}.jpg`;

    try {
      // Try fetch + blob approach first
      const response = await fetch(thumb.url, { mode: "cors" });
      if (response.ok) {
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(blobUrl);
        setDownloading(null);
        return;
      }
    } catch {
      // fetch failed, try canvas approach
    }

    try {
      // Canvas approach with crossOrigin
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            if (blob) {
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = filename;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(blobUrl);
            }
            setDownloading(null);
          }, "image/jpeg", 0.95);
        } else {
          setDownloading(null);
        }
      };
      img.onerror = () => {
        // All approaches failed, open in new tab
        window.open(thumb.url, "_blank");
        setDownloading(null);
      };
      img.src = thumb.url;
    } catch {
      // Final fallback: open in new tab
      window.open(thumb.url, "_blank");
      setDownloading(null);
    }
  };

  const handleImageError = (key: string) => {
    setLoadErrors((prev) => ({ ...prev, [key]: true }));
  };

  const s = {
    page: { maxWidth: 880, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" } as const,
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 } as const,
    thumbCard: { background: "#F5F5F4", border: "1px solid #E7E5E4", borderRadius: 10, overflow: "hidden" as const } as const,
    thumbImg: { width: "100%", display: "block", aspectRatio: "16 / 9", objectFit: "cover" as const, background: "#E7E5E4" } as const,
    thumbInfo: { padding: "12px 14px" } as const,
    thumbLabel: { fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 2 } as const,
    thumbRes: { fontSize: 12, color: "#78716C", marginBottom: 10 } as const,
    error: { color: "#DC2626", fontSize: 13, marginTop: 8 } as const,
    videoIdBadge: { display: "inline-block", background: "#f0fdfa", color: "#0D9488", border: "1px solid #99f6e4", borderRadius: 6, padding: "4px 10px", fontSize: 13, fontWeight: 600, marginBottom: 16 } as const,
    unavailable: { width: "100%", aspectRatio: "16 / 9", display: "flex", alignItems: "center", justifyContent: "center", background: "#E7E5E4", color: "#78716C", fontSize: 13 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="YouTube Thumbnail Downloader"
        description="Download YouTube video thumbnails in all available resolutions. Free, no signup required."
        slug="youtube-thumbnail-downloader"
        category="UtilitiesApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Social Media Tools", url: "https://toolcraftkit.com/#social-tools" },
          { name: "YouTube Thumbnail Downloader", url: "https://toolcraftkit.com/tools/youtube-thumbnail-downloader" },
        ]}
      />

      <h1 style={s.h1}>YouTube Thumbnail Downloader</h1>
      <p style={s.sub}>Download any YouTube video thumbnail in all available resolutions. Just paste a YouTube URL.</p>

      <div style={s.card}>
        <label style={s.label}>YouTube Video URL</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleFetch()}
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            style={{ ...s.input, flex: 1, minWidth: 200 }}
          />
          <button onClick={handleFetch} style={s.btn}>
            Get Thumbnails
          </button>
        </div>
        {error && <p style={s.error}>{error}</p>}
        <p style={{ fontSize: 12, color: "#A8A29E", marginTop: 8, marginBottom: 0 }}>
          Supports youtube.com/watch, youtu.be, youtube.com/shorts, and embed links.
        </p>
      </div>

      {videoId && thumbnails.length > 0 && (
        <div style={s.card}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: "#1C1917" }}>Thumbnails Found</span>
            <span style={s.videoIdBadge}>Video ID: {videoId}</span>
          </div>

          <div style={s.grid}>
            {thumbnails.map((thumb) => (
              <div key={thumb.key} style={s.thumbCard}>
                {loadErrors[thumb.key] ? (
                  <div style={s.unavailable}>Not available for this video</div>
                ) : (
                  <img
                    src={thumb.url}
                    alt={`${thumb.label} thumbnail`}
                    style={s.thumbImg}
                    onError={() => handleImageError(thumb.key)}
                    loading="lazy"
                  />
                )}
                <div style={s.thumbInfo}>
                  <div style={s.thumbLabel}>{thumb.label}</div>
                  <div style={s.thumbRes}>{thumb.resolution} px</div>
                  {!loadErrors[thumb.key] && (
                    <button
                      onClick={() => handleDownload(thumb)}
                      disabled={downloading === thumb.key}
                      style={{
                        ...s.btnSm,
                        opacity: downloading === thumb.key ? 0.6 : 1,
                        cursor: downloading === thumb.key ? "not-allowed" : "pointer",
                        width: "100%",
                      }}
                    >
                      {downloading === thumb.key ? "Downloading..." : "Download"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>
          Grab any YouTube video thumbnail in all available sizes, from maximum resolution (1280x720) down to the default
          (120x90). Simply paste a YouTube URL, and the tool extracts the video ID and shows every available thumbnail.
          Click &quot;Download&quot; to save any size directly to your device. No API keys, no signups, 100% free.
        </p>
      </div>

      <SeoContent />
    </div>
  );
}

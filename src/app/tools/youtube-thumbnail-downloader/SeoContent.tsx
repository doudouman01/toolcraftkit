"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Download YouTube Thumbnails</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>
        Copy the URL of any YouTube video from your browser address bar, the YouTube app share button, or a video link someone sent you. Paste it into the input field above and click &quot;Get Thumbnails.&quot; The tool instantly extracts the video ID and displays all available thumbnail sizes as previews.
      </p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>
        Click the &quot;Download&quot; button below any thumbnail to save it directly to your device. The image is saved as a JPG file with the video ID and resolution in the filename for easy organization.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Available Thumbnail Sizes</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>
          <strong>Maximum Resolution (1280 x 720)</strong> — The highest quality thumbnail YouTube provides. Not available for all videos, especially older ones.
        </li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>
          <strong>High Quality (480 x 360)</strong> — A solid mid-size option available for virtually all videos. Great for blog posts and social media.
        </li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>
          <strong>Medium Quality (320 x 180)</strong> — Widescreen format at a compact size. Ideal for email newsletters and smaller preview cards.
        </li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>
          <strong>Standard Quality (120 x 90)</strong> — Small thumbnail used in YouTube&apos;s own sidebar and suggestion lists.
        </li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>
          <strong>Default (120 x 90)</strong> — The basic thumbnail available for every YouTube video without exception.
        </li>
      </ul>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Supported URL Formats</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>
        This tool recognizes all standard YouTube URL formats, including full watch URLs (youtube.com/watch?v=...), short links (youtu.be/...), Shorts URLs (youtube.com/shorts/...), and embed links (youtube.com/embed/...). You can also paste just the 11-character video ID directly.
      </p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Content creators saving their own thumbnails for portfolio or social media repurposing</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Bloggers embedding high-quality video thumbnails in articles and reviews</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Marketers analyzing competitor thumbnail design and strategy</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Educators creating course materials that reference specific YouTube videos</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Designers studying thumbnail layouts, typography, and color schemes for inspiration</li>
      </ul>

      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>
          Not all videos have a maximum resolution (1280x720) thumbnail available. If a size shows &quot;Not available,&quot; try the High Quality (480x360) version instead — it is available for almost every YouTube video and still looks great for most uses.
        </p>
      </div>
    </section>
  );
}

import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aspect Ratio Guide: Video, Photography & Social Media Dimensions",
  description: "Learn everything about aspect ratios for video editing, photography, and social media. Understand 16:9, 4:3, 1:1, 9:16, and how to calculate the right dimensions for any platform.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>← Back to Blog</Link>
        <h1 style={s.h1}>Aspect Ratio Guide: Video, Photography & Social Media Dimensions</h1>
        <p style={s.meta}>October 1, 2026 · 5 min read</p>

        <p style={s.p}>Aspect ratio is one of those fundamentals that affects every piece of visual content you create. Get it wrong and your images get cropped, your videos get letterboxed, and your designs look stretched. This guide covers the aspect ratios that matter most across video, photography, and social media so you can pick the right dimensions every time.</p>

        <h2 style={s.h2}>What Is an Aspect Ratio and How to Calculate It</h2>
        <p style={s.p}>An aspect ratio is the proportional relationship between width and height, written as two numbers separated by a colon. To calculate it, divide both the width and height by their greatest common divisor. For example, 1920 divided by 120 gives 16, and 1080 divided by 120 gives 9, so the ratio is 16:9. The ratio describes the shape of the frame, not the actual size. A 1280x720 image and a 3840x2160 image are both 16:9.</p>

        <h2 style={s.h2}>Aspect Ratios for Video Production</h2>
        <p style={s.p}>The standard for almost all modern video is 16:9 widescreen. YouTube, Vimeo, streaming services, and broadcast TV all use it. Common resolutions include 1920x1080 (Full HD), 2560x1440 (QHD), and 3840x2160 (4K). Cinema uses wider ratios. The 2.39:1 format (sometimes called 21:9) is standard for theatrical releases and gives that cinematic letterboxed look. Some filmmakers use 2.76:1 for ultra-wide compositions.</p>
        <p style={s.p}>Vertical video has become equally important. 9:16 is the standard for TikTok, Instagram Reels, YouTube Shorts, and Snapchat. The most common resolution is 1080x1920. When repurposing horizontal content for vertical platforms, cropping from 16:9 to 9:16 loses significant portions of the frame, so planning for both orientations during shooting saves significant editing time.</p>

        <h2 style={s.h2}>Aspect Ratios in Photography</h2>
        <p style={s.p}>Most DSLR and mirrorless cameras shoot in 3:2, which is the classic 35mm film ratio. Micro Four Thirds cameras use 4:3. Medium format cameras often shoot 4:3 or 1:1. These ratios affect how your images fit into standard print sizes. A 3:2 image prints perfectly as a 6x4 inch photo, but needs cropping for an 8x10 (which is 5:4). Understanding these relationships before shooting helps you compose with the final output in mind.</p>
        <p style={s.p}>Square format (1:1) has seen a resurgence thanks to Instagram. While Instagram now supports multiple ratios, 1:1 remains popular for its balanced, symmetrical composition. Panoramic photography uses extreme ratios like 3:1 or even 6:1 for landscape scenes.</p>

        <h2 style={s.h2}>Social Media Aspect Ratios in 2026</h2>
        <p style={s.p}>Each platform has preferred dimensions that maximize screen real estate. Instagram feed posts work best at 1:1 (1080x1080) or 4:5 portrait (1080x1350), which takes up more screen space in the feed. Stories, Reels, and TikTok videos all use 9:16 (1080x1920). YouTube videos and thumbnails use 16:9 (1920x1080 or 1280x720). LinkedIn and Facebook posts perform well at 1.91:1 or 16:9 for landscape, and 4:5 for portrait.</p>
        <p style={s.p}>Twitter/X supports a range of ratios but 16:9 and 2:1 show best in the timeline without cropping. Pinterest is optimized for 2:3 vertical pins (1000x1500). Getting these right eliminates the frustration of auto-cropping cutting off important content.</p>

        <h2 style={s.h2}>How to Resize Without Distortion</h2>
        <p style={s.p}>The golden rule is to always maintain the aspect ratio when scaling. If you change the width, the height must change proportionally. Locking the ratio in your editing software prevents stretching. When you need to change the ratio itself, cropping is better than stretching. Decide which part of the image is most important and crop from there. Our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> handles this with preset dimensions for every major platform.</p>
        <p style={s.p}>When converting between ratios, letterboxing (adding bars) preserves the entire image but wastes screen space. Cropping loses content but fills the frame. The right choice depends on whether the full composition matters or whether filling the screen is more important.</p>

        <h2 style={s.h2}>Calculate Your Aspect Ratio Instantly</h2>
        <p style={s.p}>Stop guessing and calculate the exact ratio and dimensions you need. Our free Aspect Ratio Calculator shows your ratio, suggests matching resolutions, and gives you a visual preview of the frame shape.</p>
        <Link href="/tools/aspect-ratio-calculator" style={s.cta}>Open Aspect Ratio Calculator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/image-resizer" style={{ color: "#0D9488" }}>Image Resizer</Link> to resize images to the exact dimensions you calculated.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

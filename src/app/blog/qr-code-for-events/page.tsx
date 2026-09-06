import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Codes for Events: Tickets, Check-In, Networking & Feedback",
  description: "Use QR codes for event management: digital tickets, fast check-in, contact sharing, surveys, and social media. Free generator.",
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
        <h1 style={s.h1}>QR Codes for Events: Tickets, Check-In, Networking & Feedback</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>QR codes simplify every stage of event management — from ticket distribution to post-event surveys. They replace paper processes, speed up check-in, facilitate networking, and collect feedback. Whether you are running a conference, workshop, or community meetup, QR codes make logistics smoother.</p>

        <h2 style={s.h2}>Digital Tickets and Check-In</h2>
        <p style={s.p}>Generate a unique QR code per attendee containing their name, ticket number, and ticket type. At the door, scan the code to verify the ticket and check them in. This eliminates printed ticket requirements, prevents duplicate entries, and gives you real-time attendance data. Free events can use simple URL-based codes linking to a registration confirmation.</p>

        <h2 style={s.h2}>Networking and Contact Exchange</h2>
        <p style={s.p}>Create QR codes containing vCard data — your name, email, phone, and LinkedIn URL. Print these on name badges. When two attendees want to connect, they scan each other's badge instead of fumbling with business cards. The contact information is saved directly to their phone's address book.</p>

        <h2 style={s.h2}>Session Feedback</h2>
        <p style={s.p}>Place QR codes at the end of each session linking to a short survey (3-5 questions maximum). Attendees scan and rate while the session is fresh. Response rates for QR-triggered surveys are significantly higher than post-event email surveys because the friction is lower and timing is immediate.</p>

        <h2 style={s.h2}>Social Media Integration</h2>
        <p style={s.p}>Create QR codes linking to your event hashtag, social media profile, or a photo-sharing page. Place them at photo-worthy spots (stage, branded backdrops, entrance). This drives social sharing during the event, extending your reach beyond the physical attendees.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free QR Code Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/qr-code-generator" style={s.cta}>Open QR Code Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

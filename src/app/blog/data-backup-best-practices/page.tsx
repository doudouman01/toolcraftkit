import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Backup Best Practices: The 3-2-1 Rule and Cloud Strategy",
  description: "Protect your files with proper backup strategy. The 3-2-1 rule, cloud vs local backup, and how to actually recover when disaster strikes.",
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
        <h1 style={s.h1}>Data Backup Best Practices: The 3-2-1 Rule and Cloud Strategy</h1>
        <p style={s.meta}>September 5, 2026 · 4 min read</p>

        <p style={s.p}>Every year, hardware failure, ransomware, accidental deletion, or theft costs millions of people their irreplaceable data. Photos, documents, code, financial records — gone in an instant. A proper backup strategy costs almost nothing and takes minutes to set up. Not having one costs everything when disaster strikes.</p>

        <h2 style={s.h2}>The 3-2-1 Rule</h2>
        <p style={s.p}>Keep 3 copies of your data, on 2 different storage types, with 1 copy offsite. Example: your working files on your laptop (copy 1), backed up to an external hard drive (copy 2, different storage type), and synced to cloud storage (copy 3, offsite). If your laptop dies, you have the external drive. If your house floods, you have the cloud.</p>

        <h2 style={s.h2}>Cloud Backup Options</h2>
        <p style={s.p}>Google Drive, iCloud, OneDrive, and Dropbox offer automatic file syncing — but syncing is not backup. If you delete a file, sync deletes it everywhere. True backup services (Backblaze, iDrive, Carbonite) maintain versioned copies — you can restore yesterday's version of a file even if today's is corrupted or deleted.</p>

        <h2 style={s.h2}>What to Back Up</h2>
        <p style={s.p}>Documents, photos, videos, financial records, creative work, code repositories, passwords (via a password manager's encrypted export), and system settings. Large media files (music, movies) that can be re-downloaded are lower priority. Focus backup resources on irreplaceable personal data.</p>

        <h2 style={s.h2}>Testing Recovery</h2>
        <p style={s.p}>A backup you have never tested is a backup you cannot trust. Quarterly, pick a random file and restore it from your backup. Verify it opens correctly and contains the expected content. Many people discover their backup system is broken only when they need it most — a restore test prevents this.</p>

        <h2 style={s.h2}>Try It Now</h2>
        <p style={s.p}>Our free Password Generator handles this instantly — no signup, no limits.</p>
        <Link href="/tools/password-generator" style={s.cta}>Open Password Generator →</Link>

        <p style={{ ...s.p, marginTop: 24 }}>Also useful: our <Link href="/tools/pdf-merge" style={{ color: "#0D9488" }}>PDF Merge</Link> for related calculations.</p>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Blog — Tips, Guides & How-Tos",
  description: "Practical guides and tips for students, freelancers, and entrepreneurs. Learn how to use free online tools to work smarter.",
};

function getAllPosts(): { slug: string; title: string; desc: string; date: string }[] {
  const blogDir = path.join(process.cwd(), "src/app/blog");
  const dirs = fs.readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(blogDir, d.name, "page.tsx")));

  const posts: { slug: string; title: string; desc: string; date: string }[] = [];

  for (const dir of dirs) {
    try {
      const content = fs.readFileSync(path.join(blogDir, dir.name, "page.tsx"), "utf-8");

      // Extract title from metadata
      const titleMatch = content.match(/title:\s*["'`]([^"'`]+)["'`]/);
      const descMatch = content.match(/description:\s*["'`]([^"'`]+)["'`]/);
      // Extract date from the article body (pattern: "Month DD, YYYY · X min read" or "Month YYYY")
      const dateMatch = content.match(/(\w+ \d{1,2},? \d{4})/);

      if (titleMatch) {
        posts.push({
          slug: dir.name,
          title: titleMatch[1],
          desc: descMatch ? descMatch[1] : "",
          date: dateMatch ? dateMatch[1] : "November 2026",
        });
      }
    } catch {
      // skip files that can't be read
    }
  }

  // Sort by date (newest first), then alphabetically
  posts.sort((a, b) => {
    const da = new Date(a.date);
    const db = new Date(b.date);
    if (!isNaN(da.getTime()) && !isNaN(db.getTime())) return db.getTime() - da.getTime();
    return a.title.localeCompare(b.title);
  });

  return posts;
}

export default function Page() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 }}>Blog</h1>
        <p style={{ fontSize: 14, color: "#78716C", marginBottom: 8 }}>Practical guides and tips to help you work smarter with free online tools.</p>
        <p style={{ fontSize: 13, color: "#A8A29E", marginBottom: 32 }}>{posts.length} articles</p>

        <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{
              display: "block", padding: "20px 22px", background: "#fff",
              border: "1px solid #E7E5E4", borderRadius: 10, textDecoration: "none",
              transition: "border-color 0.2s",
            }}>
              <span style={{ fontSize: 12, color: "#A8A29E" }}>{post.date}</span>
              <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1C1917", marginTop: 4, marginBottom: 6, lineHeight: 1.3 }}>{post.title}</h2>
              {post.desc && <p style={{ fontSize: 13, color: "#78716C", lineHeight: 1.5, margin: 0 }}>{post.desc}</p>}
            </Link>
          ))}
        </div>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}><Footer /></div>
    </>
  );
}

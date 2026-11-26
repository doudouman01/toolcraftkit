import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Citation Generator: APA, MLA, Chicago & Harvard Formats | ToolCraftKit",
  description:
    "Generate properly formatted citations in APA 7th, MLA 9th, Chicago, and Harvard styles. Books, journals, websites, videos — free, no signup.",
};

export default function Page() {
  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px 60px" } as const,
    h1: { fontSize: 26, fontWeight: 700, color: "#1C1917", marginBottom: 8, lineHeight: 1.3 } as const,
    meta: { fontSize: 13, color: "#A8A29E", marginBottom: 28 } as const,
    h2: { fontSize: 19, fontWeight: 600, color: "#1C1917", marginTop: 32, marginBottom: 10 } as const,
    p: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14 } as const,
    ul: { fontSize: 15, color: "#44403C", lineHeight: 1.8, marginBottom: 14, paddingLeft: 24 } as const,
    cta: { display: "inline-block", background: "#0D9488", color: "#fff", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600, textDecoration: "none", marginTop: 8, marginBottom: 8 } as const,
  };

  return (
    <>
      <Header />
      <main style={s.page}>
        <Link href="/blog" style={{ fontSize: 13, color: "#0D9488", textDecoration: "none", marginBottom: 16, display: "block" }}>
          ← Back to Blog
        </Link>

        <h1 style={s.h1}>Free Citation Generator: APA, MLA, Chicago &amp; Harvard Formats</h1>
        <p style={s.meta}>November 25, 2026 · 8 min read</p>

        <p style={s.p}>
          Getting a citation wrong in an academic paper can cost you marks. Getting it wrong in a published article can cost your credibility. And getting it systematically wrong across a thesis can trigger a plagiarism investigation, even when every source is legitimate. The rules for <strong>APA</strong>, <strong>MLA</strong>, <strong>Chicago</strong>, and <strong>Harvard</strong> citation styles differ in dozens of small but important ways — author order, date placement, punctuation, italicization, URL formatting — and keeping them straight without help is an unnecessary tax on your time.
        </p>
        <p style={s.p}>
          A <strong>citation generator</strong> eliminates this problem entirely. You enter the source details, select your format, and get a properly formatted citation you can paste directly into your document. No memorizing style guides, no second-guessing comma placement.
        </p>

        <h2 style={s.h2}>APA vs. MLA vs. Chicago vs. Harvard: The Key Differences</h2>
        <p style={s.p}>
          Each citation style was designed for a different academic tradition, and understanding which to use depends on your field and your instructor&apos;s requirements.
        </p>
        <ul style={s.ul}>
          <li><strong>APA 7th Edition</strong> — Developed by the American Psychological Association. Standard in psychology, education, social sciences, and business. Uses author-date in-text citations: (Smith, 2024). The reference list entry leads with the author&apos;s last name, followed by initials, year in parentheses, title in sentence case with no quotation marks for articles, and italicized journal names.</li>
          <li><strong>MLA 9th Edition</strong> — Published by the Modern Language Association. Used in literature, arts, humanities, and cultural studies. Uses author-page in-text citations: (Smith 42). The Works Cited entry leads with the author&apos;s full name, title in quotation marks for articles and italics for books, container information (journal, anthology, website), and optional access date for online sources.</li>
          <li><strong>Chicago / Turabian</strong> — The Chicago Manual of Style supports two systems: notes-bibliography (common in history and some humanities, using footnotes) and author-date (similar to APA, used in sciences). The notes-bibliography style uses superscript numbers linked to footnotes or endnotes, with a full bibliography at the end.</li>
          <li><strong>Harvard</strong> — Widely used in the UK, Australia, and many international universities. Similar to APA in structure (author-date), but with differences in formatting: titles of journal articles are not italicized, and the placement of access dates and URL formatting differs. Harvard is not governed by a single authority, so variations exist between institutions.</li>
        </ul>

        <h2 style={s.h2}>The Most Common Citation Mistakes</h2>
        <p style={s.p}>
          Even experienced researchers make these errors. Knowing what to watch for saves time and prevents point deductions:
        </p>
        <ul style={s.ul}>
          <li><strong>Mixing styles.</strong> Starting a paper in APA and accidentally switching to MLA mid-document is more common than you think, especially when copying citations from multiple sources.</li>
          <li><strong>Missing DOIs.</strong> APA 7th requires a DOI for any source that has one. A Digital Object Identifier is a permanent link to a specific article or dataset, and omitting it when available is technically an incomplete citation.</li>
          <li><strong>Incorrect author formatting.</strong> APA uses last name and initials (Smith, J. A.). MLA uses full names (Smith, John Adam). Harvard varies by institution. Swapping these is an instant red flag for a grader.</li>
          <li><strong>Italicization errors.</strong> In APA, book titles and journal names are italicized, but article titles are not. In MLA, article titles go in quotation marks while book titles are italicized. These rules are easy to confuse across styles.</li>
          <li><strong>Outdated formats.</strong> Using APA 6th edition formatting when your instructor requires APA 7th creates subtle but systematic errors throughout your reference list. The 7th edition made significant changes to DOI formatting, publisher location, and running heads.</li>
          <li><strong>Incomplete web citations.</strong> A URL alone is not a citation. Web sources need author (or organization), title, publication date, website name, and access date (in some styles). Missing any of these creates an incomplete reference.</li>
        </ul>

        <h2 style={s.h2}>How to Cite Different Source Types</h2>
        <p style={s.p}>
          The most searched citation questions are not about style rules in the abstract — they are about specific source types. Here is how the major styles handle the most common ones:
        </p>
        <p style={s.p}>
          <strong>Books:</strong> All four styles require author, title, publisher, and year. APA and Harvard put the year after the author. MLA puts it at the end. Chicago notes-bibliography puts it in the footnote.
        </p>
        <p style={s.p}>
          <strong>Journal articles:</strong> APA requires volume, issue, pages, and DOI. MLA requires volume and issue but not DOI (though including a URL is recommended). Chicago and Harvard follow similar patterns with minor punctuation differences.
        </p>
        <p style={s.p}>
          <strong>Websites:</strong> The trickiest source type because web content often lacks clear authorship and dates. When no author is listed, use the organization name. When no date is available, APA uses &quot;n.d.&quot; and MLA omits the date. Always include an access date for content that may change.
        </p>
        <p style={s.p}>
          <strong>Videos (YouTube, etc.):</strong> APA 7th treats YouTube videos as audiovisual media, citing the uploader as author and including the URL. MLA cites the creator&apos;s name, video title in quotation marks, and the platform as a container.
        </p>

        <h2 style={s.h2}>How to Generate Citations in Seconds</h2>
        <p style={s.p}>
          <strong>Step 1:</strong> Open the{" "}
          <Link href="/tools/citation-generator" style={{ color: "#0D9488" }}>
            Citation Generator
          </Link>{" "}
          on ToolCraftKit.
        </p>
        <p style={s.p}>
          <strong>Step 2:</strong> Select your source type — book, journal article, website, or video.
        </p>
        <p style={s.p}>
          <strong>Step 3:</strong> Enter the source details. The form adapts to show the fields relevant to your source type (author, title, year, publisher, URL, DOI, volume, pages, etc.).
        </p>
        <p style={s.p}>
          <strong>Step 4:</strong> Choose your citation format — APA 7th, MLA 9th, Chicago, or Harvard.
        </p>
        <p style={s.p}>
          <strong>Step 5:</strong> Click generate. Copy the formatted citation and paste it into your document. Add multiple citations to build a complete bibliography in one session.
        </p>

        <h2 style={s.h2}>Free vs. Paid Citation Tools</h2>
        <p style={s.p}>
          Paid citation managers like Zotero, Mendeley, and EndNote offer features beyond formatting — they store your library, sync across devices, and integrate with word processors. If you manage hundreds of sources across multiple projects, these tools justify their cost or complexity.
        </p>
        <p style={s.p}>
          But if you need to format five citations for a paper due tomorrow, a free browser-based generator gets the job done without installing software, creating an account, or importing a library. Use the right tool for the right task.
        </p>

        <h2 style={s.h2}>Other Academic Tools You Should Know</h2>
        <p style={s.p}>
          Pair your citations with other free tools from ToolCraftKit:
        </p>
        <ul style={s.ul}>
          <li><Link href="/tools/word-counter" style={{ color: "#0D9488" }}>Word Counter</Link> — track your word count, reading time, and paragraph structure</li>
          <li><Link href="/tools/readability-score" style={{ color: "#0D9488" }}>Readability Score Checker</Link> — ensure your writing matches the expected academic register</li>
          <li><Link href="/tools/flashcard-creator" style={{ color: "#0D9488" }}>Flashcard Creator</Link> — study key concepts from your sources using active recall</li>
        </ul>
        <p style={s.p}>
          For AI tools that help with academic research and writing, visit{" "}
          <a href="https://aigradelab.com" target="_blank" rel="noopener" style={{ color: "#0D9488" }}>AIGradeLab.com</a>.
        </p>

        <h2 style={s.h2}>Final Thoughts</h2>
        <p style={s.p}>
          Citations exist to give credit, enable verification, and demonstrate the depth of your research. They should not be the hardest part of writing a paper. A citation generator handles the formatting rules so you can focus on the work that matters — your ideas, your analysis, and your argument.
        </p>

        <Link href="/tools/citation-generator" style={s.cta}>
          Generate Free Citations →
        </Link>
      </main>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 20px" }}>
        <Footer />
      </div>
    </>
  );
}

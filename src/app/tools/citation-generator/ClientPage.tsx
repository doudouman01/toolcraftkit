"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

type SourceType = "book" | "journal" | "website" | "video";
type CitationFormat = "apa7" | "mla9" | "chicago" | "harvard";

interface FormData {
  sourceType: SourceType;
  format: CitationFormat;
  authors: string;
  title: string;
  year: string;
  publisher: string;
  url: string;
  journalName: string;
  volume: string;
  issue: string;
  pages: string;
  doi: string;
  accessDate: string;
  siteName: string;
  channelName: string;
}

const EMPTY_FORM: FormData = {
  sourceType: "book", format: "apa7", authors: "", title: "", year: "", publisher: "",
  url: "", journalName: "", volume: "", issue: "", pages: "", doi: "", accessDate: "",
  siteName: "", channelName: "",
};

function formatCitation(f: FormData): string {
  const auth = f.authors.trim() || "Author";
  const title = f.title.trim() || "Title";
  const year = f.year.trim() || "n.d.";
  const pub = f.publisher.trim();
  const authParts = auth.split(",").map((a) => a.trim());
  const firstAuthor = authParts[0];
  const lastFirst = firstAuthor.includes(" ")
    ? firstAuthor.split(" ").slice(-1)[0] + ", " + firstAuthor.split(" ").slice(0, -1).join(" ")
    : firstAuthor;

  if (f.format === "apa7") {
    if (f.sourceType === "book") {
      return `${lastFirst}${authParts.length > 1 ? ", et al." : ""}. (${year}). *${title}*. ${pub ? pub + "." : ""}${f.doi ? " https://doi.org/" + f.doi : ""}`;
    }
    if (f.sourceType === "journal") {
      return `${lastFirst}${authParts.length > 1 ? ", et al." : ""}. (${year}). ${title}. *${f.journalName || "Journal"}*, ${f.volume ? "*" + f.volume + "*" : ""}${f.issue ? "(" + f.issue + ")" : ""}${f.pages ? ", " + f.pages : ""}.${f.doi ? " https://doi.org/" + f.doi : ""}`;
    }
    if (f.sourceType === "website") {
      return `${lastFirst}${authParts.length > 1 ? ", et al." : ""}. (${year}). *${title}*. ${f.siteName || ""}. ${f.url ? f.url : ""}`;
    }
    if (f.sourceType === "video") {
      return `${f.channelName || auth}. (${year}). *${title}* [Video]. YouTube. ${f.url || ""}`;
    }
  }

  if (f.format === "mla9") {
    if (f.sourceType === "book") {
      return `${lastFirst}${authParts.length > 1 ? ", et al" : ""}. *${title}*. ${pub ? pub + ", " : ""}${year}.`;
    }
    if (f.sourceType === "journal") {
      return `${lastFirst}${authParts.length > 1 ? ", et al" : ""}. "${title}." *${f.journalName || "Journal"}*, vol. ${f.volume || "X"}, no. ${f.issue || "X"}, ${year}, pp. ${f.pages || "X-X"}.${f.doi ? " https://doi.org/" + f.doi : ""}`;
    }
    if (f.sourceType === "website") {
      return `${lastFirst}${authParts.length > 1 ? ", et al" : ""}. "${title}." *${f.siteName || "Site Name"}*, ${year}, ${f.url || ""}.${f.accessDate ? " Accessed " + f.accessDate + "." : ""}`;
    }
    if (f.sourceType === "video") {
      return `"${title}." YouTube, uploaded by ${f.channelName || auth}, ${year}, ${f.url || ""}.`;
    }
  }

  if (f.format === "chicago") {
    if (f.sourceType === "book") {
      return `${lastFirst}${authParts.length > 1 ? ", et al" : ""}. *${title}*. ${pub ? pub + ", " : ""}${year}.`;
    }
    if (f.sourceType === "journal") {
      return `${lastFirst}${authParts.length > 1 ? ", et al" : ""}. "${title}." *${f.journalName || "Journal"}* ${f.volume || ""}${f.issue ? ", no. " + f.issue : ""} (${year}): ${f.pages || ""}.${f.doi ? " https://doi.org/" + f.doi : ""}`;
    }
    if (f.sourceType === "website") {
      return `${lastFirst}${authParts.length > 1 ? ", et al" : ""}. "${title}." ${f.siteName || ""}. ${f.accessDate ? "Accessed " + f.accessDate + ". " : ""}${f.url || ""}.`;
    }
    if (f.sourceType === "video") {
      return `${f.channelName || auth}. "${title}." YouTube video. ${year}. ${f.url || ""}.`;
    }
  }

  if (f.format === "harvard") {
    if (f.sourceType === "book") {
      return `${lastFirst}${authParts.length > 1 ? " et al." : ""} (${year}) *${title}*. ${pub ? pub + "." : ""}`;
    }
    if (f.sourceType === "journal") {
      return `${lastFirst}${authParts.length > 1 ? " et al." : ""} (${year}) '${title}', *${f.journalName || "Journal"}*, ${f.volume || ""}${f.issue ? "(" + f.issue + ")" : ""}, pp. ${f.pages || ""}.${f.doi ? " doi: " + f.doi : ""}`;
    }
    if (f.sourceType === "website") {
      return `${lastFirst}${authParts.length > 1 ? " et al." : ""} (${year}) *${title}*. Available at: ${f.url || ""}${f.accessDate ? " (Accessed: " + f.accessDate + ")" : ""}.`;
    }
    if (f.sourceType === "video") {
      return `${f.channelName || auth} (${year}) *${title}*. Available at: ${f.url || ""}.`;
    }
  }

  return "";
}

const s = {
  page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff" },
  select: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", cursor: "pointer" as const },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  output: { background: "#FAFAF9", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
  citationBox: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 8, padding: 16, fontSize: 15, lineHeight: 1.7, color: "#1C1917", marginBottom: 12 },
};

interface SavedCitation { text: string; id: number }

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [citations, setCitations] = useState<SavedCitation[]>([]);
  const [copied, setCopied] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const update = (key: keyof FormData, value: string) => setForm((p) => ({ ...p, [key]: value }));

  const handleGenerate = () => {
    if (!form.title.trim()) { alert("Please enter a title."); return; }
    const text = formatCitation(form);
    setCitations((prev) => [...prev, { text, id: Date.now() }]);
  };

  const handleCopy = async (text: string, id: number) => {
    try { await navigator.clipboard.writeText(text.replace(/\*/g, "")); setCopied(id); setTimeout(() => setCopied(null), 2000); } catch {}
  };

  const handleCopyAll = async () => {
    const all = citations.map((c) => c.text.replace(/\*/g, "")).join("\n\n");
    try { await navigator.clipboard.writeText(all); setCopiedAll(true); setTimeout(() => setCopiedAll(false), 2000); } catch {}
  };

  const removeCitation = (id: number) => setCitations((prev) => prev.filter((c) => c.id !== id));

  const showJournal = form.sourceType === "journal";
  const showWebsite = form.sourceType === "website";
  const showVideo = form.sourceType === "video";

  return (
    <div style={s.page}>
      <ToolSchema name="Citation Generator" slug="citation-generator" description="Generate formatted citations in APA, MLA, Chicago, Harvard style." category="EducationalApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Citation Generator", url: "https://toolcraftkit.com/tools/citation-generator" }]} />

      <h1 style={s.h1}>{toolUI?.name || "Citation Generator"}</h1>
      <p style={s.sub}>"Generate properly formatted citations in APA, MLA, Chicago, or Harvard style."</p>

      <div style={s.card}>
        <h2 style={s.cardTitle}>Source Details</h2>
        <div style={s.grid2}>
          <div>
            <label style={s.label}>Source Type</label>
            <select style={s.select} value={form.sourceType} onChange={(e) => update("sourceType", e.target.value)}>
              <option value="book">Book</option>
              <option value="journal">Journal Article</option>
              <option value="website">Website</option>
              <option value="video">Video (YouTube)</option>
            </select>
          </div>
          <div>
            <label style={s.label}>Citation Format</label>
            <select style={s.select} value={form.format} onChange={(e) => update("format", e.target.value)}>
              <option value="apa7">APA 7th Edition</option>
              <option value="mla9">MLA 9th Edition</option>
              <option value="chicago">Chicago</option>
              <option value="harvard">Harvard</option>
            </select>
          </div>
        </div>

        <label style={s.label}>Author(s)<span style={s.required}>*</span> <span style={{ fontWeight: 400, color: "#78716C" }}>(comma-separated for multiple)</span></label>
        <input style={s.input} value={form.authors} onChange={(e) => update("authors", e.target.value)} placeholder="John Smith, Jane Doe" />

        <label style={s.label}>Title<span style={s.required}>*</span></label>
        <input style={s.input} value={form.title} onChange={(e) => update("title", e.target.value)} placeholder={form.sourceType === "journal" ? "Article Title" : form.sourceType === "video" ? "Video Title" : "Book Title"} />

        <div style={s.grid2}>
          <div>
            <label style={s.label}>Year</label>
            <input style={s.input} value={form.year} onChange={(e) => update("year", e.target.value)} placeholder="2026" />
          </div>
          <div>
            <label style={s.label}>{showVideo ? "Channel Name" : "Publisher"}</label>
            <input style={s.input} value={showVideo ? form.channelName : form.publisher} onChange={(e) => update(showVideo ? "channelName" : "publisher", e.target.value)} placeholder={showVideo ? "Channel Name" : "Publisher Name"} />
          </div>
        </div>

        {showJournal && (
          <>
            <label style={s.label}>Journal Name</label>
            <input style={s.input} value={form.journalName} onChange={(e) => update("journalName", e.target.value)} placeholder="Nature, Science, etc." />
            <div style={s.grid2}>
              <div>
                <label style={s.label}>Volume</label>
                <input style={s.input} value={form.volume} onChange={(e) => update("volume", e.target.value)} placeholder="42" />
              </div>
              <div>
                <label style={s.label}>Issue</label>
                <input style={s.input} value={form.issue} onChange={(e) => update("issue", e.target.value)} placeholder="3" />
              </div>
            </div>
            <label style={s.label}>Pages</label>
            <input style={s.input} value={form.pages} onChange={(e) => update("pages", e.target.value)} placeholder="123-145" />
          </>
        )}

        {showWebsite && (
          <>
            <label style={s.label}>Website / Site Name</label>
            <input style={s.input} value={form.siteName} onChange={(e) => update("siteName", e.target.value)} placeholder="BBC News, Wikipedia, etc." />
            <label style={s.label}>Access Date</label>
            <input style={s.input} type="date" value={form.accessDate} onChange={(e) => update("accessDate", e.target.value)} />
          </>
        )}

        <label style={s.label}>{form.sourceType === "journal" ? "DOI" : "URL"}</label>
        <input style={s.input} value={form.sourceType === "journal" && !form.url ? form.doi : form.url} onChange={(e) => update(form.sourceType === "journal" ? "doi" : "url", e.target.value)} placeholder={form.sourceType === "journal" ? "10.1000/xyz123" : "https://..."} />

        <button style={s.btn} onClick={handleGenerate}>Add Citation</button>
      </div>

      {citations.length > 0 && (
        <div style={s.output}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ ...s.cardTitle, marginBottom: 0 }}>Your Citations ({citations.length})</h2>
            <button style={s.btnSecondary} onClick={handleCopyAll}>{copiedAll ? "✓ All Copied!" : "Copy All"}</button>
          </div>
          {citations.map((c) => (
            <div key={c.id} style={s.citationBox}>
              <div dangerouslySetInnerHTML={{ __html: c.text.replace(/\*([^*]+)\*/g, "<em>$1</em>") }} />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button style={{ ...s.btnSecondary, fontSize: 12, padding: "6px 12px" }} onClick={() => handleCopy(c.text, c.id)}>{copied === c.id ? "✓ Copied" : "Copy"}</button>
                <button style={{ ...s.btnSecondary, fontSize: 12, padding: "6px 12px", color: "#EF4444" }} onClick={() => removeCitation(c.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <SeoContent />
    </div>
  );
}

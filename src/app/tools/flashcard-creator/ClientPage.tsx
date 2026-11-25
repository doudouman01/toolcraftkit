"use client";
import { useState, useEffect, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "flashcard-creator";

interface Card { id: number; front: string; back: string }

const s = {
  page: { maxWidth: 760, margin: "0 auto", padding: "32px 20px 0" } as const,
  h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4, marginTop: 0 },
  sub: { fontSize: 14, color: "#78716C", marginBottom: 24, marginTop: 8 },
  card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
  cardTitle: { fontSize: 16, fontWeight: 600 as const, color: "#1C1917", marginBottom: 16, marginTop: 0 },
  label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
  input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff" },
  textarea: { width: "100%", minHeight: 80, border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12, color: "#1C1917", background: "#fff", resize: "vertical" as const, lineHeight: 1.6 },
  btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "12px 24px", fontSize: 15, fontWeight: 600 as const, cursor: "pointer" as const, width: "100%" },
  btnSecondary: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600 as const, cursor: "pointer" as const },
  btnSmall: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 600 as const, cursor: "pointer" as const },
  grid2: { display: "grid" as const, gridTemplateColumns: "1fr 1fr", gap: 12 },
  required: { color: "#EF4444", marginLeft: 2 },
  flashcard: {
    width: "100%", minHeight: 220, background: "#fff", border: "2px solid #0D9488", borderRadius: 16,
    display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
    padding: 32, cursor: "pointer" as const, textAlign: "center" as const, transition: "all 0.3s",
    userSelect: "none" as const,
  },
  flashcardBack: {
    width: "100%", minHeight: 220, background: "#F0FDFA", border: "2px solid #0D9488", borderRadius: 16,
    display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const,
    padding: 32, cursor: "pointer" as const, textAlign: "center" as const, transition: "all 0.3s",
    userSelect: "none" as const,
  },
  listItem: {
    background: "#fff", border: "1px solid #E7E5E4", borderRadius: 8, padding: "12px 16px",
    marginBottom: 8, display: "flex" as const, justifyContent: "space-between" as const, alignItems: "center" as const,
  },
};

export default function ClientPage() {
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const { user, isPro } = useAuth();
  const [usage, setUsage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [period, setPeriod] = useState("session");

  const [cards, setCards] = useState<Card[]>([]);
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [mode, setMode] = useState<"create" | "study">("create");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [importText, setImportText] = useState("");
  const [showImport, setShowImport] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetch("/api/usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "check" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.usage !== undefined) setUsage(data.usage);
        if (data.limit !== undefined) setLimit(data.limit);
        if (data.period) setPeriod(data.period);
      })
      .catch(() => {});
  }, [user]);

  const addCard = useCallback(() => {
    if (!front.trim() || !back.trim()) { alert("Please enter both front and back text."); return; }
    if (!isPro && cards.length >= 10) { alert("Free users can create up to 10 cards per session. Upgrade to Pro for unlimited cards."); return; }
    setCards((prev) => [...prev, { id: Date.now(), front: front.trim(), back: back.trim() }]);
    setFront("");
    setBack("");
  }, [front, back, isPro, cards.length]);

  const removeCard = (id: number) => setCards((prev) => prev.filter((c) => c.id !== id));

  const handleImport = () => {
    const lines = importText.split("\n").filter((l) => l.trim());
    const newCards: Card[] = [];
    for (const line of lines) {
      const sep = line.includes(":") ? ":" : line.includes("\t") ? "\t" : null;
      if (!sep) continue;
      const idx = line.indexOf(sep);
      const f = line.slice(0, idx).trim();
      const b = line.slice(idx + 1).trim();
      if (f && b) newCards.push({ id: Date.now() + Math.random(), front: f, back: b });
    }
    if (newCards.length === 0) { alert("No valid cards found. Use format: Term: Definition (one per line)"); return; }
    setCards((prev) => [...prev, ...newCards]);
    setImportText("");
    setShowImport(false);
  };

  const handleExport = () => {
    const text = cards.map((c) => `${c.front}: ${c.back}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "flashcards.txt"; a.click();
    URL.revokeObjectURL(url);
  };

  const shuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setFlipped(false);
  };

  const startStudy = () => { if (cards.length === 0) { alert("Add some cards first!"); return; } setMode("study"); setCurrentIndex(0); setFlipped(false); };

  const navigate = (dir: -1 | 1) => {
    setFlipped(false);
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return cards.length - 1;
      if (next >= cards.length) return 0;
      return next;
    });
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Flashcard Creator" slug="flashcard-creator" description="Create, study, and export flashcards online." category="EducationalApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Flashcard Creator", url: "https://toolcraftkit.com/tools/flashcard-creator" }]} />

      <h1 style={s.h1}>{toolUI?.name || "Flashcard Creator"}</h1>
      <p style={s.sub}>"Create, study, and export flashcards online."</p>

      <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

      {/* Tab buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button style={{ ...s.btnSecondary, ...(mode === "create" ? { background: "#0D9488", color: "#fff", border: "1px solid #0D9488" } : {}) }} onClick={() => setMode("create")}>Create Cards</button>
        <button style={{ ...s.btnSecondary, ...(mode === "study" ? { background: "#0D9488", color: "#fff", border: "1px solid #0D9488" } : {}) }} onClick={startStudy}>Study ({cards.length})</button>
      </div>

      {mode === "create" && (
        <>
          <div style={s.card}>
            <h2 style={s.cardTitle}>Add a Card</h2>
            <label style={s.label}>Front (Question / Term)<span style={s.required}>*</span></label>
            <input style={s.input} value={front} onChange={(e) => setFront(e.target.value)} placeholder="What is photosynthesis?" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCard(); } }} />
            <label style={s.label}>Back (Answer / Definition)<span style={s.required}>*</span></label>
            <input style={s.input} value={back} onChange={(e) => setBack(e.target.value)} placeholder="The process by which plants convert sunlight into energy" onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCard(); } }} />
            <button style={s.btn} onClick={addCard}>Add Card{!isPro ? ` (${cards.length}/10)` : ""}</button>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <button style={s.btnSmall} onClick={() => setShowImport(!showImport)}>{showImport ? "Cancel Import" : "Import from Text"}</button>
            {cards.length > 0 && <button style={s.btnSmall} onClick={handleExport}>Export as Text</button>}
          </div>

          {showImport && (
            <div style={s.card}>
              <h2 style={s.cardTitle}>Import Cards</h2>
              <p style={{ fontSize: 13, color: "#78716C", marginBottom: 12 }}>One card per line. Format: <strong>Term: Definition</strong> or <strong>Term{"\t"}Definition</strong> (tab-separated)</p>
              <textarea style={{ ...s.textarea, minHeight: 120 }} value={importText} onChange={(e) => setImportText(e.target.value)} placeholder={"Photosynthesis: The process plants use to convert sunlight into energy\nMitosis: Cell division producing two identical cells"} />
              <button style={s.btn} onClick={handleImport}>Import Cards</button>
            </div>
          )}

          {cards.length > 0 && (
            <div style={s.card}>
              <h2 style={s.cardTitle}>Your Cards ({cards.length})</h2>
              {cards.map((c) => (
                <div key={c.id} style={s.listItem}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{c.front}</div>
                    <div style={{ fontSize: 13, color: "#78716C", marginTop: 2 }}>{c.back}</div>
                  </div>
                  <button style={{ ...s.btnSmall, color: "#EF4444", fontSize: 12 }} onClick={() => removeCard(c.id)}>✕</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {mode === "study" && cards.length > 0 && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, color: "#78716C" }}>Card {currentIndex + 1} of {cards.length}</span>
            <button style={s.btnSmall} onClick={shuffle}>Shuffle</button>
          </div>

          <div
            style={flipped ? s.flashcardBack : s.flashcard}
            onClick={() => setFlipped(!flipped)}
          >
            <div>
              <div style={{ fontSize: 12, color: "#0D9488", fontWeight: 600, marginBottom: 8 }}>{flipped ? "ANSWER" : "QUESTION"}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: "#1C1917", lineHeight: 1.5 }}>
                {flipped ? cards[currentIndex].back : cards[currentIndex].front}
              </div>
              <div style={{ fontSize: 12, color: "#78716C", marginTop: 12 }}>Click to {flipped ? "see question" : "reveal answer"}</div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16 }}>
            <button style={{ ...s.btnSecondary, padding: "10px 24px" }} onClick={() => navigate(-1)}>← Previous</button>
            <button style={{ ...s.btnSecondary, padding: "10px 24px" }} onClick={() => navigate(1)}>Next →</button>
          </div>
        </div>
      )}

      <SeoContent />
    </div>
  );
}

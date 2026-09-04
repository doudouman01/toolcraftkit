"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

export default function Page() {
  const [mode, setMode] = useState<"range" | "dice" | "list" | "coin">("range");
  const [min, setMin] = useState("1");
  const [max, setMax] = useState("100");
  const [count, setCount] = useState("1");
  const [allowDupes, setAllowDupes] = useState(true);
  const [diceCount, setDiceCount] = useState(2);
  const [diceSides, setDiceSides] = useState(6);
  const [listItems, setListItems] = useState("Alice\nBob\nCharlie\nDiana\nEve");
  const [pickCount, setPickCount] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [coinResult, setCoinResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [animating, setAnimating] = useState(false);

  const generateRange = useCallback(() => {
    const lo = parseInt(min) || 0;
    const hi = parseInt(max) || 100;
    const n = Math.min(parseInt(count) || 1, allowDupes ? 1000 : hi - lo + 1);
    const nums: number[] = [];
    if (allowDupes) {
      for (let i = 0; i < n; i++) nums.push(Math.floor(Math.random() * (hi - lo + 1)) + lo);
    } else {
      const pool = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      nums.push(...pool.slice(0, n));
    }
    setResults(nums.map(String));
    setAnimating(true); setTimeout(() => setAnimating(false), 300);
  }, [min, max, count, allowDupes]);

  const rollDice = useCallback(() => {
    const rolls = Array.from({ length: diceCount }, () => Math.floor(Math.random() * diceSides) + 1);
    setResults(rolls.map(String));
    setAnimating(true); setTimeout(() => setAnimating(false), 300);
  }, [diceCount, diceSides]);

  const pickFromList = useCallback(() => {
    const items = listItems.split("\n").map((s) => s.trim()).filter(Boolean);
    if (items.length === 0) return;
    const n = Math.min(pickCount, items.length);
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setResults(shuffled.slice(0, n));
    setAnimating(true); setTimeout(() => setAnimating(false), 300);
  }, [listItems, pickCount]);

  const flipCoin = useCallback(() => {
    const r = Math.random() < 0.5 ? "Heads" : "Tails";
    setCoinResult(r);
    setAnimating(true); setTimeout(() => setAnimating(false), 300);
  }, []);

  const copy = () => { navigator.clipboard.writeText(results.join(", ")); setCopied(true); setTimeout(() => setCopied(false), 1500); };

  const diceSum = results.reduce((s, v) => s + (+v || 0), 0);

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    row: { display: "flex" as const, alignItems: "center" as const, gap: 8, marginBottom: 14, flexWrap: "wrap" as const },
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    ta: { width: "100%", minHeight: 100, border: "1px solid #E7E5E4", borderRadius: 8, padding: 12, fontSize: 14, resize: "vertical" as const, outline: "none", lineHeight: 1.6 } as const,
    check: { display: "flex" as const, alignItems: "center" as const, gap: 6, cursor: "pointer", fontSize: 13, color: "#1C1917" } as const,
    resultBox: { textAlign: "center" as const, padding: 24, background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, marginTop: 16 },
    resultNum: { fontSize: 48, fontWeight: 700, color: "#0D9488", fontFamily: "'Courier New', monospace" } as const,
  };

  const modes = [
    { key: "range", label: "Number Range" },
    { key: "dice", label: "Dice Roller" },
    { key: "list", label: "Pick from List" },
    { key: "coin", label: "Coin Flip" },
  ] as const;

  return (
    <div style={s.page}>
      <ToolSchema
        name="Random Number Generator"
        description="Random numbers, dice roller, list picker, and coin flip. Four modes for any use."
        slug="random-number-generator"
        category="UtilitiesApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Developer Tools", url: "https://toolcraftkit.com/#developer-tools" },
          { name: "Random Number Generator", url: "https://toolcraftkit.com/tools/random-number-generator" },
        ]}
      />
      <h1 style={s.h1}>Random Number Generator</h1>
      <p style={s.sub}>Generate random numbers, roll dice, pick from a list, or flip a coin.</p>

      <div style={s.card}>
        <div style={s.row}>
          {modes.map((m) => (
            <button key={m.key} onClick={() => { setMode(m.key); setResults([]); }} style={{ ...s.btnSm, background: mode === m.key ? "#0D9488" : "#F5F5F4", color: mode === m.key ? "#fff" : "#1C1917", border: mode === m.key ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{m.label}</button>
          ))}
        </div>

        {mode === "range" && (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1 }}><label style={s.label}>Min</label><input type="number" value={min} onChange={(e) => setMin(e.target.value)} style={{ ...s.input, width: "100%" }} /></div>
              <div style={{ flex: 1 }}><label style={s.label}>Max</label><input type="number" value={max} onChange={(e) => setMax(e.target.value)} style={{ ...s.input, width: "100%" }} /></div>
              <div style={{ flex: 1 }}><label style={s.label}>Count</label><input type="number" value={count} onChange={(e) => setCount(e.target.value)} min="1" max="1000" style={{ ...s.input, width: "100%" }} /></div>
            </div>
            <label style={s.check}><input type="checkbox" checked={allowDupes} onChange={() => setAllowDupes(!allowDupes)} style={{ accentColor: "#0D9488" }} />Allow duplicates</label>
            <button onClick={generateRange} style={{ ...s.btn, marginTop: 12 }}>Generate</button>
          </>
        )}

        {mode === "dice" && (
          <>
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1 }}><label style={s.label}>Number of Dice</label>
                <div style={{ display: "flex", gap: 4 }}>{[1, 2, 3, 4, 5, 6].map((n) => (<button key={n} onClick={() => setDiceCount(n)} style={{ ...s.btnSm, background: diceCount === n ? "#0D9488" : "#F5F5F4", color: diceCount === n ? "#fff" : "#1C1917" }}>{n}</button>))}</div>
              </div>
              <div style={{ flex: 1 }}><label style={s.label}>Sides</label>
                <div style={{ display: "flex", gap: 4 }}>{[4, 6, 8, 10, 12, 20].map((n) => (<button key={n} onClick={() => setDiceSides(n)} style={{ ...s.btnSm, background: diceSides === n ? "#6366F1" : "#F5F5F4", color: diceSides === n ? "#fff" : "#1C1917" }}>d{n}</button>))}</div>
              </div>
            </div>
            <button onClick={rollDice} style={s.btn}>Roll {diceCount}d{diceSides}</button>
          </>
        )}

        {mode === "list" && (
          <>
            <label style={s.label}>Items (one per line)</label>
            <textarea value={listItems} onChange={(e) => setListItems(e.target.value)} style={s.ta} />
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 10 }}>
              <label style={s.label}>Pick</label>
              <input type="number" value={pickCount} onChange={(e) => setPickCount(+e.target.value || 1)} min="1" style={{ ...s.input, width: 60 }} />
              <button onClick={pickFromList} style={s.btn}>Pick Random</button>
            </div>
          </>
        )}

        {mode === "coin" && (
          <button onClick={flipCoin} style={s.btn}>Flip Coin</button>
        )}

        {results.length > 0 && mode !== "coin" && (
          <div style={{ ...s.resultBox, transition: "transform 0.3s", transform: animating ? "scale(1.02)" : "scale(1)" }}>
            {mode === "dice" ? (
              <>
                <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                  {results.map((r, i) => (
                    <div key={i} style={{ width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", borderRadius: 10, border: "2px solid #0D9488", fontSize: 24, fontWeight: 700, color: "#0D9488" }}>{r}</div>
                  ))}
                </div>
                {results.length > 1 && <div style={{ marginTop: 12, fontSize: 16, fontWeight: 600, color: "#1C1917" }}>Total: {diceSum}</div>}
              </>
            ) : results.length === 1 ? (
              <div style={s.resultNum}>{results[0]}</div>
            ) : (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
                {results.map((r, i) => (
                  <span key={i} style={{ background: "#fff", borderRadius: 6, padding: "6px 12px", fontSize: 16, fontWeight: 600, color: "#0D9488", border: "1px solid #99F6E4" }}>{r}</span>
                ))}
              </div>
            )}
            <button onClick={copy} style={{ ...s.btnSm, marginTop: 12 }}>{copied ? "Copied!" : "Copy Results"}</button>
          </div>
        )}

        {mode === "coin" && coinResult && (
          <div style={{ ...s.resultBox, transition: "transform 0.3s", transform: animating ? "scale(1.05)" : "scale(1)" }}>
            <div style={{ fontSize: 64 }}>{coinResult === "Heads" ? "🪙" : "🪙"}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#0D9488", marginTop: 8 }}>{coinResult}</div>
          </div>
        )}
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Generate random numbers within any range, roll polyhedral dice (d4, d6, d8, d10, d12, d20), randomly pick names or items from a list, or flip a virtual coin. Perfect for games, classroom activities, decision-making, raffles, and more.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Uses your browser&apos;s built-in random number generator. Everything runs locally — no data is stored or sent anywhere.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "Are the numbers truly random?", a: "The tool uses Math.random(), which provides pseudo-random numbers suitable for games, sampling, and everyday use. For cryptographic purposes, use a dedicated secure random generator." },
          { q: "Can I generate numbers without duplicates?", a: "Yes. Uncheck 'Allow duplicates' in Number Range mode. The tool will generate unique numbers from your range (up to the range size)." },
          { q: "What dice types are supported?", a: "All standard polyhedral dice: d4, d6, d8, d10, d12, and d20. You can roll 1-6 dice at once. The total sum is shown when rolling multiple dice." },
          { q: "How does the list picker work?", a: "Enter items one per line, set how many to pick, and click 'Pick Random.' The tool shuffles the list and picks the top N items. Great for raffle draws, random team assignments, or choosing what to eat." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 3 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

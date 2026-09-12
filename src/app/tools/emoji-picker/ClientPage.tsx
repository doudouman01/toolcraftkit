"use client";
import { useState, useMemo } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

const CATEGORIES: Record<string, string[]> = {
  "Smileys": ["😀","😃","😄","😁","😆","😅","🤣","😂","🙂","🙃","😉","😊","😇","🥰","😍","🤩","😘","😗","😚","😙","🥲","😋","😛","😜","🤪","😝","🤑","🤗","🤭","🤫","🤔","🫡","🤐","🤨","😐","😑","😶","🫥","😏","😒","🙄","😬","🤥","😌","😔","😪","🤤","😴","😷","🤒","🤕","🤢","🤮","🥵","🥶","🥴","😵","🤯","🤠","🥳","🥸","😎","🤓","🧐","😕","🫤","😟","🙁","😮","😯","😲","😳","🥺","🥹","😦","😧","😨","😰","😥","😢","😭","😱","😖","😣","😞","😓","😩","😫","🥱","😤","😡","😠","🤬","😈","👿","💀","☠️","💩","🤡","👹","👺","👻","👽","👾","🤖"],
  "Gestures": ["👋","🤚","🖐️","✋","🖖","🫱","🫲","🫳","🫴","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","🫵","👍","👎","✊","👊","🤛","🤜","👏","🙌","🫶","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦿","🦵","🦶","👂","🦻","👃","🧠","🫀","🫁","🦷","🦴","👀","👁️","👅","👄"],
  "People": ["👶","🧒","👦","👧","🧑","👱","👨","🧔","👩","🧓","👴","👵","🙍","🙎","🙅","🙆","💁","🙋","🧏","🙇","🤦","🤷","👮","🕵️","💂","🥷","👷","🫅","🤴","👸","👳","👲","🧕","🤵","👰","🤰","🫃","🤱","👼","🎅","🤶","🦸","🦹","🧙","🧚","🧛","🧜","🧝","🧞","🧟","🧌","💆","💇","🚶","🧍","🧎","🏃","💃","🕺","👯","🧖","🧗","🤸","⛹️","🏋️","🚴","🚵","🤼","🤽","🤾","🤺","⛷️","🏂","🏄","🚣","🏊","🧘"],
  "Animals": ["🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐻‍❄️","🐨","🐯","🦁","🐮","🐷","🐸","🐵","🙈","🙉","🙊","🐒","🐔","🐧","🐦","🐤","🐣","🐥","🦆","🦅","🦉","🦇","🐺","🐗","🐴","🦄","🐝","🪱","🐛","🦋","🐌","🐞","🐜","🪰","🪲","🪳","🦟","🦗","🕷️","🦂","🐢","🐍","🦎","🦖","🦕","🐙","🦑","🦐","🦞","🦀","🐡","🐠","🐟","🐬","🐳","🐋","🦈","🐊","🐅","🐆","🦓","🦍","🦧","🐘","🦛","🦏","🐪","🐫","🦒","🦘","🦬","🐃","🐂","🐄","🐎","🐖","🐏","🐑","🦙","🐐","🦌","🐕","🐩","🦮","🐕‍🦺","🐈","🐈‍⬛","🪶","🐓","🦃","🦤","🦚","🦜","🦢","🦩","🕊️","🐇","🦝","🦨","🦡","🦫","🦦","🦥","🐁","🐀","🐿️","🦔"],
  "Food": ["🍏","🍎","🍐","🍊","🍋","🍌","🍉","🍇","🍓","🫐","🍈","🍒","🍑","🥭","🍍","🥥","🥝","🍅","🍆","🥑","🥦","🥬","🥒","🌶️","🫑","🌽","🥕","🫒","🧄","🧅","🥔","🍠","🫘","🥐","🍞","🥖","🥨","🧀","🥚","🍳","🧈","🥞","🧇","🥓","🥩","🍗","🍖","🦴","🌭","🍔","🍟","🍕","🫓","🥪","🥙","🧆","🌮","🌯","🫔","🥗","🥘","🫕","🥫","🍝","🍜","🍲","🍛","🍣","🍱","🥟","🦪","🍤","🍙","🍚","🍘","🍥","🥠","🥮","🍢","🍡","🍧","🍨","🍦","🥧","🧁","🍰","🎂","🍮","🍭","🍬","🍫","🍿","🍩","🍪","🌰","🥜","🍯","🥛","🍼","🫖","☕","🍵","🧃","🥤","🧋","🍶","🍺","🍻","🥂","🍷","🥃","🍸","🍹","🧉","🍾","🧊"],
  "Travel": ["🚗","🚕","🚙","🚌","🚎","🏎️","🚓","🚑","🚒","🚐","🛻","🚚","🚛","🚜","🏍️","🛵","🚲","🛴","🛹","🛼","🚏","🛣️","🛤️","⛽","🛞","🚨","🚥","🚦","🛑","🚧","⚓","🛟","⛵","🛶","🚤","🛳️","⛴️","🛥️","🚢","✈️","🛩️","🛫","🛬","🪂","💺","🚁","🚟","🚠","🚡","🛰️","🚀","🛸","🌍","🌎","🌏","🗺️","🧭","🏔️","⛰️","🌋","🗻","🏕️","🏖️","🏜️","🏝️","🏞️","🏟️","🏛️","🏗️","🧱","🪨","🪵","🛖","🏘️","🏚️","🏠","🏡","🏢","🏣","🏤","🏥","🏦","🏨","🏩","🏪","🏫","🏬","🏭","🏯","🏰","💒","🗼","🗽","⛪","🕌","🛕","🕍","⛩️","🕋"],
  "Objects": ["⌚","📱","📲","💻","⌨️","🖥️","🖨️","🖱️","🖲️","💽","💾","💿","📀","🧮","🎥","🎞️","📽️","📺","📷","📸","📹","📼","🔍","🔎","🕯️","💡","🔦","🏮","🪔","📔","📕","📖","📗","📘","📙","📚","📓","📒","📃","📜","📄","📰","📑","🔖","🏷️","💰","🪙","💴","💵","💶","💷","💸","💳","🧾","💹","✉️","📧","📨","📩","📤","📥","📦","📫","📪","📬","📭","📮","🗳️","✏️","✒️","🖊️","🖋️","📝","💼","📁","📂","🗂️","📅","📆","🗒️","🗓️","📇","📈","📉","📊","📋","📌","📍","📎","🖇️","📏","📐","✂️","🗃️","🗄️","🗑️","🔒","🔓","🔏","🔐","🔑","🗝️"],
  "Symbols": ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☪️","🕉️","☸️","✡️","🔯","🕎","☯️","☦️","🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","🆔","⚛️","🉑","☢️","☣️","📴","📳","🈶","🈚","🈸","🈺","🈷️","✴️","🆚","💮","🉐","㊙️","㊗️","🈴","🈵","🈹","🈲","🅰️","🅱️","🆎","🆑","🅾️","🆘","❌","⭕","🛑","⛔","📛","🚫","💯","💢","♨️","🚷","🚯","🚳","🚱","🔞","📵","🚭","❗","❕","❓","❔","‼️","⁉️","🔅","🔆","〽️","⚠️","🚸","🔱","⚜️","🔰","♻️","✅","🈯","💹","❇️","✳️","❎","🌐","💠","Ⓜ️","🌀","💤","🏧","🚾","♿","🅿️","🛗","🈳","🈂️","🛂","🛃","🛄","🛅"],
  "Flags": ["🏁","🚩","🎌","🏴","🏳️","🏳️‍🌈","🏳️‍⚧️","🏴‍☠️","🇺🇸","🇬🇧","🇫🇷","🇩🇪","🇪🇸","🇮🇹","🇯🇵","🇰🇷","🇨🇳","🇧🇷","🇨🇦","🇦🇺","🇮🇳","🇲🇽","🇷🇺","🇿🇦","🇳🇬","🇪🇬","🇦🇷","🇨🇴","🇵🇪","🇨🇱","🇻🇪","🇺🇾","🇪🇨","🇵🇦","🇨🇷","🇬🇹","🇭🇳","🇸🇻","🇳🇮","🇨🇺","🇩🇴","🇵🇷","🇭🇹","🇯🇲","🇹🇹","🇧🇧","🇧🇸","🇧🇿","🇬🇾","🇸🇷","🇵🇹","🇳🇱","🇧🇪","🇨🇭","🇦🇹","🇮🇪","🇬🇷","🇹🇷","🇵🇱","🇨🇿","🇸🇰","🇭🇺","🇷🇴","🇧🇬","🇭🇷","🇷🇸","🇺🇦","🇸🇪","🇳🇴","🇩🇰","🇫🇮","🇮🇸","🇱🇺","🇱🇮","🇲🇨","🇲🇹","🇨🇾","🇮🇱","🇱🇧","🇦🇪","🇸🇦","🇶🇦","🇰🇼","🇧🇭","🇴🇲","🇾🇪","🇮🇶","🇮🇷","🇦🇫","🇵🇰","🇧🇩","🇱🇰","🇳🇵","🇲🇲","🇹🇭","🇻🇳","🇰🇭","🇱🇦","🇲🇾","🇸🇬","🇮🇩","🇵🇭","🇹🇼","🇭🇰","🇲🇴"],
};

export default function ClientPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Smileys");
  const [copied, setCopied] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  const allEmojis = useMemo(() => Object.values(CATEGORIES).flat(), []);

  const filtered = useMemo(() => {
    if (!search.trim()) return CATEGORIES[activeCategory] || [];
    const q = search.toLowerCase();
    return allEmojis.filter(() => true); // show all on search since we can't filter by name without a map
  }, [search, activeCategory, allEmojis]);

  const copy = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setRecent((prev) => [emoji, ...prev.filter((e) => e !== emoji)].slice(0, 20));
    setTimeout(() => setCopied(""), 1000);
  };

  const s = {
    page: { maxWidth: 800, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const, marginBottom: 12 } as const,
    tabs: { display: "flex", gap: 6, flexWrap: "wrap" as const, marginBottom: 16 } as const,
    tab: { padding: "6px 14px", borderRadius: 6, border: "1px solid #E7E5E4", background: "#F5F5F4", fontSize: 13, cursor: "pointer" } as const,
    tabActive: { padding: "6px 14px", borderRadius: 6, border: "1px solid #0D9488", background: "#0D9488", color: "#fff", fontSize: 13, cursor: "pointer" } as const,
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(44px, 1fr))", gap: 4 } as const,
    emoji: { fontSize: 28, padding: 6, borderRadius: 8, border: "1px solid transparent", cursor: "pointer", textAlign: "center" as const, transition: "all 0.15s" } as const,
    toast: { position: "fixed" as const, bottom: 24, right: 24, background: "#0D9488", color: "#fff", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 600, zIndex: 999 } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Emoji Picker" description="Copy and paste emojis. Browse by category or search. Click to copy to clipboard instantly." slug="emoji-picker" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Text Tools", url: "https://toolcraftkit.com/#text-tools" }, { name: "Emoji Picker", url: "https://toolcraftkit.com/tools/emoji-picker" }]} />
      <h1 style={s.h1}>Emoji Picker</h1>
      <p style={s.sub}>Click any emoji to copy it to your clipboard. Browse by category or search.</p>

      <div style={s.card}>
        <input type="text" placeholder="Search emojis..." value={search} onChange={(e) => setSearch(e.target.value)} style={s.input} />
        <div style={s.tabs}>
          {Object.keys(CATEGORIES).map((cat) => (
            <button key={cat} onClick={() => { setActiveCategory(cat); setSearch(""); }} style={activeCategory === cat && !search ? s.tabActive : s.tab}>{cat}</button>
          ))}
        </div>
        <div style={s.grid}>
          {(search ? allEmojis : CATEGORIES[activeCategory] || []).map((e, i) => (
            <div key={i} onClick={() => copy(e)} style={{ ...s.emoji, background: copied === e ? "#f0fdfa" : "transparent", border: copied === e ? "1px solid #0D9488" : "1px solid transparent" }}>{e}</div>
          ))}
        </div>
      </div>

      {recent.length > 0 && (
        <div style={s.card}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 10 }}>Recently Copied</div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {recent.map((e, i) => (
              <div key={i} onClick={() => copy(e)} style={{ fontSize: 28, cursor: "pointer", padding: 4 }}>{e}</div>
            ))}
          </div>
        </div>
      )}

      {copied && <div style={s.toast}>Copied {copied}</div>}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Browse and copy emojis instantly. Click any emoji to copy it to your clipboard — then paste it anywhere: social media, emails, documents, or chat. No app needed, works on any device.</p>
      </div>
    </div>
  );
}

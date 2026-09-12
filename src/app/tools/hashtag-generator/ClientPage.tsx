"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

const HASHTAG_DB: Record<string, string[]> = {
  business: ["#entrepreneur","#startup","#business","#marketing","#branding","#smallbusiness","#hustle","#motivation","#success","#leadership","#ceo","#money","#invest","#growthmindset","#networking","#sales","#ecommerce","#sidehustle","#freelancer","#digitalnomad","#workfromhome","#passive income","#businessowner","#founder","#innovation","#strategy","#productivity","#goals","#mindset","#wealth"],
  fitness: ["#fitness","#gym","#workout","#fitnessmotivation","#fit","#bodybuilding","#training","#health","#motivation","#lifestyle","#muscle","#fitfam","#exercise","#healthylifestyle","#strong","#personaltrainer","#cardio","#crossfit","#yoga","#running","#gains","#weightloss","#nutrition","#gymlife","#abs","#protein","#legday","#benchpress","#deadlift","#squats"],
  food: ["#food","#foodie","#instafood","#foodporn","#yummy","#delicious","#cooking","#recipe","#homemade","#foodphotography","#foodstagram","#dinner","#lunch","#breakfast","#chef","#healthyfood","#vegan","#baking","#restaurant","#foodblogger","#organic","#mealprep","#tasty","#eat","#foodlover","#dessert","#brunch","#glutenfree","#plantbased","#comfortfood"],
  travel: ["#travel","#travelgram","#instatravel","#wanderlust","#vacation","#travelphotography","#adventure","#explore","#trip","#traveling","#tourism","#holiday","#nature","#travelblogger","#traveltheworld","#roadtrip","#beach","#sunset","#landscape","#backpacking","#solotravel","#digitalnomad","#paradise","#bucketlist","#getaway","#luxurytravel","#camping","#mountains","#citybreak","#worldtravel"],
  photography: ["#photography","#photo","#photooftheday","#photographer","#instagood","#picoftheday","#photoshoot","#camera","#portrait","#art","#nature","#canon","#nikon","#landscape","#streetphotography","#travel","#sony","#instagram","#sunset","#beautiful","#fashion","#wildlife","#macro","#blackandwhite","#architecture","#film","#drone","#golden hour","#lightroom","#composition"],
  technology: ["#tech","#technology","#programming","#coding","#developer","#software","#ai","#machinelearning","#data","#python","#javascript","#webdev","#startup","#innovation","#cloud","#cybersecurity","#blockchain","#iot","#devops","#frontend","#backend","#react","#nodejs","#linux","#github","#opensource","#saas","#artificialintelligence","#deeplearning","#automation"],
  fashion: ["#fashion","#style","#ootd","#fashionblogger","#outfit","#fashionista","#streetstyle","#beauty","#model","#shopping","#trendy","#instafashion","#dress","#shoes","#accessories","#designer","#lookbook","#vintage","#luxury","#mensfashion","#womensfashion","#sustainable","#handmade","#jewelry","#makeup","#aesthetic","#chic","#couture","#runway","#wardrobe"],
  music: ["#music","#musician","#singer","#song","#hiphop","#rap","#rock","#pop","#guitar","#beats","#dj","#producer","#newmusic","#artist","#concert","#live","#spotify","#soundcloud","#piano","#vocals","#studio","#band","#indie","#electronic","#jazz","#country","#reggae","#songwriter","#mixtape","#vinyl"],
};

export default function ClientPage() {
  const [input, setInput] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [results, setResults] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!input.trim()) return;
    const words = input.toLowerCase().split(/[\s,]+/).filter(Boolean);
    const tags = new Set<string>();
    words.forEach((w) => {
      tags.add("#" + w.replace(/[^a-z0-9]/g, ""));
      Object.entries(HASHTAG_DB).forEach(([, hashes]) => {
        hashes.forEach((h) => { if (h.includes(w)) tags.add(h); });
      });
    });
    const limit = platform === "twitter" ? 5 : platform === "tiktok" ? 8 : 30;
    setResults(Array.from(tags).slice(0, limit));
  };

  const copyAll = () => {
    navigator.clipboard.writeText(results.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" as const } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    tag: { display: "inline-block", background: "#f0fdfa", color: "#0D9488", border: "1px solid #99f6e4", borderRadius: 6, padding: "6px 12px", fontSize: 13, margin: 3, cursor: "pointer" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema name="Hashtag Generator" description="Generate trending hashtags for Instagram, TikTok, Twitter, and YouTube. Free hashtag research tool." slug="hashtag-generator" category="UtilitiesApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Social Media Tools", url: "https://toolcraftkit.com/#social-tools" }, { name: "Hashtag Generator", url: "https://toolcraftkit.com/tools/hashtag-generator" }]} />
      <h1 style={s.h1}>Hashtag Generator</h1>
      <p style={s.sub}>Generate relevant hashtags for your posts. Enter a topic and get hashtags optimized for your platform.</p>

      <div style={s.card}>
        <label style={s.label}>Your Topic or Keywords</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="e.g. fitness, healthy food, workout..." style={{ ...s.input, marginBottom: 12 }} onKeyDown={(e) => e.key === "Enter" && generate()} />
        <label style={s.label}>Platform</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {[{ k: "instagram", l: "Instagram (30)" }, { k: "tiktok", l: "TikTok (8)" }, { k: "twitter", l: "X / Twitter (5)" }, { k: "youtube", l: "YouTube (15)" }].map((p) => (
            <button key={p.k} onClick={() => setPlatform(p.k)} style={{ ...s.btnSm, background: platform === p.k ? "#0D9488" : "#F5F5F4", color: platform === p.k ? "#fff" : "#1C1917", border: platform === p.k ? "1px solid #0D9488" : "1px solid #E7E5E4" }}>{p.l}</button>
          ))}
        </div>
        <button onClick={generate} style={s.btn}>Generate Hashtags</button>
      </div>

      {results.length > 0 && (
        <div style={s.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1C1917" }}>{results.length} hashtags</span>
            <button onClick={copyAll} style={s.btn}>{copied ? "Copied!" : "Copy All"}</button>
          </div>
          <div>{results.map((t, i) => <span key={i} style={s.tag} onClick={() => { navigator.clipboard.writeText(t); }}>{t}</span>)}</div>
        </div>
      )}

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Get the best hashtags for your social media posts. Enter your topic, choose your platform, and get relevant hashtags tailored to Instagram, TikTok, Twitter, or YouTube. Click any hashtag to copy it individually, or copy them all at once.</p>
      </div>
    </div>
  );
}

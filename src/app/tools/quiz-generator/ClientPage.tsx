"use client";
import { useState, useCallback } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import { useAuth } from "@/context/AuthContext";
import UsageBanner from "@/components/UsageBanner";
import SeoContent from "./SeoContent";
import { useToolUI } from "@/app/components/ToolUIProvider";
import { useTranslation } from "@/lib/i18n/useTranslation";

const TOOL_SLUG = "quiz-generator";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  type: "mc" | "tf";
}

/* ─── QUESTION TEMPLATES ─── */
const TEMPLATES: Record<string, { mc: { q: string; opts: string[]; ci: number }[]; tf: { q: string; answer: boolean }[] }> = {
  science: {
    mc: [
      { q: "What is the chemical symbol for water?", opts: ["H2O", "CO2", "NaCl", "O2"], ci: 0 },
      { q: "Which planet is known as the Red Planet?", opts: ["Venus", "Mars", "Jupiter", "Saturn"], ci: 1 },
      { q: "What gas do plants absorb from the atmosphere?", opts: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Helium"], ci: 2 },
      { q: "How many bones are in the adult human body?", opts: ["186", "206", "226", "256"], ci: 1 },
      { q: "What is the speed of light in km/s?", opts: ["150,000", "200,000", "300,000", "400,000"], ci: 2 },
      { q: "What is the smallest unit of matter?", opts: ["Molecule", "Cell", "Atom", "Electron"], ci: 2 },
      { q: "Which element has the atomic number 1?", opts: ["Helium", "Oxygen", "Carbon", "Hydrogen"], ci: 3 },
      { q: "What force keeps planets in orbit?", opts: ["Magnetism", "Gravity", "Friction", "Inertia"], ci: 1 },
      { q: "What organ pumps blood in the human body?", opts: ["Lungs", "Brain", "Liver", "Heart"], ci: 3 },
      { q: "What is the pH of pure water?", opts: ["5", "7", "9", "10"], ci: 1 },
      { q: "Which vitamin is produced by sunlight?", opts: ["A", "B12", "C", "D"], ci: 3 },
      { q: "What is the hardest natural substance?", opts: ["Gold", "Iron", "Diamond", "Quartz"], ci: 2 },
      { q: "How many chromosomes do humans have?", opts: ["23", "44", "46", "48"], ci: 2 },
      { q: "What is the largest organ in the human body?", opts: ["Liver", "Brain", "Skin", "Heart"], ci: 2 },
      { q: "What type of rock is formed by volcanic activity?", opts: ["Sedimentary", "Metamorphic", "Igneous", "Mineral"], ci: 2 },
      { q: "What is the main gas in Earth's atmosphere?", opts: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"], ci: 2 },
      { q: "What particle has a positive charge?", opts: ["Electron", "Neutron", "Proton", "Photon"], ci: 2 },
      { q: "Which planet has the most moons?", opts: ["Jupiter", "Saturn", "Uranus", "Neptune"], ci: 1 },
      { q: "What is the boiling point of water in Celsius?", opts: ["90°C", "100°C", "110°C", "120°C"], ci: 1 },
      { q: "What is DNA short for?", opts: ["Deoxyribose Nucleic Acid", "Deoxyribonucleic Acid", "Dinucleotide Acid", "Dinitrogen Acid"], ci: 1 },
    ],
    tf: [
      { q: "The Sun is a star.", answer: true },
      { q: "Humans use 100% of their brain.", answer: false },
      { q: "Sound travels faster than light.", answer: false },
      { q: "Water is made of hydrogen and oxygen.", answer: true },
      { q: "Diamonds are made of carbon.", answer: true },
      { q: "Lightning never strikes the same place twice.", answer: false },
      { q: "Antibiotics kill viruses.", answer: false },
      { q: "The Great Wall of China is visible from space.", answer: false },
      { q: "Octopuses have three hearts.", answer: true },
      { q: "Gold is the most conductive metal.", answer: false },
      { q: "Venus is the hottest planet in the solar system.", answer: true },
      { q: "Red blood cells carry oxygen.", answer: true },
      { q: "Sharks are mammals.", answer: false },
      { q: "The Sahara is the largest desert on Earth.", answer: false },
      { q: "Bananas are berries.", answer: true },
      { q: "Mars has a thicker atmosphere than Earth.", answer: false },
      { q: "Photosynthesis produces oxygen.", answer: true },
      { q: "The Pacific Ocean is the largest ocean.", answer: true },
      { q: "Bats are blind.", answer: false },
      { q: "Pluto is classified as a dwarf planet.", answer: true },
    ],
  },
  history: {
    mc: [
      { q: "In which year did World War II end?", opts: ["1943", "1944", "1945", "1946"], ci: 2 },
      { q: "Who was the first President of the United States?", opts: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"], ci: 2 },
      { q: "Which empire built the Colosseum?", opts: ["Greek", "Roman", "Ottoman", "Byzantine"], ci: 1 },
      { q: "What year did the Berlin Wall fall?", opts: ["1987", "1989", "1991", "1993"], ci: 1 },
      { q: "Who discovered America in 1492?", opts: ["Vasco da Gama", "Ferdinand Magellan", "Christopher Columbus", "Amerigo Vespucci"], ci: 2 },
      { q: "The French Revolution began in which year?", opts: ["1776", "1789", "1799", "1804"], ci: 1 },
      { q: "Who was the first man on the Moon?", opts: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "John Glenn"], ci: 2 },
      { q: "Which country was not part of the Allied Powers in WWII?", opts: ["USA", "UK", "Italy", "USSR"], ci: 2 },
      { q: "The Renaissance began in which country?", opts: ["France", "England", "Italy", "Spain"], ci: 2 },
      { q: "Who wrote the Declaration of Independence?", opts: ["George Washington", "Thomas Jefferson", "John Adams", "Benjamin Franklin"], ci: 1 },
      { q: "What was the longest war in US history?", opts: ["Civil War", "Vietnam War", "War in Afghanistan", "War of 1812"], ci: 2 },
      { q: "Which ancient civilization built the pyramids?", opts: ["Roman", "Greek", "Egyptian", "Mesopotamian"], ci: 2 },
      { q: "Who painted the ceiling of the Sistine Chapel?", opts: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Donatello"], ci: 2 },
      { q: "In what year did the Titanic sink?", opts: ["1910", "1912", "1914", "1916"], ci: 1 },
      { q: "Which empire was ruled by Genghis Khan?", opts: ["Ottoman", "Roman", "Mongol", "Persian"], ci: 2 },
      { q: "What was the Cold War primarily between?", opts: ["USA and China", "USA and USSR", "UK and Germany", "France and Russia"], ci: 1 },
      { q: "Who invented the printing press?", opts: ["Thomas Edison", "Johannes Gutenberg", "Nikola Tesla", "Alexander Bell"], ci: 1 },
      { q: "The Industrial Revolution started in which country?", opts: ["France", "Germany", "England", "USA"], ci: 2 },
      { q: "What year did the Roman Empire fall?", opts: ["376 AD", "410 AD", "476 AD", "500 AD"], ci: 2 },
      { q: "Who was known as the Iron Lady?", opts: ["Angela Merkel", "Margaret Thatcher", "Indira Gandhi", "Golda Meir"], ci: 1 },
    ],
    tf: [
      { q: "The Great Fire of London was in 1666.", answer: true },
      { q: "Napoleon was born in France.", answer: false },
      { q: "The Cold War involved direct military combat.", answer: false },
      { q: "Cleopatra was Greek by heritage.", answer: true },
      { q: "The first Olympic Games were held in Rome.", answer: false },
      { q: "The Magna Carta was signed in 1215.", answer: true },
      { q: "Alexander the Great was from Sparta.", answer: false },
      { q: "The USSR was dissolved in 1991.", answer: true },
      { q: "Vikings wore horned helmets.", answer: false },
      { q: "The Mona Lisa was stolen from the Louvre in 1911.", answer: true },
      { q: "Queen Victoria ruled for over 60 years.", answer: true },
      { q: "The first computer was built in the 1800s.", answer: true },
      { q: "The Hundred Years' War lasted exactly 100 years.", answer: false },
      { q: "Gandhi led India's independence movement.", answer: true },
      { q: "The Panama Canal connects the Atlantic and Pacific.", answer: true },
      { q: "Ancient Romans used lead pipes for plumbing.", answer: true },
      { q: "The telephone was invented in the 20th century.", answer: false },
      { q: "Columbus believed he had reached India.", answer: true },
      { q: "The Aztec Empire was in South America.", answer: false },
      { q: "Paper was invented in China.", answer: true },
    ],
  },
  technology: {
    mc: [
      { q: "What does CPU stand for?", opts: ["Central Processing Unit", "Central Program Utility", "Computer Personal Unit", "Central Power Unit"], ci: 0 },
      { q: "Who founded Apple Inc.?", opts: ["Bill Gates", "Steve Jobs", "Elon Musk", "Jeff Bezos"], ci: 1 },
      { q: "What programming language is used for web styling?", opts: ["HTML", "JavaScript", "CSS", "Python"], ci: 2 },
      { q: "What does HTML stand for?", opts: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "HyperText Making Language"], ci: 0 },
      { q: "Which company developed the Android OS?", opts: ["Apple", "Microsoft", "Google", "Samsung"], ci: 2 },
      { q: "What is the main purpose of RAM?", opts: ["Long-term storage", "Temporary data storage", "Internet connection", "Graphics rendering"], ci: 1 },
      { q: "What year was the iPhone first released?", opts: ["2005", "2006", "2007", "2008"], ci: 2 },
      { q: "What is the most used programming language in 2024?", opts: ["Java", "C++", "JavaScript", "Rust"], ci: 2 },
      { q: "What does AI stand for?", opts: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Applied Informatics"], ci: 1 },
      { q: "Who created the World Wide Web?", opts: ["Bill Gates", "Steve Jobs", "Tim Berners-Lee", "Linus Torvalds"], ci: 2 },
      { q: "What is blockchain primarily used for?", opts: ["Email", "Decentralized record-keeping", "Video streaming", "GPS navigation"], ci: 1 },
      { q: "Which company makes the GPU brand GeForce?", opts: ["AMD", "Intel", "Nvidia", "Qualcomm"], ci: 2 },
      { q: "What does SSD stand for?", opts: ["Solid State Drive", "Super Speed Disk", "System Storage Device", "Serial Signal Drive"], ci: 0 },
      { q: "What is the name of Meta's VR headset?", opts: ["HoloLens", "Quest", "Vive", "Index"], ci: 1 },
      { q: "Which protocol is used for secure web browsing?", opts: ["HTTP", "FTP", "HTTPS", "SMTP"], ci: 2 },
      { q: "What language does most AI/ML research use?", opts: ["Java", "C#", "Python", "Ruby"], ci: 2 },
      { q: "Who is the CEO of Tesla?", opts: ["Tim Cook", "Satya Nadella", "Elon Musk", "Jeff Bezos"], ci: 2 },
      { q: "What does IoT stand for?", opts: ["Internet of Things", "Integration of Technology", "Internal Operation Tool", "Information on Track"], ci: 0 },
      { q: "What is the cloud in cloud computing?", opts: ["A weather system", "Remote servers on the internet", "A type of hard drive", "A wireless protocol"], ci: 1 },
      { q: "Which company developed ChatGPT?", opts: ["Google", "Meta", "OpenAI", "Anthropic"], ci: 2 },
    ],
    tf: [
      { q: "The first computer mouse was made of wood.", answer: true },
      { q: "5G is the fifth generation of mobile networks.", answer: true },
      { q: "Python was named after Monty Python.", answer: true },
      { q: "The first email was sent in 1991.", answer: false },
      { q: "Linux is a proprietary operating system.", answer: false },
      { q: "USB stands for Universal Serial Bus.", answer: true },
      { q: "Moore's Law is about memory capacity.", answer: false },
      { q: "Java and JavaScript are the same language.", answer: false },
      { q: "The first website is still online today.", answer: true },
      { q: "Quantum computers use qubits.", answer: true },
      { q: "Wi-Fi stands for Wireless Fidelity.", answer: false },
      { q: "Bitcoin was created by Satoshi Nakamoto.", answer: true },
      { q: "SQL is a programming language.", answer: false },
      { q: "GPT stands for Generative Pre-trained Transformer.", answer: true },
      { q: "The first smartphone was the iPhone.", answer: false },
      { q: "HTTPS encrypts data in transit.", answer: true },
      { q: "RAM is a form of permanent storage.", answer: false },
      { q: "Machine learning is a subset of AI.", answer: true },
      { q: "The internet and the World Wide Web are the same thing.", answer: false },
      { q: "Ethernet was invented at Xerox PARC.", answer: true },
    ],
  },
  geography: {
    mc: [
      { q: "What is the largest continent by area?", opts: ["Africa", "North America", "Europe", "Asia"], ci: 3 },
      { q: "Which river is the longest in the world?", opts: ["Amazon", "Nile", "Yangtze", "Mississippi"], ci: 1 },
      { q: "What is the capital of Australia?", opts: ["Sydney", "Melbourne", "Canberra", "Brisbane"], ci: 2 },
      { q: "Which country has the most people?", opts: ["USA", "India", "China", "Indonesia"], ci: 1 },
      { q: "What is the smallest country in the world?", opts: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], ci: 1 },
      { q: "Which ocean is the deepest?", opts: ["Atlantic", "Indian", "Arctic", "Pacific"], ci: 3 },
      { q: "Mount Everest is in which mountain range?", opts: ["Andes", "Alps", "Rockies", "Himalayas"], ci: 3 },
      { q: "What is the driest continent?", opts: ["Africa", "Australia", "Antarctica", "Asia"], ci: 2 },
      { q: "Which country has the most time zones?", opts: ["Russia", "USA", "France", "China"], ci: 2 },
      { q: "What is the capital of Canada?", opts: ["Toronto", "Vancouver", "Ottawa", "Montreal"], ci: 2 },
      { q: "Which desert is the largest hot desert?", opts: ["Gobi", "Kalahari", "Sahara", "Arabian"], ci: 2 },
      { q: "What sea separates Europe and Africa?", opts: ["Black Sea", "Red Sea", "Mediterranean", "Caspian"], ci: 2 },
      { q: "Which country is known as the Land of the Rising Sun?", opts: ["China", "Japan", "Thailand", "Korea"], ci: 1 },
      { q: "What is the longest mountain range in the world?", opts: ["Himalayas", "Rockies", "Alps", "Andes"], ci: 3 },
      { q: "Which African country has the largest economy?", opts: ["South Africa", "Egypt", "Nigeria", "Kenya"], ci: 2 },
      { q: "What is the capital of Brazil?", opts: ["Rio de Janeiro", "Sao Paulo", "Brasilia", "Salvador"], ci: 2 },
      { q: "Which strait separates Asia from North America?", opts: ["Gibraltar", "Malacca", "Bering", "Hormuz"], ci: 2 },
      { q: "What is the most spoken language in the world?", opts: ["English", "Mandarin Chinese", "Spanish", "Hindi"], ci: 1 },
      { q: "Which European country is shaped like a boot?", opts: ["Spain", "Greece", "Italy", "Portugal"], ci: 2 },
      { q: "What is the largest lake in the world by surface area?", opts: ["Lake Superior", "Caspian Sea", "Lake Victoria", "Lake Baikal"], ci: 1 },
    ],
    tf: [
      { q: "Africa is a country.", answer: false },
      { q: "Iceland is covered mostly in ice.", answer: false },
      { q: "Russia spans two continents.", answer: true },
      { q: "The Amazon Rainforest is in Africa.", answer: false },
      { q: "There are 7 continents on Earth.", answer: true },
      { q: "Mount Kilimanjaro is in Kenya.", answer: false },
      { q: "The Dead Sea is the lowest point on land.", answer: true },
      { q: "Canada is the largest country by area.", answer: false },
      { q: "The Equator passes through Brazil.", answer: true },
      { q: "Antarctica has no permanent population.", answer: true },
      { q: "The Nile flows south to north.", answer: true },
      { q: "Greenland is part of North America geographically.", answer: true },
      { q: "Tokyo is the most populated city in the world.", answer: true },
      { q: "Switzerland has a coastline.", answer: false },
      { q: "Australia is both a country and a continent.", answer: true },
      { q: "The Sahara Desert is growing.", answer: true },
      { q: "There are 50 countries in Europe.", answer: false },
      { q: "Lake Baikal is the deepest lake in the world.", answer: true },
      { q: "Panama is in South America.", answer: false },
      { q: "The Pacific Ring of Fire has the most volcanoes.", answer: true },
    ],
  },
};

const TOPICS = Object.keys(TEMPLATES);

function generateQuiz(topic: string, count: number, difficulty: string, qType: string): Question[] {
  const topicKey = TOPICS.includes(topic.toLowerCase()) ? topic.toLowerCase() : TOPICS[Math.floor(Math.random() * TOPICS.length)];
  const pool = TEMPLATES[topicKey];
  const questions: Question[] = [];
  const usedMc = new Set<number>();
  const usedTf = new Set<number>();

  for (let i = 0; i < count; i++) {
    const useType = qType === "tf" ? "tf" : qType === "mc" ? "mc" : Math.random() > 0.5 ? "tf" : "mc";
    if (useType === "tf" && pool.tf.length > usedTf.size) {
      let idx: number;
      do { idx = Math.floor(Math.random() * pool.tf.length); } while (usedTf.has(idx));
      usedTf.add(idx);
      const t = pool.tf[idx];
      questions.push({ question: t.q, options: ["True", "False"], correctIndex: t.answer ? 0 : 1, type: "tf" });
    } else if (pool.mc.length > usedMc.size) {
      let idx: number;
      do { idx = Math.floor(Math.random() * pool.mc.length); } while (usedMc.has(idx));
      usedMc.add(idx);
      const m = pool.mc[idx];
      if (difficulty === "hard") {
        const shuffled = [...m.opts].sort(() => Math.random() - 0.5);
        const newCi = shuffled.indexOf(m.opts[m.ci]);
        questions.push({ question: m.q, options: shuffled, correctIndex: newCi, type: "mc" });
      } else {
        questions.push({ question: m.q, options: [...m.opts], correctIndex: m.ci, type: "mc" });
      }
    }
  }
  return questions;
}

export default function ClientPage() {
  const { user, isPro } = useAuth();
  const toolUI = useToolUI();
  const { t } = useTranslation();
  const [topic, setTopic] = useState("science");
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState("medium");
  const [qType, setQType] = useState("mix");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [usage, setUsage] = useState(0);
  const limit = 3;
  const period = "day";
  const [currentQ, setCurrentQ] = useState(0);

  const handleGenerate = useCallback(async () => {
    if (!isPro && user) {
      try {
        const res = await fetch("/api/usage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "check" }) });
        const data = await res.json();
        if (data.usage !== undefined) setUsage(data.usage);
        if (data.usage >= limit) return;
      } catch {}
    }
    const qs = generateQuiz(topic, count, difficulty, qType);
    setQuestions(qs);
    setAnswers(new Array(qs.length).fill(null));
    setSubmitted(false);
    setCurrentQ(0);
    if (!isPro && user) {
      try {
        const res = await fetch("/api/usage", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId: user.id, toolSlug: TOOL_SLUG, action: "record" }) });
        const data = await res.json();
        if (data.usage) setUsage(data.usage);
      } catch {}
    }
  }, [topic, count, difficulty, qType, isPro, user]);

  const selectAnswer = (qi: number, oi: number) => {
    if (submitted) return;
    const copy = [...answers];
    copy[qi] = oi;
    setAnswers(copy);
  };

  const handleSubmit = () => setSubmitted(true);
  const score = submitted ? answers.filter((a, i) => a === questions[i]?.correctIndex).length : 0;

  const inp: React.CSSProperties = { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "15px", outline: "none" };
  const btn: React.CSSProperties = { padding: "12px 28px", background: "#0D9488", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 600, cursor: "pointer" };
  const card: React.CSSProperties = { background: "#fff", borderRadius: "12px", padding: "24px", border: "1px solid #e5e7eb", marginBottom: "16px" };

  return (
    <>
      <ToolSchema name="Quiz Generator" description="Generate interactive quizzes on any topic. Multiple choice, true/false, scored results." slug="quiz-generator" category="WebApplication" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Quiz Generator", url: "https://toolcraftkit.com/tools/quiz-generator" }]} />
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 20px 60px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: 800, color: "#111827", marginBottom: "8px" }}>Quiz Generator</h1>
        <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "24px" }}>Generate and take interactive quizzes on popular topics. Choose your settings and test your knowledge.</p>
        <UsageBanner toolSlug={TOOL_SLUG} usage={usage} limit={limit} period={period} />

        {questions.length === 0 && (
          <div style={card}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Topic</label>
                <select value={topic} onChange={e => setTopic(e.target.value)} style={inp}>
                  <option value="science">Science</option>
                  <option value="history">History</option>
                  <option value="technology">Technology</option>
                  <option value="geography">Geography</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Questions</label>
                <select value={count} onChange={e => setCount(Number(e.target.value))} style={inp}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={inp}>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontWeight: 600, marginBottom: "6px", fontSize: "14px" }}>Type</label>
                <select value={qType} onChange={e => setQType(e.target.value)} style={inp}>
                  <option value="mix">Mix</option>
                  <option value="mc">Multiple Choice</option>
                  <option value="tf">True / False</option>
                </select>
              </div>
            </div>
            <button onClick={handleGenerate} style={btn}>Generate Quiz</button>
          </div>
        )}

        {questions.length > 0 && !submitted && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <span style={{ fontWeight: 600, color: "#374151" }}>Question {currentQ + 1} of {questions.length}</span>
              <span style={{ fontSize: "13px", color: "#9ca3af" }}>{answers.filter(a => a !== null).length} answered</span>
            </div>
            <div style={{ width: "100%", height: "6px", background: "#e5e7eb", borderRadius: "3px", marginBottom: "20px" }}>
              <div style={{ width: `${((currentQ + 1) / questions.length) * 100}%`, height: "6px", background: "#0D9488", borderRadius: "3px", transition: "width 0.3s" }} />
            </div>
            <div style={card}>
              <p style={{ fontSize: "17px", fontWeight: 600, marginBottom: "16px", color: "#111827" }}>{questions[currentQ].question}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {questions[currentQ].options.map((opt, oi) => (
                  <button key={oi} onClick={() => selectAnswer(currentQ, oi)} style={{ padding: "12px 16px", borderRadius: "8px", border: answers[currentQ] === oi ? "2px solid #0D9488" : "1px solid #d1d5db", background: answers[currentQ] === oi ? "#f0fdfa" : "#fff", cursor: "pointer", textAlign: "left", fontSize: "15px", fontWeight: answers[currentQ] === oi ? 600 : 400 }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
              <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} style={{ ...btn, background: currentQ === 0 ? "#d1d5db" : "#6b7280", cursor: currentQ === 0 ? "default" : "pointer" }}>Previous</button>
              {currentQ < questions.length - 1 ? (
                <button onClick={() => setCurrentQ(currentQ + 1)} style={btn}>Next</button>
              ) : (
                <button onClick={handleSubmit} disabled={answers.includes(null)} style={{ ...btn, background: answers.includes(null) ? "#d1d5db" : "#0D9488" }}>Submit Quiz</button>
              )}
            </div>
          </div>
        )}

        {submitted && (
          <div>
            <div style={{ ...card, textAlign: "center", background: score / questions.length >= 0.7 ? "#f0fdf4" : score / questions.length >= 0.4 ? "#fefce8" : "#fef2f2" }}>
              <div style={{ fontSize: "48px", fontWeight: 800, color: score / questions.length >= 0.7 ? "#16a34a" : score / questions.length >= 0.4 ? "#ca8a04" : "#dc2626" }}>{score}/{questions.length}</div>
              <p style={{ fontSize: "18px", fontWeight: 600, color: "#374151", marginTop: "8px" }}>
                {score / questions.length >= 0.9 ? "Excellent!" : score / questions.length >= 0.7 ? "Great job!" : score / questions.length >= 0.4 ? "Not bad!" : "Keep studying!"}
              </p>
              <p style={{ color: "#6b7280", fontSize: "14px" }}>{Math.round((score / questions.length) * 100)}% correct</p>
            </div>
            {questions.map((q, qi) => {
              const correct = answers[qi] === q.correctIndex;
              return (
                <div key={qi} style={{ ...card, borderLeft: `4px solid ${correct ? "#16a34a" : "#dc2626"}` }}>
                  <p style={{ fontWeight: 600, marginBottom: "8px" }}>{qi + 1}. {q.question}</p>
                  {q.options.map((opt, oi) => (
                    <div key={oi} style={{ padding: "6px 12px", marginBottom: "4px", borderRadius: "6px", fontSize: "14px", background: oi === q.correctIndex ? "#dcfce7" : oi === answers[qi] ? "#fee2e2" : "transparent", fontWeight: oi === q.correctIndex || oi === answers[qi] ? 600 : 400, color: "#374151" }}>
                      {opt} {oi === q.correctIndex && "✓"} {oi === answers[qi] && oi !== q.correctIndex && "✗"}
                    </div>
                  ))}
                </div>
              );
            })}
            <button onClick={() => { setQuestions([]); setAnswers([]); setSubmitted(false); }} style={{ ...btn, marginTop: "16px" }}>New Quiz</button>
          </div>
        )}
      </div>
      <SeoContent />
    </>
  );
}

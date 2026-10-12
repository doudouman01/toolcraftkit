"use client";
import { useState, useMemo, useCallback } from "react";

/* ─── BRAND TOKENS ─── */
const LIGHT = {
  primary: "#0D9488", primaryLight: "#14B8A6",
  bg: "#FAFAF9", surface: "#FFFFFF", surfaceAlt: "#F5F5F4",
  border: "#E7E5E4", text: "#1C1917", textMuted: "#78716C", textLight: "#A8A29E",
  success: "#10B981", danger: "#EF4444", warning: "#F59E0B",
  inputBg: "#FFFFFF", shadow: "0 1px 3px rgba(0,0,0,0.06)",
};
const DARK = {
  primary: "#2DD4BF", primaryLight: "#5EEAD4",
  bg: "#0C0A09", surface: "#1C1917", surfaceAlt: "#292524",
  border: "#3F3F46", text: "#FAFAF9", textMuted: "#A8A29E", textLight: "#78716C",
  success: "#34D399", danger: "#F87171", warning: "#FBBF24",
  inputBg: "#292524", shadow: "0 1px 3px rgba(0,0,0,0.3)",
};

type Theme = typeof LIGHT;
type Mode = "standard" | "formal" | "simple" | "creative";

/* ─── SYNONYM DICTIONARY ─── */
// Each entry: { standard, formal, simple, creative }
const SYNONYMS: Record<string, Record<Mode, string>> = {
  "good": { standard: "solid", formal: "commendable", simple: "great", creative: "stellar" },
  "bad": { standard: "poor", formal: "inadequate", simple: "weak", creative: "dreadful" },
  "big": { standard: "large", formal: "substantial", simple: "huge", creative: "colossal" },
  "small": { standard: "minor", formal: "modest", simple: "tiny", creative: "minuscule" },
  "important": { standard: "significant", formal: "paramount", simple: "key", creative: "pivotal" },
  "help": { standard: "assist", formal: "facilitate", simple: "aid", creative: "empower" },
  "show": { standard: "display", formal: "demonstrate", simple: "reveal", creative: "unveil" },
  "start": { standard: "begin", formal: "commence", simple: "kick off", creative: "ignite" },
  "end": { standard: "finish", formal: "conclude", simple: "stop", creative: "culminate" },
  "make": { standard: "create", formal: "construct", simple: "build", creative: "craft" },
  "use": { standard: "employ", formal: "utilize", simple: "apply", creative: "harness" },
  "get": { standard: "obtain", formal: "acquire", simple: "grab", creative: "secure" },
  "give": { standard: "provide", formal: "furnish", simple: "hand", creative: "bestow" },
  "find": { standard: "locate", formal: "identify", simple: "spot", creative: "uncover" },
  "think": { standard: "believe", formal: "consider", simple: "feel", creative: "envision" },
  "tell": { standard: "inform", formal: "notify", simple: "share", creative: "convey" },
  "ask": { standard: "request", formal: "inquire", simple: "check", creative: "probe" },
  "work": { standard: "operate", formal: "function", simple: "run", creative: "thrive" },
  "try": { standard: "attempt", formal: "endeavor", simple: "aim", creative: "venture" },
  "need": { standard: "require", formal: "necessitate", simple: "want", creative: "demand" },
  "keep": { standard: "retain", formal: "maintain", simple: "hold", creative: "preserve" },
  "let": { standard: "allow", formal: "permit", simple: "have", creative: "enable" },
  "say": { standard: "state", formal: "assert", simple: "mention", creative: "proclaim" },
  "move": { standard: "shift", formal: "relocate", simple: "go", creative: "propel" },
  "change": { standard: "modify", formal: "alter", simple: "shift", creative: "transform" },
  "put": { standard: "place", formal: "position", simple: "set", creative: "station" },
  "run": { standard: "operate", formal: "administer", simple: "manage", creative: "steer" },
  "take": { standard: "seize", formal: "acquire", simple: "grab", creative: "claim" },
  "come": { standard: "arrive", formal: "approach", simple: "show up", creative: "emerge" },
  "see": { standard: "observe", formal: "perceive", simple: "notice", creative: "witness" },
  "look": { standard: "examine", formal: "scrutinize", simple: "check", creative: "peer at" },
  "want": { standard: "desire", formal: "wish", simple: "like", creative: "crave" },
  "call": { standard: "contact", formal: "summon", simple: "reach", creative: "beckon" },
  "turn": { standard: "rotate", formal: "pivot", simple: "spin", creative: "swivel" },
  "leave": { standard: "depart", formal: "withdraw", simple: "exit", creative: "abandon" },
  "play": { standard: "perform", formal: "engage in", simple: "do", creative: "revel in" },
  "hold": { standard: "grasp", formal: "retain", simple: "grip", creative: "clutch" },
  "bring": { standard: "deliver", formal: "convey", simple: "carry", creative: "ferry" },
  "write": { standard: "compose", formal: "author", simple: "draft", creative: "pen" },
  "read": { standard: "review", formal: "peruse", simple: "scan", creative: "devour" },
  "learn": { standard: "study", formal: "acquire knowledge of", simple: "pick up", creative: "master" },
  "grow": { standard: "expand", formal: "develop", simple: "rise", creative: "flourish" },
  "build": { standard: "construct", formal: "establish", simple: "set up", creative: "forge" },
  "fast": { standard: "quick", formal: "rapid", simple: "speedy", creative: "lightning-fast" },
  "slow": { standard: "unhurried", formal: "gradual", simple: "steady", creative: "languid" },
  "hard": { standard: "difficult", formal: "challenging", simple: "tough", creative: "grueling" },
  "easy": { standard: "simple", formal: "straightforward", simple: "basic", creative: "effortless" },
  "new": { standard: "recent", formal: "novel", simple: "fresh", creative: "cutting-edge" },
  "old": { standard: "previous", formal: "established", simple: "past", creative: "timeworn" },
  "happy": { standard: "pleased", formal: "gratified", simple: "glad", creative: "elated" },
  "sad": { standard: "unhappy", formal: "disheartened", simple: "down", creative: "melancholy" },
  "nice": { standard: "pleasant", formal: "agreeable", simple: "fine", creative: "delightful" },
  "right": { standard: "correct", formal: "accurate", simple: "true", creative: "spot-on" },
  "wrong": { standard: "incorrect", formal: "erroneous", simple: "off", creative: "misguided" },
  "many": { standard: "numerous", formal: "a multitude of", simple: "lots of", creative: "countless" },
  "much": { standard: "considerable", formal: "substantial", simple: "a lot of", creative: "vast" },
  "very": { standard: "quite", formal: "exceedingly", simple: "really", creative: "remarkably" },
  "really": { standard: "truly", formal: "genuinely", simple: "very", creative: "undeniably" },
  "always": { standard: "consistently", formal: "invariably", simple: "every time", creative: "perpetually" },
  "never": { standard: "at no point", formal: "under no circumstances", simple: "not ever", creative: "not once" },
  "often": { standard: "frequently", formal: "regularly", simple: "a lot", creative: "time and again" },
  "sometimes": { standard: "occasionally", formal: "periodically", simple: "now and then", creative: "from time to time" },
  "also": { standard: "additionally", formal: "furthermore", simple: "too", creative: "moreover" },
  "however": { standard: "nevertheless", formal: "notwithstanding", simple: "but", creative: "yet" },
  "therefore": { standard: "consequently", formal: "thus", simple: "so", creative: "as a result" },
  "because": { standard: "since", formal: "owing to the fact that", simple: "as", creative: "given that" },
  "but": { standard: "yet", formal: "however", simple: "still", creative: "nevertheless" },
  "so": { standard: "thus", formal: "consequently", simple: "then", creative: "accordingly" },
  "about": { standard: "regarding", formal: "concerning", simple: "on", creative: "surrounding" },
  "like": { standard: "such as", formal: "akin to", simple: "similar to", creative: "reminiscent of" },
  "just": { standard: "simply", formal: "merely", simple: "only", creative: "precisely" },
  "now": { standard: "currently", formal: "at present", simple: "right now", creative: "at this moment" },
  "still": { standard: "yet", formal: "nonetheless", simple: "even now", creative: "to this day" },
  "already": { standard: "previously", formal: "prior to this", simple: "before now", creative: "by now" },
  "enough": { standard: "sufficient", formal: "adequate", simple: "plenty", creative: "ample" },
  "quite": { standard: "rather", formal: "considerably", simple: "pretty", creative: "notably" },
  "problem": { standard: "issue", formal: "predicament", simple: "trouble", creative: "obstacle" },
  "answer": { standard: "response", formal: "resolution", simple: "reply", creative: "solution" },
  "question": { standard: "inquiry", formal: "query", simple: "ask", creative: "conundrum" },
  "idea": { standard: "concept", formal: "proposition", simple: "thought", creative: "brainchild" },
  "plan": { standard: "strategy", formal: "framework", simple: "approach", creative: "blueprint" },
  "way": { standard: "method", formal: "approach", simple: "path", creative: "avenue" },
  "place": { standard: "location", formal: "venue", simple: "spot", creative: "setting" },
  "part": { standard: "section", formal: "component", simple: "piece", creative: "element" },
  "thing": { standard: "item", formal: "element", simple: "stuff", creative: "entity" },
  "fact": { standard: "reality", formal: "truth", simple: "point", creative: "certainty" },
  "point": { standard: "aspect", formal: "consideration", simple: "note", creative: "crux" },
  "example": { standard: "instance", formal: "illustration", simple: "case", creative: "specimen" },
  "result": { standard: "outcome", formal: "consequence", simple: "effect", creative: "upshot" },
  "reason": { standard: "cause", formal: "rationale", simple: "basis", creative: "driving force" },
  "goal": { standard: "objective", formal: "aim", simple: "target", creative: "aspiration" },
  "level": { standard: "degree", formal: "caliber", simple: "stage", creative: "tier" },
  "group": { standard: "team", formal: "collective", simple: "bunch", creative: "ensemble" },
  "area": { standard: "region", formal: "domain", simple: "zone", creative: "realm" },
  "system": { standard: "framework", formal: "infrastructure", simple: "setup", creative: "mechanism" },
  "process": { standard: "procedure", formal: "methodology", simple: "steps", creative: "workflow" },
  "issue": { standard: "concern", formal: "matter", simple: "trouble", creative: "challenge" },
  "power": { standard: "strength", formal: "authority", simple: "force", creative: "might" },
  "money": { standard: "funds", formal: "capital", simple: "cash", creative: "resources" },
  "business": { standard: "company", formal: "enterprise", simple: "firm", creative: "venture" },
  "market": { standard: "sector", formal: "marketplace", simple: "field", creative: "arena" },
  "world": { standard: "globe", formal: "sphere", simple: "earth", creative: "landscape" },
  "country": { standard: "nation", formal: "state", simple: "land", creative: "realm" },
  "people": { standard: "individuals", formal: "persons", simple: "folks", creative: "souls" },
  "children": { standard: "kids", formal: "youths", simple: "young ones", creative: "little ones" },
  "family": { standard: "household", formal: "relatives", simple: "kin", creative: "clan" },
  "friend": { standard: "companion", formal: "associate", simple: "pal", creative: "ally" },
  "home": { standard: "residence", formal: "dwelling", simple: "house", creative: "haven" },
  "life": { standard: "existence", formal: "livelihood", simple: "living", creative: "journey" },
  "time": { standard: "period", formal: "duration", simple: "while", creative: "era" },
  "day": { standard: "date", formal: "occasion", simple: "moment", creative: "juncture" },
  "year": { standard: "annum", formal: "fiscal period", simple: "span", creative: "cycle" },
  "story": { standard: "narrative", formal: "account", simple: "tale", creative: "saga" },
  "book": { standard: "publication", formal: "volume", simple: "read", creative: "tome" },
  "job": { standard: "position", formal: "occupation", simple: "role", creative: "calling" },
  "talk": { standard: "discuss", formal: "converse", simple: "chat", creative: "engage" },
  "walk": { standard: "stroll", formal: "proceed", simple: "go", creative: "wander" },
  "stop": { standard: "cease", formal: "discontinue", simple: "quit", creative: "halt" },
  "wait": { standard: "pause", formal: "remain", simple: "hold on", creative: "linger" },
  "live": { standard: "reside", formal: "inhabit", simple: "stay", creative: "dwell" },
  "happen": { standard: "occur", formal: "transpire", simple: "come about", creative: "unfold" },
  "include": { standard: "contain", formal: "encompass", simple: "cover", creative: "embrace" },
  "continue": { standard: "proceed", formal: "persist", simple: "go on", creative: "press forward" },
  "set": { standard: "establish", formal: "configure", simple: "fix", creative: "define" },
  "lead": { standard: "guide", formal: "direct", simple: "head", creative: "spearhead" },
  "close": { standard: "near", formal: "proximate", simple: "nearby", creative: "intimate" },
  "open": { standard: "accessible", formal: "available", simple: "free", creative: "welcoming" },
  "seem": { standard: "appear", formal: "suggest", simple: "look", creative: "evoke" },
  "follow": { standard: "pursue", formal: "adhere to", simple: "track", creative: "embrace" },
  "consider": { standard: "weigh", formal: "contemplate", simple: "look at", creative: "ponder" },
  "support": { standard: "back", formal: "endorse", simple: "stand by", creative: "champion" },
  "offer": { standard: "present", formal: "propose", simple: "give", creative: "extend" },
  "serve": { standard: "cater to", formal: "accommodate", simple: "handle", creative: "fulfill" },
  "produce": { standard: "generate", formal: "yield", simple: "make", creative: "churn out" },
  "develop": { standard: "advance", formal: "cultivate", simple: "grow", creative: "evolve" },
  "reach": { standard: "attain", formal: "achieve", simple: "hit", creative: "arrive at" },
  "remain": { standard: "stay", formal: "persist", simple: "last", creative: "endure" },
  "raise": { standard: "increase", formal: "elevate", simple: "lift", creative: "amplify" },
  "reduce": { standard: "decrease", formal: "diminish", simple: "cut", creative: "pare down" },
  "add": { standard: "include", formal: "incorporate", simple: "put in", creative: "infuse" },
  "meet": { standard: "encounter", formal: "convene with", simple: "see", creative: "connect with" },
  "pay": { standard: "compensate", formal: "remunerate", simple: "settle", creative: "reward" },
  "create": { standard: "produce", formal: "establish", simple: "make", creative: "spawn" },
  "report": { standard: "document", formal: "chronicle", simple: "note", creative: "relay" },
  "explain": { standard: "clarify", formal: "elucidate", simple: "break down", creative: "illuminate" },
  "decide": { standard: "determine", formal: "resolve", simple: "pick", creative: "settle on" },
  "pull": { standard: "draw", formal: "extract", simple: "tug", creative: "wrench" },
  "speak": { standard: "communicate", formal: "articulate", simple: "chat", creative: "voice" },
  "accept": { standard: "agree to", formal: "acknowledge", simple: "take", creative: "welcome" },
  "achieve": { standard: "accomplish", formal: "attain", simple: "reach", creative: "conquer" },
  "break": { standard: "fracture", formal: "disrupt", simple: "snap", creative: "shatter" },
  "carry": { standard: "transport", formal: "convey", simple: "haul", creative: "ferry" },
  "concern": { standard: "worry", formal: "apprehension", simple: "fear", creative: "unease" },
  "describe": { standard: "outline", formal: "delineate", simple: "explain", creative: "paint" },
  "discover": { standard: "find", formal: "ascertain", simple: "spot", creative: "stumble upon" },
  "ensure": { standard: "guarantee", formal: "ascertain", simple: "make sure", creative: "safeguard" },
  "establish": { standard: "set up", formal: "institute", simple: "found", creative: "pioneer" },
  "improve": { standard: "enhance", formal: "augment", simple: "boost", creative: "elevate" },
  "increase": { standard: "boost", formal: "amplify", simple: "grow", creative: "surge" },
  "maintain": { standard: "uphold", formal: "sustain", simple: "keep up", creative: "safeguard" },
  "obtain": { standard: "secure", formal: "procure", simple: "get", creative: "land" },
  "perform": { standard: "execute", formal: "conduct", simple: "do", creative: "deliver" },
  "present": { standard: "display", formal: "exhibit", simple: "show", creative: "showcase" },
  "prevent": { standard: "avoid", formal: "preclude", simple: "block", creative: "ward off" },
  "protect": { standard: "safeguard", formal: "shield", simple: "guard", creative: "fortify" },
  "provide": { standard: "supply", formal: "furnish", simple: "give", creative: "deliver" },
  "receive": { standard: "obtain", formal: "acquire", simple: "get", creative: "collect" },
  "recognize": { standard: "identify", formal: "acknowledge", simple: "spot", creative: "discern" },
  "replace": { standard: "substitute", formal: "supplant", simple: "swap", creative: "reinvent" },
  "require": { standard: "demand", formal: "necessitate", simple: "need", creative: "call for" },
  "suggest": { standard: "recommend", formal: "propose", simple: "hint", creative: "advocate" },
  "understand": { standard: "grasp", formal: "comprehend", simple: "get", creative: "fathom" },
  "beautiful": { standard: "attractive", formal: "aesthetically pleasing", simple: "pretty", creative: "stunning" },
  "interesting": { standard: "engaging", formal: "compelling", simple: "cool", creative: "captivating" },
  "different": { standard: "distinct", formal: "divergent", simple: "unlike", creative: "unique" },
  "possible": { standard: "feasible", formal: "attainable", simple: "doable", creative: "within reach" },
  "likely": { standard: "probable", formal: "anticipated", simple: "expected", creative: "poised" },
  "certain": { standard: "definite", formal: "assured", simple: "sure", creative: "undeniable" },
  "available": { standard: "accessible", formal: "obtainable", simple: "ready", creative: "at hand" },
  "clear": { standard: "obvious", formal: "transparent", simple: "plain", creative: "crystal clear" },
  "strong": { standard: "powerful", formal: "robust", simple: "tough", creative: "formidable" },
  "full": { standard: "complete", formal: "comprehensive", simple: "total", creative: "brimming" },
  "able": { standard: "capable", formal: "competent", simple: "skilled", creative: "equipped" },
  "free": { standard: "available", formal: "complimentary", simple: "open", creative: "liberated" },
  "special": { standard: "unique", formal: "distinctive", simple: "rare", creative: "extraordinary" },
  "major": { standard: "significant", formal: "principal", simple: "main", creative: "monumental" },
  "great": { standard: "excellent", formal: "outstanding", simple: "amazing", creative: "magnificent" },
  "huge": { standard: "enormous", formal: "immense", simple: "massive", creative: "colossal" },
  "amazing": { standard: "impressive", formal: "remarkable", simple: "awesome", creative: "breathtaking" },
  "best": { standard: "optimal", formal: "superior", simple: "top", creative: "unrivaled" },
  "worst": { standard: "poorest", formal: "most unfavorable", simple: "lowest", creative: "most dire" },
  "effective": { standard: "efficient", formal: "efficacious", simple: "useful", creative: "potent" },
  "successful": { standard: "thriving", formal: "accomplished", simple: "winning", creative: "triumphant" },
  "significant": { standard: "notable", formal: "consequential", simple: "big", creative: "momentous" },
  "essential": { standard: "vital", formal: "indispensable", simple: "key", creative: "cornerstone" },
  "quickly": { standard: "rapidly", formal: "expeditiously", simple: "fast", creative: "in a flash" },
  "slowly": { standard: "gradually", formal: "incrementally", simple: "bit by bit", creative: "at a crawl" },
  "immediately": { standard: "instantly", formal: "forthwith", simple: "right away", creative: "in a heartbeat" },
  "finally": { standard: "at last", formal: "ultimately", simple: "in the end", creative: "at long last" },
  "completely": { standard: "entirely", formal: "thoroughly", simple: "fully", creative: "utterly" },
  "actually": { standard: "in fact", formal: "in reality", simple: "truly", creative: "as it turns out" },
  "especially": { standard: "particularly", formal: "notably", simple: "mainly", creative: "above all" },
  "generally": { standard: "typically", formal: "predominantly", simple: "mostly", creative: "on the whole" },
  "simply": { standard: "merely", formal: "solely", simple: "just", creative: "purely" },
  "mainly": { standard: "primarily", formal: "predominantly", simple: "mostly", creative: "chiefly" },
  "almost": { standard: "nearly", formal: "virtually", simple: "close to", creative: "on the brink of" },
  "together": { standard: "jointly", formal: "collectively", simple: "as one", creative: "in unison" },
};

/* ─── SENTENCE RESTRUCTURING ─── */
function restructureSentence(sentence: string): string {
  const trimmed = sentence.trim();
  if (!trimmed) return trimmed;

  // Try active -> passive-like reordering for "Subject verb object" patterns
  // e.g. "The team completed the project" -> "The project was completed by the team"
  const activeMatch = trimmed.match(/^(The\s+\w+)\s+(completed|created|built|designed|developed|wrote|made|found|discovered|produced|established)\s+(.+?)([.!?]?)$/i);
  if (activeMatch) {
    const [, subject, verb, object, punct] = activeMatch;
    const pastMap: Record<string, string> = {
      completed: "completed", created: "created", built: "built", designed: "designed",
      developed: "developed", wrote: "written", made: "made", found: "found",
      discovered: "discovered", produced: "produced", established: "established",
    };
    const pp = pastMap[verb.toLowerCase()] || verb;
    return `${object.charAt(0).toUpperCase() + object.slice(1)} was ${pp} by ${subject.toLowerCase()}${punct || "."}`;
  }

  // Reorder "Because X, Y" -> "Y because X"
  const becauseMatch = trimmed.match(/^Because\s+(.+?),\s+(.+?)([.!?]?)$/i);
  if (becauseMatch) {
    const [, reason, result, punct] = becauseMatch;
    return `${result.charAt(0).toUpperCase() + result.slice(1)} because ${reason.toLowerCase()}${punct || "."}`;
  }

  // Reorder "X because Y" -> "Because Y, X" (less common, only sometimes)
  const trailingBecause = trimmed.match(/^(.+?)\s+because\s+(.+?)([.!?]?)$/i);
  if (trailingBecause && Math.random() > 0.5) {
    const [, result, reason, punct] = trailingBecause;
    return `Because ${reason}, ${result.charAt(0).toLowerCase() + result.slice(1)}${punct || "."}`;
  }

  // "Although X, Y" -> "Y, although X"
  const althoughMatch = trimmed.match(/^Although\s+(.+?),\s+(.+?)([.!?]?)$/i);
  if (althoughMatch) {
    const [, clause, main, punct] = althoughMatch;
    return `${main.charAt(0).toUpperCase() + main.slice(1)}, although ${clause.toLowerCase()}${punct || "."}`;
  }

  return trimmed;
}

/* ─── PARAPHRASE ENGINE ─── */
interface ParaphraseResult {
  text: string;
  changedWords: Set<number>; // indices of changed words in output
}

function paraphrase(input: string, mode: Mode): ParaphraseResult {
  if (!input.trim()) return { text: "", changedWords: new Set() };

  const sentences = input.split(/(?<=[.!?])\s+/);
  const allOutputWords: string[] = [];
  const changedIndices = new Set<number>();
  let wordOffset = 0;

  for (let si = 0; si < sentences.length; si++) {
    // Apply sentence restructuring to ~40% of sentences
    let sentence = sentences[si];
    const didRestructure = si > 0 && Math.random() < 0.4;
    if (didRestructure) {
      sentence = restructureSentence(sentence);
    }

    const words = sentence.split(/(\s+)/); // preserve whitespace
    for (const token of words) {
      if (/^\s+$/.test(token)) {
        allOutputWords.push(token);
        continue;
      }

      // Strip punctuation for lookup
      const punctMatch = token.match(/^([^a-zA-Z]*)([a-zA-Z]+(?:[''][a-zA-Z]+)?)([^a-zA-Z]*)$/);
      if (!punctMatch) {
        allOutputWords.push(token);
        wordOffset++;
        continue;
      }

      const [, pre, word, post] = punctMatch;
      const lower = word.toLowerCase();

      if (SYNONYMS[lower]) {
        const replacement = SYNONYMS[lower][mode];
        // Preserve original casing pattern
        let cased = replacement;
        if (word[0] === word[0].toUpperCase()) {
          cased = replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }
        if (word === word.toUpperCase() && word.length > 1) {
          cased = replacement.toUpperCase();
        }
        allOutputWords.push(pre + cased + post);
        changedIndices.add(wordOffset);
      } else {
        allOutputWords.push(token);
      }
      wordOffset++;
    }

    if (si < sentences.length - 1) {
      allOutputWords.push(" ");
    }
  }

  return { text: allOutputWords.join(""), changedWords: changedIndices };
}

function countWords(text: string): number {
  return (text.trim().match(/\S+/g) || []).length;
}

/* ─── FAQ ITEM ─── */
function FAQItem({ q, a, theme }: { q: string; a: string; theme: Theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${theme.border}`, padding: "13px 0" }}>
      <button onClick={() => setOpen(!open)} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        width: "100%", background: "none", border: "none", cursor: "pointer",
        padding: 0, textAlign: "left",
      }}>
        <span style={{
          fontSize: 14, fontWeight: 600, color: theme.text, lineHeight: 1.4, paddingRight: 16,
        }}>{q}</span>
        <span style={{
          fontSize: 18, color: theme.textMuted, flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease", lineHeight: 1,
        }}>+</span>
      </button>
      {open && (
        <p style={{
          fontSize: 13, color: theme.textMuted, lineHeight: 1.65,
          marginTop: 10, marginBottom: 0, paddingRight: 30,
        }}>{a}</p>
      )}
    </div>
  );
}

/* ─── AD SLOT ─── */
function AdSlot({ position, theme }: { position: string; theme: Theme }) {
  return (
    <div style={{
      border: `1px dashed ${theme.border}`, borderRadius: 8,
      padding: "12px", textAlign: "center", color: theme.textLight,
      fontSize: 11, fontStyle: "italic", background: theme.surfaceAlt,
      margin: position === "header" ? "0 0 20px" : "20px 0",
      opacity: 0.5,
    }}>
      Ad Slot — {position}
    </div>
  );
}

/* ─── HIGHLIGHTED TEXT DISPLAY ─── */
function HighlightedText({ text, changedWords, theme }: {
  text: string; changedWords: Set<number>; theme: Theme;
}) {
  const tokens = text.split(/(\s+)/);
  let wordIdx = 0;

  return (
    <div style={{
      fontSize: 14, lineHeight: 1.8, color: theme.text, whiteSpace: "pre-wrap",
    }}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;
        const idx = wordIdx++;
        const isChanged = changedWords.has(idx);
        return (
          <span key={i} style={isChanged ? {
            background: theme.primary + "22",
            borderBottom: `2px solid ${theme.primary}`,
            borderRadius: 2, padding: "1px 2px",
          } : undefined}>{token}</span>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function ParaphrasingTool() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState<Mode>("standard");
  const [dark, setDark] = useState(false);
  const [focused, setFocused] = useState(false);
  const [result, setResult] = useState<ParaphraseResult | null>(null);
  const [copied, setCopied] = useState(false);

  const theme = dark ? DARK : LIGHT;

  const handleParaphrase = useCallback(() => {
    if (!text.trim()) return;
    setResult(paraphrase(text, mode));
  }, [text, mode]);

  const handleCopy = useCallback(() => {
    if (!result) return;
    navigator.clipboard.writeText(result.text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [result]);

  const inputWordCount = useMemo(() => countWords(text), [text]);
  const outputWordCount = useMemo(() => result ? countWords(result.text) : 0, [result]);

  const modes: { key: Mode; label: string; desc: string }[] = [
    { key: "standard", label: "Standard", desc: "Balanced rewriting" },
    { key: "formal", label: "Formal", desc: "Academic tone" },
    { key: "simple", label: "Simple", desc: "Easier words" },
    { key: "creative", label: "Creative", desc: "Vivid language" },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: theme.bg,
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      color: theme.text, transition: "background 0.3s ease, color 0.3s ease",
    }}>
      <main style={{ maxWidth: 880, margin: "0 auto", padding: "24px 16px 60px" }}>

        {/* Ad slot: header */}
        <AdSlot position="header" theme={theme} />

        {/* ─── BREADCRUMB ─── */}
        <div style={{ fontSize: 13, color: theme.textMuted, marginBottom: 16 }}>
          <a href="/" style={{ color: theme.primary, textDecoration: "none" }}>Home</a>
          {" > "}
          <span>Writing Tools</span>
          {" > "}
          <span style={{ color: theme.primary }}>Paraphrasing Tool</span>
        </div>

        {/* ─── TITLE ─── */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <h1 style={{
              fontSize: 26, fontWeight: 800, margin: 0,
              letterSpacing: "-0.03em", lineHeight: 1.2,
            }}>Paraphrasing Tool</h1>
            <button onClick={() => setDark(!dark)} aria-label="Toggle theme" style={{
              marginLeft: "auto", background: theme.surfaceAlt, border: `1px solid ${theme.border}`,
              borderRadius: 8, padding: "6px 12px", cursor: "pointer",
              fontSize: 13, color: theme.textMuted, fontWeight: 500,
            }}>
              {dark ? "Light" : "Dark"}
            </button>
          </div>
          <p style={{
            fontSize: 14, color: theme.textMuted, margin: "8px 0 0", lineHeight: 1.5,
          }}>
            Rewrite any text with synonym replacement and sentence restructuring. Choose your writing mode for the perfect tone.
          </p>
        </div>

        {/* ─── MODE SELECTOR ─── */}
        <div style={{
          display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap",
        }}>
          {modes.map((m) => (
            <button
              key={m.key}
              onClick={() => { setMode(m.key); setResult(null); }}
              style={{
                padding: "10px 18px", borderRadius: 8, cursor: "pointer",
                border: `1.5px solid ${mode === m.key ? theme.primary : theme.border}`,
                background: mode === m.key ? (dark ? "rgba(45,212,191,0.12)" : "rgba(13,148,136,0.08)") : theme.surface,
                color: mode === m.key ? theme.primary : theme.text,
                fontWeight: mode === m.key ? 600 : 500,
                fontSize: 13, transition: "all 0.2s ease",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              }}
            >
              <span>{m.label}</span>
              <span style={{ fontSize: 10, color: theme.textMuted, fontWeight: 400 }}>{m.desc}</span>
            </button>
          ))}
        </div>

        {/* ─── TEXTAREA ─── */}
        <div style={{
          background: theme.surface, borderRadius: 12,
          border: `1.5px solid ${focused ? theme.primary : theme.border}`,
          overflow: "hidden", marginBottom: 8,
          transition: "border-color 0.2s ease",
          boxShadow: focused ? `0 0 0 3px ${dark ? "rgba(45,212,191,0.15)" : "rgba(13,148,136,0.1)"}` : theme.shadow,
        }}>
          <textarea
            value={text}
            onChange={(e) => { setText(e.target.value); setResult(null); }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Paste or type the text you want to paraphrase..."
            style={{
              width: "100%", minHeight: 200, padding: "16px 18px",
              fontSize: 14, lineHeight: 1.75, border: "none", outline: "none",
              resize: "vertical", background: theme.inputBg, color: theme.text,
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* ─── WORD COUNT & BUTTON ROW ─── */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 20, flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textMuted }}>
            {inputWordCount} {inputWordCount === 1 ? "word" : "words"}
          </span>
          <button
            onClick={handleParaphrase}
            disabled={!text.trim()}
            style={{
              padding: "12px 32px", borderRadius: 10, border: "none",
              background: text.trim() ? theme.primary : theme.surfaceAlt,
              color: text.trim() ? "#FFFFFF" : theme.textMuted,
              fontWeight: 700, fontSize: 15, cursor: text.trim() ? "pointer" : "not-allowed",
              transition: "all 0.2s ease",
              boxShadow: text.trim() ? "0 2px 8px rgba(13,148,136,0.25)" : "none",
            }}
          >
            Paraphrase
          </button>
        </div>

        {/* ─── RESULTS: SIDE-BY-SIDE ─── */}
        {result && (
          <section style={{ marginBottom: 24 }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginBottom: 12,
            }}>
              <h2 style={{
                fontSize: 18, fontWeight: 700, margin: 0, letterSpacing: "-0.02em",
              }}>Result</h2>
              <button
                onClick={handleCopy}
                style={{
                  padding: "8px 20px", borderRadius: 8, border: `1px solid ${theme.border}`,
                  background: copied ? theme.success : theme.surface,
                  color: copied ? "#FFFFFF" : theme.primary,
                  fontWeight: 600, fontSize: 13, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
            }}>
              {/* Original */}
              <div style={{
                background: theme.surface, borderRadius: 12,
                border: `1px solid ${theme.border}`, padding: 18,
                boxShadow: theme.shadow,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: theme.textMuted,
                  marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                  Original ({inputWordCount} words)
                </div>
                <div style={{
                  fontSize: 14, lineHeight: 1.8, color: theme.text, whiteSpace: "pre-wrap",
                }}>
                  {text}
                </div>
              </div>

              {/* Paraphrased */}
              <div style={{
                background: theme.surface, borderRadius: 12,
                border: `1px solid ${theme.primary}40`, padding: 18,
                boxShadow: theme.shadow,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: theme.primary,
                  marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                  Paraphrased ({outputWordCount} words)
                </div>
                <HighlightedText text={result.text} changedWords={result.changedWords} theme={theme} />
              </div>
            </div>

            {/* Mobile stack override */}
            <style>{`
              @media (max-width: 640px) {
                section > div[style*="grid-template-columns"] {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
          </section>
        )}

        {/* Ad slot: mid */}
        <AdSlot position="mid-content" theme={theme} />

        {/* ─── FAQ ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 20, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.02em",
          }}>Frequently Asked Questions</h2>
          <FAQItem theme={theme}
            q="How does the paraphrasing tool work?"
            a="The tool uses a built-in dictionary of over 200 synonym pairs to replace common words with context-appropriate alternatives. It also restructures certain sentence patterns (like swapping active and passive voice or reordering clauses) to create natural-sounding variations. All processing happens in your browser — nothing is sent to a server."
          />
          <FAQItem theme={theme}
            q="What is the difference between the four modes?"
            a="Standard mode provides balanced, neutral replacements suitable for most writing. Formal mode uses academic and professional vocabulary ideal for business or scholarly contexts. Simple mode replaces words with shorter, easier alternatives for broader readability. Creative mode swaps in vivid, expressive language that adds color and personality."
          />
          <FAQItem theme={theme}
            q="Is my text stored or sent anywhere?"
            a="No. The entire paraphrasing process runs locally in your browser using JavaScript. Your text never leaves your device, making it completely private and safe for confidential content."
          />
          <FAQItem theme={theme}
            q="Can I use this for academic writing?"
            a="This tool is designed to help you rewrite your own text in different tones and styles. It is not a substitute for original thinking. If you are paraphrasing source material for academic work, always cite the original source properly. Use the tool to improve clarity and vary your phrasing, not to disguise copied content."
          />
        </section>

        {/* ─── SEO CONTENT ─── */}
        <section style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>How to Use the Paraphrasing Tool</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Paste any block of text into the input area above. Select your preferred writing mode — Standard for everyday rewriting, Formal for professional documents, Simple for easier reading levels, or Creative for lively prose. Click &quot;Paraphrase&quot; and the tool instantly rewrites your text using intelligent synonym replacement and sentence restructuring. Changed words are highlighted so you can review every substitution at a glance.
          </p>
          <h2 style={{
            fontSize: 24, fontWeight: 700, color: theme.text, marginBottom: 16,
            borderBottom: `2px solid ${theme.primary}`, paddingBottom: 8,
          }}>Why Paraphrasing Improves Your Writing</h2>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: theme.textMuted, marginBottom: 12 }}>
            Rewriting text in your own words is one of the most effective ways to improve clarity, avoid repetition, and adapt tone for different audiences. Whether you are simplifying a technical document, formalizing a casual draft, or adding flair to marketing copy, paraphrasing helps you communicate the same idea in a way that resonates with your specific readers.
          </p>
          <div style={{
            background: dark ? "rgba(45,212,191,0.08)" : "#f0fdfa",
            border: `1px solid ${dark ? "rgba(45,212,191,0.2)" : "#99f6e4"}`,
            borderRadius: 8, padding: 16, marginTop: 16, marginBottom: 16,
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: theme.primary, marginBottom: 4 }}>Pro Tip</div>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: theme.textMuted, margin: 0 }}>
              After paraphrasing, run your text through our{" "}
              <a href="/tools/readability-score" style={{ color: theme.primary }}>Readability Score Checker</a> to verify the reading level matches your target audience. Combining both tools ensures your rewritten text is not only fresh but also appropriately pitched.
            </p>
          </div>
        </section>

        {/* Ad slot: footer */}
        <AdSlot position="footer" theme={theme} />

        {/* ─── FOOTER ─── */}
        <footer style={{
          marginTop: 32, paddingTop: 20, borderTop: `1px solid ${theme.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 8,
        }}>
          <span style={{ fontSize: 12, color: theme.textLight }}>
            &copy; 2026 ToolCraftKit.com — Free tools for creators and entrepreneurs.
          </span>
          <div style={{ display: "flex", gap: 14, fontSize: 12, color: theme.textMuted }}>
            <span style={{ cursor: "pointer" }}>Privacy</span>
            <span style={{ cursor: "pointer" }}>Terms</span>
            <span style={{ cursor: "pointer" }}>Contact</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";
import SeoContent from "./SeoContent";

function gcd(a: number, b: number): number { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
function lcm(a: number, b: number) { return Math.abs(a * b) / gcd(a, b); }

function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [n, d];
  if (n === 0) return [0, 1];
  const sign = (d < 0) ? -1 : 1;
  const g = gcd(Math.abs(n), Math.abs(d));
  return [sign * n / g, sign * d / g];
}

function toMixed(n: number, d: number): string {
  if (d === 0) return "undefined";
  const [sn, sd] = simplify(n, d);
  if (sd === 1) return sn.toString();
  const neg = sn < 0;
  const absN = Math.abs(sn);
  const whole = Math.floor(absN / sd);
  const rem = absN % sd;
  if (whole === 0) return `${neg ? "-" : ""}${rem}/${sd}`;
  if (rem === 0) return `${neg ? "-" : ""}${whole}`;
  return `${neg ? "-" : ""}${whole} ${rem}/${sd}`;
}

type Op = "+" | "-" | "*" | "/";

function compute(n1: number, d1: number, n2: number, d2: number, op: Op): { num: number; den: number; steps: string[] } {
  const steps: string[] = [];
  let rn: number, rd: number;

  steps.push(`${n1}/${d1} ${op} ${n2}/${d2}`);

  if (op === "+") {
    const cd = lcm(d1, d2);
    const nn1 = n1 * (cd / d1);
    const nn2 = n2 * (cd / d2);
    steps.push(`Common denominator: ${cd}`);
    steps.push(`${nn1}/${cd} + ${nn2}/${cd}`);
    rn = nn1 + nn2;
    rd = cd;
    steps.push(`= ${rn}/${rd}`);
  } else if (op === "-") {
    const cd = lcm(d1, d2);
    const nn1 = n1 * (cd / d1);
    const nn2 = n2 * (cd / d2);
    steps.push(`Common denominator: ${cd}`);
    steps.push(`${nn1}/${cd} - ${nn2}/${cd}`);
    rn = nn1 - nn2;
    rd = cd;
    steps.push(`= ${rn}/${rd}`);
  } else if (op === "*") {
    rn = n1 * n2;
    rd = d1 * d2;
    steps.push(`Multiply: (${n1} x ${n2}) / (${d1} x ${d2})`);
    steps.push(`= ${rn}/${rd}`);
  } else {
    if (n2 === 0) return { num: 0, den: 0, steps: [...steps, "Cannot divide by zero."] };
    rn = n1 * d2;
    rd = d1 * n2;
    steps.push(`Flip and multiply: ${n1}/${d1} x ${d2}/${n2}`);
    steps.push(`= ${rn}/${rd}`);
  }

  const [sn, sd] = simplify(rn, rd);
  if (sn !== rn || sd !== rd) {
    const g = gcd(Math.abs(rn), Math.abs(rd));
    steps.push(`Simplify (GCD = ${g}): ${sn}/${sd}`);
  }
  return { num: sn, den: sd, steps };
}

function parseMixed(whole: string, num: string, den: string): [number, number] {
  const w = parseInt(whole) || 0;
  const n = parseInt(num) || 0;
  const d = parseInt(den) || 1;
  if (d === 0) return [0, 0];
  const sign = w < 0 ? -1 : 1;
  return [sign * (Math.abs(w) * d + n), d];
}

export default function ClientPage() {
  const [w1, setW1] = useState("");
  const [n1, setN1] = useState("1");
  const [d1, setD1] = useState("2");
  const [w2, setW2] = useState("");
  const [n2, setN2] = useState("1");
  const [d2, setD2] = useState("3");
  const [op, setOp] = useState<Op>("+");

  const [f1n, f1d] = parseMixed(w1, n1, d1);
  const [f2n, f2d] = parseMixed(w2, n2, d2);
  const valid = f1d !== 0 && f2d !== 0;
  const result = valid ? compute(f1n, f1d, f2n, f2d, op) : null;

  const decimal = result && result.den !== 0 ? (result.num / result.den) : null;
  const percentage = decimal !== null ? decimal * 100 : null;

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700 as const, color: "#1C1917", marginBottom: 4 },
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 },
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 },
    label: { fontSize: 13, fontWeight: 600 as const, color: "#1C1917", marginBottom: 6, display: "block" as const },
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none", textAlign: "center" as const, boxSizing: "border-box" as const },
    opBtn: (active: boolean) => ({ background: active ? "#0D9488" : "#F5F5F4", color: active ? "#fff" : "#1C1917", border: active ? "2px solid #0D9488" : "1px solid #E7E5E4", borderRadius: 8, width: 44, height: 44, fontSize: 20, cursor: "pointer" as const, fontWeight: 600 as const, display: "flex" as const, alignItems: "center" as const, justifyContent: "center" as const }),
    resultCard: { background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: 10, padding: 20, marginTop: 16 },
    fractionBox: { display: "flex" as const, flexDirection: "column" as const, alignItems: "center" as const, gap: 4 },
    divider: { width: 40, height: 2, background: "#1C1917" },
  };

  const FractionInput = ({ w, n, d, setW, setN, setD, label }: { w: string; n: string; d: string; setW: (v: string) => void; setN: (v: string) => void; setD: (v: string) => void; label: string }) => (
    <div>
      <label style={s.label}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <input type="number" value={w} onChange={e => setW(e.target.value)} placeholder="0" style={{ ...s.input, width: 56 }} title="Whole number (optional)" />
        <div style={s.fractionBox}>
          <input type="number" value={n} onChange={e => setN(e.target.value)} style={{ ...s.input, width: 56 }} title="Numerator" />
          <div style={s.divider} />
          <input type="number" value={d} onChange={e => setD(e.target.value)} style={{ ...s.input, width: 56 }} title="Denominator" />
        </div>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <ToolSchema name="Fraction Calculator" description="Add, subtract, multiply, divide fractions with step-by-step solutions." slug="fraction-calculator" category="Education Tools" />
      <BreadcrumbSchema items={[{ name: "Home", url: "https://toolcraftkit.com" }, { name: "Tools", url: "https://toolcraftkit.com/tools" }, { name: "Fraction Calculator", url: "https://toolcraftkit.com/tools/fraction-calculator" }]} />
      <h1 style={s.h1}>Fraction Calculator</h1>
      <p style={s.sub}>Add, subtract, multiply, or divide fractions with step-by-step solutions.</p>

      <div style={s.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", justifyContent: "center", marginBottom: 20 }}>
          <FractionInput w={w1} n={n1} d={d1} setW={setW1} setN={setN1} setD={setD1} label="Fraction 1" />

          <div style={{ display: "flex", gap: 4, alignSelf: "flex-end", paddingBottom: 4 }}>
            {(["+", "-", "*", "/"] as Op[]).map(o => (
              <button key={o} onClick={() => setOp(o)} style={s.opBtn(op === o)}>{o === "*" ? "×" : o === "/" ? "÷" : o}</button>
            ))}
          </div>

          <FractionInput w={w2} n={n2} d={d2} setW={setW2} setN={setN2} setD={setD2} label="Fraction 2" />
        </div>

        {result && result.den !== 0 && (
          <div style={s.resultCard}>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 13, color: "#57534E", marginBottom: 4 }}>Result</div>
              <div style={{ fontSize: 36, fontWeight: 700, color: "#0D9488" }}>
                {result.den === 1 ? result.num : `${result.num}/${result.den}`}
              </div>
              {result.den !== 1 && Math.abs(result.num) > result.den && (
                <div style={{ fontSize: 18, color: "#1C1917", marginTop: 4 }}>= {toMixed(result.num, result.den)}</div>
              )}
            </div>

            {/* Step by step */}
            <div style={{ background: "#fff", borderRadius: 8, padding: 14, border: "1px solid #E7E5E4", marginBottom: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>Step-by-Step Solution</div>
              {result.steps.map((step, i) => (
                <div key={i} style={{ fontSize: 13, color: i === result.steps.length - 1 ? "#0D9488" : "#57534E", fontWeight: i === result.steps.length - 1 ? 600 : 400, marginBottom: 4, fontFamily: "monospace" }}>{step}</div>
              ))}
            </div>

            {/* Conversions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, textAlign: "center" }}>
              <div style={{ padding: 10, background: "#fff", borderRadius: 8, border: "1px solid #E7E5E4" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1C1917" }}>{result.num}/{result.den}</div>
                <div style={{ fontSize: 11, color: "#78716C" }}>Fraction</div>
              </div>
              <div style={{ padding: 10, background: "#fff", borderRadius: 8, border: "1px solid #E7E5E4" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1C1917" }}>{decimal !== null ? decimal.toFixed(6).replace(/0+$/, "").replace(/\.$/, "") : "-"}</div>
                <div style={{ fontSize: 11, color: "#78716C" }}>Decimal</div>
              </div>
              <div style={{ padding: 10, background: "#fff", borderRadius: 8, border: "1px solid #E7E5E4" }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1C1917" }}>{percentage !== null ? percentage.toFixed(4).replace(/0+$/, "").replace(/\.$/, "") + "%" : "-"}</div>
                <div style={{ fontSize: 11, color: "#78716C" }}>Percentage</div>
              </div>
            </div>
          </div>
        )}

        {result && result.den === 0 && (
          <div style={{ marginTop: 12, color: "#EF4444", fontSize: 13, textAlign: "center" }}>Cannot divide by zero.</div>
        )}
      </div>
      <SeoContent />
    </div>
  );
}

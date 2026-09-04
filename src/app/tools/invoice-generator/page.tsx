"use client";
import { useState } from "react";
import { ToolSchema, BreadcrumbSchema } from "@/app/components/JsonLd";

interface Item { desc: string; qty: number; price: number; }

export default function Page() {
  const [from, setFrom] = useState({ name: "", email: "", address: "" });
  const [to, setTo] = useState({ name: "", email: "", address: "" });
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState<Item[]>([{ desc: "", qty: 1, price: 0 }]);
  const [taxRate, setTaxRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [currency, setCurrency] = useState("$");

  const addItem = () => setItems([...items, { desc: "", qty: 1, price: 0 }]);
  const removeItem = (i: number) => setItems(items.filter((_, idx) => idx !== i));
  const updateItem = (i: number, field: keyof Item, val: string | number) => {
    const updated = [...items];
    if (field === "desc") updated[i].desc = val as string;
    else if (field === "qty") updated[i].qty = +val || 0;
    else updated[i].price = +val || 0;
    setItems(updated);
  };

  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;
  const fmt = (n: number) => currency + n.toFixed(2);

  const printInvoice = () => {
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(`<!DOCTYPE html><html><head><title>Invoice ${invoiceNo}</title><style>
      body{font-family:Arial,sans-serif;max-width:800px;margin:0 auto;padding:40px;color:#1C1917}
      .header{display:flex;justify-content:space-between;margin-bottom:32px}
      .label{font-size:12px;color:#78716C;margin-bottom:2px}
      .val{font-size:14px;font-weight:600}
      table{width:100%;border-collapse:collapse;margin:24px 0}
      th{background:#F5F5F4;text-align:left;padding:10px;font-size:13px;border-bottom:2px solid #E7E5E4}
      td{padding:10px;font-size:13px;border-bottom:1px solid #E7E5E4}
      .right{text-align:right}
      .total-row{font-weight:700;font-size:16px;color:#0D9488}
      .notes{margin-top:32px;padding:16px;background:#FAFAF9;border-radius:8px;font-size:13px;color:#57534E}
      @media print{body{padding:20px}}
    </style></head><body>
      <div class="header">
        <div><h1 style="font-size:28px;margin:0 0 16px;color:#0D9488">INVOICE</h1>
          <div class="label">From</div><div class="val">${from.name}</div><div style="font-size:13px;color:#57534E;white-space:pre-line">${from.address}</div>${from.email ? `<div style="font-size:13px">${from.email}</div>` : ""}
        </div>
        <div style="text-align:right">
          <div class="label">Invoice #</div><div class="val">${invoiceNo}</div>
          <div class="label" style="margin-top:8px">Date</div><div class="val">${invoiceDate}</div>
          ${dueDate ? `<div class="label" style="margin-top:8px">Due</div><div class="val">${dueDate}</div>` : ""}
        </div>
      </div>
      <div style="margin-bottom:24px"><div class="label">Bill To</div><div class="val">${to.name}</div><div style="font-size:13px;color:#57534E;white-space:pre-line">${to.address}</div>${to.email ? `<div style="font-size:13px">${to.email}</div>` : ""}</div>
      <table><thead><tr><th>Description</th><th class="right">Qty</th><th class="right">Price</th><th class="right">Amount</th></tr></thead><tbody>
        ${items.map((item) => `<tr><td>${item.desc}</td><td class="right">${item.qty}</td><td class="right">${fmt(item.price)}</td><td class="right">${fmt(item.qty * item.price)}</td></tr>`).join("")}
      </tbody></table>
      <div style="display:flex;justify-content:flex-end">
        <div style="min-width:200px">
          <div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px"><span>Subtotal</span><span>${fmt(subtotal)}</span></div>
          ${taxRate > 0 ? `<div style="display:flex;justify-content:space-between;padding:6px 0;font-size:14px"><span>Tax (${taxRate}%)</span><span>${fmt(tax)}</span></div>` : ""}
          <div style="display:flex;justify-content:space-between;padding:10px 0;border-top:2px solid #1C1917" class="total-row"><span>Total</span><span>${fmt(total)}</span></div>
        </div>
      </div>
      ${notes ? `<div class="notes"><strong>Notes:</strong><br>${notes}</div>` : ""}
    </body></html>`);
    win.document.close();
    win.print();
  };

  const s = {
    page: { maxWidth: 720, margin: "0 auto", padding: "32px 20px" } as const,
    h1: { fontSize: 28, fontWeight: 700, color: "#1C1917", marginBottom: 4 } as const,
    sub: { fontSize: 14, color: "#78716C", marginBottom: 24 } as const,
    card: { background: "#fff", border: "1px solid #E7E5E4", borderRadius: 10, padding: 20, marginBottom: 16 } as const,
    label: { fontSize: 13, fontWeight: 600, color: "#1C1917", marginBottom: 6, display: "block" } as const,
    btn: { background: "#0D9488", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" } as const,
    btnSm: { background: "#F5F5F4", color: "#1C1917", border: "1px solid #E7E5E4", borderRadius: 6, padding: "6px 14px", fontSize: 13, cursor: "pointer" } as const,
    input: { width: "100%", border: "1px solid #E7E5E4", borderRadius: 8, padding: "10px 12px", fontSize: 14, outline: "none" } as const,
    inputSm: { border: "1px solid #E7E5E4", borderRadius: 6, padding: "8px 10px", fontSize: 13, outline: "none", width: "100%" } as const,
  };

  return (
    <div style={s.page}>
      <ToolSchema
        name="Invoice Generator"
        description="Create professional invoices instantly. Print or save as PDF for free. No signup required."
        slug="invoice-generator"
        category="BusinessApplication"
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://toolcraftkit.com" },
          { name: "Business Tools", url: "https://toolcraftkit.com/#business-tools" },
          { name: "Invoice Generator", url: "https://toolcraftkit.com/tools/invoice-generator" },
        ]}
      />
      <h1 style={s.h1}>Invoice Generator</h1>
      <p style={s.sub}>Create professional invoices in seconds. Print or save as PDF.</p>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
        <div style={{ ...s.card, flex: 1, minWidth: 280 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>From (Your Details)</h3>
          <div style={{ marginBottom: 10 }}><label style={s.label}>Name / Business</label><input type="text" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} style={s.input} placeholder="Your Business Name" /></div>
          <div style={{ marginBottom: 10 }}><label style={s.label}>Email</label><input type="email" value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} style={s.input} placeholder="you@email.com" /></div>
          <div><label style={s.label}>Address</label><textarea value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} style={{ ...s.input, minHeight: 60, resize: "vertical" as const }} placeholder="Street, City, Country" /></div>
        </div>
        <div style={{ ...s.card, flex: 1, minWidth: 280 }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Bill To (Client)</h3>
          <div style={{ marginBottom: 10 }}><label style={s.label}>Name / Business</label><input type="text" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} style={s.input} placeholder="Client Name" /></div>
          <div style={{ marginBottom: 10 }}><label style={s.label}>Email</label><input type="email" value={to.email} onChange={(e) => setTo({ ...to, email: e.target.value })} style={s.input} placeholder="client@email.com" /></div>
          <div><label style={s.label}>Address</label><textarea value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} style={{ ...s.input, minHeight: 60, resize: "vertical" as const }} placeholder="Street, City, Country" /></div>
        </div>
      </div>

      <div style={s.card}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 120 }}><label style={s.label}>Invoice #</label><input type="text" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} style={s.input} /></div>
          <div style={{ flex: 1, minWidth: 120 }}><label style={s.label}>Date</label><input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} style={s.input} /></div>
          <div style={{ flex: 1, minWidth: 120 }}><label style={s.label}>Due Date</label><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} style={s.input} /></div>
          <div style={{ minWidth: 80 }}><label style={s.label}>Currency</label>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ ...s.input, cursor: "pointer" }}>
              {["$", "€", "£", "CA$", "A$", "R$", "¥"].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <label style={s.label}>Items</label>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #E7E5E4" }}>
                <th style={{ textAlign: "left", padding: "8px 6px", fontSize: 12, color: "#78716C" }}>Description</th>
                <th style={{ textAlign: "right", padding: "8px 6px", fontSize: 12, color: "#78716C", width: 70 }}>Qty</th>
                <th style={{ textAlign: "right", padding: "8px 6px", fontSize: 12, color: "#78716C", width: 100 }}>Price</th>
                <th style={{ textAlign: "right", padding: "8px 6px", fontSize: 12, color: "#78716C", width: 100 }}>Amount</th>
                <th style={{ width: 36 }}></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #F5F5F4" }}>
                  <td style={{ padding: "6px" }}><input type="text" value={item.desc} onChange={(e) => updateItem(i, "desc", e.target.value)} placeholder="Item description" style={s.inputSm} /></td>
                  <td style={{ padding: "6px" }}><input type="number" value={item.qty || ""} onChange={(e) => updateItem(i, "qty", e.target.value)} style={{ ...s.inputSm, textAlign: "right" }} /></td>
                  <td style={{ padding: "6px" }}><input type="number" value={item.price || ""} onChange={(e) => updateItem(i, "price", e.target.value)} style={{ ...s.inputSm, textAlign: "right" }} step="0.01" /></td>
                  <td style={{ padding: "6px", textAlign: "right", fontSize: 14, fontWeight: 600 }}>{fmt(item.qty * item.price)}</td>
                  <td style={{ padding: "6px" }}>{items.length > 1 && <button onClick={() => removeItem(i)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer", fontSize: 16 }}>✕</button>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={addItem} style={{ ...s.btnSm, marginTop: 8 }}>+ Add Item</button>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
          <div style={{ minWidth: 220 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 14 }}><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 0", fontSize: 14, gap: 8 }}>
              <span>Tax</span>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <input type="number" value={taxRate || ""} onChange={(e) => setTaxRate(+e.target.value || 0)} style={{ ...s.inputSm, width: 60, textAlign: "right" }} />
                <span>%</span>
              </div>
              <span>{fmt(tax)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderTop: "2px solid #1C1917", fontSize: 18, fontWeight: 700, color: "#0D9488" }}><span>Total</span><span>{fmt(total)}</span></div>
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <label style={s.label}>Notes (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={{ ...s.input, minHeight: 60, resize: "vertical" as const }} placeholder="Payment terms, bank details, thank you message..." />
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button onClick={printInvoice} style={s.btn}>Print / Save as PDF</button>
        </div>
      </div>

      <div style={{ ...s.card, marginTop: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 8 }}>About This Tool</h2>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7, marginBottom: 12 }}>Create clean, professional invoices without any software. Fill in your details, add line items, set tax rates, and print or save as PDF using your browser&apos;s built-in print function. Supports multiple currencies.</p>
        <p style={{ fontSize: 14, color: "#57534E", lineHeight: 1.7 }}>Everything runs in your browser. No data is sent to any server, stored, or tracked. Your invoice details stay completely private.</p>
      </div>

      <div style={{ ...s.card, marginTop: 16 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, color: "#1C1917", marginBottom: 12 }}>Frequently Asked Questions</h2>
        {[
          { q: "Can I save the invoice as a PDF?", a: "Yes. Click 'Print / Save as PDF' and choose 'Save as PDF' in your browser's print dialog. This works in Chrome, Firefox, Edge, and Safari." },
          { q: "Is this invoice legally valid?", a: "This tool generates a standard invoice format. Legal requirements vary by country. Check your local regulations for required fields like tax IDs or registration numbers." },
          { q: "Is my data private?", a: "Completely. Everything runs in your browser. No data is sent to any server. Your business and client information is never stored or shared." },
        ].map((faq, i) => (
          <div key={i} style={{ marginBottom: i < 2 ? 14 : 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1C1917", marginBottom: 4 }}>{faq.q}</h3>
            <p style={{ fontSize: 13, color: "#57534E", lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

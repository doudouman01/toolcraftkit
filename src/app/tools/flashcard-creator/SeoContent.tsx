"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Flashcard Creator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Add cards one by one with a front (question or term) and back (answer or definition). Or import multiple cards at once from text using the format Term: Definition, one per line. Switch to Study mode to flip through your cards, shuffle them, and test your knowledge. Export your cards as a text file to review later.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Flashcards Are One of the Best Study Methods</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Flashcards leverage active recall and spaced repetition, two of the most evidence-backed learning techniques. When you try to remember an answer before flipping the card, you strengthen the neural pathways for that piece of knowledge. Shuffling the deck prevents you from memorizing the order instead of the content. Studies show that students who use flashcards consistently outperform those who rely on passive re-reading.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Students preparing for exams — vocabulary, formulas, historical dates</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Language learners memorizing new words and phrases</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Professionals studying for certifications and licensing exams</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Teachers creating study materials for students</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Anyone who needs to memorize facts, concepts, or terminology quickly</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Combine flashcards with our <a href='/tools/typing-speed-test' style='color:#0D9488'>Typing Speed Test</a> for a more interactive study session, or use our <a href='/tools/citation-generator' style='color:#0D9488'>Citation Generator</a> to properly reference the materials you study.` }} />
      </div>
    </section>
  );
}

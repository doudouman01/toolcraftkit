"use client";
export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Quiz Generator</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Select a topic (Science, History, Technology, or Geography), choose the number of questions, difficulty level, and question type (multiple choice, true/false, or a mix). Click Generate to create your quiz. Answer each question one at a time, then submit to see your score and review correct answers.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Quizzes Help You Learn</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Active recall through quizzes is one of the most effective study methods. Research consistently shows that testing yourself on material leads to better long-term retention than re-reading or highlighting. The Quiz Generator provides instant feedback so you can identify gaps in your knowledge and focus your study time.</p>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Students preparing for exams in science, history, or geography</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Teachers creating quick knowledge checks for their class</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Trivia enthusiasts looking for a quick challenge</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Self-learners testing their understanding of a new topic</li>
      </ul>
      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Combine quizzes with our <a href='/tools/typing-speed-test' style='color:#0D9488'>Typing Speed Test</a> for a productive study break, or test your reading comprehension with our <a href='/tools/readability-score' style='color:#0D9488'>Readability Score Checker</a>.` }} />
      </div>
    </section>
  );
}

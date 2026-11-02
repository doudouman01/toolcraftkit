"use client";

export default function SeoContent() {
  return (
    <section style={{ maxWidth: "800px", margin: "48px auto 0", padding: "0 20px 60px" }}>
      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>How to Use the Text to Speech Tool</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Paste or type your text into the input area above. Select a language to filter available voices, then choose a specific voice from the dropdown. Adjust the speed slider (0.5x to 2x) and pitch slider (0.5 to 2.0) to customize how the speech sounds. Press Play to start listening. You can pause, resume, or stop at any time.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>The tool highlights the current word being spoken in real time, making it easy to follow along with the audio. This is especially useful for proofreading, language learning, and accessibility purposes.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Why Use Text to Speech?</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Text-to-speech technology makes written content accessible to people with visual impairments, dyslexia, or other reading difficulties. It also helps writers catch errors by hearing their work read aloud — mistakes that the eye skips over are often caught by the ear.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>Language learners benefit from hearing correct pronunciation at adjustable speeds. Students can listen to study materials while multitasking. Content creators can preview how their scripts sound before recording. The use cases are broad and growing.</p>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Common Use Cases</h2>
      <ul style={{ paddingLeft: "20px", marginBottom: "16px" }}>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Proofreading articles, essays, and reports by listening instead of reading</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Language learning — hear native pronunciation at slow or normal speed</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Accessibility for users with visual impairments or reading difficulties</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Previewing scripts, presentations, and video narrations before recording</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Multitasking — listen to documents while doing other tasks</li>
        <li style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "6px" }}>Helping children and early readers follow along with text</li>
      </ul>

      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Privacy Note</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }}>This tool uses the Web Speech API built into your browser. Your text is processed entirely on your device and is never sent to any external server. No data is collected, stored, or shared.</p>
      </div>

      <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#111827", marginBottom: "16px", borderBottom: "2px solid #0D9488", paddingBottom: "8px" }}>Browser Compatibility</h2>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>The Web Speech API is supported in all major modern browsers. Google Chrome offers the widest selection of voices, including high-quality neural voices. Microsoft Edge provides excellent voice quality through Microsoft's speech engine. Safari on macOS and iOS uses Apple's built-in voices. Firefox supports the API with system-installed voices.</p>
      <p style={{ fontSize: "15px", lineHeight: "1.7", color: "#374151", marginBottom: "12px" }}>To expand your available voices, check your operating system's accessibility or language settings. On macOS, go to System Settings, then Accessibility, then Spoken Content to download additional voices. On Windows, go to Settings, then Time &amp; Language, then Speech to add more voice packs.</p>

      <div style={{ background: "#f0fdfa", border: "1px solid #99f6e4", borderRadius: "8px", padding: "16px", marginTop: "16px", marginBottom: "16px" }}>
        <div style={{ fontSize: "14px", fontWeight: 600, color: "#0D9488", marginBottom: "4px" }}>Pro Tip</div>
        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#374151", margin: 0 }} dangerouslySetInnerHTML={{ __html: `Use this tool alongside our <a href='/tools/word-counter' style='color:#0D9488'>Word Counter</a> to check word count and estimated speaking time before reading aloud, or pair it with our <a href='/tools/text-compare' style='color:#0D9488'>Text Compare</a> tool to review edits by listening to both versions.` }} />
      </div>
    </section>
  );
}

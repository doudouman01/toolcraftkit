"use client";

const sec = {
  wrap: { maxWidth: 760, margin: "40px auto 0", padding: "0 0 40px" } as const,
  h2: { fontSize: 22, fontWeight: 700 as const, color: "#1C1917", marginBottom: 12, marginTop: 32 },
  h3: { fontSize: 17, fontWeight: 600 as const, color: "#1C1917", marginBottom: 8, marginTop: 24 },
  p: { fontSize: 15, lineHeight: 1.75, color: "#44403C", marginBottom: 12 },
  ul: { paddingLeft: 20, marginBottom: 12 },
  li: { fontSize: 15, lineHeight: 1.75, color: "#44403C", marginBottom: 6 },
};

export default function SeoContent() {
  return (
    <div style={sec.wrap}>
      <h2 style={sec.h2}>What Is an SRT File?</h2>
      <p style={sec.p}>
        SRT (SubRip Subtitle) is the most widely used subtitle file format in the world. It is a simple plain-text format that contains sequentially numbered subtitle blocks, each with a timecode range and the text to display. SRT files are supported by virtually every video player, editing software, and online platform including YouTube, Vimeo, Facebook, and LinkedIn.
      </p>

      <h3 style={sec.h3}>SRT File Format Structure</h3>
      <p style={sec.p}>
        Each subtitle entry in an SRT file consists of three parts: a sequence number, a timecode line showing when the subtitle appears and disappears (in HH:MM:SS,mmm format separated by an arrow), and one or more lines of text. Entries are separated by a blank line. This simplicity makes SRT files easy to create, edit, and parse.
      </p>

      <h2 style={sec.h2}>Why Add Subtitles to Your Videos?</h2>

      <h3 style={sec.h3}>Accessibility</h3>
      <p style={sec.p}>
        Subtitles make your content accessible to deaf and hard-of-hearing viewers. They also help non-native speakers follow along. Adding captions to your videos is not only inclusive but increasingly required by accessibility regulations and platform guidelines.
      </p>

      <h3 style={sec.h3}>SEO and Discoverability</h3>
      <p style={sec.p}>
        Search engines cannot watch your videos, but they can read your subtitle files. Uploading SRT files to YouTube and other platforms allows search engines to index the spoken content of your videos, improving your rankings for relevant keywords and driving organic traffic.
      </p>

      <h3 style={sec.h3}>Engagement and Retention</h3>
      <p style={sec.p}>
        Studies show that videos with subtitles receive significantly higher engagement. Many viewers watch videos on mute, especially on social media. Captions ensure your message reaches them regardless of their sound settings.
      </p>

      <h2 style={sec.h2}>How to Use This Subtitle Generator</h2>
      <ul style={sec.ul}>
        <li style={sec.li}>Click &quot;Add Subtitle&quot; to create a new subtitle entry with start time, end time, and text.</li>
        <li style={sec.li}>Set a default duration to automatically fill end times when you enter a start time.</li>
        <li style={sec.li}>Use &quot;Shift All Timecodes&quot; to move every subtitle forward or backward by a set number of seconds.</li>
        <li style={sec.li}>Import an existing SRT file to edit and refine your subtitles.</li>
        <li style={sec.li}>Preview your subtitles in the dark preview panel, then download the .srt file or copy to clipboard.</li>
      </ul>

      <h2 style={sec.h2}>Where to Upload Your SRT File</h2>
      <p style={sec.p}>
        Once you have downloaded your SRT file, you can upload it to YouTube (via YouTube Studio &gt; Subtitles), Vimeo, Facebook, LinkedIn, or any video hosting platform that supports closed captions. Most video editors like Premiere Pro, DaVinci Resolve, and Final Cut Pro also support importing SRT files directly into your timeline.
      </p>
    </div>
  );
}

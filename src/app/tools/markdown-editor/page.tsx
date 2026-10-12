import type { Metadata } from "next";
import MarkdownEditor from "./MarkdownEditor";

export const metadata: Metadata = {
  title: "Markdown Editor & Previewer — Write & Preview Markdown Free | ToolCraftKit",
  description: "Free online Markdown editor with live preview. Write Markdown, see formatted output instantly. Toolbar, copy HTML, word count. No signup required.",
  openGraph: {
    title: "Markdown Editor & Previewer — Write & Preview Markdown Free | ToolCraftKit",
    description: "Free online Markdown editor with live preview. Write Markdown, see formatted output instantly. Toolbar, copy HTML, word count. No signup required.",
    url: "https://toolcraftkit.com/tools/markdown-editor",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Markdown Editor & Previewer — Write & Preview Markdown Free | ToolCraftKit",
    description: "Free online Markdown editor with live preview. Write Markdown, see formatted output instantly. Toolbar, copy HTML, word count. No signup required.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/markdown-editor",
  },
};

export default function Page() {
  return <MarkdownEditor />;
}

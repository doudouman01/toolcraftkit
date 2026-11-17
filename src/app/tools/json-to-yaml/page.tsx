import { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "JSON to YAML Converter — Convert JSON & YAML Online Free | ToolCraftKit",
  description: "Convert between JSON and YAML formats instantly. Syntax highlighting, copy output. 100% client-side. Free.",
  openGraph: {
    title: "JSON to YAML Converter — Convert JSON & YAML Online Free | ToolCraftKit",
    description: "Convert between JSON and YAML formats instantly. Syntax highlighting, copy output.",
    url: "https://toolcraftkit.com/tools/json-to-yaml",
    siteName: "ToolCraftKit",
    type: "website",
  },
  alternates: { canonical: "https://toolcraftkit.com/tools/json-to-yaml" },
};

export default function Page() {
  return <ClientPage />;
}

import type { Metadata } from "next";
import JsonFormatter from "./JsonFormatter.jsx";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Format, Minify, Validate JSON",
  description: "Free online JSON formatter and validator. Syntax highlighting, minification, error detection, structure stats. Paste and format instantly.",
  openGraph: {
    title: 'JSON Formatter & Validator — Format, Minify, Validate JSON',
    description: 'Free online JSON formatter and validator. Syntax highlighting, minification, error detection, structure stats. Paste and format instantly.',
    url: 'https://toolcraftkit.com/tools/json-formatter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <JsonFormatter />
    </>
  );
}

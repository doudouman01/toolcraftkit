import type { Metadata } from "next";
import TextCaseConverter from "./TextCaseConverter.jsx";

export const metadata: Metadata = {
  title: "Text Case Converter — UPPERCASE, lowercase, Title Case, camelCase",
  description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case and 10+ formats. Free, instant, no signup.",
  openGraph: {
    title: 'Text Case Converter — UPPERCASE, lowercase, Title Case, camelCase',
    description: 'Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case and 10+ formats. Free, instant, no signup.',
    url: 'https://toolcraftkit.com/tools/text-case-converter',
    siteName: 'ToolCraftKit',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <TextCaseConverter />
    </>
  );
}

import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import TextCaseConverter from "./TextCaseConverter.jsx";

export const metadata: Metadata = {
  title: "Text Case Converter — UPPERCASE, lowercase, Title Case, camelCase",
  description: "Convert text between uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case and 10+ formats. Free, instant, no signup.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb toolSlug="text-case-converter" toolName="Text Case Converter" />
      <TextCaseConverter />
    </>
  );
}

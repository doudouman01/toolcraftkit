import type { Metadata } from "next";
import JsonFormatter from "./JsonFormatter.jsx";

export const metadata: Metadata = {
  title: "JSON Formatter & Validator — Format, Minify, Validate JSON",
  description: "Free online JSON formatter and validator. Syntax highlighting, minification, error detection, structure stats. Paste and format instantly.",
};

export default function Page() { return <JsonFormatter />; }

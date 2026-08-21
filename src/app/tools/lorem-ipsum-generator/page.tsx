import type { Metadata } from "next";
import LoremIpsum from "./LoremIpsum.jsx";

export const metadata: Metadata = {
  title: "Lorem Ipsum Generator — Placeholder Text for Designers",
  description: "Generate Lorem Ipsum placeholder text. Paragraphs, sentences, words, or lists. With or without HTML tags. Free online tool.",
};

export default function Page() { return <LoremIpsum />; }

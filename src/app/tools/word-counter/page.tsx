import type { Metadata } from "next";
import WordCounter from "./WordCounter.jsx";

export const metadata: Metadata = {
  title: "Word Counter — Count Words, Characters, Sentences Online",
  description: "Free online word counter. Count words, characters, sentences, paragraphs. Reading time, keyword density, readability score. No signup required.",
};

export default function Page() { return <WordCounter />; }

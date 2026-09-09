import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import WordCounter from "./WordCounter.jsx";

export const metadata: Metadata = {
  title: "Word Counter — Count Words, Characters, Sentences Online",
  description: "Free online word counter. Count words, characters, sentences, paragraphs. Reading time, keyword density, readability score. No signup required.",
};

export default function Page() {
  return (
    <>
      <Breadcrumb toolSlug="word-counter" toolName="Word Counter" />
      <WordCounter />
    </>
  );
}

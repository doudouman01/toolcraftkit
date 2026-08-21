import type { Metadata } from "next";
import CharacterCounter from "./CharacterCounter.jsx";

export const metadata: Metadata = {
  title: "Character Counter — Count Characters With & Without Spaces",
  description: "Free online character counter. Count characters with and without spaces. Check against Twitter, Instagram, Google, LinkedIn character limits.",
};

export default function Page() { return <CharacterCounter />; }

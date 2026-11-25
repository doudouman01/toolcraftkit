import type { Metadata } from "next";
import ClientPage from "./ClientPage";

export const metadata: Metadata = {
  title: "Quiz Generator — Create Quizzes on Any Topic Free | ToolCraftKit",
  description: "Generate interactive quizzes on any topic. Choose difficulty, question count, and type. Take the quiz, get scored, and review answers. Free online.",
  openGraph: {
    title: "Quiz Generator — Create Quizzes on Any Topic Free | ToolCraftKit",
    description: "Generate interactive quizzes on any topic. Choose difficulty, question count, and type. Take the quiz, get scored, and review answers.",
    url: "https://toolcraftkit.com/tools/quiz-generator",
    siteName: "ToolCraftKit",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Quiz Generator — Create Quizzes on Any Topic Free | ToolCraftKit",
    description: "Generate interactive quizzes on any topic. Multiple choice, true/false, scored results.",
  },
  alternates: {
    canonical: "https://toolcraftkit.com/tools/quiz-generator",
  },
};

export default function Page() {
  return <ClientPage />;
}

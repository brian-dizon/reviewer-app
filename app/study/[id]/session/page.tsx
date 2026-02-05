import StudySession from "@/components/study/study-session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

// Fisher-Yates Shuffle Algorithm for true randomness
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: deckId } = await params;

  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    select: {
      cards: true,
      title: true,
    },
  });

  if (!deck || deck.cards.length === 0) {
    redirect(`/study/${deckId}`);
  }

  // Shuffle the cards before starting the session
  const shuffledCards = shuffleArray(deck.cards);

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-[calc(100vh-64px)]">
      <StudySession deckTitle={deck.title} cards={shuffledCards} />
    </div>
  );
}

import StudySession from "@/components/study/study-session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: deckId } = await params;

  // Use findUnique for searching by ID
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    select: {
      cards: true,
      title: true,
    },
  });

  // If deck is missing or has no cards, redirect back to the study page
  if (!deck || deck.cards.length === 0) {
    redirect(`/study/${deckId}`);
  }

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 min-h-[calc(100vh-64px)]">
      <StudySession deckTitle={deck.title} cards={deck.cards} />
    </div>
  );
}
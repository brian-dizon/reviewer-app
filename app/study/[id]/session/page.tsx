import StudySession from "@/components/study/study-session";
import { prisma } from "@/lib/db";

export default async function SessionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: deckId } = await params;

  const deck = await prisma.deck.findMany({
    where: { id: deckId },
    select: {
      cards: true,
      title: true,
    },
  });

  if (!deck) return { error: "Deck not found." };

  return <StudySession deckTitle={deck[0].title} cards={deck[0].cards} />;
}

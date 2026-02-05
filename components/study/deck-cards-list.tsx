import { prisma } from "@/lib/db";
import CardsView from "./cards-view";

interface DeckCardsListProps {
  deckId: string;
  canManage: boolean;
}

export default async function DeckCardsList({ deckId, canManage }: DeckCardsListProps) {
  // Fetch only the cards
  const cards = await prisma.flashcard.findMany({
    where: { deckId },
    orderBy: { createdAt: "desc" }, // Optional: Default sort
  });

  return <CardsView cards={cards} isOwner={canManage} />;
}

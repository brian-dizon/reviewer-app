import { prisma } from "@/lib/db";
import { checkAdmin } from "@/lib/is-admin";
import DeckCard from "@/app/dashboard/deck-card";

export default async function PublicDeckList() {
  const isAdmin = await checkAdmin();

  const decks = await prisma.deck.findMany({
    where: isAdmin ? {} : { visibility: "PUBLIC" },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { cards: true },
      },
    },
    take: 50,
  });

  if (decks.length === 0) {
    return (
      <div className="text-center py-20 bg-white dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
        <p className="text-zinc-500">The library is currently empty. Be the first to share a deck!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
        <DeckCard key={deck.id} deck={deck} />
      ))}
    </div>
  );
}

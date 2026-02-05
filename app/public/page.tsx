import { prisma } from "@/lib/db";
import DeckCard from "@/app/dashboard/deck-card";
import { Globe } from "lucide-react";
import { checkAdmin } from "@/lib/is-admin";

export default async function PublicLibraryPage() {
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

  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
        {/* Header Section */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 mb-1">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Community</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Public Library</h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl">Explore {decks.length} community-created decks. Master new subjects with resources shared by learners worldwide.</p>
        </div>

        {/* Content Section */}
        {decks.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-zinc-500">The library is currently empty. Be the first to share a deck!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

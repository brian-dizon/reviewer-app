import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import DeckCard from "../dashboard/deck-card";

export default async function RecentlyPublishedSection() {
  const { userId } = await auth();
  const href = userId ? "/dashboard" : "/sign-in";

  // Fetch 3 latest public decks
  const latestDecks = await prisma.deck.findMany({
    where: { visibility: "PUBLIC" },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      _count: {
        select: { cards: true },
      },
    },
  });

  return (
    <>
      {/* Latest Decks Section */}
      {latestDecks.length > 0 && (
        <section className="py-20 px-4 max-w-6xl mx-auto w-full space-y-8">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-zinc-900 dark:text-zinc-50" />
              <h2 className="text-2xl font-bold tracking-tight">Recently Published</h2>
            </div>
            <Button variant="link" asChild className="text-zinc-500">
              <Link href="/public">View all library →</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestDecks.map((deck) => (
              <DeckCard key={deck.id} deck={deck} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

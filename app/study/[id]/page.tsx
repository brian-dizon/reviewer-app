import { prisma } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import BackToDashboard from "@/components/global/back-to-dashboard";
import DeckIsMissing from "./deck-is-missing";
import DeckIsPrivate from "./deck-is-private";
import DeckHero from "./deck-hero";
import { checkAdmin } from "@/lib/is-admin";
import { Suspense } from "react";
import DeckCardsList from "@/components/study/deck-cards-list";
import { Skeleton } from "@/components/ui/skeleton";

export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: deckId } = await params;
  const { userId: deckUserId } = await auth();

  // Optimized Query: Fetch metadata + count only (No cards array)
  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    select: {
      id: true,
      title: true,
      subject: true,
      description: true,
      visibility: true,
      userId: true,
      createdAt: true, // Needed for type compatibility
      updatedAt: true, // Needed for type compatibility
      _count: {
        select: { cards: true },
      },
    },
  });

  if (!deck) return <DeckIsMissing />;

  const isOwner = deck.userId === deckUserId;
  const isAdmin = await checkAdmin();
  const isPublic = deck.visibility === "PUBLIC";

  if (!isOwner && !isAdmin && !isPublic) return <DeckIsPrivate />;

  const canManage = isOwner || isAdmin;

  // Fetch Author Details gracefully
  let authorName = "Unknown Author";
  try {
    const client = await clerkClient();
    const author = await client.users.getUser(deck.userId);

    if (author.firstName || author.lastName) {
      authorName = `${author.firstName || ""} ${author.lastName || ""}`.trim();
    } else if (author.primaryEmailAddress?.emailAddress) {
      authorName = author.primaryEmailAddress.emailAddress;
    }
  } catch (error: any) {
    if (error?.status !== 404) {
      console.error("Clerk Error fetching author:", error.message);
    }
  }

  // Reshape deck object for DeckHero (it expects 'cards' array but we have _count)
  // We mock the cards array length using the count for display purposes
  const deckForHero = {
    ...deck,
    cards: Array(deck._count.cards).fill(null), // Mock array for length check
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 1. Header Section (Loads Fast) */}
      <div className="space-y-4">
        <BackToDashboard />
        <DeckHero authorName={authorName} deck={deckForHero} deckId={deckId} isOwner={canManage} />
      </div>

      <Separator className="my-6" />

      {/* 2. Cards View (Streams in) */}
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="flex justify-end">
              <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        }
      >
        <DeckCardsList deckId={deckId} canManage={canManage} />
      </Suspense>
    </div>
  );
}

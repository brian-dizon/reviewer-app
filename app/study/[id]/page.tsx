import { prisma } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import BackToDashboard from "@/components/global/back-to-dashboard";
import DeckIsMissing from "./deck-is-missing";
import DeckIsPrivate from "./deck-is-private";
import DeckHero from "./deck-hero";
import CardsView from "@/components/study/cards-view"; // New View Component

export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: deckId } = await params;
  const { userId: deckUserId } = await auth();

  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: true },
  });

  if (!deck) return <DeckIsMissing />;

  const isOwner = deck.userId === deckUserId;
  const isPublic = deck.visibility === "PUBLIC";

  if (!isOwner && !isPublic) return <DeckIsPrivate />;

  // Fetch Author Details
  const client = await clerkClient();
  let authorName = "Unknown Author";
  try {
    const author = await client.users.getUser(deck.userId);
    if (author.firstName || author.lastName) {
      authorName = `${author.firstName || ""} ${author.lastName || ""}`.trim();
    } else {
      authorName = author.primaryEmailAddress?.emailAddress || "Unknown Author";
    }
  } catch (e) {
    console.error("Failed to fetch author", e);
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <BackToDashboard />
        <DeckHero authorName={authorName} deck={deck} deckId={deckId} isOwner={isOwner} />
      </div>

      <Separator className="my-6" />

      {/* 2. Cards View (Toggle Grid/Table) */}
      <CardsView cards={deck.cards} isOwner={isOwner} />
    </div>
  );
}

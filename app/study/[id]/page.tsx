import { prisma } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { Separator } from "@/components/ui/separator";
import BackToDashboard from "@/components/global/back-to-dashboard";
import DeckIsMissing from "./deck-is-missing";
import DeckIsPrivate from "./deck-is-private";
import DeckHero from "./deck-hero";
import CardsView from "@/components/study/cards-view";
import { checkAdmin } from "@/lib/is-admin";

export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: deckId } = await params;
  const { userId: deckUserId } = await auth();

  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    include: { cards: true },
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
    // If user is not found in Clerk (404), we just fallback to "Unknown Author"
    // without crashing the whole page execution.
    if (error?.status !== 404) {
      console.error("Clerk Error fetching author:", error.message);
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <BackToDashboard />
        <DeckHero authorName={authorName} deck={deck} deckId={deckId} isOwner={canManage} />
      </div>

      <Separator className="my-6" />

      {/* 2. Cards View (Toggle Grid/Table) */}
      <CardsView cards={deck.cards} isOwner={canManage} />
    </div>
  );
}

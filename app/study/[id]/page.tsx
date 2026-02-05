import { prisma } from "@/lib/db";
import { auth, clerkClient } from "@clerk/nextjs/server"; // Import clerkClient
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, UserCircle } from "lucide-react"; // Import User Icon
import AddCardDialog from "../add-card-dialog";

export default async function StudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: deckId } = await params;
  const { userId: deckUserId } = await auth();

  const deck = await prisma.deck.findUnique({
    where: { id: deckId },
    select: {
      id: true,
      title: true,
      subject: true,
      description: true,
      visibility: true,
      userId: true,
      cards: true,
    },
  });

  if (!deck) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-500">
        <h2 className="text-xl font-semibold">Deck not found</h2>
        <Button variant="link" asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const isOwner = deck.userId === deckUserId;
  const isPublic = deck.visibility === "PUBLIC";

  if (!isOwner && !isPublic) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-500">
        <h2 className="text-xl font-semibold">Private Deck</h2>
        <p>You do not have permission to view this content.</p>
        <Button variant="link" asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  // Fetch Author Details
  const client = await clerkClient();
  let authorName = "Unknown Author";
  try {
    const author = await client.users.getUser(deck.userId);
    // Use first name + last name if available, otherwise email
    if (author.firstName || author.lastName) {
      authorName = `${author.firstName || ""} ${author.lastName || ""}`.trim();
    } else {
      authorName = author.primaryEmailAddress?.emailAddress || "Unknown Author";
    }
  } catch (e) {
    console.error("Failed to fetch author", e);
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* 1. Header Section */}
      <div className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 text-zinc-500" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Left Side: Info */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{deck.title}</h1>
              <Badge variant={deck.visibility === "PUBLIC" ? "secondary" : "outline"}>{deck.visibility}</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-zinc-900 dark:text-zinc-300">{deck.subject}</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <span>{deck.cards.length} cards</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                <UserCircle className="w-4 h-4" />
                <span>{authorName}</span>
              </div>
            </div>

            {deck.description && <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-sm leading-relaxed mt-2">{deck.description}</p>}
          </div>

          {/* Right Side: Action Button */}
          {isOwner && (
            <div className="shrink-0 w-full md:w-auto">
              <AddCardDialog deckId={deckId} />
            </div>
          )}
        </div>
      </div>

      <Separator className="my-6" />

      {/* 2. Cards Grid */}
      {deck.cards.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
          <p className="text-zinc-500">This deck is empty.</p>
          {isOwner && <p className="text-sm text-zinc-400 mt-1">Add some cards to get started!</p>}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deck.cards.map((card) => (
            <Card key={card.id} className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 line-clamp-3">{card.question}</p>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                  <p className="text-sm text-zinc-500 mb-1 uppercase tracking-wider text-[10px]">Answer</p>
                  <p className="text-zinc-700 dark:text-zinc-300 line-clamp-4">{card.answer}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

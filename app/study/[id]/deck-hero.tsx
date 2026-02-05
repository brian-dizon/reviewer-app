import { DeleteDeckDialog } from "@/components/study/delete-deck-dialog";
import { EditDeckDialog } from "@/components/study/edit-deck-dialog";
import { Button } from "@/components/ui/button";
import { UserCircle, Play } from "lucide-react";
import AddCardDialog from "../add-card-dialog";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Prisma } from "@/generated/prisma/client";

// Define the precise type including the cards relation
type DeckWithCards = Prisma.DeckGetPayload<{
  include: { cards: true };
}>;

interface DeckHeroProps {
  authorName: string;
  deck: DeckWithCards;
  deckId: string;
  isOwner: boolean;
}

export default function DeckHero({ authorName, deck, deckId, isOwner }: DeckHeroProps) {
  return (
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

      {/* Right Side: Action Buttons */}
      <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
        {deck.cards.length > 0 && (
          <Button asChild size="default" className="w-full sm:w-auto px-6 shadow-sm">
            <Link href={`/study/${deckId}/session`}>
              <Play className="mr-2 h-4 w-4 fill-current" /> Start Review
            </Link>
          </Button>
        )}

        {isOwner && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none">
              <AddCardDialog deckId={deckId} />
            </div>
            
            {/* Edit Button */}
            <EditDeckDialog deck={deck} />

            {/* Delete Deck Button */}
            <DeleteDeckDialog deckId={deckId} deckTitle={deck.title} />
          </div>
        )}
      </div>
    </div>
  );
}

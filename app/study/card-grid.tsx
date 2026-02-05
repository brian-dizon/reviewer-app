import { DeleteCardButton } from "@/components/study/delete-card-button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Define the shape of a Card
type CardType = {
  id: string;
  question: string;
  answer: string;
};

interface CardsGridProps {
  cards: CardType[];
  isOwner: boolean;
}

export default function CardsGrid({ cards, isOwner }: CardsGridProps) {
  if (cards.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
        <p className="text-zinc-500">This deck is empty.</p>
        {isOwner && <p className="text-sm text-zinc-400 mt-1">Add some cards to get started!</p>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <Card key={card.id} className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
          <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
            <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider pt-1">
              Question
            </CardTitle>
            {isOwner && <DeleteCardButton cardId={card.id} />}
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 line-clamp-3">
              {card.question}
            </p>
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
              <p className="text-sm text-zinc-500 mb-1 uppercase tracking-wider text-[10px]">Answer</p>
              <p className="text-zinc-700 dark:text-zinc-300 line-clamp-4">
                {card.answer}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
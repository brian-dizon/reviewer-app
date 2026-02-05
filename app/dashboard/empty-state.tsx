import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4 border-2 border-dashed
      border-zinc-200 dark:border-zinc-800 rounded-lg p-8"
    >
      <div className="bg-zinc-100 dark:bg-zinc-900 p-4 rounded-full">
        <PlusCircle />
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-semibold tracking-tight">No decks created</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">You haven't created any flashcard decks yet.</p>
      </div>
      <Button asChild variant="outline" size="sm">
        <Link href="/dashboard/create">Create Deck</Link>
      </Button>
    </div>
  );
}

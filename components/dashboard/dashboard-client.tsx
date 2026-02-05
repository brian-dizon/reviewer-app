"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import DeckCard from "@/app/dashboard/deck-card";
import EmptyState from "@/app/dashboard/empty-state";
import { cn } from "@/lib/utils";

type DashboardClientProps = {
  decks: any[];
};

export default function DashboardClient({ decks }: DashboardClientProps) {
  const [view, setView] = useState<"grid" | "list">("grid");

  if (decks.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-6">
      {/* View Toggle Controls */}
      <div className="flex justify-end">
        <div className="flex items-center p-1 bg-zinc-100/80 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView("grid")}
            className={cn(
              "h-8 w-8 p-0 rounded-md transition-all",
              view === "grid" 
                ? "bg-white dark:bg-zinc-950 shadow-sm text-zinc-900 dark:text-zinc-50" 
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="sr-only">Grid View</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setView("list")}
            className={cn(
              "h-8 w-8 p-0 rounded-md transition-all",
              view === "list" 
                ? "bg-white dark:bg-zinc-950 shadow-sm text-zinc-900 dark:text-zinc-50" 
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            )}
          >
            <List className="h-4 w-4" />
            <span className="sr-only">List View</span>
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={cn(
          "grid gap-6",
          view === "grid" 
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        )}
      >
        {decks.map((deck) => (
          <DeckCard key={deck.id} deck={deck} />
        ))}
      </div>
    </div>
  );
}

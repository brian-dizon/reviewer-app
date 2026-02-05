import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Plus, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import DeckList from "@/components/dashboard/deck-list";
import DeckListSkeleton from "@/components/dashboard/deck-list-skeleton";

export default async function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
        
        {/* Header Section (Static & Instant) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <LayoutDashboard className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-widest">Workspace</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">My Library</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">Manage your active decks in your collection.</p>
          </div>

          <Button asChild className="w-full md:w-auto shadow-sm" size="lg">
            <Link href="/dashboard/create">
              <Plus className="mr-2 h-5 w-5" /> Create New Deck
            </Link>
          </Button>
        </div>

        {/* Dynamic Content Section (Suspended) */}
        <Suspense fallback={<DeckListSkeleton />}>
          <DeckList />
        </Suspense>
      </div>
    </div>
  );
}
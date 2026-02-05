import { Suspense } from "react";
import { Globe } from "lucide-react";
import DeckListSkeleton from "@/components/dashboard/deck-list-skeleton"; // Reuse the skeleton!
import PublicDeckList from "@/components/public/public-deck-list";

export default function PublicLibraryPage() {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
        {/* Header Section (Instant) */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-zinc-500 mb-1">
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-widest">Community</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Public Library
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl">
            Explore community-created decks. Master new subjects with resources shared by learners worldwide.
          </p>
        </div>

        {/* Content Section (Suspended) */}
        <Suspense fallback={<DeckListSkeleton />}>
          <PublicDeckList />
        </Suspense>
      </div>
    </div>
  );
}
import { Skeleton } from "@/components/ui/skeleton";

export default function DeckListSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className="flex flex-col space-y-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
          >
            <div className="flex justify-between items-start">
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            
            <div className="pt-4 mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

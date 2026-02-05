import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function StudyLoading() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-32" /> {/* Back button */}
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-64" /> {/* Title */}
              <Skeleton className="h-6 w-16 rounded-full" /> {/* Badge */}
            </div>
            <div className="flex gap-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-full max-w-lg mt-2" />
          </div>
          <div className="flex gap-2">
             <Skeleton className="h-10 w-32" /> {/* Start Review */}
             <Skeleton className="h-10 w-32" /> {/* Add Card */}
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Controls Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" /> {/* Search */}
        <div className="flex gap-2">
           <Skeleton className="h-10 w-24" /> {/* Sort */}
           <Skeleton className="h-10 w-20" /> {/* Toggle */}
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex justify-between">
               <Skeleton className="h-4 w-20" /> {/* Question Label */}
               <Skeleton className="h-8 w-8 rounded-md" /> {/* Edit/Delete */}
            </div>
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
               <Skeleton className="h-4 w-16 mb-2" />
               <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

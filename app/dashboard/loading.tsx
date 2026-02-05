import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* "Workspace" label */}
            <Skeleton className="h-10 w-48" /> {/* "My Library" title */}
            <Skeleton className="h-4 w-64" /> {/* Description */}
          </div>
          <Skeleton className="h-11 w-32 rounded-md" /> {/* Button */}
        </div>

        {/* Content Skeleton (Grid View) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col space-y-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">
              <div className="flex justify-between items-start">
                <Skeleton className="h-6 w-3/4 rounded-md" /> {/* Title */}
                <Skeleton className="h-5 w-12 rounded-full" /> {/* Badge */}
              </div>
              <Skeleton className="h-4 w-full" /> {/* Desc line 1 */}
              <Skeleton className="h-4 w-2/3" /> {/* Desc line 2 */}
              <div className="pt-4 mt-auto flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50">
                <Skeleton className="h-4 w-16" /> {/* Count */}
                <Skeleton className="h-8 w-20" /> {/* Button */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

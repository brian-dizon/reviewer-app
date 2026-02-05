import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function HomeHero() {
  const { userId } = await auth();

  return (
    <>
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 space-y-10">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">
            Master any subject, <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-zinc-100 dark:to-zinc-500">faster.</span>
          </h1>
          <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">The minimalist flashcard tool for serious learners. Distraction-free, mobile-first, and built for speed.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          {userId ? (
            <Button asChild size="lg" className="h-12 px-10 text-base shadow-lg rounded-full">
              <Link href="/dashboard">
                View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild size="lg" className="h-12 px-10 text-base shadow-lg rounded-full">
              <Link href="/sign-in">
                Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}

          <Button asChild variant="outline" size="lg" className="h-12 px-10 text-base rounded-full bg-white dark:bg-zinc-900 shadow-sm">
            <Link href="/public">Explore Library</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

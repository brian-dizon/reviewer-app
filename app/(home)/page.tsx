import { Suspense } from "react";
import HomeHero from "./hero";
import UspSection from "./usp";
import RecentlyPublishedSection from "./recently-published";
import Footer from "@/components/global/footer";
import DeckListSkeleton from "@/components/dashboard/deck-list-skeleton"; // Reuse skeleton

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-950">
      <HomeHero />
      
      {/* 
        Suspense Boundary:
        The Hero and USP sections will render instantly.
        The DB query for "Recently Published" will stream in afterwards.
      */}
      <Suspense fallback={
        <div className="py-20 px-4 max-w-6xl mx-auto w-full">
           <DeckListSkeleton />
        </div>
      }>
        <RecentlyPublishedSection />
      </Suspense>

      <UspSection />
      <Footer />
    </div>
  );
}
import HomeHero from "./hero";
import UspSection from "./usp";
import RecentlyPublishedSection from "./recently-published";
import Footer from "@/components/global/footer";

export default async function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-950">
      <HomeHero />
      <RecentlyPublishedSection />
      <UspSection />
      <Footer />
    </div>
  );
}

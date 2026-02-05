import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DeckIsMissing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-500">
      <h2 className="text-xl font-semibold">Deck not found</h2>
      <Button variant="link" asChild>
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}

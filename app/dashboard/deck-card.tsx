import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Layers, ArrowRight } from "lucide-react";

type DeckProps = {
  deck: {
    id: string;
    title: string;
    description: string | null;
    visibility: "PUBLIC" | "PRIVATE";
    _count: {
      cards: number;
    };
  };
};

export default function DeckCard({ deck }: DeckProps) {
  return (
    <Card className="group relative flex flex-col justify-between hover:shadow-md transition-all duration-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm">
      {/* Clickable Area Overlay */}
      <Link href={`/study/${deck.id}`} className="absolute inset-0 z-0" />

      <CardHeader>
        {/* 
           Grid Layout Fix: 
           Using grid-cols-[1fr_auto] is more robust than Flexbox for preventing overlap.
           The title gets 1fr (remaining space) and the badge gets auto (its natural width).
        */}
        <div className="grid grid-cols-[1fr_auto] items-start gap-4 w-full">
          <CardTitle className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-50 leading-tight">
            {deck.title}
          </CardTitle>
          
          <Badge 
            variant={deck.visibility === "PUBLIC" ? "secondary" : "outline"}
            className="shrink-0 text-[10px] uppercase tracking-wider font-medium"
          >
            {deck.visibility}
          </Badge>
        </div>
        
        <CardDescription className="line-clamp-2 min-h-[2.5rem] mt-2 text-zinc-500 dark:text-zinc-400 text-sm">
          {deck.description || "No description provided."}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800/50 mt-auto">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium">
          <Layers className="w-3.5 h-3.5" />
          <span>{deck._count.cards} cards</span>
        </div>

        <Button variant="ghost" size="sm" className="relative z-10 text-xs h-8 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800" asChild>
          <Link href={`/study/${deck.id}`}>
            Study <ArrowRight className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
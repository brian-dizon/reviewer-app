"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, Table as TableIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DeleteCardButton } from "./delete-card-button";
import { EditCardDialog } from "./edit-card-dialog";

// Define the shape of a Card
type CardType = {
  id: string;
  question: string;
  answer: string;
  difficulty: "EASY" | "MODERATE" | "HARD";
  createdAt?: Date;
};

interface CardsViewProps {
  cards: CardType[];
  isOwner: boolean;
  defaultView?: "grid" | "table"; // New prop
}

export default function CardsView({ cards, isOwner, defaultView = "grid" }: CardsViewProps) {
  const [view, setView] = useState<"grid" | "table">(defaultView);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCards = useMemo(() => {
    let result = [...cards];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (card) =>
          card.question.toLowerCase().includes(lowerQuery) ||
          card.answer.toLowerCase().includes(lowerQuery)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "difficulty_hard":
          return a.difficulty === "HARD" ? -1 : 1;
        case "difficulty_easy":
          return a.difficulty === "EASY" ? -1 : 1;
        case "alphabetical":
          return a.question.localeCompare(b.question);
        case "newest":
        default:
          return 0; 
      }
    });

    return result;
  }, [cards, searchQuery, sortBy]);

  if (cards.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
        <p className="text-zinc-500">This deck is empty.</p>
        {isOwner && <p className="text-sm text-zinc-400 mt-1">Add some cards to get started!</p>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:max-w-sm">
          <Input
            placeholder="Search cards..."
            className="bg-white dark:bg-zinc-900/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px] bg-white dark:bg-zinc-900/50">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Default</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
              <SelectItem value="difficulty_hard">Hard First</SelectItem>
              <SelectItem value="difficulty_easy">Easy First</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center p-1 bg-zinc-100/80 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView("grid")}
              className={cn(
                "h-8 w-8 p-0 rounded-md transition-all",
                view === "grid" 
                  ? "bg-white dark:bg-zinc-950 shadow-sm text-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid View</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setView("table")}
              className={cn(
                "h-8 w-8 p-0 rounded-md transition-all",
                view === "table" 
                  ? "bg-white dark:bg-zinc-950 shadow-sm text-zinc-900 dark:text-zinc-50" 
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <TableIcon className="h-4 w-4" />
              <span className="sr-only">Table View</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCards.map((card) => (
            <Card key={card.id} className="bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border-zinc-200 dark:border-zinc-800">
              <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-sm font-medium text-zinc-500 uppercase tracking-wider pt-1">
                  Question
                </CardTitle>
                {isOwner && (
                  <div className="flex items-center">
                    <EditCardDialog card={card} />
                    <DeleteCardButton cardId={card.id} />
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 line-clamp-3">
                  {card.question}
                </p>
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Answer</p>
                    <Badge variant="outline" className="text-[10px] h-5">{card.difficulty}</Badge>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 line-clamp-4">
                    {card.answer}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {view === "table" && (
        <div className="rounded-md border border-zinc-200 dark:border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50 dark:bg-zinc-900/50">
                <TableRow>
                  <TableHead className="min-w-[200px] h-12 px-4">Question</TableHead>
                  <TableHead className="min-w-[200px] h-12 px-4">Answer</TableHead>
                  <TableHead className="w-[120px] h-12 px-4">Difficulty</TableHead>
                  {isOwner && <TableHead className="w-[100px] h-12 px-4 text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCards.map((card) => (
                  <TableRow key={card.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                    <TableCell className="font-medium align-top p-4 whitespace-normal break-words">
                      {card.question}
                    </TableCell>
                    <TableCell className="text-zinc-600 dark:text-zinc-400 align-top p-4 whitespace-normal break-words">
                      {card.answer}
                    </TableCell>
                    <TableCell className="align-top p-4">
                      <Badge variant={card.difficulty === "HARD" ? "destructive" : "secondary"}>
                        {card.difficulty}
                      </Badge>
                    </TableCell>
                    {isOwner && (
                      <TableCell className="text-right align-top p-4">
                        <div className="flex justify-end items-center">
                          <EditCardDialog card={card} />
                          <DeleteCardButton cardId={card.id} />
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
      
      {filteredCards.length === 0 && searchQuery && (
        <div className="text-center py-12 text-zinc-500">
          No cards found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}
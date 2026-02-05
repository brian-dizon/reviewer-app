"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, ChevronRight, RotateCcw } from "lucide-react"; // Removed Link
import Link from "next/link"; // Added correct Link import
import { Button } from "../ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "../ui/card";

interface CardData {
  id: string;
  question: string;
  answer: string;
}

interface StudySessionProps {
  deckTitle: string;
  cards: CardData[];
}

export default function StudySession({ deckTitle, cards }: StudySessionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  function handleNext() {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      // Small delay to allow flip animation
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
    } else {
      setIsFinished(true);
    }
  }

  function resetSession() {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
  }

  if (isFinished) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-6 p-6 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-full">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Session Complete!</h2>
          <p className="text-zinc-500">
            You've reviewed all {cards.length} cards in {deckTitle}.
          </p>
        </div>
        <div className="flex gap-4 pt-4">
          <Button variant="outline" onClick={resetSession}>
            <RotateCcw className="mr-2 h-4 w-4" /> Restart
          </Button>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col min-h-[85vh] p-4">
      {/* 1. Progress Bar (Top) */}
      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-xs font-medium text-zinc-500 uppercase tracking-widest">
          <span>{deckTitle}</span>
          <span>
            {currentIndex + 1} of {cards.length}
          </span>
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      {/* 2. The Card (Center) */}
      <div className="flex-1 flex items-center justify-center perspective-1000">
        <div className="relative w-full aspect-[4/5] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
          <motion.div className="w-full h-full relative preserve-3d" initial={false} animate={{ rotateY: isFlipped ? 180 : 0 }} transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}>
            {/* Front Side */}
            <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 text-center border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
              <span className="absolute top-6 text-[10px] font-bold uppercase tracking-[0.2em]  text-zinc-400">Question</span>
              <h3 className="text-2xl md:text-3xl font-medium leading-tight">{currentCard.question}</h3>
              <p className="absolute bottom-10 text-xs text-zinc-400 animate-pulse">Tap to reveal answer</p>
            </Card>

            {/* Back Side */}
            <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-xl overflow-y-auto">
              <span className="absolute top-6 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Answer</span>
              <p className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed">{currentCard.answer}</p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* 3. Thumb-Zone Controls (Bottom) */}
      <div className="h-32 flex flex-col justify-end gap-4 pb-8">
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div key="reveal-btn" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <Button size="lg" className="w-full h-16 text-lg rounded-2xl shadow-lg" onClick={() => setIsFlipped(true)}>
                Reveal Answer
              </Button>
            </motion.div>
          ) : (
            <motion.div key="next-btn" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex gap-3">
              <Button size="lg" className="flex-1 h-16 text-lg rounded-2xl shadow-lg" onClick={handleNext}>
                {currentIndex === cards.length - 1 ? "Finish" : "Next Card"}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
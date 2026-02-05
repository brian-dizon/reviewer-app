"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
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
  const [correctCount, setCorrectCount] = useState(0); // Track score

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  function handleAnswer(isCorrect: boolean) {
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      // Small delay to allow flip animation before changing content
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
    setCorrectCount(0);
  }

  if (isFinished) {
    const percentage = Math.round((correctCount / cards.length) * 100);

    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 p-6 text-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }} 
          animate={{ scale: 1, rotate: 0 }} 
          className="bg-zinc-100 dark:bg-zinc-900 p-8 rounded-full shadow-xl"
        >
          <Trophy className="w-16 h-16 text-yellow-500" />
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-4xl font-bold tracking-tight">Session Complete!</h2>
          <div className="space-y-1">
             <p className="text-6xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
              {percentage}%
            </p>
            <p className="text-zinc-500 font-medium">
              You got {correctCount} out of {cards.length} correct
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 pt-8 w-full max-w-sm">
          <Button variant="outline" className="flex-1 h-12" onClick={resetSession}>
            <RotateCcw className="mr-2 h-4 w-4" /> Restart
          </Button>
          <Button className="flex-1 h-12" asChild>
            <Link href="/dashboard">Dashboard</Link>
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
          <motion.div 
            className="w-full h-full relative preserve-3d" 
            initial={false} 
            animate={{ rotateY: isFlipped ? 180 : 0 }} 
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Front Side */}
            <Card className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-8 text-center border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl rounded-3xl">
              <span className="absolute top-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Question</span>
              <h3 className="text-2xl md:text-3xl font-medium leading-tight">{currentCard.question}</h3>
              <p className="absolute bottom-10 text-xs text-zinc-400 animate-pulse">Tap to reveal answer</p>
            </Card>

            {/* Back Side */}
            <Card className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 shadow-xl overflow-y-auto rounded-3xl">
              <span className="absolute top-8 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Answer</span>
              <p className="text-xl md:text-2xl text-zinc-800 dark:text-zinc-200 leading-relaxed">{currentCard.answer}</p>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* 3. Thumb-Zone Controls (Bottom) */}
      <div className="h-32 flex flex-col justify-end gap-4 pb-8">
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div 
              key="reveal-btn" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
            >
              <Button size="lg" className="w-full h-16 text-lg rounded-2xl shadow-lg font-semibold tracking-wide" onClick={() => setIsFlipped(true)}>
                Reveal Answer
              </Button>
            </motion.div>
          ) : (
            <motion.div 
              key="answer-btns" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="grid grid-cols-2 gap-4"
            >
              <Button 
                size="lg" 
                variant="outline"
                className="h-16 text-lg rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10" 
                onClick={() => handleAnswer(false)}
              >
                <X className="mr-2 h-6 w-6" /> Incorrect
              </Button>

              <Button 
                size="lg" 
                className="h-16 text-lg rounded-2xl bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200 dark:shadow-none" 
                onClick={() => handleAnswer(true)}
              >
                <Check className="mr-2 h-6 w-6" /> Correct
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

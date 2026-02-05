"use client";

import { useState } from "react";
import { updateCard } from "@/app/actions/deck";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { CardForm } from "@/components/card-form";

interface EditCardDialogProps {
  card: {
    id: string;
    question: string;
    answer: string;
    difficulty: "EASY" | "MODERATE" | "HARD";
  };
}

export function EditCardDialog({ card }: EditCardDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(values: any) {
    const result = await updateCard(card.id, values);
    if (result.success) {
      setOpen(false);
      return { success: true };
    }
    return { error: result.error };
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit card</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Flashcard</DialogTitle>
          <DialogDescription>
            Update the question, answer, or difficulty of this card.
          </DialogDescription>
        </DialogHeader>
        
        <CardForm 
          defaultValues={{
            question: card.question,
            answer: card.answer,
            difficulty: card.difficulty,
          }} 
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}

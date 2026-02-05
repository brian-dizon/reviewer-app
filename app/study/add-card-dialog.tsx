"use client";

import { useState } from "react";
import { createCard } from "../actions/deck";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardForm } from "@/components/card-form";

export default function AddCardDialog({ deckId }: { deckId: string }) {
  const [open, setOpen] = useState<boolean>(false);

  async function handleCreate(values: any) {
    const result = await createCard(values, deckId);

    if (result.success) {
      setOpen(false);
      return { success: true };
    }
    return { error: result.error };
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Card
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a new Flashcard</DialogTitle>
          <DialogDescription>
            Create a new card for this deck. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <CardForm onSubmit={handleCreate} submitLabel="Save Card" />
      </DialogContent>
    </Dialog>
  );
}
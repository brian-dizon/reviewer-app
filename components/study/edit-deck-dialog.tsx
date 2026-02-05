"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeckForm } from "@/components/deck-form";
import { updateDeck } from "@/app/actions/deck";
import { Pencil } from "lucide-react";

interface EditDeckDialogProps {
  deck: {
    id: string;
    title: string;
    description: string | null;
    subject: string;
    visibility: "PUBLIC" | "PRIVATE";
  };
}

export function EditDeckDialog({ deck }: EditDeckDialogProps) {
  const [open, setOpen] = useState(false);

  async function handleSubmit(values: any) {
    const result = await updateDeck(deck.id, values);
    if (result.success) {
      setOpen(false);
      return { success: true };
    }
    return { error: result.error };
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Pencil className="h-4 w-4" />
          <span className="sr-only">Edit Deck</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Deck</DialogTitle>
          <DialogDescription>
            Make changes to your deck here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <DeckForm 
          defaultValues={{
            title: deck.title,
            description: deck.description || "",
            subject: deck.subject,
            visibility: deck.visibility,
          }} 
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { deleteCard } from "@/app/actions/deck";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function DeleteCardButton({ cardId }: { cardId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    // Simple confirm dialog for speed, or upgrade to AlertDialog if preferred
    if (!confirm("Are you sure you want to delete this card?")) return;

    setIsDeleting(true);
    const result = await deleteCard(cardId);
    
    if (!result.success) {
      alert("Failed to delete card");
    }
    setIsDeleting(false);
    router.refresh(); 
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
      <span className="sr-only">Delete card</span>
    </Button>
  );
}

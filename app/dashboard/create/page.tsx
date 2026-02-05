"use client";

import { createDeck } from "@/app/actions/deck";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { DeckForm } from "@/components/deck-form";
import { useRouter } from "next/navigation";

export default function CreateDeckPage() {
  const router = useRouter();

  async function handleCreate(values: any) {
    const result = await createDeck(values);
    if (result.success) {
      router.push("/dashboard");
      return { success: true };
    }
    return { error: result.error };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] p-4 space-y-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" size="sm" className="-ml-2 text-zinc-500 mb-2" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Link>
        </Button>

        <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Create a New Deck</CardTitle>
            <CardDescription className="text-zinc-500 dark:text-zinc-400">Organize your flashcards into a focused collection.</CardDescription>
          </CardHeader>

          <CardContent>
            <DeckForm onSubmit={handleCreate} submitLabel="Create Deck" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
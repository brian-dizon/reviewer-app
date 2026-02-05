"use server";

import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/db";
import { deckSchema, flashcardSchema } from "@/lib/validations/schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createDeck(input: z.infer<typeof deckSchema>) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const validatedFields = deckSchema.safeParse(input);
  if (!validatedFields.success) return { error: "Invalid data" };

  try {
    await prisma.deck.create({
      data: {
        ...validatedFields.data,
        userId,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { error: "Database error." };
  }
}

export async function createCard(input: z.infer<typeof flashcardSchema>, deckId: string) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const deck = await prisma.deck.findUnique({ where: { id: deckId } });
  if (!deck || deck.userId !== userId) return { error: "You must own this deck before you add a card." };

  const validatedFields = flashcardSchema.safeParse(input);
  if (!validatedFields.success) return { error: "Invalid data" };

  try {
    await prisma.flashcard.create({
      data: {
        ...validatedFields.data,
        deckId,
      },
    });

    revalidatePath(`/study/${deckId}`);
    return { success: true };
  } catch (err) {
    return { error: "Failed to create a card." };
  }
}

export async function deleteCard(cardId: string) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const card = await prisma.flashcard.findUnique({
    where: { id: cardId },
    include: { deck: true },
  });

  if (!card || card.deck.userId !== userId) {
    return { error: "You do not own this card." };
  }

  try {
    await prisma.flashcard.delete({ where: { id: cardId } });
    revalidatePath(`/study/${card.deck.id}`);
    return { success: true };
  } catch (err) {
    return { error: "Failed to delete card." };
  }
}

export async function deleteDeck(deckId: string) {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  // Verify ownership
  const deck = await prisma.deck.findUnique({ where: { id: deckId } });
  if (!deck || deck.userId !== userId) {
    return { error: "You can only delete a deck that is yours." };
  }

  try {
    const deleted = await prisma.deck.delete({ where: { id: deckId } });
    revalidatePath("/dashboard");
    return { success: true, data: deleted };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return { success: false, error: "Deck not found." };
      }
    }
    return { success: false, error: "An unexpected error occurred." };
  }
}

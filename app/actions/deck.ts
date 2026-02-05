"use server";

import { prisma } from "@/lib/db";
import { deckSchema, flashcardSchema } from "@/lib/validations/schemas";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createDeck(input: z.infer<typeof deckSchema>) {
  // 1. Identify the user
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  // 2. Validate the data
  const validatedFields = deckSchema.safeParse(input);
  if (!validatedFields.success) return { error: "Invalid data" };

  // 3. Save to DB
  try {
    await prisma.deck.create({
      data: {
        ...validatedFields.data,
        userId,
      },
    });

    // 4. Update the UI
    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { err: "Database error." };
  }
}

export async function createCard(input: z.infer<typeof flashcardSchema>, deckId: string) {
  // 1. Identify the user
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  // 2. Check deck and must be owned by the current user
  const deck = await prisma.deck.findUnique({ where: { id: deckId } });
  if (!deck || deck.userId !== userId) return { error: "You must own this deck before you add a card." };

  // 3. Validate the data
  const validatedFields = flashcardSchema.safeParse(input);
  if (!validatedFields.success) return { error: "Invalid data" };

  // 4. Save to DB
  try {
    await prisma.flashcard.create({
      data: {
        ...validatedFields.data,
        deckId,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (err) {
    return { err: "Failed to create a card." };
  }
}

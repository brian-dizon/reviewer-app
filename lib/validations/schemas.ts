import { z } from "zod";

export const deckSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(50, "Title must be at most 50 characters long"),
  description: z.string().max(200).optional(),
  subject: z.string().min(2, "Subject is required."),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
});

export const flashcardSchema = z.object({
  question: z.string().min(1, "Question is required."),
  answer: z.string().min(1, "Answer is required."),
  difficulty: z.enum(["EASY", "MODERATE", "HARD"]).default("EASY"),
});
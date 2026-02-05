import { prisma } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export default async function DeckList() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const decks = await prisma.deck.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { cards: true },
      },
    },
  });

  return <DashboardClient decks={decks} />;
}

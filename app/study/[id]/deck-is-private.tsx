import BackToDashboard from "@/components/global/back-to-dashboard";

export default function DeckIsPrivate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-zinc-500">
      <h2 className="text-xl font-semibold">Private Deck</h2>
      <p>You do not have permission to view this content.</p>
      <BackToDashboard />
    </div>
  );
}

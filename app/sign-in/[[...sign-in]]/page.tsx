import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-zinc-50 dark:bg-zinc-950 p-4">
      <SignIn appearance={{
        elements: {
          rootBox: "shadow-xl rounded-xl",
          card: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800",
        }
      }} />
    </div>
  );
}
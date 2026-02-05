import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

export default function BackToDashboard() {
  return (
    <Button variant="ghost" size="sm" className="-ml-2 text-zinc-500" asChild>
      <Link href="/dashboard">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
      </Link>
    </Button>
  );
}
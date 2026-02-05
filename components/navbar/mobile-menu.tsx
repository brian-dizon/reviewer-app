"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Layers } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader className="text-left border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-4">
          <SheetTitle className="flex items-center gap-2">
            <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 p-1 rounded-md">
              <Layers className="h-4 w-4" />
            </div>
            <span>Reviewer</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col gap-1">
          <Button variant="ghost" className="justify-start text-base font-normal" asChild onClick={() => setOpen(false)}>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" className="justify-start text-base font-normal" asChild onClick={() => setOpen(false)}>
            <Link href="/dashboard/create">Create New Deck</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}

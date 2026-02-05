"use client";

import Link from "next/link";
import { ModeToggle } from "./darkmode-toggle";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";

export default function NavbarGlobal() {
  const pathname = usePathname();

  // Helper to check active state
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity">
            <div className="bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 p-1.5 rounded-lg">
              <Layers className="h-5 w-5" />
            </div>
            {/* Logo text always visible now */}
            <span className="text-zinc-900 dark:text-zinc-50">
              <span className="text-primary">Gab.</span>Reviewer
            </span>
          </Link>

          {/* Middle: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/dashboard" className={cn("transition-colors hover:text-zinc-900 dark:hover:text-zinc-50", isActive("/dashboard") ? "text-zinc-900 dark:text-zinc-50 font-semibold" : "text-zinc-500 dark:text-zinc-400")}>
              Dashboard
            </Link>
            <Link href="/dashboard/create" className={cn("transition-colors hover:text-zinc-900 dark:hover:text-zinc-50", isActive("/dashboard/create") ? "text-zinc-900 dark:text-zinc-50 font-semibold" : "text-zinc-500 dark:text-zinc-400")}>
              Create Deck
            </Link>
            <Link href="/public" className={cn("transition-colors hover:text-zinc-900 dark:hover:text-zinc-50", isActive("/dashboard/create") ? "text-zinc-900 dark:text-zinc-50 font-semibold" : "text-zinc-500 dark:text-zinc-400")}>
              Explore
            </Link>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <ModeToggle />

          <div className="pl-4 border-l border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Sign In
                </Button>
              </SignInButton>
              <SignInButton mode="modal">
                <Button size="sm">Get Started</Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              {/* Clerk User Button */}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8 ring-2 ring-zinc-100 dark:ring-zinc-800",
                  },
                }}
              />
            </SignedIn>

            {/* Mobile Menu (Hamburger) - now on the right */}
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

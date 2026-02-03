# 📘 Project Master Plan: Reviewer App

## 1. Executive Summary

A modern, mobile-first flashcard application built for high-speed learning. The app prioritizes ease of content creation (CSV uploads) and a distraction-free study environment. It uses a "Community Library" model where users can share decks publicly or keep them private.

## 2. Technical Stack & Architecture

To ensure maximum performance and maintainability, the app follows the Next.js App Router paradigm with a focus on server-side integrity.

- Framework: Next.js 14+ (App Router)
- Language: TypeScript (Strict mode)
- Database: PostgreSQL (via Prisma ORM)
- Authentication: Clerk (Middleware-based protection)
- Styling: Tailwind CSS + Shadcn UI
- State Management:
  - Server-side: Server Actions for all mutations.
  - Client-side: React useState for session-based study tracking.
- Validation: Zod (Shared schemas between client and server).
- Animations: Framer Motion (for card transitions).

## 3. Data Modeling (Prisma)

The database structure is designed to be lean, using Enums for fixed categories to prevent data entry errors.

```typescript
enum Difficulty {
  EASY
  HARD
}

enum Visibility {
  PUBLIC
  PRIVATE
}

model Deck {
  id          String      @id @default(cuid())
  title       String
  description String?
  subject     String
  visibility  Visibility  @default(PUBLIC)
  userId      String      // Mapped to Clerk ID
  cards       Flashcard[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([userId])
}

model Flashcard {
  id         String     @id @default(cuid())
  question   String
  answer     String
  difficulty Difficulty @default(EASY)
  deckId     String
  deck       Deck       @relation(fields: [deckId], references: [id], onDelete: Cascade)
  createdAt  DateTime   @default(now())

  @@index([deckId])
}
```

## 4. Design & UI Philosophy

The UI is Mobile-First and Minimalist. It should feel like a native iOS/Android app.

### A. Color & Theme

- Foundations: Use Zinc from Tailwind for a professional, neutral aesthetic.
- Theming: next-themes implementation. Dark mode should use a deep charcoal/zinc-950 rather than pure black.
- Interactions: High-contrast typography for cards to ensure readability in all lighting.

### B. Mobile Navigation

- Bottom Bar: Fixed navigation on mobile for Home, Dashboard, and Create.
- Desktop Header: Standard top-row navigation with a Theme Toggle and User Profile.

### C. Study Interface

- Glassmorphism: Cards should have a backdrop-blur-md and bg-white/10 (in dark mode) to create depth.
- Thumb-Zone Design: All "Next/Reveal" buttons must be in the bottom 30% of the screen.

## 5. Feature Breakdown & Logic

### I. Authentication & Route Protection

- Public: Landing page (Public Deck Library).
- Protected: /dashboard, /create-deck, /study/[id], /edit-deck/[id].
- Ownership: Server Actions must verify the userId from Clerk before allowing update or delete on any deck.

### II. Content Creation (Server Actions & Zod)

Instead of using React Hook Form, we use native forms with useActionState.

- Single Entry: A standard form for one card at a time.
- Bulk Entry (The CSV Engine):
  1. User uploads .csv via a file input.
  2. PapaParse (Client) converts CSV to JSON.
  3. A Server Action receives the JSON array.
  4. Zod validation runs on the entire array.
  5. Prisma createMany executes in a single transaction.

III. The Study Session (The Reviewer)

- Session State: correctCount, remainingCount, currentIndex.
- Flow:
  1. State 0: Show Question.
  2. Action: Click "Reveal Answer".
  3. State 1: Show Answer + reveal "+" and "-" buttons.
  4. Interaction: Click "+" (Add to score, move next) or "-" (Move next).

- End State: A "Results" view showing the final score percentage and a "Back to Dashboard" button.

## 6. Implementation Roadmap

### Phase 1: Setup

1. Initialize Next.js with the shadcn-ui CLI.
2. Install clerk-react, prisma, lucide-react, and next-themes.
3. Configure Clerk middleware and Prisma client.

### Phase 2: Core Infrastructure

1. Create Zod schemas in @/lib/validations/index.ts.
2. Build the Server Actions in @/app/actions/.
3. Implement the Global Navigation (Responsive Bottom/Top Bar).

### Phase 3: Management Features

1. Build the Dashboard: A list of user-owned decks.
2. Build the Deck Creator: Forms for single cards and the CSV upload dropzone.
3. Implement the Public Library: Fetching all decks where visibility === PUBLIC.

### Phase 4: Study Mode

1. Develop the StudySession client component with framer-motion for card flips.
2. Implement the logic for session scoring and progress tracking.

## 7. Gemini CLI Action Prompts

Use these specific prompts to guide the AI during the build.

### Initial Build:

- "Build the folder structure and Prisma schema for the Reviewer App. Use Clerk for auth and ensure the schema includes Decks and Flashcards with visibility and difficulty enums."

### For the Forms:

- "Create a 'Create Card' form using Server Actions and useActionState. Validate the form using Zod on the server. Ensure the UI uses Shadcn components and is optimized for mobile touch targets."

### For the Study Mode:

- "Generate a study session page that takes a list of cards. Use local React state to track the score for the current session only. The UI should be minimalist with a centered card and large buttons at the bottom."

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deckSchema } from "@/lib/validations/schemas";
import { createDeck } from "@/app/actions/deck";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CreateDeckPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  // 1. Initialize the Form Hook
  const form = useForm<z.infer<typeof deckSchema>>({
    resolver: zodResolver(deckSchema),
    defaultValues: { title: "", description: "", subject: "", visibility: "PUBLIC" },
  });

  // 2. Define what happens on Submit
  async function onSubmit(values: z.infer<typeof deckSchema>) {
    console.log("🚀 Client Data:", values);

    setServerError(null);
    const result = await createDeck(values);
    console.log("📥 Server Result:", result);

    if (result.error) {
      setServerError(result.error);
    } else {
      router.push("/dashboard");
    }
  }

  // 3. The UI (Card with Form inside)
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-md border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Create a New Deck</CardTitle>
          <CardDescription className="text-zinc-500 dark:text-zinc-400">Organize your flashcards into a focused collection.</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  console.log("🕵️ Field Properties for 'title':", field);
                  return (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Biology 101" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/* Subject Field */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field (Optional) */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="What is this deck about?" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Visibility Select */}
              <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visibility</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select visibility" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PUBLIC">PUBLIC</SelectItem>
                        <SelectItem value="PRIVATE">PRIVATE</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Server Error Message */}
              {serverError && <p className="text-sm font-medium text-red-500 text-center">{serverError}</p>}

              {/* Submit Button */}
              <Button type="submit" disabled={form.formState.isSubmitting} className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900">
                {form.formState.isSubmitting ? "Creating..." : "Create Deck"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

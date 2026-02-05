import { Zap, Brain, Smartphone } from "lucide-react";

export default function UspSection() {
  return (
    <>
      {/* Feature Grid */}
      <section className="py-24 px-4 bg-white dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-100 dark:border-zinc-800/50">
            <div className="w-12 h-12 bg-zinc-900 dark:bg-zinc-50 rounded-2xl flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Zero Friction</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">No complex settings. Create decks, add cards, and start studying in seconds.</p>
          </div>

          <div className="space-y-4 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-100 dark:border-zinc-800/50">
            <div className="w-12 h-12 bg-zinc-900 dark:bg-zinc-50 rounded-2xl flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
              <Brain className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Smart Review</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Focus on what you don't know. Our review mode helps you target weak spots efficiently.</p>
          </div>

          <div className="space-y-4 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-950/30 border border-zinc-100 dark:border-zinc-800/50">
            <div className="w-12 h-12 bg-zinc-900 dark:bg-zinc-50 rounded-2xl flex items-center justify-center text-white dark:text-zinc-900 shadow-lg">
              <Smartphone className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Mobile First</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">Designed for your thumb zone. Study comfortably on your commute or on the couch.</p>
          </div>
        </div>
      </section>
    </>
  );
}

import { cn } from "@/lib/utils/cn";

/**
 * IjarahCurriculumHero
 * * Renders the academic introduction for the Ijarah learning module.
 * Strictly presentational Server Component utilizing Tailwind v4 typography.
 */
export function IjarahCurriculumHero() {
  return (
    <section
      className={cn(
        "flex flex-col items-center text-center max-w-3xl mx-auto mb-16",
        "space-y-6",
        "animate-in fade-in duration-700",
      )}
    >
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
        Master the{" "}
        <span className="text-brand-light-navy">
          Ijarah Muntahia Bittamleek
        </span>{" "}
        (IMBT)
      </h1>
      <p className="text-lg leading-relaxed text-brand-dark-navy">
        This comprehensive module perfectly bridges Islamic finance theory and
        practical financial engineering. You will learn to confidently separate
        an asset's corpus from its usufruct, build dynamic amortization
        schedules, successfully manage ownership risks, and navigate complex
        global accounting standards.
      </p>
    </section>
  );
}

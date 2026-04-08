import { cn } from "@/lib/utils/cn";
import { IJARAH_LEARN_CURRICULUM } from "../utils/curriculum-config";
import { ChapterCard } from "./ChapterCard";

/**
 * CurriculumTimeline
 * * Orchestrates the chapter cards into a responsive vertical timeline,
 * illustrating the sequential progression of the IMBT structural learning.
 */
export function CurriculumTimeline() {
  return (
    <div className="relative max-w-4xl mx-auto">
      {/* The vertical timeline indicator (hidden on small mobile screens for readability) */}
      <div
        className={cn(
          "absolute left-9 top-8 bottom-8 w-px bg-slate-200",
          "hidden md:block",
        )}
        aria-hidden="true"
      />

      <div className="space-y-8 relative">
        {IJARAH_LEARN_CURRICULUM.map((chapter) => (
          <div key={chapter.id} className="relative group">
            {/* Timeline dot */}
            <div
              className={cn(
                "absolute left-8 top-10 h-2 w-2 rounded-full bg-brand-light-navy ring-4 ring-white z-20",
                "hidden md:block transition-transform duration-300 group-hover:scale-180",
              )}
              aria-hidden="true"
            />

            <div className="md:pl-16">
              {/* Explicitly passing 0. Later, replace with actual completion data. */}
              <ChapterCard chapter={chapter} progress={0} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Server)
 * FILE: src/features/ijarah/components/MenuListItem.tsx
 * ============================================================================
 * Renders an individual lesson item in the curriculum sequence.
 * Delegates interactivity to the InteractivePortal client component to maintain
 * a clean Server-First architecture and to decouple the text hover state.
 * ============================================================================
 */

import { cn } from "@/lib/utils/cn";
import { ChapterLesson } from "../types/chapter-menu";
import { InteractivePortal } from "./InteractivePortal";

interface MenuListItemProps {
  lesson: ChapterLesson;
  index: number;
}

export function MenuListItem({ lesson, index }: MenuListItemProps) {
  // Determine alternating structural layout (zig-zag effect)
  const isOdd = index % 2 !== 0;

  return (
    <div
      className={cn(
        "relative flex items-center gap-6 md:gap-10 transition-transform duration-500",
        // Apply horizontal shift for alternating items
        isOdd ? "translate-x-8 md:translate-x-16" : "translate-x-0",
        // Animation classes: Rise from bottom
        "animate-in fade-in slide-in-from-bottom-12 duration-700",
      )}
      style={{
        // Stagger the animation so they rise one after another
        animationDelay: `${index * 150}ms`,
        // Ensures the elements stay invisible before their specific delay starts
        animationFillMode: "both",
      }}
    >
      <InteractivePortal
        isActive={lesson.isActive}
        title={lesson.title}
        lessonId={lesson.id}
      />
      <div className="flex flex-col gap-1 select-none">
        <span className="text-sm font-bold text-brand-navy block md:text-xl leading-none">
          {lesson.lessonNumber}
        </span>
        <span className="text-brand-navy font-bold text-lg md:text-3xl leading-tight">
          {lesson.title}
        </span>
      </div>
    </div>
  );
}

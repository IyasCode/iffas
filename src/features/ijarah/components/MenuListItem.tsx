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
        "relative flex items-center gap-6 transition-transform duration-300",
        // Apply horizontal shift for alternating items
        isOdd ? "translate-x-8 md:translate-x-12" : "translate-x-0",
      )}
    >
      {/* Interactive Portal (Client Component Boundary) */}
      <InteractivePortal isActive={lesson.isActive} title={lesson.title} />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-bold text-brand-navy block md:text-[18px] leading-none">
          {lesson.lessonNumber}
        </span>
        <span className="text-brand-navy font-bold text-lg md:whitespace-nowrap md:text-3xl leading-none">
          {lesson.title}
        </span>
      </div>
    </div>
  );
}

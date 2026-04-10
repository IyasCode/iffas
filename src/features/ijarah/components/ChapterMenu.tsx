/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Server)
 * FILE: src/features/ijarah/components/ChapterMenu.tsx
 * ============================================================================
 * Orchestrates the curriculum menu dynamically.
 * Maps over decoupled data passed from the slug page to render the sequence.
 * ============================================================================
 */

import { IjarahLesson } from "../utils/chapters-data";
import { MenuListItem } from "./MenuListItem";

interface ChapterMenuProps {
  chapterTitle: string;
  lessons: IjarahLesson[];
}

export function ChapterMenu({ chapterTitle, lessons }: ChapterMenuProps) {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen py-20 px-6 bg-brand-cream">
      {/* Dynamic Chapter Header */}
      <h1 className="mb-16 text-3xl font-extrabold tracking-wide text-center md:text-4xl text-brand-navy">
        {chapterTitle}
      </h1>

      {/* Curriculum Sequence Render */}
      <nav
        aria-label={`${chapterTitle} Curriculum Sequence`}
        className="flex flex-col w-full max-w-md gap-8"
      >
        {lessons.map((lesson, index) => (
          <MenuListItem key={lesson.id} lesson={lesson} index={index} />
        ))}
      </nav>
    </div>
  );
}

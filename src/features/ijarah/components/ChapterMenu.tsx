/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Server)
 * FILE: src/features/ijarah/components/ChapterMenu.tsx
 * ============================================================================
 * Orchestrates the Chapter 1 curriculum menu.
 * Maps over static decoupled data to render the pedagogical sequence.
 * ============================================================================
 */

import { CHAPTER_ONE_LESSONS } from "../utils/chapters-data";
import { MenuListItem } from "./MenuListItem";

export function ChapterMenu() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-20 px-6 bg-brand-cream">
      {/* Chapter Architectural Header */}
      <h1 className="mb-16 text-3xl font-extrabold tracking-wide text-center md:text-4xl text-brand-navy">
        Chapter 1: Foundations and Mechanics
      </h1>

      {/* Curriculum Sequence Render */}
      <nav
        aria-label="Chapter 1 Curriculum Sequence"
        className="flex flex-col w-full max-w-md gap-8"
      >
        {CHAPTER_ONE_LESSONS.map((lesson, index) => (
          <MenuListItem key={lesson.id} lesson={lesson} index={index} />
        ))}
      </nav>
    </div>
  );
}

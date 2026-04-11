/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Server)
 * FILE: src/features/ijarah/components/ChapterMenu.tsx
 * ============================================================================
 * Orchestrates the curriculum menu dynamically.
 * Maps over decoupled data passed from the slug page to render the sequence.
 * * ARCHITECTURE NOTE: Contains a mobile-only back button routed to /learn.
 * ============================================================================
 */

import Link from "next/link";
import { IjarahLesson } from "../utils/chapters-data";
import { MenuListItem } from "./MenuListItem";

interface ChapterMenuProps {
  chapterTitle: string;
  lessons: IjarahLesson[];
}

export function ChapterMenu({ chapterTitle, lessons }: ChapterMenuProps) {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen py-6 md:py-20 px-6 bg-brand-cream relative">
      {/* Mobile Back Button (Strictly md:hidden)
        Placed at the top of the content flow, immediately under the sticky MobileSidebar.
      */}
      <div className="w-full max-w-md flex md:hidden mb-8">
        <Link
          href="/ijarah/learn"
          className="group inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-md p-1"
          aria-label="Back to Ijarah Curriculum"
        >
          {/* CSS Mask implementation to dynamically color the external SVG */}
          <div
            className="w-5 h-5 bg-brand-navy transition-transform duration-300 group-hover:-translate-x-1"
            style={{
              maskImage: `url(/icon-back.svg)`,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskImage: `url(/icon-back.svg)`,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
            }}
            aria-hidden="true"
          />
          <span className="text-sm font-bold text-brand-navy">
            Back to Learn
          </span>
        </Link>
      </div>

      {/* Dynamic Chapter Header */}
      <h1 className="mb-12 md:mb-16 text-3xl font-extrabold tracking-wide text-center md:text-4xl text-brand-navy">
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

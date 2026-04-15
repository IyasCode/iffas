/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/ChapterMenu.tsx
 * ============================================================================
 * Orchestrates the curriculum menu dynamically.
 * Maps over decoupled data passed from the slug page to render the sequence.
 * * ARCHITECTURE NOTE:
 * - Intercepts URL search params to trigger transient
 * unlock animations via Framer Motion.
 * - Now features LocalStorage hydration to persist
 * progress across page reloads while the backend DB is simulated.
 * ============================================================================
 */

"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MenuListItem } from "./MenuListItem";
import type { ChapterLesson } from "../types/chapter-menu";
import type { IjarahLesson } from "../utils/chapters-data";
import type { LessonStatus } from "../types/curriculum-types";
import Link from "next/link";

interface ChapterMenuProps {
  chapterTitle: string;
  lessons: IjarahLesson[];
}

export function ChapterMenu({ chapterTitle, lessons }: ChapterMenuProps) {
  const searchParams = useSearchParams();
  const unlockedLessonId = searchParams.get("unlocked");

  const [hydratedStatuses, setHydratedStatuses] = useState<
    Record<string, LessonStatus>
  >({});

  // Read from LocalStorage on mount to override static mock data
  useEffect(() => {
    try {
      // Default to having the first lesson of the module unlocked
      const unlocked = JSON.parse(
        localStorage.getItem("iffas_unlocked_lessons") || '["1"]',
      );
      const completed = JSON.parse(
        localStorage.getItem("iffas_completed_lessons") || "[]",
      );

      const statuses: Record<string, LessonStatus> = {};

      lessons.forEach((l) => {
        if (completed.includes(l.id)) {
          statuses[l.id] = "COMPLETED";
        } else if (unlocked.includes(l.id)) {
          statuses[l.id] = "ACTIVE";
        } else {
          statuses[l.id] = l.status as LessonStatus; // Fallback to mock data
        }
      });

      setHydratedStatuses(statuses);
    } catch (e) {
      console.error("Failed to parse progress from local storage.");
    }
  }, [lessons]);

  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen py-6 md:py-20 px-6 bg-brand-cream relative overflow-hidden">
      {/* Mobile Back Button (Strictly md:hidden) */}
      <div className="w-full max-w-md flex md:hidden mb-8 animate-in fade-in duration-300">
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
      <h1 className="mb-12 md:mb-16 text-3xl font-extrabold tracking-wide text-center md:text-4xl text-brand-navy animate-in fade-in duration-1000 ease-out">
        {chapterTitle}
      </h1>

      {/* Curriculum Sequence Render */}
      <nav
        aria-label={`${chapterTitle} Curriculum Sequence`}
        className="flex flex-col w-full max-w-md gap-8"
      >
        {lessons.map((lesson, index) => {
          const isJustUnlocked = lesson.id === unlockedLessonId;

          // Use the hydrated status if available, otherwise fallback
          // We ensure "JUST_UNLOCKED" still overrides everything so the animation plays
          const currentStatus = hydratedStatuses[lesson.id] || lesson.status;

          const mappedLesson: ChapterLesson = {
            ...lesson,
            status: isJustUnlocked
              ? "JUST_UNLOCKED"
              : (currentStatus as ChapterLesson["status"]),
          };

          return (
            <MenuListItem
              key={mappedLesson.id}
              lesson={mappedLesson}
              index={index}
            />
          );
        })}
      </nav>
    </div>
  );
}

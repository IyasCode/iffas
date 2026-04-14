/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Shell / Orchestrator (Client)
 * FILE: src/features/ijarah/components/LessonOverlay.tsx
 * ============================================================================
 * The master layout wrapper for the interactive portal utilizing the Shadcn
 * Sheet primitive. It binds the Next.js URL query parameter (`?lessonId`)
 * to the `useLessonFlow` state orchestrator.
 * * ARCHITECTURE NOTE: Employs dynamic React `ref` assignment exclusively to
 * the newest revealed segment. Combined with `scroll-mt-24`, this ensures
 * the browser's `scrollIntoView` API frames the content perfectly under
 * the sticky navbar without requiring complex bounding box math.
 * ============================================================================
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLessonFlow } from "../hooks/use-lesson-flow";
import type { LessonData } from "../types/lesson";
import { LessonNavbar } from "./LessonNavbar";
import { LessonSegmentRenderer } from "./LessonSegmentRenderer";

interface LessonOverlayProps {
  lesson: LessonData | null;
}

// ----------------------------------------------------------------------------
// 1. THE CACHING WRAPPER
// ----------------------------------------------------------------------------
export function LessonOverlay({ lesson }: LessonOverlayProps) {
  // Retain the lesson data for the exit animation.
  const [activeLesson, setActiveLesson] = useState<LessonData | null>(lesson);

  useEffect(() => {
    // Only update the cache if a NEW valid lesson is passed in.
    // If null is passed (user clicked close), we keep the old data cached.
    if (lesson) {
      setActiveLesson(lesson);
    }
  }, [lesson]);

  // If we never had a lesson loaded on this page visit, render absolutely nothing.
  if (!activeLesson) return null;

  // The sheet is "open" strictly when the parent passes a valid lesson.
  // When the parent passes null, isOpen becomes false, triggering the slide-out.
  const isOpen = !!lesson;

  // Delegate to the inner component so React Hooks aren't conditionally broken
  return <LessonSheet lesson={activeLesson} isOpen={isOpen} />;
}

// ----------------------------------------------------------------------------
// 2. THE INNER SHEET COMPONENT
// ----------------------------------------------------------------------------
interface LessonSheetProps {
  lesson: LessonData;
  isOpen: boolean;
}

function LessonSheet({ lesson, isOpen }: LessonSheetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    revealedSegments,
    progressPercentage,
    isLastSegment,
    canContinue,
    newestSegmentRef,
    revealNext,
    answerQuiz,
    quizState,
  } = useLessonFlow(lesson);

  const handleClose = () => {
    // Soft-navigate to remove the URL param.
    // This turns 'lesson' to null in page.tsx, triggering isOpen=false here.
    const params = new URLSearchParams(searchParams.toString());
    params.delete("lessonId");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-full p-0 border-l border-brand-light-gray bg-[#FAFAFA] flex flex-col gap-0"
      >
        <SheetTitle className="sr-only">
          Interactive Lesson: {lesson.title}
        </SheetTitle>

        <LessonNavbar
          progressPercentage={progressPercentage}
          onClose={handleClose}
        />

        {/* Main Scrolling Container */}
        <div className="flex-1 overflow-y-auto px-6 md:px-16 pb-40 scroll-smooth">
          {/* aria-live ensures screen readers announce new segments as they appear */}
          <div
            className="max-w-3xl mx-auto py-8"
            aria-live="polite"
            aria-atomic="false"
          >
            {revealedSegments.map((segment, index) => {
              const isNewest = index === revealedSegments.length - 1;
              return (
                <div
                  key={segment.id}
                  ref={isNewest ? newestSegmentRef : null}
                  className="scroll-mt-24"
                >
                  <LessonSegmentRenderer
                    segment={segment}
                    isSolved={
                      segment.type === "QUIZ" ? !!quizState[segment.id] : false
                    }
                    onAnswerQuiz={answerQuiz}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-10 right-10 z-50 animate-in fade-in zoom-in duration-300">
          {canContinue && (
            <Button
              onClick={isLastSegment ? handleClose : revealNext}
              className="rounded-full shadow-xl px-10 py-7 text-lg font-bold bg-brand-dark-navy hover:bg-brand-navy text-white transition-transform hover:-translate-y-1 cursor-pointer"
            >
              {isLastSegment ? "Complete" : "Continue"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

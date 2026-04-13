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

import { useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useLessonFlow } from "../hooks/use-lesson-flow";
import type { LessonData } from "../types/lesson";
import { LessonNavbar } from "./LessonNavbar";
import { LessonSegmentRenderer } from "./LessonSegmentRenderer";

interface LessonOverlayProps {
  lesson: LessonData;
}

export function LessonOverlay({ lesson }: LessonOverlayProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Controls the slide-in visibility based on the URL parameter
  const isOpen = searchParams.get("lessonId") === lesson.id;

  const {
    revealedSegments,
    progressPercentage,
    isLastSegment,
    canContinue,
    newestSegmentRef,
    revealNext,
    answerQuiz,
    quizState, // Derived from the state object in the hook
  } = useLessonFlow(lesson);

  const handleClose = () => {
    // Soft-navigate to remove the URL param, triggering the slide-out animation
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
          <div className="max-w-3xl mx-auto py-8">
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
              className="rounded-full shadow-xl px-10 py-7 text-lg font-bold bg-brand-dark-navy hover:bg-brand-navy text-white transition-transform hover:-translate-y-1"
            >
              {isLastSegment ? "Complete" : "Continue"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Custom State Hook (Client)
 * FILE: src/features/ijarah/hooks/use-lesson-flow.ts
 * ============================================================================
 * Headless state orchestrator for the interactive progressive disclosure lessons.
 * Manages the revealed segments, progress bar mathematics, quiz gates,
 * and automated DOM scroll manipulation.
 * * ARCHITECTURE NOTE: Derived state (`progressPercentage`) is calculated
 * synchronously to prevent needless `useEffect` render cycles. The hook
 * acts as an absolute gatekeeper, preventing the user from advancing if
 * a QUIZ segment is unsolved, regardless of UI overrides.
 * ============================================================================
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { LessonData } from "../types/lesson";

export function useLessonFlow(lesson: LessonData) {
  // Tracks how many segments are currently visible to the user
  const [revealedIndex, setRevealedIndex] = useState(0);

  // Tracks the solved state of specific quiz segments by their ID
  const [quizState, setQuizState] = useState<Record<string, boolean>>({});

  // Attached to an invisible div at the bottom of the segment list to pull the view down
  const newestSegmentRef = useRef<HTMLDivElement>(null);

  const totalSegments = lesson.segments.length;
  const currentSegment = lesson.segments[revealedIndex];

  // Calculate progress based on the maximum possible index to start at 0%
  const progressPercentage =
    totalSegments > 1
      ? Math.round((revealedIndex / (totalSegments - 1)) * 100)
      : 100;

  const isLastSegment = revealedIndex === totalSegments - 1;

  // Gatekeeper logic: If the current segment is a quiz, require a correct answer
  const canContinue =
    currentSegment.type === "QUIZ" ? !!quizState[currentSegment.id] : true;

  const revealNext = useCallback(() => {
    if (canContinue && !isLastSegment) {
      setRevealedIndex((prev) => prev + 1);
    }
  }, [canContinue, isLastSegment]);

  const answerQuiz = useCallback((segmentId: string, isCorrect: boolean) => {
    setQuizState((prev) => ({
      ...prev,
      [segmentId]: isCorrect,
    }));
  }, []);

  // Handle the browser API side-effect for smooth scrolling
  useEffect(() => {
    if (newestSegmentRef.current && revealedIndex > 0) {
      // A microscopic timeout ensures React has painted the new segment to the DOM
      // before the browser attempts to calculate the scroll target
      const timeoutId = setTimeout(() => {
        newestSegmentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [revealedIndex]);

  return {
    // We only return the slice of segments the user is allowed to see
    revealedSegments: lesson.segments.slice(0, revealedIndex + 1),
    progressPercentage,
    isLastSegment,
    canContinue,
    newestSegmentRef,
    revealNext,
    answerQuiz,
    quizState,
  };
}

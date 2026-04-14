/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Custom State Hook (Client)
 * FILE: src/features/ijarah/hooks/use-lesson-flow.ts
 * ============================================================================
 * Headless state orchestrator for the interactive progressive disclosure lessons.
 * Manages the revealed segments, progress bar mathematics, quiz gates,
 * and automated DOM scroll manipulation.
 * * ARCHITECTURE NOTE:
 * - Derived state (`progressPercentage`) is calculated
 * synchronously to prevent needless `useEffect` render cycles. The hook
 * acts as an absolute gatekeeper, preventing the user from advancing if
 * a QUIZ segment is unsolved, regardless of UI overrides.
 * - Implements Hydration-Safe localStorage persistence to
 * retain user progress across component mount/unmount cycles and page reloads.
 * ============================================================================
 */

"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { LessonData } from "../types/lesson";

export function useLessonFlow(lesson: LessonData) {
  // Define unique storage keys for the specific lesson
  const INDEX_STORAGE_KEY = `iffas_lesson_${lesson.id}_revealed`;
  const QUIZ_STORAGE_KEY = `iffas_lesson_${lesson.id}_quiz`;

  // Standard React state initialized safely for Next.js Server-Side Rendering
  const [revealedIndex, setRevealedIndex] = useState(0);

  // Tracks the solved state of specific quiz segments by their ID
  const [quizState, setQuizState] = useState<Record<string, boolean>>({});

  // Hydration flag to prevent saving default state over persisted state on first render
  const [isHydrated, setIsHydrated] = useState(false);

  const newestSegmentRef = useRef<HTMLDivElement>(null);

  // --------------------------------------------------------------------------
  // HYDRATION: Retrieve persisted state after the initial client render
  // --------------------------------------------------------------------------
  useEffect(() => {
    const savedIndex = localStorage.getItem(INDEX_STORAGE_KEY);
    const savedQuiz = localStorage.getItem(QUIZ_STORAGE_KEY);

    if (savedIndex !== null) {
      setRevealedIndex(parseInt(savedIndex, 10));
    }

    if (savedQuiz !== null) {
      try {
        setQuizState(JSON.parse(savedQuiz));
      } catch (error) {
        console.error("Failed to parse persisted quiz state:", error);
      }
    }

    setIsHydrated(true);
  }, [INDEX_STORAGE_KEY, QUIZ_STORAGE_KEY]);

  // --------------------------------------------------------------------------
  // PERSISTENCE: Save state to browser storage whenever it changes
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(INDEX_STORAGE_KEY, revealedIndex.toString());
    }
  }, [revealedIndex, isHydrated, INDEX_STORAGE_KEY]);

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizState));
    }
  }, [quizState, isHydrated, QUIZ_STORAGE_KEY]);

  // --------------------------------------------------------------------------
  // DOMAIN LOGIC (Unchanged)
  // --------------------------------------------------------------------------
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

  // Smooth scrolling side-effect
  useEffect(() => {
    if (newestSegmentRef.current && revealedIndex > 0 && isHydrated) {
      const timeoutId = setTimeout(() => {
        newestSegmentRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [revealedIndex, isHydrated]);

  return {
    // Only return the slice of segments the user is allowed to see
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

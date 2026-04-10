/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Utility / Data
 * FILE: src/features/ijarah/utils/chapters-data.ts
 * ============================================================================
 * Static curriculum definitions for all chapters.
 * Extracts hardcoded lesson data from the React layer to maintain component purity
 * and adhere to the "Dumb UI" architectural mandate.
 * ============================================================================
 */

import { ChapterLesson } from "../types/chapter-menu";

/**
 * The sequential list of lessons for Chapter 1: Foundations and Mechanics.
 * Treated as deeply immutable to prevent accidental UI-layer mutation.
 */
export const CHAPTER_ONE_LESSONS: ReadonlyArray<ChapterLesson> = [
  {
    id: "1",
    title: "The Anatomy of an Ijarah",
    lessonNumber: "Lesson 1:",
    isActive: true, // Target active state as per design
  },
  {
    id: "2",
    title: "The Structural Divergence",
    lessonNumber: "Lesson 2:",
    isActive: false,
  },
  {
    id: "3",
    title: "The Pricing Engine",
    lessonNumber: "Lesson 3:",
    isActive: false,
  },
  {
    id: "4",
    title: "Macro-Financial Resilience",
    lessonNumber: "Lesson 4:",
    isActive: false,
  },
  {
    id: "5",
    title: "Contractual Engineering",
    lessonNumber: "Lesson 5:",
    isActive: false,
  },
  {
    id: "6",
    title: "Comparative Analysis",
    lessonNumber: "Lesson 6:",
    isActive: false,
  },
];

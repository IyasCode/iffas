/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Types
 * FILE: src/features/ijarah/types/chapter-menu.ts
 * ============================================================================
 * Defines the strict data structures for the curriculum chapter menus.
 * ============================================================================
 */

import { LessonStatus } from "./curriculum-types";

/**
 * Represents a single educational lesson within a chapter menu sequence.
 */
export interface ChapterLesson {
  /** * Unique identifier for the lesson, strictly used as a stable React key
   * and potential routing slug.
   */
  readonly id: string;

  /** * The pedagogical title of the lesson as defined in the curriculum.
   */
  readonly title: string;

  /** * The current lesson number to be displayed in the Ui, derived from the curriculum sequence.
   */
  readonly lessonNumber: string;

  /**
   * Indicates if the student is currently on this lesson.
   * Drives the visual state machine (e.g., triggering the active blue portal
   * versus the inactive gray portal).
   */
  status: LessonStatus;
}

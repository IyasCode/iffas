/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Utility / Data Mapping
 * FILE: src/features/ijarah/utils/lesson-data-mapper.ts
 * ============================================================================
 * Centralized mapper to retrieve static lesson content for the Ijarah module.
 * * ARCHITECTURE NOTE: This acts as the bridge between the raw data dictionary
 * and the UI orchestrators, ensuring strict type-safety.
 * ============================================================================
 */

import { LessonData } from "../types/lesson";
import {
  lesson1Data,
  lesson2Data,
  lesson3Data,
  lesson4Data,
  lesson5Data,
  lesson6Data,
} from "./chapter-1-data";

/**
 * A private dictionary mapping lesson IDs to their immutable data objects.
 */
const IJARAH_LESSON_MAP: Record<string, LessonData> = {
  "1": lesson1Data,
  "2": lesson2Data,
  "3": lesson3Data,
  "4": lesson4Data,
  "5": lesson5Data,
  "6": lesson6Data,
};

/**
 * Retrieves lesson data by its unique ID.
 * @param {string} lessonId - The ID of the lesson to retrieve.
 * @returns {LessonData | undefined} The lesson data or undefined if not found.
 */
export function getIjarahLessonData(lessonId: string): LessonData | undefined {
  return IJARAH_LESSON_MAP[lessonId];
}

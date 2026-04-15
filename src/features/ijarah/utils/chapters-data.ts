/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Utility / Data Configuration
 * FILE: src/features/ijarah/utils/chapters-data.ts
 * ============================================================================
 * Centralized data dictionary for the Ijarah module chapters.
 * This file eliminates magic strings and redundant component files by
 * providing a single source of truth for dynamic routing.
 * ============================================================================
 */

export interface IjarahLesson {
  id: string;
  title: string;
  lessonNumber: string;
  status: "ACTIVE" | "LOCKED" | "COMPLETED" | "JUST_UNLOCKED" | string;
}

export interface IjarahChapterConfig {
  title: string;
  lessons: IjarahLesson[];
}

// Strictly typed dictionary mapping URL slugs to their respective chapter configurations.
export const IJARAH_CHAPTERS_DATA: Record<string, IjarahChapterConfig> = {
  "chapter-1": {
    title: "The Anatomy of an Ijarah",
    lessons: [
      {
        id: "1",
        title: "The Substance of Service",
        lessonNumber: "Lesson 1:",
        status: "ACTIVE",
      },
      {
        id: "2",
        title: "The Structural Divergence",
        lessonNumber: "Lesson 2:",
        status: "LOCKED",
      },
      {
        id: "3",
        title: "The Pricing Engine",
        lessonNumber: "Lesson 3:",
        status: "LOCKED",
      },
      {
        id: "4",
        title: "Macro-Financial Resilience",
        lessonNumber: "Lesson 4:",
        status: "LOCKED",
      },
      {
        id: "5",
        title: "Contractual Engineering",
        lessonNumber: "Lesson 5:",
        status: "LOCKED",
      },
      {
        id: "6",
        title: "Comparative Analysis",
        lessonNumber: "Lesson 6:",
        status: "LOCKED",
      },
    ],
  },
  "chapter-2": {
    title: "The Foundation of Ijarah",
    lessons: [
      {
        id: "7",
        title: "Beyond the Price Tag",
        lessonNumber: "Lesson 7:",
        status: "LOCKED",
      },
      {
        id: "8",
        title: "Skin in the Game",
        lessonNumber: "Lesson 8:",
        status: "LOCKED",
      },
      {
        id: "9",
        title: "Time and Value",
        lessonNumber: "Lesson 9:",
        status: "LOCKED",
      },
      {
        id: "10",
        title: "The Exit Strategy",
        lessonNumber: "Lesson 10:",
        status: "LOCKED",
      },
      {
        id: "11",
        title: "Calculating Net Financing",
        lessonNumber: "Lesson 11:",
        status: "LOCKED",
      },
    ],
  },
  "chapter-3": {
    title: "The Target Profit Rate",
    lessons: [
      {
        id: "12",
        title: "The Yield Benchmark",
        lessonNumber: "Lesson 12:",
        status: "LOCKED",
      },
      {
        id: "13",
        title: "The Bank’s Target",
        lessonNumber: "Lesson 13:",
        status: "LOCKED",
      },
      {
        id: "14",
        title: "The Monthly Conversion",
        lessonNumber: "Lesson 14:",
        status: "LOCKED",
      },
      {
        id: "15",
        title: "The Trial & Error Process",
        lessonNumber: "Lesson 15:",
        status: "LOCKED",
      },
    ],
  },
  "chapter-4": {
    title: "The Schedule Engine",
    lessons: [
      {
        id: "16",
        title: "Setting the Anchor",
        lessonNumber: "Lesson 16:",
        status: "LOCKED",
      },
      {
        id: "17",
        title: "The Bank’s Share",
        lessonNumber: "Lesson 17:",
        status: "LOCKED",
      },
      {
        id: "18",
        title: "Solving for the Principal",
        lessonNumber: "Lesson 18:",
        status: "LOCKED",
      },
      {
        id: "19",
        title: "Determining the Ending Balance",
        lessonNumber: "Lesson 19:",
        status: "LOCKED",
      },
      {
        id: "20",
        title: "Accounting for Depreciation",
        lessonNumber: "Lesson 20:",
        status: "LOCKED",
      },
      {
        id: "21",
        title: "The Book Value",
        lessonNumber: "Lesson 21:",
        status: "LOCKED",
      },
      {
        id: "22",
        title: "The Global Reporting Maze",
        lessonNumber: "Lesson 22:",
        status: "LOCKED",
      },
    ],
  },
  "chapter-5": {
    title: "Real-World Volatility & Crises",
    lessons: [
      {
        id: "23",
        title: "The Floating Rate Shift",
        lessonNumber: "Lesson 23:",
        status: "LOCKED",
      },
      {
        id: "24",
        title: "The Default Dilemma",
        lessonNumber: "Lesson 24:",
        status: "LOCKED",
      },
      {
        id: "25",
        title: "Asset Operability",
        lessonNumber: "Lesson 25:",
        status: "LOCKED",
      },
      {
        id: "26",
        title: "Early Termination and Settlement",
        lessonNumber: "Lesson 26:",
        status: "LOCKED",
      },
      {
        id: "27",
        title: "Non-Delivery of Asset",
        lessonNumber: "Lesson 27:",
        status: "LOCKED",
      },
    ],
  },
};

/**
 * Helper function to retrieve chapter data based on the URL slug safely.
 * @param {string} slug - The URL segment (e.g., 'chapter-2')
 * @returns {IjarahChapterConfig | undefined} The chapter config or undefined if not found.
 */
export function getIjarahChapterData(
  slug: string,
): IjarahChapterConfig | undefined {
  return IJARAH_CHAPTERS_DATA[slug];
}

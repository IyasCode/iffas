/**
 * ============================================================================
 * FEATURE: Ijarah | LAYER: Utility / Data Configuration
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
  isActive: boolean;
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
        title: "The Anatomy of an Ijarah",
        lessonNumber: "Lesson 1:",
        isActive: true,
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
    ],
  },
  "chapter-2": {
    title: "The Foundation of Ijarah",
    lessons: [
      {
        id: "7",
        title: "The Foundation of Ijarah",
        lessonNumber: "Lesson 7:",
        isActive: false,
      },
      {
        id: "8",
        title: "Skin in the Game",
        lessonNumber: "Lesson 8:",
        isActive: false,
      },
      {
        id: "9",
        title: "Time and Value",
        lessonNumber: "Lesson 9:",
        isActive: false,
      },
      {
        id: "10",
        title: "The Exit Strategy",
        lessonNumber: "Lesson 10:",
        isActive: false,
      },
      {
        id: "11",
        title: "Calculating Net Financing",
        lessonNumber: "Lesson 11:",
        isActive: false,
      },
    ],
  },
  "chapter-3": {
    title: "The Target Profit Rate",
    lessons: [
      {
        id: "12",
        title: "The Target Profit Rate",
        lessonNumber: "Lesson 12:",
        isActive: false,
      },
      {
        id: "13",
        title: "The Bank’s Target",
        lessonNumber: "Lesson 13:",
        isActive: false,
      },
      {
        id: "14",
        title: "The Monthly Conversion",
        lessonNumber: "Lesson 14:",
        isActive: false,
      },
      {
        id: "15",
        title: "The Trial & Error Simulator",
        lessonNumber: "Lesson 15:",
        isActive: false,
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
        isActive: false,
      },
      {
        id: "17",
        title: "The Bank’s Share",
        lessonNumber: "Lesson 17:",
        isActive: false,
      },
      {
        id: "18",
        title: "Solving for the Principal",
        lessonNumber: "Lesson 18:",
        isActive: false,
      },
      {
        id: "19",
        title: "Determining the Ending Balance",
        lessonNumber: "Lesson 19:",
        isActive: false,
      },
      {
        id: "20",
        title: "Accounting for Depreciation",
        lessonNumber: "Lesson 20:",
        isActive: false,
      },
      {
        id: "21",
        title: "The Book Value",
        lessonNumber: "Lesson 21:",
        isActive: false,
      },
      {
        id: "22",
        title: "The Global Reporting Maze",
        lessonNumber: "Lesson 22:",
        isActive: false,
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
        isActive: false,
      },
      {
        id: "24",
        title: "The Default Dilemma",
        lessonNumber: "Lesson 24:",
        isActive: false,
      },
      {
        id: "25",
        title: "Asset Operability",
        lessonNumber: "Lesson 25:",
        isActive: false,
      },
      {
        id: "26",
        title: "Early Termination and Settlement",
        lessonNumber: "Lesson 26:",
        isActive: false,
      },
      {
        id: "27",
        title: "Non-Delivery of Asset",
        lessonNumber: "Lesson 27:",
        isActive: false,
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

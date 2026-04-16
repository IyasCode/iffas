/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Types / Domain Model
 * FILE: src/features/ijarah/types/lesson.ts
 * ============================================================================
 * Defines the strictly typed blueprints for the progressive disclosure
 * educational lessons based on the ACIFE curriculum.
 * * ARCHITECTURE NOTE:
 * - By utilizing Discriminated Unions (`SegmentType`and
 * `InteractiveVariant`), we guarantee type safety at the React UI boundary,
 * making it mathematically impossible for a renderer to expect an image
 * source on a text block.
 * - Discriminator for the transient state machine.
 * This guarantees the UI shell knows exactly how to render the segment.
 * ============================================================================
 */

export type SegmentType = "TEXT" | "VISUAL" | "QUIZ" | "INTERACTIVE";

export type BaseSegment = {
  readonly id: string;
  readonly type: SegmentType;
};

export type TextSegment = BaseSegment & {
  readonly type: "TEXT";
  readonly title?: string;
  readonly content: string;
  readonly subpoints?: readonly {
    readonly label: string;
    readonly text: string;
  }[];
};

export type VisualSegment = BaseSegment & {
  readonly type: "VISUAL";
  readonly imageSrc: string;
  readonly altText: string;
  readonly narrativeTitle?: string;
  readonly narrativeContent: string;
};

export type QuizSegment = BaseSegment & {
  readonly type: "QUIZ";
  readonly customTitle?: string;
  readonly question: string;
  readonly options: readonly string[];
  readonly correctIndex: number;
  readonly feedbackPrefix: string;
  readonly feedbackText: string;
};

// ============================================================================
// INTERACTIVE PAYLOAD ARCHITECTURE (DISCRIMINATED UNIONS)
// ============================================================================

export type InteractiveVariant =
  | "INPUT_MATCH"
  | "SLIDER_EXPLORE"
  | "SELECTOR_MATCH";

/**
 * Payload for explicit number matching (e.g., typing in the exact Cost of Machinery).
 */
export type InputMatchPayload = {
  readonly variant: "INPUT_MATCH";
  readonly expectedValue: number;
  readonly affix?: string; // e.g., "$" or "%" to guide the user
};

/**
 * Payload for exploratory ranges (Prepared for Lesson 8).
 * ARCHITECTURE NOTE: All text strings and base math inputs are passed here
 * to keep the UI component purely presentational.
 */
export type SliderExplorePayload = {
  readonly variant: "SLIDER_EXPLORE";
  readonly formulaLabel: string; // e.g., "Security Deposit = Cost of Asset × Deposit Percentage"
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly baseAmount: number; // e.g., 620000
  readonly expectedValue: number; // e.g., 12 (represents 12%)
  readonly feedbackUnder: string;
  readonly feedbackAt: string;
  readonly feedbackOver: string;
};

/**
 * Payload for choosing between distinct contractual paths (Prepared for Lesson 9/10).
 */
export type SelectorMatchPayload = {
  readonly variant: "SELECTOR_MATCH";
  readonly expectedOptionId: string;
  readonly options: readonly { id: string; label: string }[];
};

/**
 * The Strict Union of all possible interactive states.
 */
export type InteractivePayload =
  | InputMatchPayload
  | SliderExplorePayload
  | SelectorMatchPayload;

/**
 * The wrapper segment for all interactivity.
 * By placing `hintText` here, we guarantee every interactive element
 * supports a hint, without duplicating it in every payload variant.
 */
export type InteractiveSegment = BaseSegment & {
  readonly type: "INTERACTIVE";
  readonly questionText: string;
  /** Optional pedagogical nudge displayed in the bottom corner of the interactive UI */
  readonly hintText?: string;
  readonly payload: InteractivePayload;
};

// ============================================================================
// MASTER UNION
// ============================================================================

// The Discriminated Union exported for the UI renderer
export type LessonSegment =
  | TextSegment
  | VisualSegment
  | QuizSegment
  | InteractiveSegment;

export type LessonData = {
  readonly id: string;
  readonly title: string;
  readonly segments: readonly LessonSegment[];
};

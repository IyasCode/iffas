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

export type MathProofConfig = {
  readonly buttonLabel: string;
  readonly title: string;
  readonly latexContent: string;
};

export type TextSegment = BaseSegment & {
  readonly type: "TEXT";
  readonly title?: string;
  readonly content: string;
  readonly subpoints?: readonly {
    readonly label: string;
    readonly text: string;
  }[];
  readonly mathProof?: MathProofConfig;
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

// ============================================================================
// SCENARIO SLIDER TYPES (Lesson 9)
// ============================================================================

export type ScenarioStatus = "success" | "warning" | "error";

export type ScenarioData = {
  readonly label: string; // e.g., "1 Year"
  readonly months: number; // e.g., 12
  readonly rentalFormatted: string; // e.g., "~$55,200"
  readonly status: ScenarioStatus;
  readonly analysisTitle: string; // e.g., "Extreme Credit Risk"
  readonly analysisText: string; // e.g., "Payment is unsustainable..."
};

// ============================================================================
// EQUATION BUILDER TYPES (Lesson 11)
// ============================================================================

export type EquationVariable = {
  readonly id: string;
  readonly label: string;
  readonly amount: number; // Raw primitive (e.g., 620000) to protect the math
};

export type EquationFeedback = {
  readonly status: "success" | "error" | "warning";
  readonly title: string;
  readonly text: string;
};

/**
 * Payload for the "Tap-to-Slot" pedagogical formula builder.
 * ARCHITECTURE NOTE: Uses a dictionary lookup (`feedbackDictionary`)
 * to determine the response for specific variable combinations, keeping
 * the UI component purely presentational.
 */
export type EquationBuilderPayload = {
  readonly variant: "EQUATION_BUILDER";
  readonly operatorLabel: string; // e.g., "MINUS"
  readonly resultLabel: string; // e.g., "Net Financing Amount"
  readonly variables: readonly EquationVariable[];
  readonly expectedSequence: readonly string[]; // The winning array of IDs
  readonly feedbackDictionary: Readonly<Record<string, EquationFeedback>>;
  readonly fallbackFeedback: EquationFeedback; // Catches any undefined combinations
};

/**
 * Payload for discrete scenario exploration.
 * Maps specific integer slider values to predefined pedagogical scenarios.
 */
export type ScenarioSliderPayload = {
  readonly variant: "SCENARIO_SLIDER";
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly initialValue: number;
  readonly scenarios: Readonly<Record<number, ScenarioData>>;
};

// ============================================================================
// MULTI-SELECT BUILDER TYPES (Lesson 12)
// ============================================================================

export type SpreadOption = {
  readonly id: string;
  readonly label: string;
  readonly percentage: number; // e.g., 2.5 represents 2.5%
};

/**
 * Payload for the "Multi-Select" Risk Spread Builder.
 * ARCHITECTURE NOTE: Utilizes a distractor dictionary to instantly map
 * specific Shariah violations to user mis-clicks, keeping the React UI
 * completely unaware of Islamic finance principles.
 */
export type MultiSelectBuilderPayload = {
  readonly variant: "MULTI_SELECT_BUILDER";
  readonly benchmarkRate: number; // e.g., 4 (for 4% SOFR)
  readonly benchmarkLabel: string; // e.g., "SOFR"
  readonly options: readonly SpreadOption[];
  readonly correctIds: readonly string[]; // The required winning combination
  readonly distractorFeedback: Readonly<Record<string, EquationFeedback>>;
  readonly successFeedback: EquationFeedback;
};

// ============================================================================
// BINARY SIMULATOR TYPES (Lesson 13)
// ============================================================================

export type BinarySimulatorState = {
  readonly id: "flat_rate" | "true_yield"; // Acts as the animation trigger in the UI
  readonly buttonLabel: string;
  readonly feedbackStatus: "success" | "error" | "warning";
  readonly feedbackTitle: string;
  readonly feedbackText: string;
};

/**
 * Payload for binary "A/B" state simulations (e.g., Flat Rate vs. True Yield).
 * The UI reads the selected state's ID to trigger the correct CSS chart animation.
 */
export type BinarySimulatorPayload = {
  readonly variant: "BINARY_SIMULATOR";
  readonly optionA: BinarySimulatorState;
  readonly optionB: BinarySimulatorState;
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
  | SelectorMatchPayload
  | ScenarioSliderPayload
  | EquationBuilderPayload
  | MultiSelectBuilderPayload
  | BinarySimulatorPayload;

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

/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Types / Domain Model
 * FILE: src/features/ijarah/types/lesson.ts
 * ============================================================================
 * Defines the strictly typed blueprints for the progressive disclosure
 * educational lessons based on the ACIFE curriculum.
 * * ARCHITECTURE NOTE: By utilizing Discriminated Unions (`SegmentType`),
 * we guarantee type safety at the React UI boundary, making it mathematically
 * impossible for a renderer to expect an image source on a text block.
 * ============================================================================
 */

/**
 * Discriminator for the transient state machine.
 * This guarantees the UI shell knows exactly how to render the segment.
 */

export type SegmentType = "TEXT" | "VISUAL" | "QUIZ";

export type BaseSegment = {
  readonly id: string;
  readonly type: SegmentType;
};

export type TextSegment = BaseSegment & {
  readonly type: "TEXT";
  readonly title?: string;
  readonly content: string;
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
  readonly question: string;
  readonly options: readonly string[];
  readonly correctIndex: number;
  readonly feedbackPrefix: string;
  readonly feedbackText: string;
};

// The Discriminated Union
export type LessonSegment = TextSegment | VisualSegment | QuizSegment;

export type LessonData = {
  readonly id: string;
  readonly title: string;
  readonly segments: readonly LessonSegment[];
};

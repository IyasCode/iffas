/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/LessonSegmentRenderer.tsx
 * ============================================================================
 * A switch-based router component that maps specific discriminated union
 * segment types (`TEXT`, `VISUAL`, `QUIZ`) to their respective DOM structures.
 * * ARCHITECTURE NOTE:
 * - Utilizes a TypeScript exhaustive check
 * (`const _exhaustiveCheck: never`) in the default case. This guarantees
 * a hard compilation failure if a new segment type is ever added to the
 * domain model without a corresponding UI renderer being built here.
 * - Pure presentation component. Acts as a strict switch-router mapping
 * discriminated union types to their specific DOM blocks.
 * State progression is delegated entirely to useLessonFlow.ts.
 * ============================================================================
 */

"use client";

import { LessonSegment } from "../types/lesson";
import { InteractiveInput } from "./InteractiveInput";
import { InteractiveSlider } from "./InteractiveSlider";
import { InteractiveScenarioSlider } from "./InteractiveScenarioSlider";
import { InteractiveEquationBuilder } from "./InteractiveEquationBuilder";
import { InteractiveSpreadBuilder } from "./InteractiveSpreadBuilder";
import { InteractiveYieldSimulator } from "./InteractiveYieldSimulator";
import { KnowledgeCheck } from "./KnowledgeCheck";
import { TextSegmentBlock } from "./TextSegmentBlock";
import { VisualSegmentBlock } from "./VisualSegmentBlock";

interface LessonSegmentRendererProps {
  segment: LessonSegment;
  isSolved: boolean;
  onAnswerQuiz: (segmentId: string, isCorrect: boolean) => void;
  onGateSuccess: () => void;
}

export function LessonSegmentRenderer({
  segment,
  isSolved,
  onAnswerQuiz,
  onGateSuccess,
}: LessonSegmentRendererProps) {
  // EXHAUSTIVE TYPE CHECKING AT THE ROOT LEVEL
  switch (segment.type) {
    case "TEXT":
      return <TextSegmentBlock segment={segment} />;

    case "VISUAL":
      return <VisualSegmentBlock segment={segment} />;

    case "QUIZ":
      return (
        <KnowledgeCheck
          segment={segment}
          isSolved={isSolved}
          onAnswer={onAnswerQuiz} // Fixed: Maps to the correct KnowledgeCheck prop
        />
      );

    case "INTERACTIVE":
      // EXHAUSTIVE TYPE CHECKING AT THE PAYLOAD LEVEL
      switch (segment.payload.variant) {
        case "INPUT_MATCH":
          return (
            <InteractiveInput
              questionText={segment.questionText}
              hintText={segment.hintText}
              payload={segment.payload}
              onSuccess={onGateSuccess} // Triggers revealNext in useLessonFlow
            />
          );

        case "SLIDER_EXPLORE":
          return (
            <InteractiveSlider
              key={segment.id}
              questionText={segment.questionText}
              hintText={segment.hintText}
              payload={segment.payload}
              onSuccess={onGateSuccess}
            />
          );

        case "SCENARIO_SLIDER":
          return (
            <InteractiveScenarioSlider
              key={segment.id}
              questionText={segment.questionText}
              hintText={segment.hintText}
              payload={segment.payload}
              onSuccess={onGateSuccess}
            />
          );

        case "EQUATION_BUILDER":
          return (
            <InteractiveEquationBuilder
              key={segment.id}
              questionText={segment.questionText}
              hintText={segment.hintText}
              payload={segment.payload}
              onSuccess={onGateSuccess}
            />
          );

        case "MULTI_SELECT_BUILDER":
          return (
            <InteractiveSpreadBuilder
              key={segment.id}
              questionText={segment.questionText}
              payload={segment.payload}
              onSuccess={onGateSuccess}
            />
          );

        case "BINARY_SIMULATOR":
          return (
            <InteractiveYieldSimulator
              key={segment.id}
              questionText={segment.questionText}
              payload={segment.payload}
              onSuccess={onGateSuccess}
            />
          );

        case "SELECTOR_MATCH":
          return (
            <div className="p-4 border-2 border-dashed border-red-300 bg-red-50 text-red-700 rounded-md">
              <p className="font-bold">TODO [Architecture]:</p>
              <p>
                Component for {segment.payload.variant} is not yet implemented.
              </p>
            </div>
          );

        default:
          const _exhaustiveCheck: never = segment.payload;
          return null;
      }

    default:
      const _segmentCheck: never = segment;
      return null;
  }
}

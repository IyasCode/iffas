/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/KnowledgeCheck.tsx
 * ============================================================================
 * Renders the interactive multiple-choice quiz segments and their conditional
 * Shariah feedback overlays to reinforce the ACIFE module learning points.
 * * ARCHITECTURE NOTE: Handles its own temporary, localized `selectedValue`
 * state for fluid UI interaction, but delegates the actual "correctness"
 * validation up to the parent `useLessonFlow` orchestrator via `onAnswer()`.
 * ============================================================================
 */

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { QuizSegment } from "../types/lesson";

interface KnowledgeCheckProps {
  segment: QuizSegment;
  isSolved: boolean;
  onAnswer: (segmentId: string, isCorrect: boolean) => void;
}

export function KnowledgeCheck({
  segment,
  isSolved,
  onAnswer,
}: KnowledgeCheckProps) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleValueChange = (value: string) => {
    if (isSolved) return; // Lock inputs once correctly answered
    setSelectedValue(value);
    const isCorrect = parseInt(value, 10) === segment.correctIndex;
    onAnswer(segment.id, isCorrect);
  };

  return (
    <div className="p-6 my-8 border-2 rounded-xl border-brand-light-gray bg-white/60 backdrop-blur-sm shadow-sm">
      {/* ARCHITECTURAL FIX: Data-Driven Title Rendering */}
      <h3 className="mb-4 text-lg font-bold text-brand-dark-navy uppercase tracking-wider">
        {segment.customTitle || "Quick Knowledge Check"}
      </h3>

      <p className="mb-6 text-brand-navy font-medium text-lg leading-relaxed">
        {segment.question}
      </p>

      <RadioGroup
        value={selectedValue}
        onValueChange={handleValueChange}
        disabled={isSolved}
        className="space-y-3"
      >
        {segment.options.map((option, index) => {
          const isSelected = selectedValue === index.toString();
          const isCorrectOption = index === segment.correctIndex;

          // Compute dynamic styling based on answer correctness
          let ringState =
            "border-brand-light-gray hover:bg-brand-light-gray/20";
          if (isSelected) {
            ringState = isCorrectOption
              ? "border-green-500 bg-green-50"
              : "border-red-400 bg-red-50";
          }

          return (
            <div
              key={index}
              className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-300 ${ringState}`}
            >
              <RadioGroupItem
                value={index.toString()}
                id={`${segment.id}-opt-${index}`}
              />
              <Label
                htmlFor={`${segment.id}-opt-${index}`}
                className="flex-1 cursor-pointer text-base text-brand-navy"
              >
                {option}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {/* The Feedback Overlay */}
      {isSolved && (
        <div className="mt-6 p-4 rounded-lg bg-brand-cream border border-brand-light-gray text-brand-navy animate-in fade-in slide-in-from-bottom-2">
          <span className="font-bold text-green-700">
            {segment.feedbackPrefix}
          </span>{" "}
          <span className="opacity-90">{segment.feedbackText}</span>
        </div>
      )}
    </div>
  );
}

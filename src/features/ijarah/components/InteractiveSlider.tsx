/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client)
 * FILE: src/features/ijarah/components/InteractiveSlider.tsx
 * ============================================================================
 * Client boundary: A purely mathematical, "dumb" slider engine.
 * It takes the base amount, calculates the real-time percentage, and compares
 * it to the strict expected value defined in the static data payload.
 * Provides real-time visual feedback (Orange/Green/Blue) without holding
 * any hardcoded Shariah text or financial numbers itself.
 * ============================================================================
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, Lightbulb, Info } from "lucide-react";
import { SliderExplorePayload } from "../types/lesson";
import { formatCurrency } from "@/lib/utils/formatters";

interface InteractiveSliderProps {
  questionText: string;
  hintText?: string;
  payload: SliderExplorePayload;
  onSuccess: () => void;
}

export function InteractiveSlider({
  questionText,
  hintText,
  payload,
  onSuccess,
}: InteractiveSliderProps) {
  // Start the slider at 0 to force the user to interact with it
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isResolved, setIsResolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(Number(e.target.value));
    },
    [],
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
      e.preventDefault();
      if (currentValue === payload.expectedValue) {
        setIsResolved(true);
        onSuccess(); // Dispatch event to LessonSegmentRenderer to unlock next step
      }
    },
    [currentValue, payload.expectedValue, onSuccess],
  );

  // ==========================================================================
  // THE "DUMB ENGINE" CALCULATIONS
  // ==========================================================================
  const calculatedAmount = useMemo(() => {
    return payload.baseAmount * (currentValue / 100);
  }, [payload.baseAmount, currentValue]);

  const isMatch = currentValue === payload.expectedValue;
  const isUnder = currentValue < payload.expectedValue;

  // Dynamic UI States based strictly on the mathematical comparison
  const feedbackState = useMemo(() => {
    if (isMatch) {
      return {
        text: payload.feedbackAt,
        colorClass: "text-emerald-700",
        bgClass: "bg-emerald-50 border-emerald-200",
        Icon: CheckCircle2,
      };
    }
    if (isUnder) {
      return {
        text: payload.feedbackUnder,
        colorClass: "text-amber-700",
        bgClass: "bg-amber-50 border-amber-200",
        Icon: AlertTriangle,
      };
    }
    // Over target
    return {
      text: payload.feedbackOver,
      colorClass: "text-blue-700",
      bgClass: "bg-blue-50 border-blue-200",
      Icon: Info,
    };
  }, [isMatch, isUnder, payload]);

  // ==========================================================================
  // RENDER: RESOLVED STATE (Pedagogical Success)
  // ==========================================================================
  if (isResolved) {
    return (
      <div
        className="flex items-center gap-4 p-6 my-6 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm"
        aria-live="polite"
      >
        <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-emerald-800">
            {questionText}
          </span>
          <span className="text-2xl font-bold tabular-nums text-emerald-900">
            {currentValue}% ({formatCurrency(calculatedAmount)})
          </span>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: INTERACTIVE STATE (The Gate)
  // ==========================================================================
  return (
    <div className="p-6 my-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Header & Formula */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="interactive-slider"
            className="text-lg font-bold text-brand-dark-navy"
          >
            {questionText}
          </Label>
          <div className="mt-2 p-4 bg-slate-50 rounded-md border border-slate-100 flex flex-col gap-1 items-center md:items-start">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {payload.formulaLabel}
            </span>
            <span
              className={cn(
                "text-2xl md:text-3xl font-black tabular-nums transition-colors duration-300 no-wrap",
                feedbackState.colorClass,
              )}
            >
              {formatCurrency(calculatedAmount)}{" "}
            </span>
            <span className="text-slate-400 font-medium text-xl">
              = {formatCurrency(payload.baseAmount)} × {currentValue}%
            </span>
          </div>
        </div>

        {/* Native Slider Control */}
        <div className="flex flex-col gap-2 px-2">
          <input
            id="interactive-slider"
            type="range"
            min={payload.min}
            max={payload.max}
            step={payload.step}
            value={currentValue}
            onChange={handleSliderChange}
            // Tailwind accent color maps natively to the browser's thumb control
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-light-navy hover:accent-brand-navy focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2"
          />
          <div className="flex justify-between text-xs font-bold text-slate-400 select-none">
            <span>{payload.min}%</span>
            <span>{payload.max}%</span>
          </div>
        </div>

        {/* --- Bottom Controls Wrapper --- */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full">
          {/* 1. Target Zone Feedback Box */}
          <div
            className={cn(
              "flex items-center gap-3 p-4 rounded-md border transition-colors duration-300 h-10",
              "basis-full sm:flex-1", // Mobile: full width | Desktop: takes available space
              feedbackState.bgClass,
            )}
          >
            <feedbackState.Icon
              className={cn("w-5 h-5 shrink-0", feedbackState.colorClass)}
            />
            <span
              className={cn(
                "text-[12px] font-medium md:text-sm",
                feedbackState.colorClass,
              )}
            >
              {feedbackState.text}
            </span>
          </div>

          {/* 2. Action Button */}
          <Button
            type="submit"
            disabled={!isMatch}
            className={cn(
              "bg-brand-dark-navy hover:bg-brand-navy text-white disabled:opacity-50 transition-all",
              "flex-1 sm:flex-none sm:w-auto h-10", // Mobile: grows to fill space next to hint | Desktop: auto width
            )}
          >
            Confirm Value
          </Button>

          {/* 3. Hint Toggle Button */}
          <Button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className={cn(
              "shrink-0 cursor-pointer flex items-center justify-center transition-all",
              "bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md",
              "w-10 h-10", // Increased size slightly to match standard button touch targets
            )}
          >
            <Lightbulb className="w-5 h-5 text-amber-500" />
          </Button>
        </div>
      </form>

      {/* The Hoisted Hint Execution */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          showHint
            ? "grid-rows-[1fr] opacity-100 mt-6"
            : "grid-rows-[0fr] opacity-0 mt-0",
        )}
      >
        <div className="overflow-hidden">
          {/* Apply the background, border, and padding HERE inside the overflow-hidden div.
       This ensures they are clipped perfectly as the grid row shrinks.
    */}
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-md border border-amber-100">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900 leading-relaxed">
              <span className="font-semibold block mb-1">Hint:</span>
              {hintText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

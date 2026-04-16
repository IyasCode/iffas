/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client)
 * FILE: src/features/ijarah/components/InteractiveInput.tsx
 * ============================================================================
 * Client boundary: Requires local state to manage the user's numerical input,
 * validate it against the expected pedagogical value, and dispatch the success
 * event to unlock the subsequent lesson segments.
 * ============================================================================
 */

"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, Lightbulb } from "lucide-react";
import { InputMatchPayload } from "../types/lesson";
import { formatCurrency } from "@/lib/utils/formatters";

interface InteractiveInputProps {
  questionText: string;
  hintText?: string;
  payload: InputMatchPayload;
  onSuccess: () => void;
}

export function InteractiveInput({
  questionText,
  hintText,
  payload,
  onSuccess,
}: InteractiveInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isResolved, setIsResolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // Strip non-numeric characters (except decimals/commas if user types them)
      const rawValue = e.target.value;
      setInputValue(rawValue);

      if (hasError) {
        setHasError(false); // Clear pedagogical error state upon new input
      }
    },
    [hasError],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Sanitize input: remove commas so '620,000' and '620000' both parse safely
      const sanitizedInput = inputValue.replace(/,/g, "");
      const numericValue = Number(sanitizedInput);

      // Validate against the pure mathematical expected value
      if (numericValue === payload.expectedValue) {
        setIsResolved(true);
        setHasError(false);
        onSuccess(); // Dispatch event to LessonSegmentRenderer to unlock next step
      } else {
        setHasError(true);
      }
    },
    [inputValue, payload.expectedValue, onSuccess],
  );

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
            {payload.affix === "$"
              ? formatCurrency(payload.expectedValue)
              : payload.expectedValue}
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="interactive-gate"
            className="text-base font-semibold text-slate-900"
          >
            {questionText}
          </Label>

          {/* CONTAINER STRATEGY:
          - Mobile: Column (Input top, buttons bottom)
          - Desktop (sm+): Row (All in one line)
        */}
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            {/* Input: grows to fill space on desktop (flex-1) */}
            <div className="relative w-full sm:flex-1">
              {payload.affix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-medium select-none  ">
                  {payload.affix}
                </span>
              )}
              <Input
                id="interactive-gate"
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={handleInputChange}
                className={cn(
                  "text-lg tabular-nums transition-colors md:h-12",
                  "text-blue-950 placeholder:text-slate-400",
                  "bg-white",
                  payload.affix && "pl-8",
                  hasError && "border-red-500 focus-visible:ring-red-500",
                )}
                placeholder="0.00"
                aria-invalid={hasError}
              />
            </div>

            {/* BUTTON GROUP:
            - Mobile: Row where Submit is w-full (flex-1) and Hint is fixed width
            - Desktop: Natural width (w-auto)
          */}
            <div className="flex w-full sm:w-auto gap-2">
              <Button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex-1 sm:flex-none sm:px-6 md:h-12"
              >
                Confirm Value
              </Button>
              <Button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className={cn(
                  "shrink-0 cursor-pointer flex items-center justify-center transition-all",
                  "bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-md",
                  "w-8 h-8 md:w-12 md:h-12",
                )}
              >
                <Lightbulb className="w-5 h-5 text-amber-500 md:w-8 md:h-8" />
              </Button>
            </div>
          </div>
        </div>

        {hasError && (
          <div className="flex items-center gap-2 text-red-600 animate-in fade-in slide-in-from-top-1">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">
              Incorrect value. Review the scenario and try again.
            </span>
          </div>
        )}
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

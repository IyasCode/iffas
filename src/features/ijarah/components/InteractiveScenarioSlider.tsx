"use client";

/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client)
 * FILE: src/features/ijarah/components/InteractiveScenarioSlider.tsx
 * ============================================================================
 * Client boundary: A discrete, scenario-based slider engine.
 * It uses the slider value purely as an index to look up predefined outcomes
 * from the data dictionary (hash map). It contains zero financial math and
 * zero hardcoded Shariah logic.
 * ============================================================================
 */

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, XCircle, Lightbulb } from "lucide-react";
import { ScenarioSliderPayload } from "../types/lesson";

interface InteractiveScenarioSliderProps {
  questionText: string;
  hintText?: string;
  payload: ScenarioSliderPayload;
  onSuccess: () => void;
}

export function InteractiveScenarioSlider({
  questionText,
  hintText,
  payload,
  onSuccess,
}: InteractiveScenarioSliderProps) {
  // Initialize to the payload's starting value
  const [currentValue, setCurrentValue] = useState<number>(
    payload.initialValue,
  );
  const [isResolved, setIsResolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(Number(e.target.value));
    },
    [],
  );

  // O(1) Dictionary Lookup for the current scenario
  const currentScenario = payload.scenarios[currentValue];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // Only allow progression if the data layer strictly defines this scenario as a success
      if (currentScenario && currentScenario.status === "success") {
        setIsResolved(true);
        onSuccess(); // Unlock the next segment
      }
    },
    [currentScenario, onSuccess],
  );

  // ==========================================================================
  // DYNAMIC STYLING MAPPER
  // ==========================================================================
  const statusConfig = useMemo(() => {
    switch (currentScenario?.status) {
      case "success":
        return {
          icon: CheckCircle2,
          colorClass: "text-emerald-700",
          borderClass: "border-emerald-200",
          bgClass: "bg-emerald-50",
          ringClass: "focus-visible:ring-emerald-500",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          colorClass: "text-amber-700",
          borderClass: "border-amber-200",
          bgClass: "bg-amber-50",
          ringClass: "focus-visible:ring-amber-500",
        };
      case "error":
      default:
        return {
          icon: XCircle,
          colorClass: "text-red-700",
          borderClass: "border-red-200",
          bgClass: "bg-red-50",
          ringClass: "focus-visible:ring-red-500",
        };
    }
  }, [currentScenario?.status]);

  const StatusIcon = statusConfig.icon;

  // ==========================================================================
  // RENDER: RESOLVED STATE
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
            {currentScenario.label} ({currentScenario.rentalFormatted}/mo)
          </span>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: INTERACTIVE STATE
  // ==========================================================================
  return (
    <div className="p-6 my-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Header */}
        <Label
          htmlFor="scenario-slider"
          className="text-lg font-bold text-brand-dark-navy"
        >
          {questionText}
        </Label>

        {/* Live Scenario Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-slate-50 rounded-md border border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              Selection
            </span>
            <span className="text-xl font-bold text-brand-dark-navy tabular-nums">
              {currentScenario.label}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              Instalments
            </span>
            <span className="text-xl font-bold text-brand-dark-navy tabular-nums">
              {currentScenario.months} Months
            </span>
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1">
            <span className="text-xs font-semibold text-slate-500 uppercase">
              Est. Rental
            </span>
            <span className="text-xl font-bold text-brand-dark-navy tabular-nums">
              {currentScenario.rentalFormatted}
            </span>
          </div>
        </div>

        {/* Native Slider Control */}
        <div className="flex flex-col gap-2 px-2">
          <input
            id="scenario-slider"
            type="range"
            min={payload.min}
            max={payload.max}
            step={payload.step}
            value={currentValue}
            onChange={handleSliderChange}
            className={cn(
              "w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-all",
              statusConfig.ringClass,
              // Native accent color mapping based on status
              currentScenario.status === "success"
                ? "accent-emerald-600"
                : currentScenario.status === "warning"
                  ? "accent-amber-500"
                  : "accent-red-500",
            )}
          />
          <div className="flex justify-between text-xs font-bold text-slate-400 select-none">
            <span>
              {payload.min} {payload.min === 1 ? "Year" : "Years"}
            </span>
            <span>{payload.max} Years</span>
          </div>
        </div>

        {/* Strategic Analysis Feedback Box */}
        <div
          className={cn(
            "flex items-start gap-3 p-4 rounded-md border transition-colors duration-300",
            statusConfig.bgClass,
            statusConfig.borderClass,
          )}
        >
          <StatusIcon
            className={cn("w-5 h-5 shrink-0 mt-0.5", statusConfig.colorClass)}
          />
          <div className="flex flex-col">
            <span
              className={cn(
                "text-sm font-bold uppercase tracking-wider",
                statusConfig.colorClass,
              )}
            >
              {currentScenario.analysisTitle}
            </span>
            <span className={cn("text-sm mt-1", statusConfig.colorClass)}>
              {currentScenario.analysisText}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap self-end gap-2 w-full sm:w-auto">
          {/* Action Button */}
          <Button
            type="submit"
            disabled={currentScenario.status !== "success"}
            className="flex-1 sm:flex-none sm:w-auto h-10 bg-brand-dark-navy hover:bg-brand-navy text-white disabled:opacity-50 transition-all"
          >
            Confirm Tenure
          </Button>
          {/* Hint Toggle Button */}
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

      {/* Hoisted Hint Execution */}
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

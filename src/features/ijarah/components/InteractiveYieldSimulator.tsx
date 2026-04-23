/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client)
 * FILE: src/features/ijarah/components/InteractiveYieldSimulator.tsx
 * ============================================================================
 * Client boundary: A Binary State Simulator.
 * Uses native React state and CSS transitions to animate a 5-year financial
 * bar chart. Actively avoids third-party charting libraries to maintain
 * maximum performance and accessibility.
 * ============================================================================
 */

"use client";

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  AlertTriangle,
  Calculator,
  BarChart3,
} from "lucide-react";
import { BinarySimulatorPayload } from "../types/lesson";

interface InteractiveYieldSimulatorProps {
  questionText: string;
  payload: BinarySimulatorPayload;
  onSuccess: () => void;
}

export function InteractiveYieldSimulator({
  questionText,
  payload,
  onSuccess,
}: InteractiveYieldSimulatorProps) {
  const [selectedOption, setSelectedOption] = useState<
    "flat_rate" | "true_yield" | null
  >(null);
  const [isResolved, setIsResolved] = useState(false);

  // ==========================================================================
  // CHART DATA ENGINE
  // ==========================================================================
  const years = [1, 2, 3, 4, 5];

  // Principal scales down to 0 over 5 years
  const getPrincipalHeight = (year: number) => {
    if (!selectedOption) return "0%";
    const heights = ["82%", "65%", "50%", "35%", "15%"];
    return heights[year - 1];
  };

  // Profit behavior changes based on the selected Shariah engine
  const getProfitHeight = (year: number) => {
    if (!selectedOption) return "0%";

    if (selectedOption === "flat_rate") {
      // The Trap: Profit stays at maximum even as principal drops
      return "18%";
    } else {
      // The True Yield: Profit scales down proportionately with principal
      const heights = ["18%", "14%", "10%", "5%", "2.5%"];
      return heights[year - 1];
    }
  };

  // ==========================================================================
  // INTERACTION HANDLERS & STATE
  // ==========================================================================
  const activeStateConfig = useMemo(() => {
    if (selectedOption === "flat_rate") return payload.optionA;
    if (selectedOption === "true_yield") return payload.optionB;
    return null;
  }, [selectedOption, payload]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (activeStateConfig?.feedbackStatus === "success") {
        setIsResolved(true);
        onSuccess();
      }
    },
    [activeStateConfig, onSuccess],
  );

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
            Target Profit Engine Validated
          </span>
          <span className="text-xl font-bold text-emerald-900">
            {payload.optionB.buttonLabel}
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
      <div className="flex flex-col gap-6">
        <Label className="text-lg font-bold text-brand-dark-navy">
          {questionText}
        </Label>

        {/* THE BINARY CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedOption("flat_rate")}
            className={cn(
              "h-auto py-4 px-6 flex flex-col gap-2 items-center text-center transition-all border-2",
              selectedOption === "flat_rate"
                ? "bg-red-50 border-red-500 text-red-900 ring-2 ring-red-200 shadow-md scale-[1.02]"
                : "hover:bg-slate-50 border-slate-200",
            )}
          >
            <BarChart3
              className={cn(
                "w-6 h-6",
                selectedOption === "flat_rate"
                  ? "text-red-600"
                  : "text-slate-400",
              )}
            />
            <span className="font-bold whitespace-normal">
              {payload.optionA.buttonLabel}
            </span>
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => setSelectedOption("true_yield")}
            className={cn(
              "h-auto py-4 px-6 flex flex-col gap-2 items-center text-center transition-all border-2",
              selectedOption === "true_yield"
                ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200 shadow-md scale-[1.02]"
                : "hover:bg-slate-50 border-slate-200",
            )}
          >
            <BarChart3
              className={cn(
                "w-6 h-6",
                selectedOption === "true_yield"
                  ? "text-emerald-600"
                  : "text-slate-400",
              )}
            />
            <span className="font-bold whitespace-normal">
              {payload.optionB.buttonLabel}
            </span>
          </Button>
        </div>

        {/* THE CSS-ONLY ANIMATED CHART */}
        <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
          <div className="flex items-end justify-between h-48 sm:h-64 gap-2 sm:gap-6 pt-8 pb-2 border-b-2 border-slate-300">
            {years.map((year) => (
              <div
                key={year}
                className="flex flex-col justify-end w-full h-full gap-0.5 group relative"
              >
                {/* Profit Bar */}
                <div
                  className={cn(
                    "w-full rounded-t-sm rounded-b-sm transition-all duration-1000 ease-in-out origin-bottom opacity-90 shadow-sm",
                    selectedOption === "flat_rate"
                      ? "bg-red-500"
                      : "bg-emerald-500",
                  )}
                  style={{ height: getProfitHeight(year) }}
                >
                  <span className="sr-only">Year {year} Profit</span>
                </div>

                {/* Principal Bar */}
                <div
                  className="w-full bg-brand-navy rounded-sm transition-all duration-1000 ease-in-out origin-bottom shadow-sm"
                  style={{ height: getPrincipalHeight(year) }}
                >
                  <span className="sr-only">Year {year} Principal</span>
                </div>

                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold text-slate-500">
                  <span className="md:hidden">Yr</span>
                  <span className="hidden md:inline">Year</span> {year}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-10 text-xs font-bold uppercase tracking-wider text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-brand-navy" />
              <span>Cost Redemption (Principal)</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-3 h-3 rounded-sm transition-colors duration-500",
                  selectedOption === "flat_rate"
                    ? "bg-red-500"
                    : selectedOption === "true_yield"
                      ? "bg-emerald-500"
                      : "bg-slate-300",
                )}
              />
              <span>Profit Yield</span>
            </div>
          </div>
        </div>

        {/* FEEDBACK & CONFIRMATION */}
        <div className="min-h-30">
          {activeStateConfig && (
            <div className="flex flex-col gap-4 animate-in slide-in-from-top-4 fade-in duration-500">
              <div
                className={cn(
                  "flex items-start gap-3 p-4 rounded-md border",
                  activeStateConfig.feedbackStatus === "error"
                    ? "bg-red-50 border-red-200"
                    : "bg-emerald-50 border-emerald-200",
                )}
              >
                {activeStateConfig.feedbackStatus === "error" ? (
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div className="flex flex-col">
                  <span
                    className={cn(
                      "text-sm font-bold uppercase tracking-wider",
                      activeStateConfig.feedbackStatus === "error"
                        ? "text-red-800"
                        : "text-emerald-800",
                    )}
                  >
                    {activeStateConfig.feedbackTitle}
                  </span>
                  <span
                    className={cn(
                      "text-sm mt-1 leading-relaxed",
                      activeStateConfig.feedbackStatus === "error"
                        ? "text-red-700"
                        : "text-emerald-700",
                    )}
                  >
                    {activeStateConfig.feedbackText}
                  </span>
                </div>
              </div>

              {activeStateConfig.feedbackStatus === "success" && (
                <Button
                  onClick={handleSubmit}
                  className="w-full sm:w-auto self-start bg-emerald-600 hover:bg-emerald-700 text-white flex gap-2 items-center text-lg h-12 shadow-md"
                >
                  <Calculator className="w-5 h-5" />
                  Confirm Shariah Engine
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

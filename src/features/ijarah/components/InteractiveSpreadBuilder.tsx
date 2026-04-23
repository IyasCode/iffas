"use client";

/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client)
 * FILE: src/features/ijarah/components/InteractiveSpreadBuilder.tsx
 * ============================================================================
 * Client boundary: A Multi-Select State Machine.
 * Manages an array of selected options, dynamically calculates the running
 * sum, and executes O(1) dictionary lookups to check for Shariah violations
 * (distractors) in real-time.
 * ============================================================================
 */

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, Calculator, Plus, X } from "lucide-react";
import { MultiSelectBuilderPayload } from "../types/lesson";

interface InteractiveSpreadBuilderProps {
  questionText: string;
  payload: MultiSelectBuilderPayload;
  onSuccess: () => void;
}

export function InteractiveSpreadBuilder({
  questionText,
  payload,
  onSuccess,
}: InteractiveSpreadBuilderProps) {
  // The Single Source of Truth for this component
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isResolved, setIsResolved] = useState(false);

  // ==========================================================================
  // STATE DERIVATIONS & MATH
  // ==========================================================================

  // 1. Separate options into Selected and Available pools
  const selectedOptions = useMemo(
    () => payload.options.filter((opt) => selectedIds.includes(opt.id)),
    [payload.options, selectedIds],
  );

  const availableOptions = useMemo(
    () => payload.options.filter((opt) => !selectedIds.includes(opt.id)),
    [payload.options, selectedIds],
  );

  // 2. Calculate the live dynamic spread
  const currentSpread = useMemo(
    () => selectedOptions.reduce((sum, opt) => sum + opt.percentage, 0),
    [selectedOptions],
  );

  // 3. Validation Logic
  const isExactMatch =
    selectedIds.length === payload.correctIds.length &&
    payload.correctIds.every((id) => selectedIds.includes(id));

  // 4. Dictionary Lookup for Distractors (Finds the first violated rule)
  const activeViolationId = selectedIds.find(
    (id) => payload.distractorFeedback[id],
  );
  const activeViolation = activeViolationId
    ? payload.distractorFeedback[activeViolationId]
    : null;

  // ==========================================================================
  // INTERACTION HANDLERS
  // ==========================================================================
  const handleToggleOption = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (isExactMatch && !activeViolation) {
        setIsResolved(true);
        onSuccess();
      }
    },
    [isExactMatch, activeViolation, onSuccess],
  );

  // ==========================================================================
  // RENDER: RESOLVED STATE (The Final Formula)
  // ==========================================================================
  if (isResolved) {
    const totalRate = payload.benchmarkRate + currentSpread;

    return (
      <div
        className="flex flex-col gap-4 p-6 my-6 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm"
        aria-live="polite"
      >
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
          <span className="text-lg font-bold text-emerald-900">
            Target Profit Rate Engineered
          </span>
        </div>

        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-md border border-emerald-100 shadow-inner mt-2">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">
            Target Profit Rate = Benchmark + Spread
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-2xl md:text-3xl font-black tabular-nums text-brand-dark-navy">
            <span className="text-emerald-600 bg-emerald-100 px-3 py-1 rounded-md">
              {totalRate.toFixed(1)}%
            </span>
            <span className="text-slate-400">=</span>
            <span>
              {payload.benchmarkRate.toFixed(1)}%{" "}
              <span className="text-sm md:text-lg font-bold text-slate-400 font-sans">
                ({payload.benchmarkLabel})
              </span>
            </span>
            <span className="text-slate-400">+</span>
            <span>
              {currentSpread.toFixed(1)}%{" "}
              <span className="text-sm md:text-lg font-bold text-slate-400 font-sans">
                (Risk Premium)
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: INTERACTIVE STATE (The Builder)
  // ==========================================================================
  return (
    <div className="p-6 my-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="flex flex-col gap-6">
        {/* Header & Live Dashboard */}
        <div className="flex flex-col gap-4">
          <Label className="text-lg font-bold text-brand-dark-navy">
            {questionText}
          </Label>
          <div className="flex items-center justify-between p-4 bg-brand-dark-navy text-white rounded-xl shadow-md">
            <span className="text-sm md:text-base font-semibold uppercase tracking-wider text-slate-300">
              Live Bank Spread
            </span>
            <span className="text-3xl font-black tabular-nums text-brand-yellow">
              {currentSpread.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* TOP POOL: Selected Options */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Included Components
          </span>
          <div className="flex flex-wrap items-start content-start gap-2 min-h-[120px] p-4 bg-slate-50 rounded-xl border-2 border-slate-200 transition-all duration-300">
            {selectedOptions.length === 0 ? (
              <span className="w-full text-center text-slate-400 font-medium italic py-4">
                [ Awaiting Risk Components... ]
              </span>
            ) : (
              selectedOptions.map((opt) => (
                <Button
                  key={opt.id}
                  variant="default"
                  onClick={() => handleToggleOption(opt.id)}
                  className="animate-in zoom-in-95 fade-in duration-200 flex items-center gap-2 bg-brand-navy hover:bg-red-800 text-white group transition-colors"
                >
                  <span>
                    {opt.label}: {opt.percentage.toFixed(1)}%
                  </span>
                  <X className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                </Button>
              ))
            )}
          </div>
        </div>

        {/* THE DIVIDING LINE */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent my-2" />

        {/* BOTTOM POOL: Available Options */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
            Available Components
          </span>
          <div className="flex flex-wrap items-start content-start gap-2 min-h-[160px] p-2 transition-all duration-300">
            {availableOptions.map((opt) => (
              <Button
                key={opt.id}
                variant="outline"
                onClick={() => handleToggleOption(opt.id)}
                className="animate-in zoom-in-95 fade-in duration-200 flex items-center gap-2 text-brand-light-navy border-slate-300 hover:border-brand-navy hover:bg-brand-navy hover:text-white transition-all shadow-sm"
              >
                <Plus className="w-4 h-4 opacity-50" />
                <span>
                  {opt.label}: {opt.percentage.toFixed(1)}%
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* DYNAMIC FEEDBACK ZONE */}
        <div className="min-h-[80px]">
          {activeViolation ? (
            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-md border border-red-200 animate-in slide-in-from-top-2 duration-300">
              <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-sm font-bold uppercase tracking-wider text-red-800">
                  {activeViolation.title}
                </span>
                <span className="text-sm mt-1 text-red-700 leading-relaxed">
                  {activeViolation.text}
                </span>
              </div>
            </div>
          ) : isExactMatch ? (
            <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
              <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold uppercase tracking-wider text-emerald-800">
                    {payload.successFeedback.title}
                  </span>
                  <span className="text-sm mt-1 text-emerald-700 leading-relaxed">
                    {payload.successFeedback.text}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleSubmit}
                className="w-full sm:w-auto self-start bg-emerald-600 hover:bg-emerald-700 text-white flex gap-2 items-center text-lg h-12 shadow-md"
              >
                <Calculator className="w-5 h-5" />
                Confirm Target Rate
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

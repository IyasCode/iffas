"use client";

/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client)
 * FILE: src/features/ijarah/components/InteractiveEquationBuilder.tsx
 * ============================================================================
 * Client boundary: A "Tap-to-Slot" pedagogical formula constructor.
 * Replaces inaccessible drag-and-drop with strict, keyboard-navigable arrays.
 * Uses O(1) dictionary lookups for feedback to ensure the UI remains fully
 * decoupled from Shariah financial logic.
 * ============================================================================
 */

import { useState, useCallback, useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Lightbulb,
  Calculator,
  X,
} from "lucide-react";
import {
  EquationBuilderPayload,
  EquationFeedback,
  EquationVariable,
} from "../types/lesson";
import { formatCurrency } from "@/lib/utils/formatters";

interface InteractiveEquationBuilderProps {
  questionText: string;
  hintText?: string;
  payload: EquationBuilderPayload;
  onSuccess: () => void;
}

export function InteractiveEquationBuilder({
  questionText,
  hintText,
  payload,
  onSuccess,
}: InteractiveEquationBuilderProps) {
  // State holds up to 2 variable IDs
  const [selectedSlots, setSelectedSlots] = useState<(string | null)[]>([
    null,
    null,
  ]);
  const [isResolved, setIsResolved] = useState(false);

  // ==========================================================================
  // INTERACTION HANDLERS
  // ==========================================================================
  const handleVariableTap = useCallback((variableId: string) => {
    setSelectedSlots((prev) => {
      // Find the first empty slot
      const newSlots = [...prev];
      const emptyIndex = newSlots.indexOf(null);
      if (emptyIndex !== -1) {
        newSlots[emptyIndex] = variableId;
      }
      return newSlots;
    });
  }, []);

  const handleSlotClear = useCallback((index: number) => {
    setSelectedSlots((prev) => {
      const newSlots = [...prev];
      newSlots[index] = null;
      return newSlots;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    setIsResolved(true);
    onSuccess();
  }, [onSuccess]);

  // ==========================================================================
  // DICTIONARY LOOKUP & STATE COMPUTATION
  // ==========================================================================
  const isFull = selectedSlots[0] !== null && selectedSlots[1] !== null;

  const currentFeedback: EquationFeedback | null = useMemo(() => {
    if (!isFull) return null;

    // Join the exact order to create the dictionary key (e.g., "asset_cost|security_deposit")
    const lookupKey = `${selectedSlots[0]}|${selectedSlots[1]}`;
    return payload.feedbackDictionary[lookupKey] || payload.fallbackFeedback;
  }, [isFull, selectedSlots, payload]);

  const isSuccess = currentFeedback?.status === "success";

  const statusConfig = useMemo(() => {
    switch (currentFeedback?.status) {
      case "success":
        return {
          icon: CheckCircle2,
          colorClass: "text-emerald-700",
          borderClass: "border-emerald-200",
          bgClass: "bg-emerald-50",
        };
      case "warning":
        return {
          icon: AlertTriangle,
          colorClass: "text-amber-700",
          borderClass: "border-amber-200",
          bgClass: "bg-amber-50",
        };
      case "error":
      default:
        return {
          icon: XCircle,
          colorClass: "text-red-700",
          borderClass: "border-red-200",
          bgClass: "bg-red-50",
        };
    }
  }, [currentFeedback?.status]);

  const StatusIcon = statusConfig.icon;

  // Helpers to resolve variable objects from IDs for rendering
  const getVariableById = (id: string | null) =>
    payload.variables.find((v) => v.id === id);
  const slot1Var = getVariableById(selectedSlots[0]);
  const slot2Var = getVariableById(selectedSlots[1]);

  // ==========================================================================
  // RENDER: RESOLVED STATE (Final Calculated Equation)
  // ==========================================================================
  if (isResolved) {
    const finalVar1 = getVariableById(payload.expectedSequence[0]);
    const finalVar2 = getVariableById(payload.expectedSequence[1]);
    const calculatedResult =
      (finalVar1?.amount || 0) - (finalVar2?.amount || 0);

    return (
      <div
        className="flex items-center gap-4 p-6 my-6 bg-emerald-50 border border-emerald-200 rounded-lg shadow-sm"
        aria-live="polite"
      >
        <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
        <div className="flex flex-col gap-1 w-full">
          <span className="text-sm font-medium text-emerald-800">
            {questionText}
          </span>
          <div className="flex flex-wrap items-center gap-2 mt-2 text-xl font-bold tabular-nums text-emerald-900">
            <span>{formatCurrency(finalVar1?.amount || 0)}</span>
            <span className="text-emerald-600 px-1">—</span>
            <span>{formatCurrency(finalVar2?.amount || 0)}</span>
            <span className="text-emerald-600 px-1">=</span>
            <span className="bg-emerald-200 px-3 py-1 rounded-md">
              {formatCurrency(calculatedResult)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // RENDER: INTERACTIVE STATE (The Gate)
  // ==========================================================================
  return (
    <div className="p-6 my-6 bg-white border border-slate-200 rounded-lg shadow-sm">
      <div className="flex flex-col gap-6">
        <Label className="text-lg font-bold text-brand-dark-navy">
          {questionText}
        </Label>

        {/* THE EQUATION BUILDER AREA */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 p-6 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
          {/* Slot 1 */}
          <button
            type="button"
            onClick={() => handleSlotClear(0)}
            disabled={!slot1Var}
            className={cn(
              "relative flex flex-col items-center justify-center w-full md:w-48 h-24 rounded-lg transition-all",
              slot1Var
                ? "bg-brand-navy text-white shadow-md hover:bg-brand-dark-navy"
                : "bg-white border-2 border-dashed border-slate-300",
            )}
          >
            {slot1Var ? (
              <>
                <span className="text-sm font-medium opacity-90">
                  {slot1Var.label}
                </span>
                <span className="text-lg font-bold tabular-nums">
                  {formatCurrency(slot1Var.amount)}
                </span>
                <div className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full p-1 shadow-sm opacity-0 hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </div>
              </>
            ) : (
              <span className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                Tap to Fill
              </span>
            )}
          </button>

          {/* Operator */}
          <div className="text-xl font-black text-slate-400 px-2">
            {payload.operatorLabel}
          </div>

          {/* Slot 2 */}
          <button
            type="button"
            onClick={() => handleSlotClear(1)}
            disabled={!slot2Var}
            className={cn(
              "relative flex flex-col items-center justify-center w-full md:w-48 h-24 rounded-lg transition-all",
              slot2Var
                ? "bg-brand-navy text-white shadow-md hover:bg-brand-dark-navy"
                : "bg-white border-2 border-dashed border-slate-300",
            )}
          >
            {slot2Var ? (
              <>
                <span className="text-sm font-medium opacity-90">
                  {slot2Var.label}
                </span>
                <span className="text-lg font-bold tabular-nums">
                  {formatCurrency(slot2Var.amount)}
                </span>
                <div className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full p-1 shadow-sm opacity-0 hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </div>
              </>
            ) : (
              <span className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                Tap to Fill
              </span>
            )}
          </button>

          {/* Equals & Result Box */}
          <div className="text-xl font-black text-slate-400 px-2">=</div>
          <div
            className={cn(
              "flex items-center justify-center w-full md:w-48 h-24 rounded-lg border-2 border-slate-300 bg-slate-100 transition-colors",
              isSuccess && "border-emerald-400 bg-emerald-100 text-emerald-800",
            )}
          >
            <span className="text-sm font-bold text-center px-4">
              [{payload.resultLabel}]
            </span>
          </div>
        </div>

        {/* VARIABLE SELECTION POOL */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Available Variables
          </span>
          <div className="flex flex-wrap gap-3">
            {payload.variables.map((v) => {
              const isSelected = selectedSlots.includes(v.id);
              return (
                <Button
                  key={v.id}
                  type="button"
                  variant="outline"
                  disabled={isSelected || isFull}
                  onClick={() => handleVariableTap(v.id)}
                  className={cn(
                    "flex flex-col items-start h-auto py-3 px-4 transition-all duration-300",
                    isSelected &&
                      "opacity-0 scale-95 pointer-events-none w-0 p-0 m-0 border-0 overflow-hidden",
                  )}
                >
                  <span className="text-xs font-semibold text-slate-500">
                    {v.label}
                  </span>
                  <span className="text-base font-bold tabular-nums text-brand-dark-navy">
                    {formatCurrency(v.amount)}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* DICTIONARY FEEDBACK & CONFIRMATION */}
        {currentFeedback && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <div
              className={cn(
                "flex items-start gap-3 p-4 rounded-md border mb-4",
                statusConfig.bgClass,
                statusConfig.borderClass,
              )}
            >
              <StatusIcon
                className={cn(
                  "w-5 h-5 shrink-0 mt-0.5",
                  statusConfig.colorClass,
                )}
              />
              <div className="flex flex-col">
                <span
                  className={cn(
                    "text-sm font-bold uppercase tracking-wider",
                    statusConfig.colorClass,
                  )}
                >
                  {currentFeedback.title}
                </span>
                <span
                  className={cn(
                    "text-sm mt-1 leading-relaxed",
                    statusConfig.colorClass,
                  )}
                >
                  {currentFeedback.text}
                </span>
              </div>
            </div>

            {isSuccess && (
              <Button
                onClick={handleSubmit}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white flex gap-2 items-center text-lg h-12 shadow-md animate-in zoom-in duration-300"
              >
                <Calculator className="w-5 h-5" />
                Calculate {payload.resultLabel}
              </Button>
            )}
          </div>
        )}

        {/* HOISTED HINT EXECUTION */}
        {hintText && !isFull && (
          <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-md border border-amber-100">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 leading-relaxed">
              <span className="font-semibold block mb-1">Hint:</span>
              {hintText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

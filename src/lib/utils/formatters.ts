/**
 * ============================================================================
 * LAYER: Global Utilities
 * FILE: src/lib/utils/formatters.ts
 * ============================================================================
 * Centralized formatting utilities (Zero UI Math).
 * Safely converts native JavaScript primitives into localized strings.
 * ============================================================================
 */

export const formatCurrency = (value: number, currencyCode = "USD"): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0, // Keeps $620,000 instead of $620,000.00 for clean integers
    maximumFractionDigits: 2,
  }).format(value);
};

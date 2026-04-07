// src/types/base-finance.ts
import { z } from "zod";

/**
 * 1. Establish the Branded Schemas (The Runtime Gatekeepers)
 * These schemas validate the logic (e.g., percentages between 0 and 1)
 * before branding the type for the TypeScript compiler.
 */
export const CurrencySchema = z.number().brand<"Currency">();

// Percentages are modeled as decimals: 5% = 0.05
export const PercentageSchema = z.number().min(0).max(1).brand<"Percentage">();

// Tenors are strictly positive integers representing months
export const TenorMonthsSchema = z
  .number()
  .int()
  .positive()
  .brand<"TenorMonths">();

/**
 * 2. Infer the Branded Types (The Compile-Time Blueprints)
 * These types are used in function signatures to prevent parameter swapping.
 */
export type Currency = z.infer<typeof CurrencySchema>;
export type Percentage = z.infer<typeof PercentageSchema>;
export type TenorMonths = z.infer<typeof TenorMonthsSchema>;

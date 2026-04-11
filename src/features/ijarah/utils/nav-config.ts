/**
 * ============================================================================
 * FEATURE: Ijarah Module | LAYER: UI Configuration
 * FILE: src/features/ijarah/utils/nav-config.ts
 * ============================================================================
 * Defines the immutable curriculum hierarchy for the Ijarah sidebar navigation.
 * Binds the ACIFE curriculum sections to their respective Next.js App Router paths
 * and associates them with their required SVG iconography.
 * ============================================================================
 */

import { BookOpen, Dumbbell, Calculator, LayoutDashboard } from "lucide-react";
import { IjarahNavItem } from "../types/nav-types";

export const IJARAH_NAV_CONFIG: IjarahNavItem[] = [
  {
    title: "Ijarah",
    href: "/ijarah/",
    icon: BookOpen,
  },
  {
    title: "Learn",
    href: "/ijarah/learn",
    icon: BookOpen,
    subItems: [
      { title: "Chapter 1: Anatomy", href: "/ijarah/chapter-1" },
      { title: "Chapter 2: Foundation", href: "/ijarah/chapter-2" },
      { title: "Chapter 3: Profit", href: "/ijarah/chapter-3" },
      { title: "Chapter 4: Schedule", href: "/ijarah/chapter-4" },
      { title: "Chapter 5: Volatility", href: "/ijarah/chapter-5" },
    ],
  },
  {
    title: "Practice",
    href: "/ijarah/practice",
    icon: Dumbbell,
    subItems: [
      { title: "Quiz", href: "/ijarah/quiz" },
      { title: "Hands-on", href: "/ijarah/hands-on" },
    ],
  },
  {
    title: "Calculator",
    href: "/ijarah/calculator",
    icon: Calculator,
    subItems: [
      { title: "Full Schedule", href: "/ijarah/full-schedule" },
      { title: "Target Yield", href: "/ijarah/target-yield" },
      { title: "True Yield", href: "/ijarah/true-yield" },
      { title: "Suspension", href: "/ijarah/suspension" },
      { title: "Depreciation", href: "/ijarah/depreciation" },
      { title: "Default", href: "/ijarah/default" },
      { title: "Right-of-Use", href: "/ijarah/right-of-use" },
    ],
  },
  {
    title: "Simulator",
    href: "/ijarah/simulator",
    icon: LayoutDashboard,
    subItems: [
      { title: "Scenario Play", href: "/ijarah/scenario-play" },
      { title: "Floating Rate", href: "/ijarah/floating-rate" },
      { title: "Cap and Floor", href: "/ijarah/cap-and-floor" },
    ],
  },
];

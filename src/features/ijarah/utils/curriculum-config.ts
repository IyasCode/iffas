import {
  Scale,
  Building2,
  TrendingUp,
  Calculator,
  ShieldAlert,
} from "lucide-react";
import type { CurriculumChapter } from "../types/curriculum-types";

export const IJARAH_LEARN_CURRICULUM: readonly CurriculumChapter[] = [
  {
    id: "anatomy",
    chapterNumber: 1,
    title: "The Anatomy of an Ijarah",
    description:
      "Explore the core legal anatomy of an Ijarah contract. Discover the vital separation of corpus and usufruct, allocation of ownership risk, and its strategic comparison against Murabahah financing.",
    icon: Scale,
  },
  {
    id: "foundation",
    chapterNumber: 2,
    title: "The Foundation of Ijarah",
    description:
      "Establish the critical financial foundation of your lease. Confidently define the primary asset cost, structure the security deposit, map out lease tenure, and engineer the final salvage value.",
    icon: Building2,
  },
  {
    id: "target-profit",
    chapterNumber: 3,
    title: "The Target Profit Rate",
    description:
      "Unlock the financial heart of the schedule. Navigate dynamic market benchmarks, calculate precise monthly periodic rates, and successfully reverse-engineer exact rentals using targeted profit yields.",
    icon: TrendingUp,
  },
  {
    id: "schedule-engine",
    chapterNumber: 4,
    title: "The Schedule Engine",
    description:
      "Build the core schedule engine. Track the diminishing balance, separate principal from profit, account for physical asset depreciation, and reconcile Written Down Value with global reporting standards.",
    icon: Calculator,
  },
  {
    id: "volatility",
    chapterNumber: 5,
    title: "Real-World Volatility & Crises",
    description:
      "Manage real-world volatility and crises. Adapt seamlessly to floating rates, handle client defaults ethically, navigate physical asset breakdowns, and execute Shariah-compliant early contract terminations with precision.",
    icon: ShieldAlert,
  },
] as const;

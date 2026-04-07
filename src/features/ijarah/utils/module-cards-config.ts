import { ModuleCardData } from "../types/module-card";

/**
 * ============================================================================
 * FEATURE: Ijarah Module | LAYER: UI Configuration
 * FILE: src/features/ijarah/utils/module-cards-config.ts
 * ============================================================================
 * Defines the immutable content for the main Ijarah module selection grid.
 * ============================================================================
 */
export const IJARAH_MODULE_CARDS: ModuleCardData[] = [
  {
    id: "learn",
    title: "Learn",
    description:
      "Master Ijarah principles through interactive, bite-sized modules. This segment provides a holistic overview of Shariah-compliant contracts of Ijarah using an intuitive learning approach.",
    href: "/ijarah/learn",
    actionText: "Start Learning",
    icon: "/icon-learn.svg",
    metadata: {
      type: "progress",
      percentComplete: 0, // Dynamic value to be hydrated by user state later
    },
  },
  {
    id: "practice",
    title: "Practice",
    description:
      "Apply your knowledge to real-world corporate cases. Solve complex problems using Excel-based workflows, then validate your results with detailed step-by-step guides and downloadable XML solutions.",
    href: "/ijarah/practice",
    actionText: "Start Practice",
    icon: "/icon-practice.svg",
    metadata: {
      type: "tags",
      tags: ["Quiz 9 / 100", "Hands-on 1 / 3"],
    },
  },
  {
    id: "calculator",
    title: "Calculator",
    description:
      "Perform precise financial computations with dedicated tools tailored to each contract type. Input variables like asset cost and tenure to instantly generate Shariah-compliant rental schedules or profit distributions.",
    href: "/ijarah/calculator",
    actionText: "Open Calculator",
    icon: "/icon-calculator.svg",
    metadata: {
      type: "tags",
      tags: ["Full Schedule", "Depreciation"],
    },
  },
  {
    id: "simulator",
    title: "Simulator",
    description:
      "Roleplay as a Lessee or a Lessor. Navigate dynamic market conditions to see how various Islamic instruments perform under pressure throughout their entire lifecycle.",
    href: "/ijarah/simulator",
    actionText: "Open Simulator",
    icon: "/icon-simulator.svg",
    metadata: {
      type: "tags",
      tags: ["Scenario Play"],
    },
  },
];

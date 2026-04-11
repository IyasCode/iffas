/**
 * ============================================================================
 * FEATURE: Landing Page
 * LAYER: UI Configuration
 * FILE: src/features/landing-page/types/module-cards-config.ts
 * ============================================================================
 * Defines the immutable content for the main Landing Page module selection grid.
 * ============================================================================
 */

// --- Types & Interfaces ---
export interface CourseModule {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly keyConcepts: string[];
  readonly available: boolean;
  readonly bgImage: string;
  readonly href: string;
}

// --- Data Structure ---
export const COURSES_DATA: CourseModule[] = [
  {
    id: 1,
    title: "Ijarah (Islamic Leasing)",
    description:
      "Discover how Islamic banks effectively structure and calculate complex lease agreements.",
    keyConcepts: [
      "Rent & IRR calculation",
      "IAS 17 accounting standards",
      "Depreciation",
      "Default & termination handling",
    ],
    available: true,
    bgImage: "/module-bg1.webp",
    href: "/ijarah",
  },
  {
    id: 2,
    title: "Diminishing Musharakah",
    description:
      "Explore the core operational mechanics of equity-based Islamic property financing.",
    keyConcepts: [
      "Joint ownership structures",
      "Step-by-step redemption schedules",
      "Conventional mortgage comparisons",
    ],
    available: false,
    bgImage: "/module-bg2.webp",
    href: "/musharakah",
  },
  {
    id: 3,
    title: "Mudarabah Deposit Accounts",
    description:
      "Master the structures and step-by-step profit calculations of Islamic deposit accounts.",
    keyConcepts: [
      "Weightage implementation",
      "Investor fund management",
      "Profit distribution frameworks",
    ],
    available: false,
    bgImage: "/module-bg3.webp",
    href: "/mudarabah",
  },
  {
    id: 4,
    title: "Murabahah Calculations",
    description:
      "Bridge the gap between Murabahah financing theory and real-world execution.",
    keyConcepts: [
      "Operating cycle calculations",
      "Profit limit analysis",
      "Transaction pricing & structuring",
    ],
    available: false,
    bgImage: "/module-bg4.webp",
    href: "/murabahah",
  },
  {
    id: 5,
    title: "Asset Pool Management",
    description:
      "Learn the essential techniques used to manage deposits, inter-bank investments, and equity.",
    keyConcepts: [
      "Pool composition",
      "Fund tracking",
      "Profit-sharing ratios",
      "Income distribution",
    ],
    available: false,
    bgImage: "/module-bg5.webp",
    href: "/asset-management",
  },
  {
    id: 6,
    title: "Profit Calculation Framework",
    description:
      "Navigate the complex mechanics of calculating and distributing profit in a dynamic banking environment.",
    keyConcepts: [
      "Primary calculation methods",
      "Industry best practices",
      "High-volume transaction analysis",
    ],
    available: false,
    bgImage: "/module-bg6.webp",
    href: "/profit-calculation",
  },
  {
    id: 7,
    title: "Sukuk (Islamic Bonds)",
    description:
      "Master the intricacies of AAOIFI compliance in the global Sukuk market.",
    keyConcepts: [
      "Side-by-side case studies",
      "Documentation analysis",
      "Compliance evaluation",
    ],
    available: false,
    bgImage: "/module-bg7.webp",
    href: "/sukuk",
  },
];

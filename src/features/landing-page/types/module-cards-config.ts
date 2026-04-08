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
  id: number;
  title: string;
  description: string;
  available: boolean;
  bgImage: string;
}

// --- Data Structure ---
export const COURSES_DATA: CourseModule[] = [
  {
    id: 1,
    title: "Ijarah (Islamic Leasing)",
    description:
      "Discover how Islamic banks structure and calculate leases. Learn the mechanics behind calculating rent, Internal Rate of Return (IRR), and profit while understanding IAS 17 accounting standards. You will also explore practical scenarios like depreciation, floating-rate profits, and how to handle defaults or early terminations.",
    available: true,
    bgImage: "/module-bg1.webp",
  },
  {
    id: 2,
    title: "Diminishing Musharakah",
    description:
      "Explore one of the most reliable methods for Islamic property financing. Follow step-by-step redemption schedules to understand how joint ownership between a bank and a client works. Learn the core operational differences that set equity-based home financing apart from conventional interest-based mortgages.",
    available: false,
    bgImage: "/module-bg2.webp",
  },
  {
    id: 3,
    title: "Mudarabah Deposit Accounts",
    description:
      "Dive into the structure of profit-paying deposit accounts in Islamic banking. Master the concept of weightages and the step-by-step profit calculations used to manage investor funds. Understand how profits are distributed among different investors and the bank, building a solid foundation in depositor management.",
    available: false,
    bgImage: "/module-bg3.webp",
  },
  {
    id: 4,
    title: "Murabahah Calculations",
    description:
      "Bridge the gap between theory and practice in Murabahah financing. Get hands-on with practical computations for collection periods, inventory days, operating cycles, profit limits, and pricing. This module provides the real-world analytical tools needed to confidently structure and calculate Murabahah transactions.",
    available: false,
    bgImage: "/module-bg4.webp",
  },
  {
    id: 5,
    title: "Asset Pool Management",
    description:
      "Learn the essential techniques Islamic banks use to manage deposits, inter-bank investments, and equity. This module covers practical tools for investment pool management, including pool composition, fund tracking, income calculation, profit-sharing ratios, and distribution mechanisms.",
    available: false,
    bgImage: "/module-bg5.webp",
  },
  {
    id: 6,
    title: "Profit Calculation Framework",
    description:
      "Understand the complex mechanics of calculating profit in a dynamic banking environment with thousands of daily transactions. Explore the three primary methods Islamic banks use to calculate and distribute profit, identify industry-recommended best practices, and test your knowledge with hands-on numerical exercises.",
    available: false,
    bgImage: "/module-bg6.webp",
  },
  {
    id: 7,
    title: "Sukuk (Islamic Bonds)",
    description:
      "Master the intricacies of AAOIFI compliance in the Sukuk market. Through a side-by-side case study of real-world Sukuks, learn to analyze documentation and pinpoint exactly what makes a Sukuk truly compliant. Develop the critical evaluation skills that are highly valued in the modern Islamic finance industry.",
    available: false,
    bgImage: "/module-bg7.webp",
  },
];

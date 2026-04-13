/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Data Dictionary (Static)
 * FILE: src/features/ijarah/utils/lesson-1-data.ts
 * ============================================================================
 * A deeply immutable data object mapping the ACIFE textbook narrative into
 * the strictly typed `LessonData` structure.
 * * ARCHITECTURE NOTE: Abstracting the heavy educational text into a static
 * data file prevents massive JSX bloat and physically separates the Shariah
 * content from the React UI logic.
 * ============================================================================
 */

import { LessonData } from "../types/lesson";

export const lesson1Data: LessonData = {
  id: "1",
  title: "Lesson 1: The Substance of Service",
  segments: [
    {
      id: "seg-1",
      type: "TEXT",
      title:
        "Lesson 1: The Substance of Service: Decoupling Corpus and Usufruct",
      content:
        'Welcome to the first module of your professional journey into Ijarah. As an analyst, you must look beyond the surface level of "leasing." While a standard Ijarah is simply an operating lease where the asset is returned, this course will ultimately focus on the most common corporate financing structure: the Ijarah Muntahia Bittamleek (IMBT), or Lease Ending in Ownership. In Islamic finance, the validity of a multi-million dollar contract hinges on a precise legal distinction: the separation of the physical asset from the service it provides.\n\nIn this module, we will dissect the "Bundle of Rights" that constitutes an Ijarah agreement, shifting our focus from simple ownership to the strategic management of Asset Corpus and Usufruct.',
    },
    {
      id: "seg-2",
      type: "TEXT",
      title: "Part 1: The Corpus-Usufruct Split (Ayn vs. Manfa'ah)",
      content:
        "The Concept:\nIn a conventional sale, you purchase the Corpus (Ayn) the physical, tangible substance of the asset. In an Ijarah, the Bank retains the Ayn, but sells you the Usufruct (Manfa'ah), the right to use that asset to generate value.",
    },
    {
      id: "seg-3",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les1-pic1.webp",
      altText: "Visual representation of Corpus vs Usufruct",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "Think of a $500,000 generator. The Bank owns the steel, the copper, and the pistons (the Corpus). You, the lessee, are buying the electricity it will produce over the next 36 months (the Usufruct). You don't want the scrap metal; you want the energy.",
    },
    {
      id: "seg-4",
      type: "QUIZ",
      question:
        'A client signs an Ijarah for a corporate jet. During the 5-year term, who holds the "Legal Title" to the physical aircraft?',
      options: ["The Client (Lessee)", "The Bank (Lessor)"],
      correctIndex: 1,
      feedbackPrefix: "Correct!",
      feedbackText:
        'The Bank remains the legal owner of the Ayn. You are merely purchasing a "bundle of hours" in the sky.',
    },
    {
      id: "seg-5",
      type: "TEXT",
      title: 'Part 2: Ijarah as a "Sale of Time"',
      content:
        "The Concept:\nTo value an Ijarah, you must view it as a Temporal Commodity. You are not buying an object; you are buying the asset's existence over a discrete temporal window.",
    },
    {
      id: "seg-6",
      type: "TEXT",
      title: "Minimalist Narrative:",
      content:
        'In a Murabaha (cost-plus sale), the transaction is a "Point-in-Time" event. Once the sale is done, the relationship is purely financial (debtor/creditor). In Ijarah, the transaction is a "Flow-of-Time" event. Every second the asset is available to the client, the Bank is "delivering" the service.',
    },
    {
      id: "seg-7",
      type: "QUIZ",
      question:
        "If an Ijarah contract is for 60 months, but the Bank delivers the asset 2 months late, when does the rent legally begin?",
      options: [
        "On the date the contract was signed.",
        "On the date the asset is actually made available for use.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Precisely.",
      feedbackText:
        'You cannot sell the "Usage of Time" for a period that has already passed or where the asset was unavailable. This is why Ijarah is an executory contract.',
    },
    {
      id: "seg-8",
      type: "TEXT",
      title: "Part 3: The Lease-to-Asset Dependency (The Risk Hook)",
      content:
        "The Concept:\nThis is where the risk profile of an Ijarah fundamentally diverges from conventional finance. In a conventional loan, if the asset is destroyed, the debt remains. In Shariah-compliant Ijarah, the right to receive rent is contingent upon the existence of the usufruct.",
    },
    {
      id: "seg-9",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les1-pic2.webp",
      altText: "Visual representation of total loss and risk dependency",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        'If a "Total Loss" event occurs (e.g., a natural disaster destroys the asset), the usufruct ceases to exist. Because the customer can no longer "use" the benefit they were buying, the Bank can no longer legally charge rent. The risk of the asset\'s existence remains entirely with the Bank.',
    },
    {
      id: "seg-10",
      type: "QUIZ",
      question:
        "If the asset is partially damaged and unusable for 15 days, is the customer still obligated to pay full rent for that period?",
      options: [
        "Yes, the contract is signed and binding.",
        "No, rent must be adjusted/suspended as the usufruct was not delivered.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Excellent.",
      feedbackText:
        'This is the Lease-to-Asset Dependency. As an analyst, you must account for this "Asset Risk" on the Bank’s books. A risk that does not exist in a standard interest-bearing loan.',
    },
    {
      id: "seg-11",
      type: "TEXT",
      title: "Part 4: The Analytical Bottom Line (Balance Sheet Impact)",
      content:
        "The Concept:\nBecause the Bank retains the Corpus (Ayn), the accounting treatment follows the legal reality of ownership. This has massive implications for Capital Adequacy and Tax.",
    },
    {
      id: "seg-12",
      type: "TEXT",
      title: "Minimalist Narrative:",
      content:
        'Since the Bank is the owner, they are responsible for Major Maintenance and Takaful (Insurance). If the Bank forces the customer to pay for structural repairs, the contract risks being re-characterized as a "disguised loan," which is a Shariah non-compliance event.',
    },
    {
      id: "seg-13",
      type: "QUIZ",
      question:
        'As an Analyst auditing an Ijarah file, you see a clause stating: "The Lessee is responsible for all structural repairs and catastrophic insurance costs." Is this Shariah-compliant?',
      options: [
        "Yes, it protects the Bank’s profit.",
        "No, these are Ownership Risks that must stay with the Lessor.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Sharp eye!",
      feedbackText:
        'Ownership risks (Corpus risks) must remain with the Bank. The customer only bears the "Usage Risks" (Operating expenses).',
    },
  ],
} as const; // Enforce deep immutability at runtime

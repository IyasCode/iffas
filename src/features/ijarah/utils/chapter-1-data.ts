/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: Data Dictionary (Static)
 * FILE: src/features/ijarah/utils/chapter-1-data.ts
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

export const lesson2Data: LessonData = {
  id: "2",
  title: "Lesson 2: The Structural Divergence (Operating vs. Finance Lease)",
  segments: [
    {
      id: "seg-1",
      type: "TEXT",
      title:
        "Lesson 2: The Structural Divergence (Operating vs. Finance Lease)",
      content:
        'In this module, we dismantle the "Arabic Sticker" myth. To a layperson, an Ijarah looks like a conventional finance lease. This is especially true for the Ijarah Muntahia Bittamleek (IMBT), a Lease Ending in Ownership, which is the primary corporate structure we will build in this course. To an Analyst, they are worlds apart.\n\nThe difference lies in the Allocation of Ownership Risk. If a bank attempts to pass 100% of the asset\'s structural risks to the customer, they are no longer practicing Islamic Finance; they are creating a Synthetic Loan disguised as a lease. We will evaluate the structural integrity of Ijarah through the lens of AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions) and IFRS 16 standards.',
    },
    {
      id: "seg-2",
      type: "TEXT",
      title: "Part 1: The Maintenance Split (Structural vs. Operational)",
      content:
        'The Concept:\nIn conventional finance leases, the "Net Lease" model is king; the lessee pays for everything (insurance, taxes, maintenance). In a Shariah-compliant Ijarah, maintenance is split based on its relationship to the Corpus versus the Usufruct.',
    },
    {
      id: "seg-3",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les2-pic1.webp",
      altText:
        "Technical maintenance log showing Structural vs Operational split",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "As an analyst, you must audit the 'Maintenance Clause.' Major Maintenance (Structural) is anything essential to the asset’s 'Existence' and is the Lessor’s responsibility. General Maintenance (Operational) is related to 'Usage' and is the Lessee’s responsibility. If the contract forces the customer to pay for a new engine, the Bank is effectively charging rent for an asset it refuses to own.",
    },
    {
      id: "seg-4",
      type: "QUIZ",
      question:
        "A fleet of delivery trucks is leased via Ijarah. A truck’s transmission fails due to a factory defect. Who, under Shariah standards, is primarily responsible for the repair cost?",
      options: [
        "The Customer (They were driving it)",
        "The Bank (It is a structural failure of the Corpus)",
      ],
      correctIndex: 1,
      feedbackPrefix: "Correct.",
      feedbackText:
        "Since the Bank owns the Ayn (Corpus), they must ensure it is fit for use. Passing this cost to the customer would invalidate the 'Sale of Usufruct.'",
    },
    {
      id: "seg-5",
      type: "TEXT",
      title: "Part 2: The 'Disguised Interest' Litmus Test (Takaful & Taxes)",
      content:
        "The Concept:\nHow do you spot a 'Synthetic Loan'? Look at the Insurance (Takaful) and Property Taxes. In a conventional loan, the borrower pays these because they are 'costs of financing.' In an Ijarah, these are 'costs of ownership.'",
    },
    {
      id: "seg-6",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les2-pic2.webp",
      altText:
        "Financial flow diagram showing Rental Income with Takaful and Tax leakage",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "For an Ijarah to be valid, the Bank must bear the Ownership Risk. This means the Bank—not the customer—must technically pay for the Takaful and any taxes tied to the asset's title. While the Bank may factor these costs into the rental rate, they cannot legally be a direct liability of the lessee.",
    },
    {
      id: "seg-7",
      type: "QUIZ",
      question:
        "If you see a contract where the customer pays the Takaful provider directly and the Bank has no liability, what is the Shariah risk?",
      options: [
        "No risk; it's just efficient administration.",
        "High risk; it indicates the Bank is treating the transaction as a pure debt-receivable.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Spot on.",
      feedbackText:
        "If the Bank bears zero ownership cost, the 'rent' starts to look like 'interest' on a disguised loan. This is a primary red flag for Shariah auditors.",
    },
    {
      id: "seg-8",
      type: "TEXT",
      title: "Part 3: IFRS 16 vs. AAOIFI (The Accounting Paradox)",
      content:
        "The Concept:\nAs an analyst, you must handle the friction between Global Standards (IFRS 16) and Shariah Standards (AAOIFI). IFRS 16 largely removed the distinction between Operating and Finance leases for lessees, requiring almost all leases to be on-balance sheet.",
    },
    {
      id: "seg-9",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les2-pic3.webp",
      altText: "Compliance Bridge diagram comparing AAOIFI and IFRS 16",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "Under IFRS 16, even though the Bank is the Shariah owner, the Customer records an 'ROU Asset.' However, for the Bank, the classification matters for capital adequacy. A Conventional Finance Lease is a 'Receivable,' while an Ijarah is a 'Tangible Asset.'",
    },
    {
      id: "seg-10",
      type: "QUIZ",
      question:
        "Under AAOIFI Shariah Standard, who records the Depreciation of the physical asset on their financial statements?",
      options: ["The Bank (Lessor)", "The Customer (Lessee)"],
      correctIndex: 0,
      feedbackPrefix: "Correct.",
      feedbackText:
        "Depreciation is the 'consumption' of the Corpus. Since the Bank owns the Corpus, the Bank 'consumes' the depreciation.",
    },
    {
      id: "seg-11",
      type: "TEXT",
      title: "Part 4: The Residual Value Risk",
      content:
        "The Concept:\nIn a conventional finance lease, the bank often has a 'Guaranteed Residual Value.' They are guaranteed to get their money back. In Ijarah, the Bank must face Market Risk.",
    },
    {
      id: "seg-12",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les2-pic4.webp",
      altText: "Graph of Expected vs Actual Market Value showing a loss gap",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "If the asset is returned and its value has plummeted more than expected, a Shariah-compliant Bank must bear that loss. They cannot force the customer to 'make up the difference' unless the customer damaged the asset. This Residual Value Risk is proof the Bank is an 'Owner' and not just a 'Lender.'",
    },
    {
      id: "seg-13",
      type: "QUIZ",
      question:
        "At the end of a 3-year Ijarah, the market for the leased equipment collapses. The Bank sells the equipment for $20,000 less than the 'Book Value.' Who absorbs this loss?",
      options: ["The Bank (Lessor)", "The Customer (Lessee)"],
      correctIndex: 0,
      feedbackPrefix: "Perfect.",
      feedbackText:
        "This confirms the Bank's role as a risk-taking owner. You’ve successfully navigated the structural divergence of Ijarah.",
    },
  ],
} as const;

export const lesson3Data: LessonData = {
  id: "3",
  title: "Lesson 3: The Pricing Engine (Benchmarks and Spread)",
  segments: [
    {
      id: "seg-1",
      type: "TEXT",
      title: "Lesson 3: The Pricing Engine (Benchmarks and Spread)",
      content:
        'In this module, we move from the legal structure to the financial engine. For an analyst, the most common question from clients or skeptics is: "If Islamic finance prohibits interest, why is my Ijarah rate pegged to SOFR or EIBOR?"\n\nThe answer lies in Risk Management. We don\'t use benchmarks to mimic interest; we use them as a Market Proxy to determine the fair value of the Usufruct for a specific window of time. Because the value of "using an asset" changes as the economy shifts, the pricing engine must be dynamic.',
    },
    {
      id: "seg-2",
      type: "TEXT",
      title: "Part 1: The Benchmark as a Valuation Proxy",
      content:
        'The Concept:\nIn a Murabahah (sale), the price is fixed because the asset is sold instantly. In Ijarah, you are selling "Usage" over 5 to 10 years. Since we cannot predict the fair market value of usage in the year 2030 today, we use a benchmark (like SOFR or KLIBOR) as a neutral yardstick to ensure neither the Bank nor the Customer is unfairly treated by inflation or market volatility.',
    },
    {
      id: "seg-3",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les3-pic1.webp",
      altText:
        "Market Value thermometer showing Cost of Capital vs Rental Value",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "Think of a benchmark as a Transparency Tool. Instead of the Bank arbitrarily choosing a profit rate, they peg it to a publicly verifiable market index. This ensures that the 'Price of Time' stays aligned with the real economy.",
    },
    {
      id: "seg-4",
      type: "QUIZ",
      question:
        "Why does an Islamic Bank use a benchmark like SOFR for a 5-year Ijarah?",
      options: [
        "To hide interest charges under a different name.",
        "To serve as a neutral proxy for the changing market value of the usufruct over time.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Correct.",
      feedbackText:
        "It is a valuation mechanism, not a loan indicator. By using a public benchmark, the Bank eliminates Gharar (uncertainty) regarding how future prices are determined.",
    },
    {
      id: "seg-5",
      type: "TEXT",
      title: "Part 2: Periodic Re-pricing (The Temporal Engine)",
      content:
        'The Concept:\nA long-term Ijarah is essentially a series of Independent Rental Periods. At the start of each period (the "Reset Date"), the pricing engine looks at the Benchmark, adds the Bank\'s Spread, and locks that price for that period only.',
    },
    {
      id: "seg-6",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les3-pic2.webp",
      altText:
        "Timeline with Quarterly Blocks and Searchlight icons at reset dates",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "In a Periodic Re-pricing Mechanism, the rent is fixed for the duration of the tenure (e.g., 3 months). This removes Gharar because the customer knows exactly what they will pay for that specific window. When the window closes, the 'Searchlight' looks at the market again to set the price for the next window.",
    },
    {
      id: "seg-7",
      type: "QUIZ",
      question:
        "The market rate spikes suddenly in the middle of Month 2. Can the Bank increase the rent for that same month?",
      options: [
        "Yes, to protect their profit margin.",
        "No, the rent is fixed for the duration of the agreed tenure.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Precisely.",
      feedbackText:
        "This is a critical Shariah requirement. Rent must be predetermined for each period. The 'variable' nature only applies to future periods.",
    },
    {
      id: "seg-8",
      type: "TEXT",
      title: "Part 3: The 'Spread' (Quantifying the Bank’s Value)",
      content:
        'The Concept:\nThe benchmark is the market\'s "base." The Spread is the Bank’s specific margin. This spread covers the Bank’s operational costs, the Ownership Risks we discussed in Module 2 (Takaful, Major Maintenance), and their required profit.',
    },
    {
      id: "seg-9",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les3-pic3.webp",
      altText:
        "Bar chart with two layers: Benchmark (Variable) and Spread (Fixed)",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "While the benchmark floats, the spread is usually fixed for the life of the contract. As an analyst, you calculate the spread based on the client's credit risk and the specific asset's depreciation profile.",
    },
    {
      id: "seg-10",
      type: "QUIZ",
      question:
        "If the Bank’s cost of Takaful (insurance) for the asset increases, where is this cost typically captured in the pricing engine during the initial setup?",
      options: [
        "Inside the floating Benchmark.",
        "Within the fixed Spread/Margin.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Spot on.",
      feedbackText:
        "The spread must account for the 'Costs of Ownership' that the Bank bears as the legal owner of the Corpus.",
    },
    {
      id: "seg-11",
      type: "TEXT",
      title: "Part 4: Protecting the Partnership (Cap and Collar)",
      content:
        'The Concept:\nTo prevent the "Variable" nature of Ijarah from becoming a burden, professional contracts use a Cap (Ceiling) and a Floor (Collar). This creates a "Safe Zone" for the rental rate.',
    },
    {
      id: "seg-12",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les3-pic4.webp",
      altText:
        "Safety Corridor diagram with Ceiling, Floor, and market rate line",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "The Cap protects the Customer from hyper-inflation (e.g., 'Rent will never exceed 12%'). The Floor protects the Bank from market crashes, ensuring they can still cover the asset's depreciation.",
    },
    {
      id: "seg-13",
      type: "QUIZ",
      question:
        "A global crisis causes the benchmark to spike to 18%. However, the Ijarah contract has a 'Cap' of 10%. What rate does the customer pay?",
      options: ["18% (Market reality)", "10% (The contractual Cap)"],
      correctIndex: 1,
      feedbackPrefix: "Excellent!",
      feedbackText:
        "This 'Cap and Collar' mechanism is a vital risk-mitigation tool that makes Ijarah a stable, professional financial product for large-scale industrial projects.",
    },
    {
      id: "seg-14",
      type: "TEXT",
      title: "The Analytical Bottom Line",
      content:
        "The pricing engine of an Ijarah is a sophisticated Risk Management Tool. By using periodic re-pricing with a Cap and Collar, the Bank transforms a static lease into a dynamic, market-responsive partnership.",
    },
  ],
} as const;

export const lesson4Data: LessonData = {
  id: "4",
  title: "Lesson 4: Macro-Financial Resilience (The Rate of Return Risk)",
  segments: [
    {
      id: "seg-1",
      type: "TEXT",
      title: "Lesson 4: Macro-Financial Resilience (The Rate of Return Risk)",
      content:
        "Welcome to the Strategy Room. Up until now, we have looked at Ijarah from the perspective of a single transaction: how to structure it legally and how to price it fairly. But as an Analyst, you must also understand how a portfolio of these contracts impacts the institution as a whole.\n\nIn this module, we step into the shoes of a Chief Financial Officer (CFO). We will explore how Ijarah acts as a vital macroeconomic shield against instability, focusing on Asset-Liability Matching (ALM) and the perilous threat of 'Negative Carry.'",
    },
    {
      id: "seg-2",
      type: "TEXT",
      title: "Part 1: The ALM Tightrope (Asset-Liability Matching)",
      content:
        "The Concept:\nBanks operate on a fundamental time mismatch: they 'borrow short' (taking in short-term customer deposits) and 'finance long' (providing 5- to 10-year facility agreements like Ijarah). Asset-Liability Matching (ALM) is the daily balancing act of ensuring the income from long-term assets is enough to pay the required returns on short-term liabilities.",
    },
    {
      id: "seg-3",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les4-pic1.webp",
      altText: "A dynamic scale representing Asset-Liability Matching (ALM)",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "Imagine a bank funds a 7-year fixed-rate lease using 6-month deposits. In Year 1, the bank pays 3% and earns 7%—a healthy margin. But by Year 3, inflation spikes. Depositors demand 6%, but the bank's income is stuck at 7%. This mismatch between how fast liabilities re-price versus assets is the core of ALM risk.",
    },
    {
      id: "seg-4",
      type: "QUIZ",
      question:
        "If a bank holds purely fixed-rate, long-term assets while its funding costs are subject to rapid, short-term market fluctuations, what is the most immediate danger to the institution?",
      options: [
        "They will make too much profit, leading to tax penalties.",
        "Their profit margins will compress or disappear entirely as funding costs rise.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Spot on.",
      feedbackText:
        "This margin compression is the nightmare scenario for any treasury department. The bank gets 'squeezed' between rising market rates and fixed asset returns.",
    },
    {
      id: "seg-5",
      type: "TEXT",
      title: "Part 2: The Squeeze (Understanding Negative Carry)",
      content:
        "The Concept:\nWhen the ALM mismatch goes to the extreme, an institution enters a state of 'Negative Carry.' This occurs when the cost of holding an asset (the cost of funds paid to depositors) actually exceeds the income the asset generates.",
    },
    {
      id: "seg-6",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les4-pic2.webp",
      altText:
        "Line chart showing Yield on Assets vs Cost of Funds with Negative Carry shaded red",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "By Year 4 of a crisis, the bank might pay 9% to retain deposits while a fixed-rate lease generates only 7%. The bank is now losing 2% on every dollar. They are essentially bleeding capital just to keep the contract on their books, which can lead to a severe liquidity crisis.",
    },
    {
      id: "seg-7",
      type: "QUIZ",
      question:
        "How does Negative Carry impact the bank's balance sheet over a sustained period?",
      options: [
        "It increases the bank's physical ownership of the asset.",
        "It steadily erodes the bank's capital reserves, threatening solvency.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Precisely.",
      feedbackText:
        "Negative carry doesn't just reduce profits; it actively destroys capital. This is why locking in 10-year fixed rates in a volatile economy is considered financially reckless.",
    },
    {
      id: "seg-8",
      type: "TEXT",
      title: "Part 3: Displaced Commercial Risk (The Islamic Banking Nuance)",
      content:
        "The Concept:\nIn conventional banking, shareholders take the hit before depositors. In Islamic banking, depositors are 'Rab-ul-Mal' (investors). However, if the bank's assets perform poorly and they pay depositors less than the market, depositors will leave. This forces a unique intervention.",
    },
    {
      id: "seg-9",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les4-pic3.webp",
      altText: "Flow chart illustrating Displaced Commercial Risk (DCR)",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "To prevent a bank run, an Islamic bank will often surrender its own shareholder profit to 'top up' depositor returns to market rates. This is Displaced Commercial Risk (DCR). The root cause is a rigid, fixed-rate portfolio that cannot adapt to rising market expectations.",
    },
    {
      id: "seg-10",
      type: "QUIZ",
      question:
        "Why is Displaced Commercial Risk a unique threat to Islamic financial institutions?",
      options: [
        "Because to prevent depositors from leaving, shareholders must often sacrifice their own profits to remain competitive.",
        "Because Islamic banks are not allowed to hold any long-term assets on their balance sheets.",
      ],
      correctIndex: 0,
      feedbackPrefix: "Excellent analysis.",
      feedbackText:
        "Islamic banks must stay competitive with market returns. If assets can't generate competitive yields, the shareholders pay the ultimate price to maintain stability.",
    },
    {
      id: "seg-11",
      type: "TEXT",
      title: "Part 4: Ijarah as the Ultimate ALM Tool",
      content:
        "The Concept:\nWe now return to the structural brilliance of the Ijarah contract. By utilizing periodic re-pricing mechanisms (variable rentals tied to benchmarks), Ijarah becomes the CFO's primary weapon against ALM mismatches, Negative Carry, and Displaced Commercial Risk.",
    },
    {
      id: "seg-12",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les4-pic4.webp",
      altText:
        "Split-screen dashboard comparing Fixed Asset and Ijarah portfolios",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "Ijarah fundamentally solves Rate of Return Risk. Because it is a 'Sale of Time' broken into discrete tenures, the CFO can synchronize yields with funding costs. If the market demands 9% for deposits, the Ijarah rental resets to reflect that reality, preserving margins and averting Negative Carry.",
    },
    {
      id: "seg-13",
      type: "QUIZ",
      question:
        "From a macroeconomic perspective, what is the primary strategic function of an Ijarah facility for an Islamic bank?",
      options: [
        "To permanently fix the cost of long-term borrowing to attract more retail customers.",
        "To synchronize long-term asset yields with short-term funding costs, neutralizing Rate of Return Risk.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Masterful.",
      feedbackText:
        "You now understand Ijarah not just as a legal contract, but as a critical instrument of macroeconomic survival for the entire financial institution.",
    },
    {
      id: "seg-14",
      type: "TEXT",
      title: "The Analytical Bottom Line",
      content:
        "The pricing engine of an Ijarah is a sophisticated Risk Management Tool. By using periodic re-pricing with a Cap and Collar, the Bank transforms a static lease into a dynamic, market-responsive partnership.",
    },
  ],
} as const;

export const lesson5Data: LessonData = {
  id: "5",
  title: "Lesson 5: Contractual Engineering (The 'Wa'd' and Tenures)",
  segments: [
    {
      id: "seg-1",
      type: "TEXT",
      title: "Lesson 5: Contractual Engineering (The 'Wa'd' and Tenures)",
      content:
        "We now bridge the gap between abstract Shariah theory and the mathematical reality you will soon build in your financial calculator. Up to this point, we have established how the bank manages ownership risk and macroeconomic volatility.\n\nBut a critical question remains: in an Ijarah Muntahia Bittamleek (IMBT), a Lease Ending in Ownership, how does the physical asset actually move onto the customer's balance sheet at the end of the timeline? As an Analyst, you must understand that bridging the gap between 'leasing' and 'owning' is a legal minefield. You cannot simply mash a sale and a lease together. In this module, we will deconstruct the sequence of legal events that make IMBT possible, focusing heavily on the power of the Unilateral Promise (Wa'd) and how it prevents fatal Shariah violations.",
    },
    {
      id: "seg-2",
      type: "TEXT",
      title: "Part 1: The 'Two-in-One' Prohibition",
      content:
        "The Concept:\nIn conventional finance, a 'Hire Purchase' or 'Finance Lease' is often a single, blended contract. In Shariah, combining a lease and a sale into one contingent contract creates unacceptable uncertainty (Gharar) and violates the principle against 'two contracts in one' (Safqatain fi safqah).",
    },
    {
      id: "seg-3",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les5-pic1.webp",
      altText:
        "Blueprint showing decoupled Ijarah and Transfer of Ownership blocks connected by a dotted Wa’d line",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "To an auditor, an IMBT is strictly sequential. You cannot lease an asset and sell it in the exact same breath. During the 5-year tenure, the relationship is purely Lessor-Lessee. Only after the lease matures can a second, entirely separate contract be executed to transfer the Corpus (ownership). The mechanism that bridges these two phases without legally entangling them is the Promise.",
    },
    {
      id: "seg-4",
      type: "QUIZ",
      question:
        "If a bank drafts an IMBT agreement where the 'Lease Agreement' and the 'Final Sale Agreement' are signed simultaneously on Day 1 as a single binding document, what is the Shariah verdict?",
      options: [
        "It is valid, as it provides certainty to the customer.",
        "It is invalid, as it combines a lease and a sale into a single contingent contract.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Spot on.",
      feedbackText:
        "The contracts must be completely decoupled. The lease must run its course before the sale can legally take place.",
    },
    {
      id: "seg-5",
      type: "TEXT",
      title: "Part 2: The Mechanics of the Wa'd (Unilateral Promise)",
      content:
        "The Concept:\nIf the sale can't be signed on Day 1, how does the customer have any security that the bank won't simply keep the asset after 5 years of payments? The answer is the Wa’d, a legally binding, Unilateral Promise.",
    },
    {
      id: "seg-6",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les5-pic2.webp",
      altText:
        "Golden arrow (Wa’d) from Bank to Customer with a shield icon (Option to Buy) held by the customer",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "The Bank unilaterally promises: 'If you complete all lease tenures, I promise to sell/gift you this asset.' This promise is one-way binding on the Bank. The customer holds an option but is not legally forced to buy. This one-way street protects the customer's expectation while keeping the lease separate from a guaranteed future sale.",
    },
    {
      id: "seg-7",
      type: "QUIZ",
      question:
        "In a Shariah-compliant IMBT, who is legally bound by the Wa'd issued on Day 1?",
      options: ["Only the Bank (Promisor)", "Both the Bank and the Customer"],
      correctIndex: 0,
      feedbackPrefix: "Correct!",
      feedbackText:
        "The Wa'd is strictly unilateral. The Bank must honor the promise if the conditions are met, but the customer retains the freedom of choice.",
    },
    {
      id: "seg-8",
      type: "TEXT",
      title: "Part 3: Avoiding the 'Inah' Trap (The Bilateral Danger)",
      content:
        "The Concept:\nWhy can't the Bank and the Customer just sign a Bilateral Promise (a mutual forward agreement to sell and buy)? Because doing so mimics a guaranteed, back-to-back sale, triggering severe Shariah prohibitions against disguised interest (Inah).",
    },
    {
      id: "seg-9",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les5-pic3.webp",
      altText:
        "Circular diagram with a chain pulling an asset back to the bank labeled 'Inah (Disguised Loan)'",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "If both parties are mutually bound on Day 1 to buy and sell at the end, the 'lease' is just a smokescreen for a buy-back arrangement. By making the promise strictly unilateral, the Bank takes on genuine market risk. If the customer exercises their right to walk away at year 5, the Bank is left holding the asset. This risk validates the bank's profit.",
    },
    {
      id: "seg-10",
      type: "QUIZ",
      question:
        "Why does AAOIFI strictly forbid a bilateral, binding forward contract (where both parties must buy/sell) at the start of an IMBT?",
      options: [
        "Because the paperwork is too complex for retail customers.",
        "Because it guarantees the return of the principal plus profit, mimicking an interest-bearing loan.",
      ],
      correctIndex: 1,
      feedbackPrefix: "Excellent analytical depth.",
      feedbackText:
        "The presence of true ownership risk—the possibility the customer might say 'no' at the end—is what separates Islamic leasing from conventional debt engineering.",
    },
    {
      id: "seg-11",
      type: "TEXT",
      title: "Part 4: Executing the Transfer (Hibah vs. Token Price)",
      content:
        "The Concept:\nAt the end of the 60th tenure, the Ijarah contract expires and the Usufruct is consumed. Now, the Wa'd is triggered, and a completely new contract is drafted to execute the transfer of the Ayn (Corpus).",
    },
    {
      id: "seg-12",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les5-pic4.webp",
      altText:
        "Split-screen model showing Path A (Hibah/Gift) and Path B (Token Sale)",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "Transfer typically takes one of two forms: a Hibah (documented Gift) if the capital cost was fully amortized, or a Sale for a Token Price (e.g., $1) via a separate Sale and Purchase Agreement (SPA). This final step officially moves the asset off the Bank's balance sheet and onto the Client's.",
    },
    {
      id: "seg-13",
      type: "QUIZ",
      question:
        "When the 5-year Ijarah term ends and the client has made all payments, what must mechanically happen to finalize the IMBT?",
      options: [
        "The original Ijarah contract is amended and stamped 'Complete.'",
        "A brand new contract is executed based on the initial Wa'd.",
      ],
      correctIndex: 1,
      feedbackPrefix: "You have successfully engineered the contract!",
      feedbackText:
        "You now understand that an IMBT is a sequence of discrete legal events: a lease of Usufruct, guided by a Unilateral Promise, culminating in a separate transfer of Corpus.",
    },
  ],
} as const;

export const lesson6Data: LessonData = {
  id: "6",
  title: "Lesson 6: Comparative Analysis (Ijarah vs. Murabahah)",
  segments: [
    {
      id: "seg-1",
      type: "TEXT",
      title: "Lesson 6: Comparative Analysis (Ijarah vs. Murabahah)",
      content:
        "You have mastered the legal anatomy, the risk mechanics, and the macroeconomic utility of Ijarah. Now, it is time to put on the hat of a Corporate Relationship Manager. When a CFO walks into your office asking for $5 million to finance new factory equipment, you must decide which Shariah-compliant instrument to pitch.\n\nIn this final module of Chapter 1, we put Ijarah head-to-head with Islamic finance’s most common structure: Murabahah (Cost-Plus Sale). By analyzing the fundamental difference between 'Credit Risk' and 'Ownership Risk,' you will learn to architecture the right product and understand exactly how these two contracts behave within a bank's core banking system.",
    },
    {
      id: "seg-2",
      type: "TEXT",
      title: "Part 1: The Nature of the Claim (Debt vs. Asset)",
      content:
        "The Concept:\nThe foundational difference between Murabahah and Ijarah lies in what the bank actually holds on its books after the ink dries. Murabahah creates a 'Debt of Money,' whereas Ijarah represents a 'Claim on an Asset.'",
    },
    {
      id: "seg-3",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les6-pic1.webp",
      altText:
        "Split-screen: Murabahah (IOU/Receivable) vs. Ijarah (Asset in vault with Usufruct beam)",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "In a Murabahah, the bank's relationship to the physical asset ends the second the sale concludes; it is replaced by a financial receivable. In an Ijarah, the bank retains the asset. The bank does not hold a debt of the asset's value; it holds the asset itself and a contract for its usage.",
    },
    {
      id: "seg-4",
      type: "QUIZ",
      question:
        "If a relationship manager closes a $10 million Murabahah deal for a fleet of ships, what is the primary asset recorded on the bank's balance sheet the following day?",
      options: [
        "A $10 million financial receivable (Debt)",
        "The physical fleet of ships",
      ],
      correctIndex: 0,
      feedbackPrefix: "Spot on!",
      feedbackText:
        "Once a Murabahah sale is executed, the asset is gone from the bank's perspective. It is replaced by a static obligation to pay.",
    },
    {
      id: "seg-5",
      type: "TEXT",
      title: "Part 2: The Divergence of Risk (Credit vs. Ownership)",
      content:
        "The Concept:\nBecause the nature of the claim differs, the risk profile radically diverges. Murabahah exposes the bank primarily to Credit Risk. Ijarah exposes the bank to Ownership Risk (alongside Credit Risk for the rent).",
    },
    {
      id: "seg-6",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les6-pic2.webp",
      altText:
        "Conceptual scales comparing Murabahah (Default Risk) vs. Ijarah (Multiple Ownership Risks)",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "If Murabahah-financed ships sink, the customer still owes the debt. If Ijarah-financed ships sink, the lease terminates immediately and the bank absorbs the loss. This is why Ijarah commands a different pricing structure—the bank is being compensated for bearing the existential risk of the corpus.",
    },
    {
      id: "seg-7",
      type: "QUIZ",
      question:
        "A client wants the absolute lowest possible financing rate and is willing to take on all structural risks immediately. Which product should the Relationship Manager pitch?",
      options: ["Murabahah", "Ijarah"],
      correctIndex: 0,
      feedbackPrefix: "Excellent strategic thinking.",
      feedbackText:
        "Because Murabahah transfers the ownership risk to the client immediately, the bank's risk is lower, which typically translates to a cheaper fixed pricing model.",
    },
    {
      id: "seg-8",
      type: "TEXT",
      title: "Part 3: The Accounting Reality (Balance Sheet Mechanics)",
      content:
        "The Concept:\nAs an analyst, you must understand how these two facilities hit the bank's balance sheet and income statement under standard practices like AAOIFI or IFRS.\n\n| Feature | Murabahah (Cost-Plus Sale) | Ijarah (Operating / IMBT) |\n| :--- | :--- | :--- |\n| **Asset Classification** | Financing Receivable (Debt) | Tangible Fixed Asset |\n| **Profit Recognition** | Locked on Day 1; amortized over term. | Recognized period-by-period as billed. |\n| **Depreciation** | None (Client depreciates). | Bank records and deducts depreciation. |\n| **Price Adjustment** | Permanently Fixed. | Floating (can reset each tenure). |",
    },
    {
      id: "seg-9",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les6-pic3.webp",
      altText: "High-contrast comparison table of accounting treatments",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "In Murabahah, the profit is guaranteed and locked in; it is simply unearned income. In Ijarah, the 'profit' is the Net Rental Income. The bank collects gross rent but must subtract Depreciation and Takaful costs to find the true margin.",
    },
    {
      id: "seg-10",
      type: "QUIZ",
      question:
        "If a bank wants to immediately lock in a guaranteed profit margin for a short-term trade without dealing with asset depreciation, which product should the RM recommend?",
      options: ["Murabahah", "Ijarah"],
      correctIndex: 0,
      feedbackPrefix: "Spot on.",
      feedbackText:
        "Murabahah is ideal for short-term certainty and consumables, sparing the bank from managing depreciation and asset tracking.",
    },
    {
      id: "seg-11",
      type: "TEXT",
      title: "Part 4: Product Selection Matrix (The Final Pitch)",
      content:
        "The Concept:\nEvery Islamic finance tool has a specific job. To be an effective Relationship Manager, you must match the financial engineering to the client's macroeconomic reality.",
    },
    {
      id: "seg-12",
      type: "VISUAL",
      imageSrc: "/ijarah/learn/les6-pic4.webp",
      altText: "Decision tree for product selection based on client objectives",
      narrativeTitle: "Minimalist Narrative:",
      narrativeContent:
        "Choose Murabahah for fast-depreciating consumables or when the bank wants to avoid ownership liability. Choose Ijarah for high-value assets with long lives (aircraft, real estate) or to hedge against rising inflation and funding costs.",
    },
    {
      id: "seg-13",
      type: "QUIZ",
      question:
        "A client seeks $50M for a 15-year real estate project while inflation is rising rapidly. Which structure do you recommend to the credit committee?",
      options: ["Murabahah", "Ijarah"],
      correctIndex: 1,
      feedbackPrefix: "Masterful Product Selection!",
      feedbackText:
        "Locking in a 15-year fixed return in an inflationary market would destroy capital. Ijarah provides the structural flexibility needed to survive and thrive.",
    },
  ],
} as const;

export const chapter1Lessons: readonly LessonData[] = [
  lesson1Data,
  lesson2Data,
  lesson3Data,
  lesson4Data,
  lesson5Data,
  lesson6Data,
] as const;

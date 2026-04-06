/**
 * ============================================================================
 * FEATURE: Landing Page
 * LAYER: UI Component (Client)
 * FILE: src/features/landing-page/components/Module.tsx
 * ============================================================================
 * Renders the interactive 3D carousel showcasing the available modules.
 * * BOUNDARY ENFORCEMENT:
 * Client boundary required strictly for Framer Motion drag gestures,
 * complex layout animations, and window resize listeners.
 * Contains zero financial logic.
 * ============================================================================
 */

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";

// --- Types & Interfaces ---
export interface CourseModule {
  id: number;
  title: string;
  description: string;
  available: boolean;
  bgImage: string;
}

// --- Constants (Anti-Magic Number Enforcement) ---
const SWIPE_THRESHOLD_PX = 50;
const Z_INDEX_BASE = 50;
const Z_INDEX_DECREMENT = 10;
const SCALE_DECREMENT_PER_POSITION = 0.15;
const BLUR_MULTIPLIER_PX = 3;
const OPACITY_DECREMENT = 0.3;

// Horizontal spread variables based on viewport
const MOBILE_X_SPREAD_PERCENT = 65;
const DESKTOP_X_SPREAD_PERCENT = 40;

// --- Data Structure ---
const COURSES_DATA: CourseModule[] = [
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

/**
 * ModuleSection
 * Orchestrates the 3D carousel layout for module selection.
 */
export function Module() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle safe hydration and responsive layout detection
  useEffect(() => {
    setIsMounted(true);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % COURSES_DATA.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + COURSES_DATA.length) % COURSES_DATA.length,
    );
  };

  /**
   * Evaluates the swipe gesture to determine intent.
   */
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > SWIPE_THRESHOLD_PX) {
      handlePrev();
    } else if (info.offset.x < -SWIPE_THRESHOLD_PX) {
      handleNext();
    }
  };

  /**
   * Calculates the relative position of a card compared to the active index.
   * Returns a value between -3 and 3 to represent distance from center
   * to ensure continuous circular mapping.
   */
  const getRelativePosition = (
    index: number,
    active: number,
    total: number,
  ): number => {
    let diff = (index - active) % total;
    if (diff < -Math.floor(total / 2)) diff += total;
    if (diff > Math.floor(total / 2)) diff -= total;
    return diff;
  };

  // Prevent hydration mismatch by deferring render until the client environment is ready
  if (!isMounted) {
    return (
      <section className="relative flex min-h-200 w-full flex-col items-center justify-center overflow-hidden bg-brand-cream py-20" />
    );
  }

  return (
    <section className="relative flex min-h-200 w-full flex-col items-center justify-center overflow-hidden bg-brand-cream py-20">
      {/* Semi-Circle Background Element */}
      <div
        className="absolute left-0 top-0 z-0 h-80 w-full rounded-b-[70%] bg-brand-dark"
        aria-hidden="true"
      />

      <div className="relative z-20 mb-12 px-4 pt-4 text-center">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Educational Modules
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-200">
          Explore the mechanics of Islamic finance. Select a module below to
          begin your practical analysis.
        </p>
      </div>

      <div className="perspective-1000 relative z-10 flex h-162.5 w-full max-w-7xl items-center justify-center">
        <AnimatePresence mode="popLayout">
          {COURSES_DATA.map((course, index) => {
            const relativePos = getRelativePosition(
              index,
              activeIndex,
              COURSES_DATA.length,
            );

            // Hide cards that are too far out of frame to prevent DOM clutter
            const isVisible = isMobile
              ? Math.abs(relativePos) <= 1
              : Math.abs(relativePos) <= 2;

            if (!isVisible) return null;

            // Mathematical derivation of 3D aesthetic properties
            const isActive = relativePos === 0;
            const calculatedZIndex =
              Z_INDEX_BASE - Math.abs(relativePos) * Z_INDEX_DECREMENT;
            const calculatedScale =
              1 - Math.abs(relativePos) * SCALE_DECREMENT_PER_POSITION;
            const spreadMultiplier = isMobile
              ? MOBILE_X_SPREAD_PERCENT
              : DESKTOP_X_SPREAD_PERCENT;
            const calculatedXOffset = relativePos * spreadMultiplier;
            const calculatedBlur = Math.abs(relativePos) * BLUR_MULTIPLIER_PX;
            const calculatedOpacity =
              1 - Math.abs(relativePos) * OPACITY_DECREMENT;

            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: `${calculatedXOffset}%`,
                  scale: calculatedScale,
                  zIndex: calculatedZIndex,
                  filter: `blur(${isActive ? 0 : calculatedBlur}px)`,
                  opacity: calculatedOpacity,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                onClick={() => !isActive && setActiveIndex(index)}
                className={cn(
                  "absolute flex h-137.5 w-[90%] max-w-112.5 flex-col overflow-hidden rounded-3xl shadow-2xl sm:h-150 sm:w-full",
                  isActive
                    ? "cursor-grab active:cursor-grabbing"
                    : "cursor-pointer",
                )}
              >
                {/* Background Image & Ambient Overlay */}
                <Image
                  src={course.bgImage}
                  alt={course.title}
                  fill
                  className="z-10 object-cover"
                  priority={isActive}
                />
                <div
                  className="absolute inset-0 z-10 bg-slate-950/80 transition-opacity duration-300"
                  aria-hidden="true"
                />

                {/* Content Container */}
                <div className="relative z-20 flex h-full flex-col p-8 text-white">
                  <h3 className="mb-4 border-b border-white/20 pb-4 text-center text-3xl font-bold tracking-tight">
                    {course.title}
                  </h3>

                  <div className="flex grow items-center">
                    <p className="text-center text-base leading-relaxed text-white sm:text-lg">
                      {course.description}
                    </p>
                  </div>

                  {/* Call To Action */}
                  <div className="mt-auto flex w-full justify-center pt-6">
                    <button
                      disabled={!course.available}
                      className={cn(
                        "w-full rounded-xl py-4 text-lg font-semibold transition-all duration-300",
                        course.available
                          ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)] hover:bg-emerald-500"
                          : "cursor-not-allowed bg-slate-700 text-slate-400",
                      )}
                    >
                      {course.available ? "Proceed to module" : "Coming soon"}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

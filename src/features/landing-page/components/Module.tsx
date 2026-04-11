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
import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { COURSES_DATA } from "../types/module-cards-config";

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
        className="absolute left-0 top-0 z-0 h-80 w-full rounded-b-[70%] bg-brand-navy"
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

                  <div className="flex grow flex-col justify-center gap-6">
                    <p className="text-center text-base leading-relaxed text-slate-100 sm:text-lg">
                      {course.description}
                    </p>

                    {/* Pedagogical Key Concepts Mapping */}
                    <ul
                      className="flex flex-wrap justify-center gap-2"
                      aria-label={`Key concepts for ${course.title}`}
                    >
                      {course.keyConcepts.map((concept) => (
                        <li
                          key={concept}
                          className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm sm:text-sm"
                        >
                          {concept}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Call To Action */}

                  <Link
                    href={course.href}
                    className="mt-6 flex w-full justify-center "
                  >
                    <button
                      disabled={!course.available}
                      className={cn(
                        "w-full rounded-xl py-4 text-lg font-semibold transition-all duration-300 cursor-pointer",
                        course.available
                          ? "bg-emerald-600 text-white shadow-[0_0_15px_rgba(5,150,105,0.4)] hover:bg-emerald-500"
                          : "cursor-not-allowed bg-slate-700 text-slate-400",
                      )}
                    >
                      {course.available ? "Explore module" : "Coming soon"}
                    </button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}

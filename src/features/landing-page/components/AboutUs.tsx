/**
 * ============================================================================
 * FEATURE: Landing Page
 * LAYER: UI Component (Client)
 * FILE: src/features/landing-page/components/AboutUs.tsx
 * ============================================================================
 * Renders the "About Us" section detailing the mission and pedagogical
 * approach of the IFFAS platform.
 * * BOUNDARY ENFORCEMENT:
 * Client boundary required strictly for Framer Motion entrance animations
 * and viewport intersection observers. Contains zero financial logic.
 * ============================================================================
 */

"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { BookOpen, Calculator, LineChart } from "lucide-react";

export interface LearningPillar {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

// Data extracted from the render cycle for cleaner component anatomy
const LEARNING_PILLARS: LearningPillar[] = [
  {
    icon: <BookOpen className="h-6 w-6 text-amber-400" />,
    title: "Curriculum Aligned",
    desc: "Modules meticulously mapped to globally recognized standards.",
  },
  {
    icon: <Calculator className="h-6 w-6 text-teal-400" />,
    title: "Interactive Calculators",
    desc: "Step-by-step mathematical breakdowns of Ijarah, Murabahah, and more.",
  },
  {
    icon: <LineChart className="h-6 w-6 text-cyan-400" />,
    title: "Real-world Simulators",
    desc: "Stress-test contracts against defaults, late deliveries, and early terminations.",
  },
];

// --- Animation Variants ---

const ANIMATION_DURATION = 0.8;
const STAGGER_DELAY = 0.2;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER_DELAY,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: ANIMATION_DURATION, ease: [0.16, 1, 0.3, 1] },
  },
};

/**
 * AboutUs
 * Orchestrates the animated mission statement and educational pillars layout.
 */
export function AboutUs() {
  return (
    <section
      id="about-us"
      aria-labelledby="about-heading"
      className="relative w-full overflow-hidden bg-brand-dark py-24 md:py-32"
    >
      {/* Decorative Background Elements: Abstract Geometric Overlays */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg
          className="absolute right-0 top-0 h-full w-1/2 -translate-y-1/4 translate-x-1/3 transform"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <polygon
            fill="currentColor"
            className="text-white"
            points="50,0 100,50 50,100 0,50"
          />
        </svg>
        <div
          className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-linear-to-tr from-cyan-900/40 to-transparent mix-blend-overlay blur-3xl"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left Column: Typography and Core Message */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.div
              variants={itemVariants}
              className="mb-6 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-amber-400" aria-hidden="true" />
              <span className="font-mono text-sm font-semibold uppercase tracking-wider text-amber-400">
                About IFFAS
              </span>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2
                id="about-heading"
                className="mb-8 font-serif text-3xl font-bold leading-tight text-white md:text-5xl"
              >
                Bridging Theory and Practice in{" "}
                <span className="bg-clip-text text-transparent bg-linear-to-r from-teal-200 to-amber-200">
                  Islamic Finance
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="max-w-2xl space-y-6 text-lg leading-relaxed text-slate-300"
            >
              <p>
                The core of Islamic finance is built on fairness and
                transparency, yet the &apos;how-to&apos; can feel intimidating.
                Navigating the math behind Ijarah rent schedules or ensuring the
                structural integrity of a Sukuk requires a level of technical
                depth that often surprises newcomers.
              </p>
              <p>
                <strong>
                  IFFAS (Islamic Finance: Financial Analysis Study)
                </strong>{" "}
                was created to bridge the gap between textbook theory and
                real-world application. Built upon the comprehensive ACIFE
                curriculum, our mission is to make Islamic financial analysis
                accessible to everyone.
              </p>
              <p>
                We believe the best way to learn is by doing. That&apos;s why
                we&apos;ve transformed complex contracts into interactive
                simulators and calculators. Whether you&apos;re a student, a
                finance professional, or simply curious about Shariah-compliant
                banking, IFFAS is your hands-on sandbox to explore, calculate,
                and truly understand the mechanics of Islamic finance.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Visual Reinforcement / Educational Pillars */}
          <div className="relative mt-12 lg:col-span-5 lg:mt-0">
            <motion.div
              variants={itemVariants}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm"
            >
              <h3 className="mb-6 text-xl font-semibold text-white">
                The Learning Sandbox
              </h3>

              <ul className="space-y-6">
                {LEARNING_PILLARS.map((feature) => (
                  <li
                    key={feature.title}
                    className="group flex items-start gap-4"
                  >
                    <div className="rounded-lg border border-white/10 bg-white/5 p-3 transition-colors duration-300 group-hover:bg-white/10">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="mb-1 font-medium text-white">
                        {feature.title}
                      </h4>
                      <p className="text-sm leading-snug text-slate-400">
                        {feature.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Ambient Glow behind the card */}
            <div
              className="absolute -inset-0.5 -z-10 translate-x-4 translate-y-4 transform rounded-2xl bg-linear-to-br from-amber-400/20 to-teal-400/20 opacity-50 blur-2xl"
              aria-hidden="true"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

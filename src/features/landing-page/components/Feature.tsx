/**
 * ============================================================================
 * FEATURE: Landing Page
 * LAYER: UI Component (Client)
 * FILE: src/features/landing-page/components/Feature.tsx
 * ============================================================================
 * Renders the core pedagogical methodology of the IFFAS platform.
 * * BOUNDARY ENFORCEMENT:
 * Converted to a Client Component to support Framer Motion's `whileInView`
 * intersection observers and staggered entrance animations. Contains zero
 * financial logic.
 * ============================================================================
 */

"use client";

import Image from "next/image";
import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";

export interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const FEATURES_DATA: FeatureCardProps[] = [
  {
    title: "Interactive Laboratory",
    description:
      "Dive deep into the core mechanics of Shariah-compliant contracts through dynamic, visual simulators.",
    imageSrc: "/feature-contract.webp",
    imageAlt: "Visual representation of a Shariah-compliant contract",
  },
  {
    title: "Learn By Doing",
    description:
      "Move beyond theoretical definitions. Bridge the gap between Islamic finance principles and real-world execution with guided, hands-on practice.",
    imageSrc: "/feature-quiz.webp",
    imageAlt: "Illustration representing interactive learning and quizzes",
  },
  {
    title: "Practical Tools",
    description:
      "Apply your knowledge instantly. Explore comprehensive course modules and test your understanding using custom financial calculators.",
    imageSrc: "/feature-calculator.webp",
    imageAlt: "Illustration of a financial calculator for Islamic finance",
  },
];

// --- Animation Variants ---

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Staggers the card entrances
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const floatingImageVariants: Variants = {
  idle: { y: 0 },
  floating: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

/**
 * FeatureCard
 * Renders an individual methodology card highlighting a specific learning pillar.
 */
function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: FeatureCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      className={cn(
        "group relative isolate flex flex-col items-center justify-start overflow-hidden text-center",
        "rounded-2xl border border-brand-navy p-8 sm:p-10",
        "shadow-md shadow-slate-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl",
      )}
    >
      {/* Background Image Handling */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <Image
          src="/feature-background.webp"
          alt="Decorative background pattern"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover opacity-100 transition-transform duration-500 group-hover:scale-105"
          quality={75}
        />
      </div>

      {/* Foreground Feature Image with continuous floating animation */}
      <motion.div
        variants={floatingImageVariants}
        initial="idle"
        animate="floating"
        className="pointer-events-none relative mb-8 flex aspect-square w-48 items-center justify-center drop-shadow-md transition-transform duration-500 group-hover:scale-110 sm:w-56"
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={350}
          height={350}
          className="object-contain"
        />
      </motion.div>

      {/* Typography and Content Styling */}
      <div className="relative z-10 flex flex-col gap-3">
        <h3 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h3>
        <p className="text-base leading-relaxed text-slate-600">
          {description}
        </p>
      </div>
    </motion.article>
  );
}

/**
 * FeatureSection
 * Orchestrates the responsive grid layout introducing the IFFAS methodology.
 */
export function Feature() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="relative w-full bg-brand-cream py-24 overflow-hidden sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Animated Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
        >
          <h2
            id="features-heading"
            className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
          >
            The IFFAS Methodology
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A comprehensive, education-first platform designed to transform
            theoretical Shariah principles into practical, applicable knowledge.
          </p>
        </motion.div>

        {/* Animated Responsive Grid Architecture */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12"
        >
          {FEATURES_DATA.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              imageSrc={feature.imageSrc}
              imageAlt={feature.imageAlt}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

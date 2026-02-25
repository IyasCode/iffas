"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

interface HeroProps {
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Staggers the entrance of each child element
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function Hero({ className = "" }: HeroProps) {
  return (
    <section
      className={`relative flex min-h-screen w-full flex-col overflow-hidden ${className}`}
      aria-label="Hero Section"
    >
      <div className="relative flex w-full flex-1 flex-col md:flex-row">
        {/* Left Side: Parchment Background & Value Proposition */}
        <div className="relative flex w-full flex-1 justify-center md:justify-end">
          <Image
            src="/hero-bg-left-desktop.webp"
            alt="Textured parchment background"
            fill
            priority
            className="pointer-events-none object-cover object-center md:object-right"
            sizes="(max-width: 768px) 100vw, 60vw"
          />

          {/* Hero Value Proposition */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="relative z-30 flex h-full w-full max-w-3xl flex-col justify-center px-6 py-12 text-center md:p-8 md:pr-12 md:text-left lg:pr-16"
          >
            {/* Logos */}
            {/* Centered on mobile, left-aligned on desktop, scaled down heights for mobile */}
            <motion.div
              variants={itemVariants}
              className="relative mb-8 mt-16 flex flex-col items-center gap-5 sm:flex-row md:mb-10 md:justify-start"
            >
              <Image
                src="/hero-logo-desktop.webp"
                alt="IFFAS Logo"
                width={256}
                height={256}
                priority
                className="pointer-events-none h-36 w-auto object-contain drop-shadow-sm md:h-32"
              />
              <Image
                src="/hero-words-desktop.webp"
                alt="Islamic Finance: Financial Analysis Study"
                width={1200}
                height={160}
                priority
                className="pointer-events-none h-30 w-auto object-contain md:h-40"
              />
            </motion.div>

            {/* Headline with Highlighting */}
            <motion.h2
              variants={itemVariants}
              className="mx-auto max-w-2xl text-3xl font-medium leading-relaxed text-slate-800 dark:text-stone-100 md:mx-0 md:text-4xl"
            >
              <span className="relative inline-block font-serif text-2xl italic font-extrabold text-[#9f7706] after:absolute after:-bottom-1 after:left-0 after:h-0.75 after:w-full after:rounded-full sm:text-3xl md:text-4xl">
                Bridge the Gap Between Islamic Theory and Financial Reality.
              </span>{" "}
            </motion.h2>

            {/* Subheadline */}
            <motion.h4
              variants={itemVariants}
              className="mx-auto mt-6 max-w-xl font-serif text-base italic leading-relaxed text-[#202451] md:mx-0 md:text-lg lg:text-xl"
            >
              Move beyond definitions. Enter an Interactive Laboratory where you
              deep-dive into the mechanics of Shariah-compliant contracts. Learn
              by doing, not just by reading.
            </motion.h4>

            {/* CTA Buttons */}
            {/* Stack on very small screens, row on larger */}
            <motion.div
              variants={itemVariants}
              className="relative z-60 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start"
            >
              <Link
                href="#features"
                className="inline-block w-full rounded-md bg-blue-700 px-6 py-3 text-sm font-medium text-white shadow-lg transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-500 sm:w-auto"
              >
                Explore the Modules
              </Link>
              <Link
                href="#calculator"
                className="inline-block w-full rounded-md border border-slate-300 bg-white/80 px-6 py-3 text-sm font-medium text-slate-800 shadow-lg backdrop-blur-sm transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-stone-600 dark:bg-stone-800/80 dark:text-stone-100 dark:hover:bg-stone-700 sm:w-auto"
              >
                Try Ijarah Calculator
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Middle: Decorative Border (Hidden on mobile) */}
        <div className="pointer-events-none relative z-20 hidden w-15 shrink-0 shadow-[15px_0_20px_-5px_rgba(0,0,0,0.5)] md:block lg:w-20">
          <Image
            src="/hero-border-desktop.webp"
            alt="Decorative separator pattern"
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        {/* Right Side: Archway and Stock Chart (Hidden on mobile) */}
        {/* Added overflow-hidden here to contain the scaling image */}
        <div className="pointer-events-none relative z-10 hidden w-[45%] shrink-0 overflow-hidden md:block lg:w-[40%] xl:max-w-200">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.35, delay: 0.2, ease: "backIn" }}
            className="relative h-full w-full"
          >
            <Image
              src="/hero-bg-right-desktop.webp"
              alt="Islamic archway framing a financial candlestick chart"
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </motion.div>
        </div>
      </div>

      {/* Overlapping Element: Books (Hidden on mobile to prevent text overlap) */}
      <div className="pointer-events-none absolute bottom-5 right-[15%] z-20 hidden aspect-square w-120 md:block lg:right-[13%] lg:w-125">
        <Image
          src="/hero-books-desktop.webp"
          alt="Stack of open and closed books"
          fill
          className="object-contain object-bottom drop-shadow-xl"
          sizes="(max-width: 768px) 450px, 450px"
        />
      </div>

      {/* Bottom Void Space / Base Bar */}
      <div
        className="relative z-10 h-12 w-full shrink-0 bg-[#25435A] md:h-15 lg:h-24"
        aria-hidden="true"
      />
    </section>
  );
}

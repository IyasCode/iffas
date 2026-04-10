/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/InteractivePortal.tsx
 * ============================================================================
 * A leaf-node client component that handles the interactive animations
 * for the lesson portal image.
 * * ARCHITECTURE NOTE: We utilize Framer Motion (`motion.div`) instead of
 * CSS keyframes to prevent the "jump/snap" bug when a user un-hovers mid-bounce.
 * ============================================================================
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface InteractivePortalProps {
  isActive: boolean;
  title: string;
}

export function InteractivePortal({ isActive, title }: InteractivePortalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Define our distinct, physics-based animation states
  const portalVariants = {
    idle: {
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hovered: {
      y: -8,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    // Click Animation for Blue Portal (Shrink, Grow, Normalize)
    clickedActive: {
      scale: [1, 0.8, 1.1, 1],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    // Shake Animation for Gray Portal
    clickedInactive: {
      x: [0, -5, 5, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Determine the current active animation state dynamically based on isActive prop
  const currentAnimation = isClicked
    ? isActive
      ? "clickedActive"
      : "clickedInactive"
    : isHovered
      ? "hovered"
      : "idle";

  return (
    <button
      type="button"
      // preventing mobile taps from getting stuck in the "hovered" state.
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setIsHovered(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") setIsHovered(false);
      }}
      onClick={() => {
        setIsClicked(true);
        // Reset click state after the animation duration (500ms) so it can be triggered again
        setTimeout(() => setIsClicked(false), 500);
      }}
      aria-label={`Open lesson: ${title}`}
      className="group relative flex items-center justify-center w-20 h-20 shrink-0 md:w-30 md:h-30 appearance-none outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded-full"
    >
      {/* Framer Motion Wrapper for smooth animations */}
      <motion.div
        variants={portalVariants as any}
        animate={currentAnimation}
        className="relative flex items-center justify-center w-full h-full cursor-pointer"
      >
        {/* The Base SVG Framework */}
        <Image
          src={isActive ? "/portal-blue.svg" : "/portal-gray.svg"}
          alt=""
          fill
          sizes="(max-width: 120px) 100vw, 120px"
          className="object-contain relative z-10 pointer-events-none"
        />

        {/* The Glow Overlay (Masking Technique) */}
        <div
          className={cn(
            "absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 ease-in-out",
            "mask-[url('/glow.svg')] mask-contain mask-no-repeat mask-center",
            isHovered ? "opacity-40" : "opacity-0",
            isActive ? "bg-[#2AD4FF]" : "bg-[#B3B3B3]",
          )}
          aria-hidden="true"
        />
      </motion.div>
    </button>
  );
}

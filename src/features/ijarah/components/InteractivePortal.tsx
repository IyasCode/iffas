/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/InteractivePortal.tsx
 * ============================================================================
 * A leaf-node client component that handles the interactive animations
 * for the lesson portal image. It bridges user interaction with the Next.js routing layer.
 * * ARCHITECTURE NOTE: We utilize Framer Motion (`motion.div`) instead of
 * CSS keyframes to prevent the "jump/snap" bug when a user un-hovers mid-bounce.
 * ============================================================================
 */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";

interface InteractivePortalProps {
  isActive: boolean;
  title: string;
  lessonId: string;
}

export function InteractivePortal({
  isActive,
  title,
  lessonId,
}: InteractivePortalProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Strictly typed variants to prevent animation "snapping"
  const portalVariants: Variants = {
    idle: {
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    hovered: {
      y: -8,
      scale: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    // Click Animation for Blue Portal (Shrink, Grow, Normalize)
    clickedActive: {
      scale: [1, 0.8, 1.1, 1],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    // Shake Animation for Gray Portal
    clickedInactive: {
      x: [0, -5, 5, -5, 5, -5, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const handlePortalClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    // Reset click state after animation duration
    setTimeout(() => setIsClicked(false), 500);

    // Only route if the lesson is unlocked/active
    if (isActive) {
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("lessonId", lessonId);
        router.push(`?${params.toString()}`, { scroll: false });
      }, 600);
    }
  };

  return (
    <button
      type="button"
      onClick={handlePortalClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Open ${isActive ? "active" : "locked"} lesson: ${title}`}
      className={cn(
        "group relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-navy cursor-pointer",
        "w-20 h-20 md:w-32 md:h-32 shrink-0", // shrink-0 ensures the icon is NEVER squeezed
      )}
    >
      <motion.div
        variants={portalVariants}
        animate={
          isClicked
            ? isActive
              ? "clickedActive"
              : "clickedInactive"
            : isHovered
              ? "hovered"
              : "idle"
        }
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* The Base SVG Framework */}
        <Image
          src={isActive ? "/portal-blue.svg" : "/portal-gray.svg"}
          alt=""
          fill
          priority // Ensure navigation icons are prioritized during paint
          className="object-contain z-10"
          sizes="(max-width: 128px) 100vw, 128px"
        />

        {/* The Glow Overlay (Masking Technique) */}
        <div
          className={cn(
            "absolute inset-0 z-20 pointer-events-none transition-opacity duration-300",
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

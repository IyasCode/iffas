/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/InteractivePortal.tsx
 * ============================================================================
 * A leaf-node client component that handles the interactive animations
 * for the lesson portal image. It bridges user interaction with the Next.js routing layer.
 * * ARCHITECTURE NOTE:
 * - We utilize Framer Motion (`motion.div`) instead of
 * CSS keyframes to prevent the "jump/snap" bug when a user un-hovers mid-bounce.
 * - Utilizes Framer Motion's `useAnimate` hook to orchestrate the complex,
 * asynchronous 'JUST_UNLOCKED' choreography (Shake -> Scale -> Swap -> Settle),
 * which is impossible to manage cleanly via standard CSS keyframes.
 * ============================================================================
 */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";
import type { LessonStatus } from "../types/curriculum-types";

interface InteractivePortalProps {
  status: LessonStatus;
  title: string;
  lessonId: string;
}

export function InteractivePortal({
  status,
  title,
  lessonId,
}: InteractivePortalProps) {
  // 1. THE FIX: Create a local state that we can overwrite after the animation finishes
  const [localStatus, setLocalStatus] = useState<LessonStatus>(status);

  // Sync with parent prop if the user navigates to a completely new chapter
  useEffect(() => {
    setLocalStatus((prev) => {
      if (
        (prev === "ACTIVE" ||
          prev === "COMPLETED" ||
          prev === "JUST_UNLOCKED") &&
        status === "LOCKED"
      ) {
        return prev; // Ignore the static mock data trying to lock us
      }
      return status;
    });
  }, [status]);

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Drive the image strictly off the localStatus
  const [portalImage, setPortalImage] = useState(
    localStatus === "LOCKED" || localStatus === "JUST_UNLOCKED"
      ? "/portal-gray.svg"
      : "/portal-blue.svg",
  );

  const router = useRouter();
  const searchParams = useSearchParams();
  const [scope, animate] = useAnimate();

  // Determine interactivity based on the LOCAL status
  const isFunctionallyActive =
    localStatus === "ACTIVE" || localStatus === "COMPLETED";

  // --------------------------------------------------------------------------
  // ORCHESTRATION: The Unlock Choreography
  // --------------------------------------------------------------------------
  useEffect(() => {
    if (localStatus === "JUST_UNLOCKED") {
      const playUnlockSequence = async () => {
        // Step A: Shake
        await animate(
          scope.current,
          { x: [-5, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 5, -5, 0] },
          { duration: 1, ease: "easeInOut" },
        );

        // Step B: Scale up
        await animate(scope.current, { scale: 0.8 }, { duration: 0.1 });

        // Step B: Scale up
        await animate(scope.current, { scale: 1.2 }, { duration: 0.4 });

        // Step C: The Swap
        setPortalImage("/portal-blue.svg");
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Step D: Scale down
        await animate(
          scope.current,
          { scale: 1 },
          { duration: 0.4, type: "spring", bounce: 0.4 },
        );

        // Step E: THE UNLOCK! Convert the internal state so hovers and clicks work again.
        setLocalStatus("ACTIVE");
      };

      playUnlockSequence();
    } else {
      setPortalImage(
        localStatus === "LOCKED" ? "/portal-gray.svg" : "/portal-blue.svg",
      );
    }
  }, [localStatus, animate, scope]); // Ensure localStatus is the dependency here

  // --------------------------------------------------------------------------
  // STANDARD INTERACTION VARIANTS
  // --------------------------------------------------------------------------
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
      x: [0, -5, 5, -5, 5, -5, 5, -5, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const handlePortalClick = () => {
    if (isClicked || localStatus === "JUST_UNLOCKED") return;
    setIsClicked(true);

    // Reset click state after animation duration
    setTimeout(() => setIsClicked(false), 500);

    if (isFunctionallyActive) {
      setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("unlocked"); // ADD THIS LINE to clean up the URL
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
      aria-label={`Open ${localStatus} lesson: ${title}`}
      className={cn(
        "group relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-brand-navy cursor-pointer",
        "w-20 h-20 md:w-32 md:h-32 shrink-0",
      )}
    >
      <motion.div
        ref={scope}
        variants={portalVariants}
        // Free the animation state once localStatus becomes ACTIVE
        animate={
          localStatus === "JUST_UNLOCKED"
            ? undefined
            : isClicked
              ? isFunctionallyActive
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
          src={portalImage}
          alt=""
          fill
          priority
          className="object-contain z-10"
          sizes="(max-width: 128px) 100vw, 128px"
        />

        {/* The Glow Overlay */}
        <div
          className={cn(
            "absolute inset-0 z-20 pointer-events-none transition-opacity duration-300",
            "mask-[url('/glow.svg')] mask-contain mask-no-repeat mask-center",
            isHovered && localStatus !== "JUST_UNLOCKED"
              ? "opacity-40"
              : "opacity-0",
            portalImage === "/portal-blue.svg"
              ? "bg-[#2AD4FF]"
              : "bg-[#B3B3B3]",
          )}
          aria-hidden="true"
        />
      </motion.div>
    </button>
  );
}

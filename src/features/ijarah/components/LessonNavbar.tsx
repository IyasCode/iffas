/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/LessonNavbar.tsx
 * ============================================================================
 * A sticky navigation bar for the lesson overlay. Houses the exit mechanism
 * and the visual progress indicator.
 * * ARCHITECTURE NOTE: Built as a strictly "dumb" presentation component.
 * It accepts `progressPercentage` via props rather than calculating it
 * inline, adhering to the Unidirectional Data Flow mandate.
 * ============================================================================
 */

import { Progress } from "@/components/ui/progress";

interface LessonNavbarProps {
  progressPercentage: number;
  onClose: () => void;
}

export function LessonNavbar({
  progressPercentage,
  onClose,
}: LessonNavbarProps) {
  return (
    <header className="sticky top-0 z-50 px-6 py-4 bg-brand-cream border-b border-brand-light-gray shadow-sm">
      <div className="flex items-center justify-between sm:max-w-200 mx-auto">
        <button
          onClick={onClose}
          aria-label="Go back to chapter"
          className="p-2 transition-opacity hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-brand-navy rounded"
        >
          {/* CSS Masking is used to color the external SVG with your brand token */}
          <div
            className="w-6 h-6 bg-brand-navy"
            style={{
              maskImage: "url(/icon-back.svg)",
              WebkitMaskImage: "url(/icon-back.svg)",
              maskSize: "cover",
              WebkitMaskSize: "cover",
            }}
          />
        </button>

        <div className="flex-1 max-w-md mx-8">
          <Progress
            value={progressPercentage}
            // Targeting the inner indicator using Tailwind arbitrary variant for precise color control
            className="h-2 bg-brand-light-gray [&>div]:bg-brand-dark-navy transition-all duration-500 ease-in-out"
          />
        </div>

        <div className="font-bold text-brand-navy min-w-12 text-right text-lg">
          {progressPercentage}%
        </div>
      </div>
    </header>
  );
}

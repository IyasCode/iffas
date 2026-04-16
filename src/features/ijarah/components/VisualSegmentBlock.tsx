/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Presentation)
 * FILE: src/features/ijarah/components/VisualSegmentBlock.tsx
 * ============================================================================
 * Renders standard visual segments with optional narrative content.
 * ARCHITECTURE NOTE: Contains an optimized Next.js Image component with strict
 * aspect-ratio enforcement, ensuring consistent visual presentation across all
 * lessons.
 * ============================================================================
 */

import Image from "next/image";
import type { VisualSegment } from "../types/lesson";

interface VisualSegmentBlockProps {
  segment: VisualSegment;
}

export function VisualSegmentBlock({ segment }: VisualSegmentBlockProps) {
  return (
    <div className="py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Optimized Next.js Image with strict aspect-ratio */}
      <div className="relative w-full aspect-video overflow-hidden rounded-xl border-2 border-brand-light-gray shadow-md">
        <Image
          src={segment.imageSrc}
          alt={segment.altText}
          fill
          sizes="(max-width: 900px) 100vw, 900px"
          className="object-cover"
          priority
        />
      </div>
      {(segment.narrativeTitle || segment.narrativeContent) && (
        <div className="pl-6 py-2 border-l-4 border-brand-dark-navy bg-brand-cream/30">
          {segment.narrativeTitle && (
            <h4 className="font-bold text-brand-navy mb-1">
              {segment.narrativeTitle}
            </h4>
          )}
          <p className="text-brand-navy/80 italic leading-relaxed text-lg">
            {segment.narrativeContent}
          </p>
        </div>
      )}
    </div>
  );
}

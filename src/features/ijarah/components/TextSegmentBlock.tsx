/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Components (Client/Server)
 * FILE: src/features/ijarah/components/TextSegmentBlock.tsx
 * ============================================================================
 * Renders static text payloads, subpoints, and selectively mounts the
 * mathematical proof engine if dictated by the static payload.
 * ============================================================================
 */

import type { TextSegment } from "../types/lesson";
import { MathProofDrawer } from "./MathProofOverlay";

interface TextSegmentBlockProps {
  segment: TextSegment;
}

export function TextSegmentBlock({ segment }: TextSegmentBlockProps) {
  return (
    <div className="py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {segment.title && (
        <h2 className="mb-4 text-2xl font-bold text-brand-dark-navy">
          {segment.title}
        </h2>
      )}

      {/* Apply tabular-nums to ensure financial figures align correctly */}
      <p className="whitespace-pre-wrap leading-relaxed text-lg text-brand-navy/90 tabular-nums">
        {segment.content}
      </p>

      {/* Render the strongly-typed subpoints if they exist */}
      {segment.subpoints && segment.subpoints.length > 0 && (
        <ul className="mt-5 space-y-4 pl-6 list-disc marker:text-brand-light-navy">
          {segment.subpoints.map((point, index) => (
            <li
              key={index}
              className="text-lg text-brand-navy/90 leading-relaxed tabular-nums"
            >
              <span className="font-bold text-brand-dark-navy">
                {point.label}:{" "}
              </span>
              <span>{point.text}</span>
            </li>
          ))}
        </ul>
      )}

      {/* THE LATEX PROOF GATEWAY */}
      {segment.mathProof && (
        <div className="mt-4 border-t border-slate-100 pt-2">
          <MathProofDrawer config={segment.mathProof} />
        </div>
      )}
    </div>
  );
}

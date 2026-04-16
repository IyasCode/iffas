/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Presentation)
 * FILE: src/features/ijarah/components/TextSegmentBlock.tsx
 * ============================================================================
 * Renders standard text segments and optional structured bullet points.
 * ARCHITECTURE NOTE: Contains a safe string-parsing utility to bold text
 * preceding the first colon, mitigating the risks of magic-string parsing.
 * ============================================================================
 */

import type { TextSegment } from "../types/lesson";

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
    </div>
  );
}

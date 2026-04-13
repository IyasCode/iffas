/**
 * ============================================================================
 * FEATURE: Ijarah
 * LAYER: UI Component (Client)
 * FILE: src/features/ijarah/components/LessonSegmentRenderer.tsx
 * ============================================================================
 * A switch-based router component that maps specific discriminated union
 * segment types (`TEXT`, `VISUAL`, `QUIZ`) to their respective DOM structures.
 * * ARCHITECTURE NOTE: Utilizes a TypeScript exhaustive check
 * (`const _exhaustiveCheck: never`) in the default case. This guarantees
 * a hard compilation failure if a new segment type is ever added to the
 * domain model without a corresponding UI renderer being built here.
 * ============================================================================
 */

import Image from "next/image";
import type { LessonSegment } from "../types/lesson";
import { KnowledgeCheck } from "./KnowledgeCheck";

interface LessonSegmentRendererProps {
  segment: LessonSegment;
  isSolved: boolean;
  onAnswerQuiz: (segmentId: string, isCorrect: boolean) => void;
}

export function LessonSegmentRenderer({
  segment,
  isSolved,
  onAnswerQuiz,
}: LessonSegmentRendererProps) {
  switch (segment.type) {
    case "TEXT":
      return (
        <div className="py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {segment.title && (
            <h2 className="mb-4 text-2xl font-bold text-brand-dark-navy">
              {segment.title}
            </h2>
          )}
          <p className="whitespace-pre-wrap leading-relaxed text-lg text-brand-navy/90">
            {segment.content}
          </p>
        </div>
      );

    case "VISUAL":
      return (
        <div className="py-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
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

    case "QUIZ":
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <KnowledgeCheck
            segment={segment}
            isSolved={isSolved}
            onAnswer={onAnswerQuiz}
          />
        </div>
      );

    default:
      // Exhaustive check to ensure all union types are handled
      const _exhaustiveCheck: never = segment;
      return null;
  }
}

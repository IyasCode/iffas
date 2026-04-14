/**
 * ============================================================================
 * FEATURE: Ijarah | LAYER: Next.js App Router (Server Component)
 * FILE: src/app/(modules)/ijarah/[slug]/page.tsx
 * ============================================================================
 * Dynamic orchestrator for all Ijarah curriculum chapters.
 * It strictly adheres to Core Directive 2 (Server-First Hierarchy), passing
 * static chapter data down to the presentation components via props.
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { getIjarahChapterData } from "@/features/ijarah/utils/chapters-data";
import { getIjarahLessonData } from "@/features/ijarah/utils/lesson-data-mapper";
import { ChapterMenu } from "@/features/ijarah/components/ChapterMenu";
import { LessonOverlay } from "@/features/ijarah/components/LessonOverlay";

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}

export default async function IjarahChapterPage({
  params,
  searchParams,
}: ChapterPageProps) {
  const { slug } = await params;
  const { lessonId } = await searchParams;

  // Fetch chapter configuration for the main menu
  const chapterData = getIjarahChapterData(slug);
  if (!chapterData) notFound();

  // Fetch specific lesson data if an overlay is requested via ?lessonId=
  const activeLessonData = lessonId ? getIjarahLessonData(lessonId) : null;

  return (
    <div className="relative min-h-screen bg-brand-cream">
      {/* Zero-bundle Server Component rendering the main navigation */}
      <ChapterMenu
        chapterTitle={chapterData.title}
        lessons={chapterData.lessons}
      />

      {/* 
        We always render the overlay and let the Client Component manage 
        the cached state to preserve the slide-out exit animation. 
      */}
      <LessonOverlay lesson={activeLessonData || null} />
    </div>
  );
}

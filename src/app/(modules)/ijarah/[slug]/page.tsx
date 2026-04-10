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
import { ChapterMenu } from "@/features/ijarah/components/ChapterMenu";

interface ChapterPageProps {
  params: Promise<{ slug: string }>;
}

export default async function IjarahChapterPage({ params }: ChapterPageProps) {
  // 1. Resolve the params promise to extract the slug for dynamic routing
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 2. Fetch the specific chapter data using the slug as the key from the centralized data dictionary
  const chapterData = getIjarahChapterData(slug);

  // 3. The 404 Fallback Gatekeeper
  // If the user navigates to a chapter that doesn't exist (e.g., /ijarah/chapter-99),
  // immediately return the Next.js notFound() boundary as per architectural rules.
  if (!chapterData) {
    notFound();
  }

  // 4. Render the page using Component Composition (Passing data down via props)
  return (
    <ChapterMenu
      chapterTitle={chapterData.title}
      lessons={chapterData.lessons}
    />
  );
}

/**
 * ============================================================================
 * FEATURE: Ijarah | LAYER: Next.js Route Orchestrator
 * FILE: src/app/(modules)/ijarah/[slug]/page.tsx
 * ============================================================================
 * Dynamic route orchestrator for Ijarah sub-lessons and chapter menus.
 * ============================================================================
 */

import { notFound } from "next/navigation";
import { ChapterMenu } from "@/features/ijarah/components/ChapterMenu";

interface IjarahSlugPageProps {
  params: Promise<{ slug: string }>;
}

export default async function IjarahSlugPage({ params }: IjarahSlugPageProps) {
  // Await the asynchronous params object
  const { slug } = await params;

  // Intercept the specific Chapter 1 intent
  if (slug === "chapter-1") {
    return <ChapterMenu />;
  }

  // Fallback: If a student tries to access an unmapped curriculum node,
  // structurally guide them to the custom 404 boundary (not-found.tsx)
  notFound();
}

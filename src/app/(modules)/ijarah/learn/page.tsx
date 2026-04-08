/**
 * ============================================================================
 * FEATURE: Ijarah | LAYER: Next.js App Router (Server Component)
 * FILE: src/app/(modules)/ijarah/learn/page.tsx
 * ============================================================================
 * Orchestrates the educational curriculum landing page for the Ijarah module.
 * Completely static rendering (Zero-Bundle JavaScript to the client).
 * ============================================================================
 */

import { IjarahCurriculumHero } from "@/features/ijarah/components/IjarahCurriculumHero";
import { CurriculumTimeline } from "@/features/ijarah/components/CurriculumTimeline";

export default function IjarahLearnPage() {
  return (
    <main className="min-h-screen bg-brand-cream py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto space-y-12">
        <IjarahCurriculumHero />
        <CurriculumTimeline />
      </div>
    </main>
  );
}

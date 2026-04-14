/**
 * ============================================================================
 * ROUTE: src/app/(modules)/ijarah/page.tsx
 * ============================================================================
 * Serves as the primary entry point and curriculum dashboard for the Ijarah module.
 * ARCHITECTURE NOTE: This is a React Server Component (RSC). It fetches no dynamic
 * state and ships zero JavaScript to the client for this grid layout.
 * ============================================================================
 */

import { IJARAH_MODULE_CARDS } from "@/features/ijarah/utils/module-cards-config";
import { ModuleCard } from "@/features/ijarah/components/ModuleCard";

export default function IjarahHomePage() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-4 md:p-4">
      {/* Header Container */}
      <div className="mb-12 text-center">
        {/* As requested, the subtitle text has been entirely removed. */}
        <h1 className="text-[48px] font-black text-brand-navy uppercase tracking-tight animate-in fade-in duration-1000 ease-out">
          IJARAH
        </h1>
      </div>

      {/* 2x2 CSS Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {IJARAH_MODULE_CARDS.map((cardData, index) => (
          <ModuleCard key={cardData.id} card={cardData} index={index} />
        ))}
      </div>
    </div>
  );
}

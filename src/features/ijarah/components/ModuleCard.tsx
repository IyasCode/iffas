/**
 * ============================================================================
 * FEATURE: Ijarah Module | LAYER: Presentation UI
 * FILE: src/features/ijarah/components/ModuleCard.tsx
 * ============================================================================
 * Renders a highly tactile, Neumorphic module card.
 * ARCHITECTURE NOTE: This is a purely presentational ("dumb") component.
 * It uses a Tailwind `group` to synchronize the card hover state with the
 * action link's arrow translation, entirely avoiding React state for animations.
 * ============================================================================
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ModuleCardData } from "../types/module-card";
import { cn } from "@/lib/utils/cn";

export function ModuleCard({ card }: { card: ModuleCardData }) {
  return (
    <Link
      href={card.href}
      className={cn(
        "group flex flex-col justify-between bg-white rounded-3xl p-4 border-2 border-brand-navy",
        "border-2 border-transparent shadow-neumorphic-idle transition-all duration-300 ease-in-out",
        "hover:-translate-y-1 hover:border-brand-navy hover:shadow-neumorphic-active",
        "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-brand-navy",
      )}
      aria-label={`Maps to ${card.title} module`}
    >
      {/* --- Top Zone: Icon & Title --- */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {/* CSS Mask implementation for dynamically coloring public SVGs */}
        <div
          className="w-15 h-15 bg-brand-navy"
          style={{
            maskImage: `url(${card.icon})`,
            maskSize: "contain",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskImage: `url(${card.icon})`,
            WebkitMaskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
          }}
          aria-hidden="true"
        />

        <h2 className="text-[40px] font-heading font-bold text-brand-navy leading-none">
          {card.title}
        </h2>
      </div>

      {/* --- Middle Zone: Contextual Metadata & Description --- */}
      <div className="flex-1 flex flex-col mb-8">
        <div className="mb-4 min-h-7">
          {card.metadata.type === "progress" ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-end">
                <span className="text-sm font-bold text-brand-navy">
                  {card.metadata.percentComplete}% Complete
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-navy rounded-full transition-all duration-500"
                  style={{ width: `${card.metadata.percentComplete}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {card.metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border-2 border-brand-navy rounded-full text-sm font-bold text-brand-navy"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <p className="text-base text-brand-navy leading-relaxed font-normal">
          {card.description}
        </p>
      </div>

      {/* --- Bottom Zone: Action Link & Divider --- */}
      <div className="pt-2 border-t-2 border-brand-navy">
        <div className="inline-flex items-center gap-2 text-brand-navy font-bold text-lg">
          {card.actionText}
          <ArrowRight
            className="w-5 h-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}

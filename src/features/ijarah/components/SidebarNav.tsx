/**
 * ============================================================================
 * FEATURE: Ijarah Module | LAYER: Presentation / Interactive UI
 * FILE: src/features/ijarah/components/SidebarNav.tsx
 * ============================================================================
 * Renders the strictly typed curriculum navigation sidebar.
 * Implements of the UI/UX prescription:
 * - Headless UI (Shadcn Accordion) for accessible expanding/collapsing.
 * - Split hit-targets to ensure standard <Link> navigation alongside chevron toggling.
 * - Strict dynamic styling based on the active route (usePathname).
 * ============================================================================
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IJARAH_NAV_CONFIG } from "../utils/nav-config";
import { cn } from "@/lib/utils/cn";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav
      className="w-full flex flex-col gap-2"
      aria-label="Ijarah Curriculum Navigation"
    >
      <Accordion type="multiple" className="w-full">
        {IJARAH_NAV_CONFIG.map((item) => {
          // Determine if we are anywhere within this section's sub-routes
          const isItemActive = pathname.startsWith(item.href);
          const isHeader = item.title === "Ijarah";

          return (
            <AccordionItem
              value={item.title}
              key={item.title}
              className="border-none"
            >
              <div
                className={cn(
                  "flex items-center w-full min-h-11 transition-colors group rounded-md mt-1",
                  "hover:bg-brand-dark-navy hover:cursor-pointer hover:font-bold",
                  isItemActive
                    ? "bg-brand-dark-navy text-brand-yellow font-bold"
                    : "text-white",
                )}
              >
                {/* The Navigational Link (Takes up maximum available space for easy tapping) */}
                <Link
                  href={item.href}
                  className="flex-1 flex items-center p-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-yellow rounded-l-md"
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 transition-colors",
                      isItemActive ? "stroke-brand-yellow" : "stroke-white",
                      isHeader && "invisible",
                    )}
                  />
                  <span
                    className={cn(
                      "font-arial-hebrew tracking-wide text-[18px]",
                      isHeader && "text-[28px] font-bold",
                    )}
                  >
                    {item.title}
                  </span>
                </Link>

                {/* The Accordion Toggle (Isolated click target for the Chevron) */}
                {item.subItems && item.subItems.length > 0 && (
                  <AccordionTrigger
                    aria-label={`Toggle ${item.title} sub-menu`}
                    className={cn(
                      "p-3 flex-none hover:no-underline rounded-r-md",
                      // Override standard Shadcn animations: point right (>) when closed, down (v) when open
                      "[&[data-state=closed]>svg]:-rotate-90 [&[data-state=open]>svg]:rotate-0",
                    )}
                  >
                    {/* Children intentionally left empty so ONLY the default Shadcn chevron renders here */}
                  </AccordionTrigger>
                )}
              </div>

              {/* Sub-Item Rendering */}
              {item.subItems && (
                <AccordionContent className="pb-0 pt-1">
                  <div className="flex flex-col space-y-1 ml-4 pl-4 border-l border-white/50">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;

                      return (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className={cn(
                            "relative flex items-center min-h-10 pl-4 pr-3 py-2 transition-colors",
                            "hover:bg-brand-dark-navy hover:cursor-pointer hover:font-bold rounded-r-md",
                            "font-arial-hebrew text-[16px]",
                            isSubActive
                              ? "bg-brand-dark-navy text-brand-yellow font-bold"
                              : "text-white",
                          )}
                        >
                          {/* The Thin "D-Shape" Active Indicator */}
                          {isSubActive && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-5/6 bg-brand-yellow rounded-r-full" />
                          )}
                          {sub.title}
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </nav>
  );
}

/**
 * ============================================================================
 * FEATURE: Ijarah Module
 * LAYER: Presentation / Interactive UI
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
import { useMemo } from "react";
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

  // Normalize current path to prevent trailing slash bugs
  const currentPath = pathname.replace(/\/$/, "") || "/";

  // Automatically expand the accordion group if the user is inside a sub-route
  const defaultExpanded = useMemo(() => {
    const activeItem = IJARAH_NAV_CONFIG.find((item) => {
      const itemPath = (item.href || "").replace(/\/$/, "") || "/";
      const isIjarahRoot = item.title.toLowerCase().includes("ijarah");

      const isRootActive = isIjarahRoot
        ? currentPath === itemPath
        : currentPath.startsWith(itemPath);

      const isSubActive = item.subItems?.some((sub) =>
        currentPath.startsWith((sub.href || "").replace(/\/$/, "")),
      );

      return isRootActive || isSubActive;
    });
    return activeItem ? [activeItem.title] : [];
  }, [currentPath]);

  return (
    <nav
      className="w-full flex flex-col gap-2 transform-gpu backdrop-blur-none"
      aria-label="Ijarah Curriculum Navigation"
    >
      <Accordion
        type="multiple"
        defaultValue={defaultExpanded}
        className="w-full"
      >
        {IJARAH_NAV_CONFIG.map((item) => {
          const itemPath = (item.href || "").replace(/\/$/, "") || "/";
          const isIjarahRoot = item.title.toLowerCase().includes("ijarah");

          // 1. ACTIVE STATE LOGIC:
          // The main "Ijarah" button MUST be an exact match to prevent it from
          // staying active when clicking "Learn" (/ijarah/learn).
          // The other 4 buttons use startsWith so they stay active if you go to sub-pages.
          const isExactMatch = currentPath === itemPath;
          const isPrefixMatch = currentPath.startsWith(itemPath + "/");

          const isItemActive = isIjarahRoot
            ? isExactMatch
            : isExactMatch || isPrefixMatch;

          return (
            <AccordionItem
              value={item.title}
              key={item.title}
              className="border-none"
            >
              <div
                className={cn(
                  "flex items-stretch w-full min-h-11 transition-colors group rounded-md mt-1 relative",
                  "hover:bg-brand-dark-navy",
                  isItemActive ? "bg-brand-dark-navy" : "",
                )}
              >
                {/* 2. D-SHAPE LOGIC: 
                  Applied ONLY to the main "Ijarah" button when active.
                  Explicitly excludes the other 4 top-level buttons. 
                */}
                {isItemActive && isIjarahRoot && (
                  <div className="absolute left-px top-1/2 -translate-y-1/2 w-1.5 h-7/8 bg-brand-yellow rounded-r-full" />
                )}

                {/* The Navigational Link */}
                <Link
                  href={item.href}
                  className={cn(
                    "flex-1 flex items-center outline-none focus-visible:ring-2 focus-visible:ring-brand-dark-yellow rounded-l-md",
                    isIjarahRoot ? "p-1 justify-center" : "p-3",
                  )}
                >
                  {/* 3. ICON LOGIC:
                    Rendered for the 4 buttons (Learn, Practice, etc.).
                    Hidden for the "Ijarah" button as it relies on the D-Shape.
                  */}
                  {item.icon && !isIjarahRoot && (
                    <item.icon
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isItemActive
                          ? "stroke-brand-yellow text-brand-yellow"
                          : "stroke-white text-white",
                      )}
                    />
                  )}

                  <span
                    className={cn(
                      "font-arial-hebrew tracking-wide transition-colors antialiased",
                      isIjarahRoot
                        ? "text-[32px] text-center font-bold"
                        : "text-[18px]",
                      isItemActive
                        ? "text-brand-yellow font-bold"
                        : "text-white group-hover:font-bold",
                    )}
                  >
                    {item.title}
                  </span>
                </Link>

                {/* The Accordion Toggle (Isolated hit target for Chevron) */}
                {item.subItems && item.subItems.length > 0 && (
                  <AccordionTrigger
                    aria-label={`Toggle ${item.title} sub-menu`}
                    className={cn(
                      "flex flex-none items-center justify-center px-4 py-0 hover:no-underline rounded-r-md outline-none",
                      "focus-visible:ring-2 focus-visible:ring-brand-dark-yellow",
                      "text-slate-400 hover:text-white data-[state=open]:text-brand-yellow",
                    )}
                  />
                )}
              </div>

              {/* Sub-Item Rendering */}
              {item.subItems && (
                <AccordionContent className="pb-0 pt-1">
                  <div className="flex flex-col space-y-1 ml-4 pl-4 border-l border-white/20">
                    {item.subItems.map((sub) => {
                      const subPath =
                        (sub.href || "").replace(/\/$/, "") || "/";
                      const isSubActive = currentPath === subPath;

                      return (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className={cn(
                            "relative flex items-center min-h-10 pl-4 pr-3 py-2 transition-colors antialiased",
                            "hover:bg-brand-dark-navy hover:cursor-pointer hover:font-bold rounded-r-md",
                            "font-arial-hebrew text-[16px]",
                            isSubActive
                              ? "bg-brand-dark-navy text-brand-yellow font-bold"
                              : "text-slate-300",
                          )}
                        >
                          {/* D-Shape for Sub-Sections */}
                          {isSubActive && (
                            <div className="absolute -left-px top-1/2 -translate-y-1/2 w-0.75 h-5/6 bg-brand-yellow rounded-r-full" />
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

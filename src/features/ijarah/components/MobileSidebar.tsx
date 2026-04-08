/**
 * ============================================================================
 * FEATURE: Ijarah Module | LAYER: Presentation / Layout Shell
 * FILE: src/features/ijarah/components/MobileSidebar.tsx
 * ============================================================================
 * Orchestrates the mobile-first navigation wrapper.
 * Utilizes Shadcn <Sheet> primitive to slide out the SidebarNav on small viewports
 * without duplicating the complex state mapping logic of the sidebar itself.
 * ============================================================================
 */

"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "./SidebarNav";
import { cn } from "@/lib/utils/cn";

export function MobileSidebar() {
  return (
    <header className="sticky top-0 z-50 flex md:hidden items-center justify-between p-4 bg-brand-navy text-white border-b border-slate-800">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-brand-dark-navy focus:ring-brand-dark-yellow focus:ring-offset-slate-900"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className={cn(
              "bg-brand-navy border-brand-light-navy p-0 w-[280px] flex flex-col",
              // Target and style the default Shadcn injected close button
              "[&>button]:text-slate-400 hover:[&>button]:text-white [&>button]:focus:ring-brand-dark-yellow [&>button]:focus:ring-offset-slate-900",
            )}
          >
            <SheetTitle className="sr-only">Ijarah Navigation Menu</SheetTitle>

            {/* Pinned Header inside the Drawer */}
            <div className="flex justify-center items-center p-3 bg-brand-light-navy border-b border-brand-light-navy shrink-0 ">
              <Image
                src="/nav-logo.webp"
                alt="IFFAS Logo"
                width={200}
                height={110}
                className="w-auto h-16"
              />
            </div>

            {/* Scrollable Navigation Area reusing the desktop scrollbar track */}
            <div className="flex-1 p-4 overflow-y-auto sidebar-scroll">
              <SidebarNav />
            </div>
          </SheetContent>
        </Sheet>

        <Image
          src="/nav-logo.webp"
          alt="IFFAS Logo"
          width={100}
          height={40}
          className="w-auto h-6"
        />
      </div>

      <Button
        variant="outline"
        size="sm"
        className="border-brand-dark-yellow text-brand-dark-yellow hover:bg-brand-dark-yellow hover:text-slate-900 transition-colors"
      >
        Log In
      </Button>
    </header>
  );
}

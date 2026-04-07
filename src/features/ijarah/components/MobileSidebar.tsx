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

export function MobileSidebar() {
  return (
    <header className="flex md:hidden items-center justify-between p-4 bg-brand-navy text-white border-b border-slate-800">
      <div className="flex items-center gap-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-slate-800"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-brand-navy border-r-slate-800 p-0 w-70"
          >
            <SheetTitle className="sr-only">Ijarah Navigation Menu</SheetTitle>

            <div className="p-6 border-b border-slate-800">
              <Image
                src="/nav-logo.webp"
                alt="IFFAS Logo"
                width={100}
                height={40}
                className="w-auto h-8"
              />
            </div>

            <div className="p-4 overflow-y-auto">
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

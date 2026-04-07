import { ReactNode } from "react";
import type { Metadata } from "next";
import { SidebarNav } from "@/features/ijarah/components/SidebarNav";
import { MobileSidebar } from "@/features/ijarah/components/MobileSidebar";

/**
 * ============================================================================
 * ROUTE: src/app/(modules)/ijarah/layout.tsx
 * ============================================================================
 * Enforces the Next.js 16 nested layout paradigm (Core Directive 2).
 * Orchestrates the responsive grid: Mobile Header vs. Persistent Desktop Sidebar.
 * ============================================================================
 */

export const metadata: Metadata = {
  title: "Ijarah — Courses",
  description: "Layout for course ijarah pages",
};

export default function IjarahLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <MobileSidebar />
      <aside className="hidden md:flex w-56 flex-col bg-brand-navy border-r border-slate-800 p-1.5 sticky top-0 h-screen overflow-y-auto sidebar-scroll">
        <div className="mb-8 pl-3 pt-2">
          <h1 className="font-arial-hebrew text-3xl font-bold text-white tracking-wide">
            Ijarah
          </h1>
        </div>
        <SidebarNav />
      </aside>

      <main className="flex-1 overflow-y-auto p-2 md:p-4 bg-brand-dark-cream">
        {children}
      </main>
    </div>
  );
}

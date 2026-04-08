import { ReactNode } from "react";
import type { Metadata } from "next";
import { SidebarNav } from "@/features/ijarah/components/SidebarNav";
import { MobileSidebar } from "@/features/ijarah/components/MobileSidebar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ijarah — Module",
  description: "Layout for ijarah module pages",
};

export default function IjarahLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      <MobileSidebar />

      {/* Aligned Desktop Sidebar structurally matching Mobile Sheet Content 
        w-[280px], bg-brand-navy, flex-col, sticky
      */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col bg-brand-navy border-r border-slate-300 sticky top-0 h-screen overflow-hidden">
        {/* Pinned Header matching the MobileSidebar exactly */}
        <div className="flex justify-center items-center p-3 bg-brand-light-navy border-b border-brand-light-navy shrink-0">
          <Image
            src="/nav-logo.webp"
            alt="IFFAS Logo"
            width={250}
            height={137}
            className="w-auto h-16"
            priority
          />
        </div>

        {/* Scrollable Navigation Area */}
        <div className="flex-1 p-4 overflow-y-auto sidebar-scroll">
          <SidebarNav />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-2 md:p-4 bg-brand-dark-cream">
        {children}
      </main>
    </div>
  );
}

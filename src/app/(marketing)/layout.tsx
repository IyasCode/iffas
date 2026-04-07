import { ReactNode } from "react";
import { Navbar } from "@/components/shared/Navbar";

/**
 * ============================================================================
 * ROUTE: src/app/(marketing)/layout.tsx
 * ============================================================================
 * Applies the marketing-specific shell (Navbar, Footer) to all public pages.
 * These components will NOT render on any route inside (modules).
 * ============================================================================
 */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}

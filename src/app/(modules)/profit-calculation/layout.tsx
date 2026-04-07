import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profit Calculation — Courses",
  description: "Layout for course profit calculation pages",
};

type Props = {
  children: React.ReactNode;
};

export default function ProfitCalculationLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mudarabah — Courses",
  description: "Layout for course mudarabah pages",
};

type Props = {
  children: React.ReactNode;
};

export default function MudarabahLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sukuk — Courses",
  description: "Layout for course sukuk pages",
};

type Props = {
  children: React.ReactNode;
};

export default function SukukLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

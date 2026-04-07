import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Murabahah — Courses",
  description: "Layout for course murabahah pages",
};

type Props = {
  children: React.ReactNode;
};

export default function MurabahahLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

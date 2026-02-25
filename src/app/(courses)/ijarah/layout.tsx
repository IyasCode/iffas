import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ijarah — Courses",
  description: "Layout for course ijarah pages",
};

type Props = {
  children: React.ReactNode;
};

export default function IjarahLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

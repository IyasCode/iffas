import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Musharakah — Courses",
  description: "Layout for course musharakah pages",
};

type Props = {
  children: React.ReactNode;
};

export default function MusharakahLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

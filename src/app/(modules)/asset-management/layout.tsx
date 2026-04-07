import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset Management — Courses",
  description: "Layout for course asset management pages",
};

type Props = {
  children: React.ReactNode;
};

export default function AssetManagementLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

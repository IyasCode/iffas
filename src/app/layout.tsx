import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IFFAS | Islamic Finance: Financial Analysis Study",
  description:
    "Educational platform for Islamic financial concepts and calculators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Set the body to flex column and minimum screen height to push footers down naturally if added later */}
      <body className="antialiased flex flex-col min-h-screen">
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — IFFAS",
  description: "Learn about IFFAS, our mission, values, and team.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-50 to-indigo-50 p-8 box-border">
      <div className="max-w-180 w-full text-center p-12 rounded-xl bg-white shadow-lg border border-slate-100">
        <div aria-hidden className="text-[48px] leading-none mb-3">
          🚧
        </div>
        <h1 className="m-0 text-[32px] text-white">Coming soon</h1>
        <p className="mt-2 text-slate-500">
          The About page is under construction. Check back soon for updates.
        </p>
      </div>
    </main>
  );
}

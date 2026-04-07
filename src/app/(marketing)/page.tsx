import { Feature } from "@/features/landing-page/components/Feature";
import { Hero } from "@/features/landing-page/components/Hero";
import { AboutUs } from "@/features/landing-page/components/AboutUs";
import { Module } from "@/features/landing-page/components/Module";

export default function Home() {
  return (
    <div className="bg-white dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
      <main>
        <Hero />
        <Feature />
        <AboutUs />
        <Module />
      </main>
    </div>
  );
}

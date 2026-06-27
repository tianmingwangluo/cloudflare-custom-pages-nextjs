"use client";

import { Hero } from "@/components/home/Hero";
import HomeFooter from "@/components/home/HomeFooter";
import { CardSection } from "@/components/home/ui/card-section";
import { useLocale } from "@/components/i18n/use-locale";
import { getSections } from "@/config/home";

export default function Home() {
  const locale = useLocale();
  const sections = getSections(locale);

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8f5] text-zinc-950 dark:bg-[#0d0f0c] dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Hero />

        <div className="my-10 h-px bg-zinc-200 dark:bg-zinc-800" />

        <section className="grid gap-4 lg:grid-cols-3">
          {sections.map((section) => (
            <CardSection key={section.title} {...section} />
          ))}
        </section>
      </main>
      <HomeFooter />
    </div>
  );
}

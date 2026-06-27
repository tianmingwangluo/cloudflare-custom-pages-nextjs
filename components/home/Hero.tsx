"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import { translate } from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { clsx as cx } from "clsx";
import Head from "next/head";

export function Hero({ className }: { className?: string }) {
  const locale = useLocale();
  const title = translate(siteConfig.name, locale);

  return (
    <header className={cx("mx-auto max-w-3xl text-center", className)}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={translate(siteConfig.description, locale)} />
      </Head>

      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Icon name="shield" className="h-7 w-7 text-zinc-800 dark:text-zinc-100" />
      </div>

      <h1 className="text-3xl font-semibold leading-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
        {title}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-300">
        {translate(siteConfig.description, locale)}
      </p>
    </header>
  );
}

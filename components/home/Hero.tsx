import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { clsx as cx } from "clsx";

export function Hero({ className }: { className?: string }) {
  return (
    <header className={cx("mx-auto max-w-3xl text-center", className)}>
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <Icon name="shield" className="h-7 w-7 text-zinc-800 dark:text-zinc-100" />
      </div>

      <h1 className="text-3xl font-semibold leading-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
        {siteConfig.name}
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-zinc-600 sm:text-lg dark:text-zinc-300">
        {siteConfig.description}
      </p>
    </header>
  );
}

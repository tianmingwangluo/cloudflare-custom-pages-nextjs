"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import { clsx as cx } from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { FC } from "react";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";
  const label = isDark
    ? locale === "zh"
      ? "切换到浅色模式"
      : "Switch to light mode"
    : locale === "zh"
      ? "切换到深色模式"
      : "Switch to dark mode";

  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
    >
      {mounted && isDark ? (
        <Icon name="sun" className="h-4 w-4" />
      ) : (
        <Icon name="moon" className="h-4 w-4" />
      )}
    </button>
  );
};

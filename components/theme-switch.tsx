"use client";

import { Icon } from "@/components/ui/icon";
import { clsx as cx } from "clsx";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { FC } from "react";

export interface ThemeSwitchProps {
  className?: string;
}

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ className }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={cx(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-50",
        className,
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
    >
      {mounted && isDark ? (
        <Icon name="sun" className="h-4 w-4" />
      ) : (
        <Icon name="moon" className="h-4 w-4" />
      )}
    </button>
  );
};

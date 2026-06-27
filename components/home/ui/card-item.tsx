"use client";

import { Icon } from "@/components/ui/icon";
import type { ColorClasses, Page } from "@/config/home";
import { clsx as cx } from "clsx";

interface CardItemProps {
  page: Page;
  classes: ColorClasses;
}

export const CardItem = ({ page, classes }: CardItemProps) => {
  return (
    <a
      href={page.path}
      className={cx(
        "group flex min-h-12 items-center justify-between gap-3 rounded-md border border-transparent px-3 py-2.5 transition-colors",
        classes.itemBg,
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={cx(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md ring-1",
            classes.iconBg,
          )}
        >
          {page.icon && (
            <Icon
              name={page.icon}
              className={cx("h-4 w-4", classes.iconText)}
            />
          )}
        </div>
        <span className="min-w-0 truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
          {page.title}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {page.code && (
          <span
            className={cx(
              "rounded-md px-2 py-1 font-mono text-xs",
              classes.codeBg,
              classes.codeText,
            )}
          >
            {page.code}
          </span>
        )}
        <Icon
          name="arrow-right"
          className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 dark:text-zinc-500"
        />
      </div>
    </a>
  );
};

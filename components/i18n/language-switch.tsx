"use client";

import {
  setPreferredLocale,
  useLocale,
} from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import {
  commonTranslations,
  translate,
  type Locale,
  type Localized,
} from "@/config/i18n";
import { clsx as cx } from "clsx";
import type { FC } from "react";

interface LanguageOption {
  value: Locale;
  label: string;
  ariaLabel: Localized<string>;
}

const languageOptions: LanguageOption[] = [
  {
    value: "en",
    label: "EN",
    ariaLabel: commonTranslations.switchToEnglish,
  },
  {
    value: "zh",
    label: "中",
    ariaLabel: commonTranslations.switchToChinese,
  },
];

export interface LanguageSwitchProps {
  className?: string;
}

export const LanguageSwitch: FC<LanguageSwitchProps> = ({ className }) => {
  const locale = useLocale();

  return (
    <div
      role="group"
      aria-label={translate(commonTranslations.languageSwitch, locale)}
      className={cx(
        "inline-flex h-9 shrink-0 items-stretch overflow-hidden rounded-md border border-zinc-200 bg-white text-xs font-medium shadow-sm dark:border-zinc-800 dark:bg-zinc-950",
        className,
      )}
    >
      <span className="flex w-9 items-center justify-center border-r border-zinc-200 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <Icon name="languages" className="h-4 w-4" aria-hidden="true" />
      </span>

      {languageOptions.map((option) => {
        const active = option.value === locale;

        return (
          <button
            key={option.value}
            type="button"
            aria-label={translate(option.ariaLabel, locale)}
            aria-pressed={active}
            className={cx(
              "flex w-10 items-center justify-center transition-colors",
              option.value === "zh" &&
                "border-l border-zinc-200 dark:border-zinc-800",
              active
                ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950"
                : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
            )}
            onClick={() => setPreferredLocale(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

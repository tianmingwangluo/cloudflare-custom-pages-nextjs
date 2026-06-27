"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import { type Localized, commonTranslations, translate } from "@/config/i18n";
import { clsx as cx } from "clsx";
import { useEffect, useState } from "react";

type ThemeMode = "day" | "night";

interface ThemeOption {
  value: ThemeMode;
  icon: "sun" | "moon";
  ariaLabel: Localized<string>;
}

const themeStorageKey = "cloudflare-custom-pages-theme";

const themeOptions: ThemeOption[] = [
  {
    value: "day",
    icon: "sun",
    ariaLabel: commonTranslations.switchToDayTheme,
  },
  {
    value: "night",
    icon: "moon",
    ariaLabel: commonTranslations.switchToNightTheme,
  },
];

function normalizeTheme(value?: string | null): ThemeMode | undefined {
  const theme = value?.toLowerCase();

  if (theme === "day" || theme === "light") {
    return "day";
  }

  if (theme === "night" || theme === "dark") {
    return "night";
  }

  return undefined;
}

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "day";
  }

  const urlTheme = normalizeTheme(
    new URLSearchParams(window.location.search).get("theme"),
  );

  if (urlTheme) {
    return urlTheme;
  }

  try {
    const storedTheme = normalizeTheme(
      window.localStorage.getItem(themeStorageKey),
    );

    if (storedTheme) {
      return storedTheme;
    }
  } catch {
    // Continue with system preference when storage is unavailable.
  }

  return "day";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeSwitch() {
  const locale = useLocale();
  const [theme, setTheme] = useState<ThemeMode>("day");

  useEffect(() => {
    const nextTheme = getInitialTheme();
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  const selectTheme = (nextTheme: ThemeMode) => {
    setTheme(nextTheme);
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    } catch {
      // Continue without persistence when storage is unavailable.
    }
  };

  return (
    <fieldset className="yy-theme" data-theme-switch="true">
      <legend className="sr-only">
        {translate(commonTranslations.themeSwitch, locale)}
      </legend>
      {themeOptions.map((option) => {
        const active = option.value === theme;

        return (
          <button
            key={option.value}
            type="button"
            data-theme-button={option.value}
            aria-label={translate(option.ariaLabel, locale)}
            aria-pressed={active}
            className={cx(active && "is-active")}
            onClick={() => selectTheme(option.value)}
          >
            <Icon name={option.icon} aria-hidden="true" />
          </button>
        );
      })}
    </fieldset>
  );
}

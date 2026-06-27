"use client";

import {
  type Locale,
  type Localized,
  defaultLocale,
  pickLocale,
  translate,
} from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

const localeStorageKey = "cloudflare-custom-pages-locale";
const localeChangeEvent = "cloudflare-custom-pages-locale-change";

function normalizeLocale(value?: string | null): Locale | undefined {
  if (!value) {
    return undefined;
  }

  const locale = value.toLowerCase();

  if (locale.startsWith("zh")) {
    return "zh";
  }

  if (locale.startsWith("en")) {
    return "en";
  }

  return undefined;
}

function getBrowserLanguages() {
  if (typeof navigator === "undefined") {
    return [];
  }

  return navigator.languages?.length
    ? navigator.languages
    : [navigator.language].filter(Boolean);
}

function getUrlLocale(): Locale | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  const lang = new URLSearchParams(window.location.search).get("lang");

  return normalizeLocale(lang);
}

function getStoredLocale(): Locale | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  try {
    return normalizeLocale(window.localStorage.getItem(localeStorageKey));
  } catch {
    return undefined;
  }
}

function getInitialLocale(): Locale {
  return (
    getUrlLocale() ?? getStoredLocale() ?? pickLocale(getBrowserLanguages())
  );
}

function applyDocumentLocale(locale: Locale) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  document.documentElement.dataset.locale = locale;
}

export function setPreferredLocale(locale: Locale) {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // Continue without persistence when storage is unavailable.
    }

    window.dispatchEvent(
      new CustomEvent<Locale>(localeChangeEvent, { detail: locale }),
    );
  }

  applyDocumentLocale(locale);
}

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const nextLocale = getInitialLocale();
    setLocale(nextLocale);
    applyDocumentLocale(nextLocale);

    const handleLocaleChange = (event: Event) => {
      const changedLocale = (event as CustomEvent<Locale>).detail;

      if (changedLocale) {
        setLocale(changedLocale);
        applyDocumentLocale(changedLocale);
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== localeStorageKey) {
        return;
      }

      const storedLocale =
        normalizeLocale(event.newValue) ?? getInitialLocale();
      setLocale(storedLocale);
      applyDocumentLocale(storedLocale);
    };

    window.addEventListener(localeChangeEvent, handleLocaleChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(localeChangeEvent, handleLocaleChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return locale;
}

export function useLocalizedDocumentTitle(title?: Localized<string> | string) {
  const locale = useLocale();

  useEffect(() => {
    const pageTitle =
      typeof title === "string"
        ? title
        : title
          ? translate(title, locale)
          : translate(siteConfig.name, locale);

    document.title = pageTitle;
  }, [locale, title]);

  return locale;
}

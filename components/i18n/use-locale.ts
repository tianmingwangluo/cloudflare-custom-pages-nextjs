"use client";

import {
  defaultLocale,
  pickLocale,
  translate,
  type Locale,
  type Localized,
} from "@/config/i18n";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

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

  const lang = new URLSearchParams(window.location.search)
    .get("lang")
    ?.toLowerCase();

  if (!lang) {
    return undefined;
  }

  return lang.startsWith("zh") ? "zh" : "en";
}

export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const nextLocale = getUrlLocale() ?? pickLocale(getBrowserLanguages());
    setLocale(nextLocale);

    document.documentElement.lang = nextLocale === "zh" ? "zh-CN" : "en";
    document.documentElement.dataset.locale = nextLocale;
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

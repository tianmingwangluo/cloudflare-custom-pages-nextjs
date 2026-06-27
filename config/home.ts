import {
  type Locale,
  type Localized,
  blockPageTranslations,
  challengePageTranslations,
  errorPageTranslations,
  translate,
} from "./i18n";
import type { IconKey } from "./icons";
import { blockPages, challengePages, errorPages } from "./routes";

export type ColorScheme = "danger" | "warning" | "primary";

export interface ColorClasses {
  itemBg: string;
  iconBg: string;
  iconText: string;
  codeBg: string;
  codeText: string;
  border: string;
}

export interface Page {
  title: string;
  path: string;
  code?: string;
  icon?: IconKey;
}

export interface Section {
  title: string;
  description: string;
  icon: IconKey;
  color: ColorScheme;
  pages: Page[];
}

const sectionTranslations = {
  error: {
    en: {
      title: "Error pages",
      description: "For origin errors, DNS issues, and connection failures.",
    },
    zh: {
      title: "错误页面",
      description: "用于源站异常、DNS 或连接错误场景。",
    },
  },
  block: {
    en: {
      title: "Block pages",
      description: "For IP, WAF, custom rule, and rate limit blocks.",
    },
    zh: {
      title: "拦截页面",
      description: "用于 IP、WAF、自定义规则与限速拦截。",
    },
  },
  challenge: {
    en: {
      title: "Challenge pages",
      description:
        "For managed challenges, interactive checks, and browser verification.",
    },
    zh: {
      title: "验证页面",
      description: "用于托管质询、交互验证与浏览器检查。",
    },
  },
} as const satisfies Record<
  string,
  Localized<{ title: string; description: string }>
>;

export const colorSchemes: Record<ColorScheme, ColorClasses> = {
  danger: {
    itemBg: "hover:bg-red-50 dark:hover:bg-red-950/30",
    iconBg: "bg-red-50 dark:bg-red-950/50 ring-red-100 dark:ring-red-900/60",
    iconText: "text-red-600 dark:text-red-300",
    codeBg: "bg-red-50 dark:bg-red-950/60",
    codeText: "text-red-700 dark:text-red-300",
    border: "border-red-100 dark:border-red-900/50",
  },
  warning: {
    itemBg: "hover:bg-amber-50 dark:hover:bg-amber-950/30",
    iconBg:
      "bg-amber-50 dark:bg-amber-950/50 ring-amber-100 dark:ring-amber-900/60",
    iconText: "text-amber-700 dark:text-amber-300",
    codeBg: "bg-amber-50 dark:bg-amber-950/60",
    codeText: "text-amber-800 dark:text-amber-300",
    border: "border-amber-100 dark:border-amber-900/50",
  },
  primary: {
    itemBg: "hover:bg-sky-50 dark:hover:bg-sky-950/30",
    iconBg: "bg-sky-50 dark:bg-sky-950/50 ring-sky-100 dark:ring-sky-900/60",
    iconText: "text-sky-700 dark:text-sky-300",
    codeBg: "bg-sky-50 dark:bg-sky-950/60",
    codeText: "text-sky-800 dark:text-sky-300",
    border: "border-sky-100 dark:border-sky-900/50",
  },
};

export function getSections(locale: Locale): Section[] {
  const error = translate(sectionTranslations.error, locale);
  const block = translate(sectionTranslations.block, locale);
  const challenge = translate(sectionTranslations.challenge, locale);

  return [
    {
      title: error.title,
      description: error.description,
      icon: "triangle-alert",
      color: "danger",
      pages: Object.entries(errorPages).map(([type, config]) => ({
        title: translate(errorPageTranslations[type], locale).title,
        path: `/cf/error/${type}/`,
        code: config.code,
        icon: config.icon,
      })),
    },
    {
      title: block.title,
      description: block.description,
      icon: "lock",
      color: "warning",
      pages: Object.entries(blockPages).map(([type, config]) => ({
        title: translate(blockPageTranslations[type], locale).title,
        path: `/cf/block/${type}/`,
        code: config.code,
        icon: config.icon,
      })),
    },
    {
      title: challenge.title,
      description: challenge.description,
      icon: "shield-check",
      color: "primary",
      pages: Object.entries(challengePages).map(([type, config]) => ({
        title: translate(challengePageTranslations[type], locale).title,
        path: `/cf/challenge/${type}/`,
        code: config.code,
        icon: config.icon,
      })),
    },
  ];
}

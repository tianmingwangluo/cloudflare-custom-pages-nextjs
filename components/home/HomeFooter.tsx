"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { LanguageSwitch } from "@/components/i18n/language-switch";
import { ThemeSwitch } from "@/components/theme-switch";
import { Icon } from "@/components/ui/icon";
import {
  commonTranslations,
  translate,
  type Localized,
} from "@/config/i18n";
import type { IconKey } from "@/config/icons";
import { siteConfig } from "@/config/site";
import print from "@/utils/console";
import { clsx } from "clsx";
import { memo } from "react";
import type { FC } from "react";

interface FooterLinkProps {
  href: string;
  icon: IconKey;
  label: string;
}

const FooterLink = memo<FooterLinkProps>(({ href, icon, label }) => (
  <a
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 transition-colors hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
  >
    <Icon name={icon} className="h-4 w-4" />
  </a>
));

FooterLink.displayName = "FooterLink";

const makeLabel = (value: Localized<string>, locale: "en" | "zh") =>
  translate(value, locale);

const HomeFooter: FC<{ className?: string }> = ({ className }) => {
  const locale = useLocale();
  const links: FooterLinkProps[] = [
    {
      href: siteConfig.links.docs,
      icon: "book-open",
      label: makeLabel(commonTranslations.cloudflareDocs, locale),
    },
    {
      href: siteConfig.links.github,
      icon: "github",
      label: makeLabel(commonTranslations.githubRepository, locale),
    },
  ];

  print();

  return (
    <footer
      className={clsx(
        "border-t border-zinc-200 bg-white/70 py-5 dark:border-zinc-800 dark:bg-zinc-950/70",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="text-sm text-zinc-500 dark:text-zinc-400">
          {translate(commonTranslations.homeFooter, locale)}
        </div>

        <div className="flex items-center gap-2">
          {links.map((link) => (
            <FooterLink key={link.href} {...link} />
          ))}
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;

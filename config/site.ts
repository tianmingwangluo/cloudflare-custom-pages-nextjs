import type { Localized } from "./i18n";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: {
    en: "Cloudflare Security Pages",
    zh: "Cloudflare 安全拦截页",
  } satisfies Localized<string>,
  description: {
    en: "A minimal, composed, bilingual template set for Cloudflare custom security and error pages.",
    zh: "一套简约、克制、中英文双版本的 Cloudflare 安全与错误自定义页面模板。",
  } satisfies Localized<string>,
  headerNavItems: [
    {
      label: {
        en: "Home",
        zh: "首页",
      } satisfies Localized<string>,
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/tianmingwangluo/cloudflare-custom-pages-nextjs",
    docs: "https://developers.cloudflare.com/rules/custom-errors/",
  },
  enableCopyrightConsole: false,
};

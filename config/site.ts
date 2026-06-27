import type { Localized } from "./i18n";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: {
    en: "YueYuan Edge Security",
    zh: "月垣护界",
  } satisfies Localized<string>,
  description: {
    en: "A refined YueYuan-style Cloudflare custom security and error page set.",
    zh: "一套月白山水风格的 Cloudflare 安全与错误自定义页面模板。",
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

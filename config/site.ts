export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Cloudflare 安全拦截页",
  description: "一套简约、克制、中文优先的 Cloudflare WAF 自定义页面模板。",
  headerNavItems: [
    {
      label: "首页",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/tianmingwangluo/cloudflare-custom-pages-nextjs",
    docs: "https://developers.cloudflare.com/rules/custom-errors/",
  },
  enableCopyrightConsole: false,
};

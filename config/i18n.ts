export type Locale = "en" | "zh";

export type Localized<T> = Record<Locale, T>;

export const defaultLocale: Locale = "en";

export interface PageTranslation {
  title: string;
  message: string;
}

export interface InterfaceTranslations {
  message: string;
}

export interface BlockPageTranslation extends PageTranslation {}
export interface ErrorPageTranslation extends PageTranslation {}
export interface ChallengePageTranslation extends PageTranslation {}

export function pickLocale(languages?: readonly string[] | null): Locale {
  const primary = languages?.find(Boolean)?.toLowerCase() || "";
  return primary.startsWith("zh") ? "zh" : "en";
}

export function translate<T extends Localized<unknown>>(
  value: T,
  locale: Locale,
): T[Locale] {
  return value[locale] ?? value[defaultLocale];
}

export const blockPageTranslations: Record<
  string,
  Localized<BlockPageTranslation>
> = {
  ip: {
    en: {
      title: "Access restricted",
      message:
        "This request did not pass the site security policy. If you believe this is a mistake, contact the site administrator and include the Ray ID below.",
    },
    zh: {
      title: "访问已受限",
      message:
        "当前访问请求未通过安全策略校验。如你认为这是误拦截，请联系站点管理员并附上页面底部的 Ray ID。",
    },
  },
  waf: {
    en: {
      title: "Request blocked by security policy",
      message:
        "The firewall detected unusual characteristics in this request and temporarily blocked access. Please try again later or use a trusted network environment.",
    },
    zh: {
      title: "请求被安全策略拦截",
      message:
        "防火墙检测到此请求存在异常特征，因此暂时阻止访问。请稍后重试，或更换正常网络环境后再次打开页面。",
    },
  },
  "rate-limit": {
    en: {
      title: "Too many requests",
      message:
        "The system detected too many requests in a short period of time. Please wait a moment before trying again.",
    },
    zh: {
      title: "请求过于频繁",
      message:
        "系统检测到短时间内请求次数较多。请等待片刻后再试，避免反复刷新页面。",
    },
  },
} as const;

export const errorPageTranslations: Record<
  string,
  Localized<ErrorPageTranslation>
> = {
  "500s": {
    en: {
      title: "Service temporarily unavailable",
      message:
        "The origin server returned an unexpected response. Cloudflare recorded this request. Please refresh later or contact the site administrator.",
    },
    zh: {
      title: "服务暂时不可用",
      message:
        "源站返回了异常响应，Cloudflare 已将本次访问记录下来。请稍后刷新页面，或联系站点管理员排查服务状态。",
    },
  },
  "1000s": {
    en: {
      title: "Connection could not be established",
      message:
        "The domain resolution or network connection is currently abnormal. Please try again later or share the Ray ID below with the site administrator.",
    },
    zh: {
      title: "连接未能建立",
      message:
        "当前域名解析或网络连接出现异常。请稍后再试，或将页面底部的 Ray ID 提供给站点管理员。",
    },
  },
} as const;

export const challengePageTranslations: Record<
  string,
  Localized<ChallengePageTranslation>
> = {
  interactive: {
    en: {
      title: "Complete the security check",
      message:
        "Please complete the verification below so we can confirm the request comes from a real visitor. Access will continue automatically after verification.",
    },
    zh: {
      title: "请完成安全验证",
      message:
        "为了确认访问来自真实用户，请完成下方验证。验证通过后页面会自动继续访问。",
    },
  },
  managed: {
    en: {
      title: "Security check in progress",
      message:
        "This site is using stricter protection. Follow the prompt below to continue browsing.",
    },
    zh: {
      title: "正在进行安全检查",
      message:
        "站点当前启用了更严格的防护策略。请根据提示完成验证，以继续访问。",
    },
  },
  country: {
    en: {
      title: "Additional verification required",
      message:
        "Based on the current access location, an additional verification step is required before continuing.",
    },
    zh: {
      title: "需要额外验证",
      message:
        "根据当前访问来源，系统需要进行一次额外验证。完成后即可继续访问。",
    },
  },
  javascript: {
    en: {
      title: "Checking your browser",
      message:
        "The security system is checking your browser environment. Keep this page open for a moment.",
    },
    zh: {
      title: "正在确认访问环境",
      message:
        "安全系统正在检查浏览器环境，请保持此页面打开，稍候片刻。",
    },
  },
} as const;

export const interfaceTranslations: Record<string, Localized<InterfaceTranslations>> =
  {
    "error-details": {
      en: { message: "Cloudflare response" },
      zh: { message: "Cloudflare 返回信息" },
    },
    "connection-tracking": {
      en: { message: "Connection status" },
      zh: { message: "连接状态" },
    },
    "network-status-you": {
      en: { message: "Visitor" },
      zh: { message: "访客" },
    },
    "network-status-cdn": {
      en: { message: "Edge node" },
      zh: { message: "边缘节点" },
    },
    "network-status-origin": {
      en: { message: "Origin" },
      zh: { message: "源站" },
    },
  } as const;

export const statusTranslations = {
  success: {
    en: "Normal",
    zh: "正常",
  },
  error: {
    en: "Restricted",
    zh: "受限",
  },
  challenging: {
    en: "Verifying",
    zh: "验证中",
  },
} as const satisfies Record<string, Localized<string>>;

export const commonTranslations = {
  accessControl: {
    en: "Access control",
    zh: "访问控制",
  },
  securityCheck: {
    en: "Security check",
    zh: "安全验证",
  },
  connectionError: {
    en: "Connection error",
    zh: "连接错误",
  },
  currentIp: {
    en: "Current IP",
    zh: "当前 IP",
  },
  region: {
    en: "Region",
    zh: "地区",
  },
  handlingAdviceTitle: {
    en: "What to do",
    zh: "处理建议",
  },
  handlingAdviceBody: {
    en: "If you need help, send the Ray ID, access time, and current IP address to the site administrator.",
    zh: "如需协助，请将 Ray ID、访问时间和当前 IP 一并提供给站点管理员。",
  },
  verificationTitle: {
    en: "Verification note",
    zh: "验证说明",
  },
  verificationBody: {
    en: "Cloudflare completes this verification automatically. Keep JavaScript and cookies enabled in your browser.",
    zh: "验证由 Cloudflare 自动完成。请保持浏览器启用 JavaScript 与 Cookie。",
  },
  verificationLoading: {
    en: "Loading verification component",
    zh: "正在加载验证组件",
  },
  troubleshootingTitle: {
    en: "Troubleshooting",
    zh: "排查提示",
  },
  troubleshootingBody: {
    en: "If refreshing does not restore access, contact the site administrator to check the origin, DNS, or security rule configuration.",
    zh: "如果刷新后仍无法访问，请联系站点管理员检查源站、DNS 或安全规则配置。",
  },
  homeFooter: {
    en: "2026 Cloudflare security page template",
    zh: "2026 Cloudflare 安全拦截页模板",
  },
  cloudflareDocs: {
    en: "Cloudflare documentation",
    zh: "Cloudflare 文档",
  },
  githubRepository: {
    en: "GitHub repository",
    zh: "GitHub 仓库",
  },
  notFoundTitle: {
    en: "Page not found",
    zh: "页面不存在",
  },
  notFoundMessage: {
    en: "There is no template page for this address. Return home to view the generated Cloudflare custom pages.",
    zh: "当前地址没有对应的模板页面。你可以返回首页查看已生成的 Cloudflare 自定义页面。",
  },
  backHome: {
    en: "Back home",
    zh: "返回首页",
  },
} as const satisfies Record<string, Localized<string>>;

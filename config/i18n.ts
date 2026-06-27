export type Locale = "en" | "zh";

export type Localized<T> = Record<Locale, T>;

export const defaultLocale: Locale = "en";

export interface PageTranslation {
  title: string;
  message: string;
  adviceTitle?: string;
  adviceMessage?: string;
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
      title: "IP / country / region block",
      message:
        "Access from this IP address, country, or region is restricted by the site security policy. If you believe this is a mistake, contact the site administrator and include the Ray ID below.",
      adviceTitle: "Why this happened",
      adviceMessage:
        "The request matched an IP, country, region, or access rule configured by the site. Try again from a trusted network, or send the Ray ID to the site administrator for review.",
    },
    zh: {
      title: "IP/国家/地区阻止",
      message:
        "当前 IP 地址、国家或地区受到站点安全策略限制。如果你认为这是误拦截，请联系站点管理员并附上页面底部的 Ray ID。",
      adviceTitle: "为什么会这样",
      adviceMessage:
        "此请求命中了站点配置的 IP、国家、地区或访问规则。你可以更换可信网络后重试，或将 Ray ID 提供给站点管理员核查。",
    },
  },
  waf: {
    en: {
      title: "WAF block",
      message:
        "The web application firewall detected request characteristics that match a protection rule, so access was blocked before reaching the origin server.",
      adviceTitle: "Request review",
      adviceMessage:
        "Avoid repeated refreshes. If this request should be allowed, share the Ray ID, current IP, and access time with the site administrator.",
    },
    zh: {
      title: "WAF 阻止",
      message:
        "Web 应用程序防火墙检测到此请求命中了防护规则，因此在请求到达源站前已被阻止。",
      adviceTitle: "请求复核",
      adviceMessage:
        "请避免反复刷新。如果此请求应当被允许，请将 Ray ID、当前 IP 和访问时间提供给站点管理员。",
    },
  },
  "rate-limit": {
    en: {
      title: "Rate limit block",
      message:
        "The site received too many requests from this visitor in a short period of time. Access is temporarily limited to protect service stability.",
      adviceTitle: "Try again shortly",
      adviceMessage:
        "Wait a moment before refreshing the page. Automated retries or repeated requests may extend the temporary limit.",
    },
    zh: {
      title: "速率限制阻止",
      message:
        "站点在短时间内收到来自当前访客的过多请求。为保护服务稳定性，访问已被临时限制。",
      adviceTitle: "稍后再试",
      adviceMessage:
        "请等待片刻后再刷新页面。自动重试或反复请求可能会延长临时限制时间。",
    },
  },
} as const;

export const errorPageTranslations: Record<
  string,
  Localized<ErrorPageTranslation>
> = {
  "500s": {
    en: {
      title: "500 class errors",
      message:
        "The origin server returned an unexpected response or could not complete the request. Cloudflare recorded the event for troubleshooting.",
      adviceTitle: "Origin status",
      adviceMessage:
        "Refresh later. If the problem continues, contact the site administrator so they can inspect the origin service, logs, and deployment status.",
    },
    zh: {
      title: "500 类错误",
      message:
        "源站返回了异常响应，或暂时无法完成请求。Cloudflare 已记录本次事件，便于站点管理员排查。",
      adviceTitle: "源站状态",
      adviceMessage:
        "请稍后刷新页面。如果问题持续出现，请联系站点管理员检查源站服务、日志和部署状态。",
    },
  },
  "1000s": {
    en: {
      title: "1000 class errors",
      message:
        "Cloudflare could not complete the request because of a DNS, routing, SSL, or security configuration issue.",
      adviceTitle: "Configuration check",
      adviceMessage:
        "This usually requires an administrator to review DNS records, SSL/TLS settings, origin reachability, or security rules.",
    },
    zh: {
      title: "1000 类错误",
      message:
        "由于 DNS、路由、SSL 或安全配置问题，Cloudflare 暂时无法完成本次请求。",
      adviceTitle: "配置检查",
      adviceMessage:
        "这通常需要站点管理员检查 DNS 记录、SSL/TLS 设置、源站连通性或安全规则配置。",
    },
  },
} as const;

export const challengePageTranslations: Record<
  string,
  Localized<ChallengePageTranslation>
> = {
  interactive: {
    en: {
      title: "Interactive challenge",
      message:
        "Complete the interactive verification below so Cloudflare can confirm this request comes from a real visitor.",
      adviceTitle: "Before continuing",
      adviceMessage:
        "Keep JavaScript and cookies enabled. Access will continue automatically after the challenge is completed.",
    },
    zh: {
      title: "交互式质询",
      message:
        "请完成下方交互式验证，Cloudflare 将通过此步骤确认请求来自真实访客。",
      adviceTitle: "继续访问前",
      adviceMessage:
        "请保持浏览器启用 JavaScript 和 Cookie。验证完成后，页面会自动继续访问。",
    },
  },
  managed: {
    en: {
      title: "Managed challenge / I'm Under Attack Mode",
      message:
        "This site is using managed protection or I'm Under Attack Mode. Cloudflare will decide the appropriate verification step for this visitor.",
      adviceTitle: "Managed protection",
      adviceMessage:
        "Follow the prompt below and keep the page open. Most visitors will continue automatically once Cloudflare completes the check.",
    },
    zh: {
      title: "托管质询/I'm Under Attack Mode",
      message:
        "站点当前启用了托管防护或 I'm Under Attack Mode。Cloudflare 会根据访客风险自动选择合适的验证步骤。",
      adviceTitle: "托管防护",
      adviceMessage:
        "请按照下方提示操作并保持页面打开。大多数访客会在 Cloudflare 完成检查后自动继续访问。",
    },
  },
  country: {
    en: {
      title: "IP / country / region challenge",
      message:
        "This request requires additional verification because of its IP address, country, region, or access rule match.",
      adviceTitle: "Location-based verification",
      adviceMessage:
        "Complete the verification below to continue. If this challenge appears unexpectedly, share the Ray ID with the site administrator.",
    },
    zh: {
      title: "IP/国家/地区质询",
      message:
        "由于当前请求命中了 IP 地址、国家、地区或访问规则，继续访问前需要完成额外验证。",
      adviceTitle: "基于访问来源的验证",
      adviceMessage:
        "请完成下方验证后继续访问。如果你认为此质询不应出现，请将 Ray ID 提供给站点管理员。",
    },
  },
  javascript: {
    en: {
      title: "Non-interactive challenge",
      message:
        "Cloudflare is verifying this browser automatically. No manual action is usually required while the check is running.",
      adviceTitle: "Automatic check",
      adviceMessage:
        "Keep this page open and do not disable JavaScript or cookies. The page will continue when the verification finishes.",
    },
    zh: {
      title: "非交互式挑战",
      message:
        "Cloudflare 正在自动验证当前浏览器。检查过程中通常不需要手动操作。",
      adviceTitle: "自动检查",
      adviceMessage:
        "请保持此页面打开，并不要禁用 JavaScript 或 Cookie。验证完成后页面会继续访问。",
    },
  },
  "non-interactive": {
    en: {
      title: "Non-interactive challenge",
      message:
        "Cloudflare is verifying this browser automatically. No manual action is usually required while the check is running.",
      adviceTitle: "Automatic check",
      adviceMessage:
        "Keep this page open and do not disable JavaScript or cookies. The page will continue when the verification finishes.",
    },
    zh: {
      title: "非交互式挑战",
      message:
        "Cloudflare 正在自动验证当前浏览器。检查过程中通常不需要手动操作。",
      adviceTitle: "自动检查",
      adviceMessage:
        "请保持此页面打开，并不要禁用 JavaScript 或 Cookie。验证完成后页面会继续访问。",
    },
  },
} as const;

export const interfaceTranslations: Record<
  string,
  Localized<InterfaceTranslations>
> = {
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
  yueYuanBrand: {
    en: "YueYuan Guard · Active",
    zh: "月垣护界 · 已启",
  },
  yueYuanTitle: {
    en: "YueYuan guards this passage",
    zh: "此间设有月垣，暂不可通行",
  },
  yueYuanSubtitle: {
    en: "This request did not pass the edge security check",
    zh: "当前请求未通过边缘安全校验",
  },
  yueYuanBody: {
    en: "To protect the site, YueYuan Edge Security stopped this request. Possible causes include unusual traffic, a suspicious proxy, or automated behavior. Contact the site owner if you need help.",
    zh: "为保障站点稳定与数据安全，月垣护界已拦截此次请求。可能原因包括访问频率异常、代理环境可疑或自动化行为。如需协助，请联系站主。",
  },
  yueYuanErrorBody: {
    en: "YueYuan Edge Security is checking the site connection. Try again later, or share the request ID with the site owner if the problem continues.",
    zh: "月垣护界正在巡检站点连接状态，本次请求已暂缓通行。请稍后再试；若问题持续，请将请求编号提供给站主排查。",
  },
  yueYuanStatus: {
    en: "Status",
    zh: "状态",
  },
  yueYuanBlocked: {
    en: "Blocked",
    zh: "已拦截",
  },
  yueYuanGuarding: {
    en: "Guarding",
    zh: "守护中",
  },
  yueYuanType: {
    en: "Type",
    zh: "类型",
  },
  yueYuanEdgeType: {
    en: "Edge protection",
    zh: "边缘防护",
  },
  yueYuanRequestId: {
    en: "Request ID",
    zh: "请求编号",
  },
  yueYuanVerticalTop: {
    en: "YueYuan guards all paths",
    zh: "月垣镇四方",
  },
  yueYuanVerticalBottom: {
    en: "Boundaries stay calm",
    zh: "护界佑安宁",
  },
  yueYuanSealTop: {
    en: "Guard",
    zh: "护界",
  },
  yueYuanSealBottom: {
    en: "Active",
    zh: "已启",
  },
  yueYuanProtectedBy: {
    en: "Protected by YueYuan Edge Security",
    zh: "Protected by YueYuan Edge Security",
  },
  contactOwner: {
    en: "Contact owner",
    zh: "联系站主",
  },
  challengePanelTitle: {
    en: "Security verification",
    zh: "安全验证",
  },
  detailPanelTitle: {
    en: "Cloudflare details",
    zh: "Cloudflare 返回信息",
  },
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
  languageSwitch: {
    en: "Language",
    zh: "语言",
  },
  themeSwitch: {
    en: "Theme",
    zh: "主题",
  },
  switchToEnglish: {
    en: "Switch to English",
    zh: "切换到英文",
  },
  switchToChinese: {
    en: "Switch to Chinese",
    zh: "切换到中文",
  },
  switchToDayTheme: {
    en: "Switch to day theme",
    zh: "切换到白天模式",
  },
  switchToNightTheme: {
    en: "Switch to night theme",
    zh: "切换到黑夜模式",
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

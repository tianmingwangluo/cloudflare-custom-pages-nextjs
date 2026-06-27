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

export const blockPageTranslations: Record<string, BlockPageTranslation> = {
  ip: {
    title: "访问已受限",
    message:
      "当前访问请求未通过安全策略校验。如你认为这是误拦截，请联系站点管理员并附上页面底部的 Ray ID。",
  },
  waf: {
    title: "请求被安全策略拦截",
    message:
      "防火墙检测到此请求存在异常特征，因此暂时阻止访问。请稍后重试，或更换正常网络环境后再次打开页面。",
  },
  "rate-limit": {
    title: "请求过于频繁",
    message:
      "系统检测到短时间内请求次数较多。请等待片刻后再试，避免反复刷新页面。",
  },
} as const;

export const errorPageTranslations: Record<string, ErrorPageTranslation> = {
  "500s": {
    title: "服务暂时不可用",
    message:
      "源站返回了异常响应，Cloudflare 已将本次访问记录下来。请稍后刷新页面，或联系站点管理员排查服务状态。",
  },
  "1000s": {
    title: "连接未能建立",
    message:
      "当前域名解析或网络连接出现异常。请稍后再试，或将页面底部的 Ray ID 提供给站点管理员。",
  },
} as const;

export const challengePageTranslations: Record<
  string,
  ChallengePageTranslation
> = {
  interactive: {
    title: "请完成安全验证",
    message: "为了确认访问来自真实用户，请完成下方验证。验证通过后页面会自动继续访问。",
  },
  managed: {
    title: "正在进行安全检查",
    message: "站点当前启用了更严格的防护策略。请根据提示完成验证，以继续访问。",
  },
  country: {
    title: "需要额外验证",
    message: "根据当前访问来源，系统需要进行一次额外验证。完成后即可继续访问。",
  },
  javascript: {
    title: "正在确认访问环境",
    message: "安全系统正在检查浏览器环境，请保持此页面打开，稍候片刻。",
  },
} as const;

export const interfaceTranslations: Record<string, InterfaceTranslations> = {
  "error-details": {
    message: "Cloudflare 返回信息",
  },
  "connection-tracking": {
    message: "连接状态",
  },
  "network-status-you": {
    message: "访客",
  },
  "network-status-cdn": {
    message: "边缘节点",
  },
  "network-status-origin": {
    message: "源站",
  },
} as const;

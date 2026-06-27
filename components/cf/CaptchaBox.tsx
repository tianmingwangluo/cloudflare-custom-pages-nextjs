"use client";

import { Icon } from "@/components/ui/icon";
import { challengePageTranslations } from "@/config/i18n";
import type { ChallengePageConfig } from "@/config/routes";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { NetworkStatusBox } from "./ui/NetworkStatusBox";
import { NetworkStatusWrapper } from "./ui/NetworkStatusWrapper";

export const CaptchaBox = ({
  type,
  code,
  box,
  icon,
  networkStatus,
}: ChallengePageConfig) => {
  const translation = challengePageTranslations[type];

  return (
    <CFCardWrap>
      <CFCard
        title={translation.title}
        message={translation.message}
        subtitle={`安全验证 / HTTP ${code}`}
        icon={<Icon name={icon} className="h-6 w-6" />}
        scheme="primary"
        footer={
          <div className="space-y-8">
            <NetworkStatusWrapper>
              <NetworkStatusBox {...networkStatus} />
            </NetworkStatusWrapper>

            <div>
              <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                验证说明
              </h2>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                验证由 Cloudflare 自动完成。请保持浏览器启用 JavaScript 与 Cookie。
              </p>
            </div>
          </div>
        }
      >
        <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900/60">
          <div className="flex min-h-28 items-center justify-center rounded-md bg-white p-4 dark:bg-zinc-950">
            {box ? (
              <div
                className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400"
                dangerouslySetInnerHTML={{ __html: `<div>::${box}::</div>` }}
                aria-live="polite"
              />
            ) : (
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                正在加载验证组件
              </p>
            )}
          </div>
        </div>
      </CFCard>
    </CFCardWrap>
  );
};

export default CaptchaBox;

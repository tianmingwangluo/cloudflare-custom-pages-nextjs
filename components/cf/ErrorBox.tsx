"use client";

import { Icon } from "@/components/ui/icon";
import { errorPageTranslations, interfaceTranslations } from "@/config/i18n";
import type { ErrorPageConfig } from "@/config/routes";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { NetworkStatusBox } from "./ui/NetworkStatusBox";
import { NetworkStatusWrapper } from "./ui/NetworkStatusWrapper";

export const ErrorBox = ({
  type,
  code,
  box,
  icon,
  networkStatus,
}: ErrorPageConfig) => {
  const translation = errorPageTranslations[type];

  return (
    <CFCardWrap>
      <CFCard
        title={translation.title}
        message={translation.message}
        subtitle={`连接错误 / HTTP ${code}`}
        icon={<Icon name={icon} className="h-6 w-6" />}
        scheme="danger"
        footer={
          <div className="space-y-8">
            <NetworkStatusWrapper>
              <NetworkStatusBox {...networkStatus} />
            </NetworkStatusWrapper>

            <div>
              <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                排查提示
              </h2>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                如果刷新后仍无法访问，请联系站点管理员检查源站、DNS 或安全规则配置。
              </p>
            </div>
          </div>
        }
      >
        {box && (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
              <Icon name="info" className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              {interfaceTranslations["error-details"].message}
            </h2>

            <div
              className="overflow-x-auto rounded-md bg-white p-4 font-mono text-xs leading-6 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-300"
              dangerouslySetInnerHTML={{
                __html: `<div>::${box}::</div>`,
              }}
            />
          </div>
        )}
      </CFCard>
    </CFCardWrap>
  );
};

export default ErrorBox;

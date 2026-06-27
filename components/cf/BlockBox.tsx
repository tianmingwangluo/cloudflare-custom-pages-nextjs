"use client";

import { Icon } from "@/components/ui/icon";
import { blockPageTranslations } from "@/config/i18n";
import type { BlockPageConfig } from "@/config/routes";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { NetworkStatusBox } from "./ui/NetworkStatusBox";
import { NetworkStatusWrapper } from "./ui/NetworkStatusWrapper";

const getScheme = (type: BlockPageConfig["type"]) =>
  type === "rate-limit" ? "warning" : "danger";

export const BlockBox = ({
  type,
  code,
  icon,
  networkStatus,
}: BlockPageConfig) => {
  const translation = blockPageTranslations[type];

  return (
    <CFCardWrap>
      <CFCard
        title={translation.title}
        message={translation.message}
        subtitle={`访问控制 / HTTP ${code}`}
        icon={<Icon name={icon} className="h-6 w-6" />}
        scheme={getScheme(type)}
        footer={
          <div className="space-y-8">
            <NetworkStatusWrapper>
              <NetworkStatusBox {...networkStatus} />
            </NetworkStatusWrapper>

            <div>
              <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                处理建议
              </h2>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                如需协助，请将 Ray ID、访问时间和当前 IP 一并提供给站点管理员。
              </p>
            </div>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">当前 IP</div>
            <code className="mt-2 block break-all font-mono text-sm text-zinc-900 dark:text-zinc-100">
              ::CLIENT_IP::
            </code>
          </div>

          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Ray ID</div>
            <code className="mt-2 block break-all font-mono text-sm text-zinc-900 dark:text-zinc-100">
              ::RAY_ID::
            </code>
          </div>
        </div>
      </CFCard>
    </CFCardWrap>
  );
};

export default BlockBox;

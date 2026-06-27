"use client";

import { useLocalizedDocumentTitle } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import {
  blockPageTranslations,
  commonTranslations,
  translate,
} from "@/config/i18n";
import type { BlockPageConfig } from "@/config/routes";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { NetworkStatusBox } from "./ui/NetworkStatusBox";
import { NetworkStatusWrapper } from "./ui/NetworkStatusWrapper";
import Head from "next/head";

const getScheme = (type: BlockPageConfig["type"]) =>
  type === "rate-limit" ? "warning" : "danger";

export const BlockBox = ({
  type,
  code,
  icon,
  networkStatus,
}: BlockPageConfig) => {
  const locale = useLocalizedDocumentTitle({
    en: `${translate(blockPageTranslations[type], "en").title} - Cloudflare`,
    zh: `${translate(blockPageTranslations[type], "zh").title} - Cloudflare`,
  });
  const translation = translate(blockPageTranslations[type], locale);

  return (
    <CFCardWrap>
      <Head>
        <title>{translation.title} - Cloudflare</title>
        <meta name="description" content={translation.message} />
      </Head>

      <CFCard
        title={translation.title}
        message={translation.message}
        subtitle={`${translate(commonTranslations.accessControl, locale)} / HTTP ${code}`}
        icon={<Icon name={icon} className="h-6 w-6" />}
        scheme={getScheme(type)}
        footer={
          <div className="space-y-8">
            <NetworkStatusWrapper />
            <NetworkStatusBox {...networkStatus} />

            <div>
              <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {translate(commonTranslations.handlingAdviceTitle, locale)}
              </h2>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                {translate(commonTranslations.handlingAdviceBody, locale)}
              </p>
            </div>
          </div>
        }
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-md border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {translate(commonTranslations.currentIp, locale)}
            </div>
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

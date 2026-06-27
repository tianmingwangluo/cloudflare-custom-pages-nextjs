"use client";

import { useLocalizedDocumentTitle } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import {
  challengePageTranslations,
  commonTranslations,
  translate,
} from "@/config/i18n";
import type { ChallengePageConfig } from "@/config/routes";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { NetworkStatusBox } from "./ui/NetworkStatusBox";
import { NetworkStatusWrapper } from "./ui/NetworkStatusWrapper";
import Head from "next/head";

export const CaptchaBox = ({
  type,
  code,
  box,
  icon,
  networkStatus,
}: ChallengePageConfig) => {
  const locale = useLocalizedDocumentTitle({
    en: `${translate(challengePageTranslations[type], "en").title} - Cloudflare`,
    zh: `${translate(challengePageTranslations[type], "zh").title} - Cloudflare`,
  });
  const translation = translate(challengePageTranslations[type], locale);

  return (
    <CFCardWrap>
      <Head>
        <title>{translation.title} - Cloudflare</title>
        <meta name="description" content={translation.message} />
      </Head>

      <CFCard
        title={translation.title}
        message={translation.message}
        subtitle={`${translate(commonTranslations.securityCheck, locale)} / HTTP ${code}`}
        icon={<Icon name={icon} className="h-6 w-6" />}
        scheme="primary"
        footer={
          <div className="space-y-8">
            <div>
              <NetworkStatusWrapper />
              <NetworkStatusBox {...networkStatus} />
            </div>

            <div>
              <h2 className="mb-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {translate(commonTranslations.verificationTitle, locale)}
              </h2>
              <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
                {translate(commonTranslations.verificationBody, locale)}
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
                {translate(commonTranslations.verificationLoading, locale)}
              </p>
            )}
          </div>
        </div>
      </CFCard>
    </CFCardWrap>
  );
};

export default CaptchaBox;

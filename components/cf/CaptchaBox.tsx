"use client";

import { useLocalizedDocumentTitle } from "@/components/i18n/use-locale";
import {
  challengePageTranslations,
  commonTranslations,
  translate,
} from "@/config/i18n";
import type { ChallengePageConfig } from "@/config/routes";
import Head from "next/head";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { SecurityMetaBar } from "./ui/SecurityMetaBar";
import { YueYuanActions } from "./ui/YueYuanActions";

export const CaptchaBox = ({ type, box }: ChallengePageConfig) => {
  const locale = useLocalizedDocumentTitle({
    en: `${translate(challengePageTranslations[type], "en").title} - YueYuan`,
    zh: `${translate(challengePageTranslations[type], "zh").title} - 月垣护界`,
  });
  const translation = translate(challengePageTranslations[type], locale);

  return (
    <CFCardWrap>
      <Head>
        <title>{`${translation.title} - YueYuan`}</title>
        <meta name="description" content={translation.message} />
      </Head>

      <CFCard
        title={translate(commonTranslations.yueYuanTitle, locale)}
        subtitle={translate(commonTranslations.yueYuanSubtitle, locale)}
        message={translate(commonTranslations.yueYuanBody, locale)}
      >
        <SecurityMetaBar />

        {box && (
          <div className="yy-widget">
            <h2>{translate(commonTranslations.challengePanelTitle, locale)}</h2>
            <div
              className="yy-widget__box"
              dangerouslySetInnerHTML={{ __html: `<div>::${box}::</div>` }}
              aria-live="polite"
            />
          </div>
        )}

        <div className="yy-note">
          <h2>{translation.adviceTitle}</h2>
          <p>{translation.adviceMessage}</p>
        </div>

        <YueYuanActions />
      </CFCard>
    </CFCardWrap>
  );
};

export default CaptchaBox;

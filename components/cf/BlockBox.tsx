"use client";

import { useLocalizedDocumentTitle } from "@/components/i18n/use-locale";
import {
  blockPageTranslations,
  commonTranslations,
  translate,
} from "@/config/i18n";
import type { BlockPageConfig } from "@/config/routes";
import Head from "next/head";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { SecurityMetaBar } from "./ui/SecurityMetaBar";
import { YueYuanActions } from "./ui/YueYuanActions";

export const BlockBox = ({ type }: BlockPageConfig) => {
  const locale = useLocalizedDocumentTitle({
    en: `${translate(blockPageTranslations[type], "en").title} - YueYuan`,
    zh: `${translate(blockPageTranslations[type], "zh").title} - 月垣护界`,
  });
  const translation = translate(blockPageTranslations[type], locale);

  return (
    <CFCardWrap>
      <Head>
        <title>{translation.title} - YueYuan</title>
        <meta name="description" content={translation.message} />
      </Head>

      <CFCard
        title={translate(commonTranslations.yueYuanTitle, locale)}
        subtitle={translate(commonTranslations.yueYuanSubtitle, locale)}
        message={translate(commonTranslations.yueYuanBody, locale)}
      >
        <SecurityMetaBar />

        <div className="yy-note">
          <h2>{translation.adviceTitle}</h2>
          <p>{translation.adviceMessage}</p>
        </div>

        <YueYuanActions />
      </CFCard>
    </CFCardWrap>
  );
};

export default BlockBox;

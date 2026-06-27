"use client";

import { useLocalizedDocumentTitle } from "@/components/i18n/use-locale";
import {
  commonTranslations,
  errorPageTranslations,
  translate,
} from "@/config/i18n";
import type { ErrorPageConfig } from "@/config/routes";
import Head from "next/head";
import { CFCard } from "./ui/CFCard";
import { CFCardWrap } from "./ui/CFCardWrapper";
import { SecurityMetaBar } from "./ui/SecurityMetaBar";
import { YueYuanActions } from "./ui/YueYuanActions";

export const ErrorBox = ({ type, box }: ErrorPageConfig) => {
  const locale = useLocalizedDocumentTitle({
    en: `${translate(errorPageTranslations[type], "en").title} - YueYuan`,
    zh: `${translate(errorPageTranslations[type], "zh").title} - 月垣护界`,
  });
  const translation = translate(errorPageTranslations[type], locale);

  return (
    <CFCardWrap>
      <Head>
        <title>{translation.title} - YueYuan</title>
        <meta name="description" content={translation.message} />
      </Head>

      <CFCard
        title={translate(commonTranslations.yueYuanTitle, locale)}
        subtitle={translate(commonTranslations.yueYuanSubtitle, locale)}
        message={translate(commonTranslations.yueYuanErrorBody, locale)}
      >
        <SecurityMetaBar
          statusLabel={translate(commonTranslations.yueYuanGuarding, locale)}
        />

        {box && (
          <div className="yy-detail">
            <h2>{translate(commonTranslations.detailPanelTitle, locale)}</h2>
            <div
              className="yy-detail__box"
              dangerouslySetInnerHTML={{
                __html: `<div>::${box}::</div>`,
              }}
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

export default ErrorBox;

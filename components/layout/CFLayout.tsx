"use client";

import { YueYuanMark } from "@/components/cf/ui/YueYuanMark";
import { useLocale } from "@/components/i18n/use-locale";
import { commonTranslations, translate } from "@/config/i18n";
import { type ReactNode, useEffect } from "react";
import { BaseLayout } from "./BaseLayout";

interface CFLayoutProps {
  children: ReactNode;
}

export const CFLayout = ({ children }: CFLayoutProps) => {
  const locale = useLocale();

  useEffect(() => {
    for (const node of document.querySelectorAll<HTMLElement>(
      "[data-ray-id]",
    )) {
      const value = node.textContent?.trim() ?? "";
      if (!value || value.includes("::RAY_ID::")) {
        node.textContent = "7F4C-9A21-RAY";
      }
    }
  }, []);

  return (
    <BaseLayout>
      <div className="yy-shell">
        <div className="yy-scenery" aria-hidden="true">
          <div className="yy-orbit" />
          <div className="yy-cloud yy-cloud--left" />
          <div className="yy-cloud yy-cloud--right" />
          <div className="yy-wall yy-wall--left" />
          <div className="yy-mountain yy-mountain--back" />
          <div className="yy-mountain yy-mountain--middle" />
          <div className="yy-mountain yy-mountain--front" />
        </div>

        <header className="yy-brand" aria-label="YueYuan Edge Security">
          <YueYuanMark compact />
          <span className="yy-brand__text">
            {translate(commonTranslations.yueYuanBrand, locale)}
          </span>
        </header>

        <aside className="yy-vertical" aria-hidden="true">
          <span>
            {translate(commonTranslations.yueYuanVerticalTop, locale)}
          </span>
          <span>
            {translate(commonTranslations.yueYuanVerticalBottom, locale)}
          </span>
          <i className="yy-seal">
            <span>{translate(commonTranslations.yueYuanSealTop, locale)}</span>
            <span>
              {translate(commonTranslations.yueYuanSealBottom, locale)}
            </span>
          </i>
        </aside>

        <main className="yy-main">
          <div className="yy-main__inner">{children}</div>
        </main>

        <footer className="yy-protected">
          <span className="yy-protected__shield" aria-hidden="true" />
          <span className="yy-protected__text">
            {translate(commonTranslations.yueYuanProtectedBy, locale)}
          </span>
        </footer>
      </div>
    </BaseLayout>
  );
};

export default CFLayout;

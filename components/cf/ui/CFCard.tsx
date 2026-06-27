import { LanguageSwitch } from "@/components/i18n/language-switch";
import type { ReactNode } from "react";
import { ThemeSwitch } from "./ThemeSwitch";
import { YueYuanMark } from "./YueYuanMark";

interface CFCardProps {
  title: string;
  subtitle?: ReactNode;
  message: ReactNode;
  children?: ReactNode;
}

export const CFCard = ({ title, subtitle, message, children }: CFCardProps) => {
  return (
    <section className="yy-card">
      <span className="yy-card__corner yy-card__corner--tl" />
      <span className="yy-card__corner yy-card__corner--tr" />
      <span className="yy-card__corner yy-card__corner--bl" />
      <span className="yy-card__corner yy-card__corner--br" />

      <div className="yy-card__tools">
        <ThemeSwitch />
        <LanguageSwitch className="yy-locale" />
      </div>

      <div className="yy-card__emblem">
        <YueYuanMark compact />
      </div>

      <div className="yy-card__rule yy-card__rule--top" aria-hidden="true" />

      <h1 className="yy-title">{title}</h1>
      {subtitle && <p className="yy-subtitle">{subtitle}</p>}

      <div className="yy-divider" aria-hidden="true">
        <span />
      </div>

      <div className="yy-message">{message}</div>

      {children && <div className="yy-card__body">{children}</div>}
    </section>
  );
};

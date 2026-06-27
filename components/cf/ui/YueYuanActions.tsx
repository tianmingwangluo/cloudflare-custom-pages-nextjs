"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import { commonTranslations, translate } from "@/config/i18n";

export function YueYuanActions() {
  const locale = useLocale();

  return (
    <div className="yy-actions">
      <a href="/" className="yy-button yy-button--gold">
        <Icon name="home" className="yy-button__icon" />
        <span>{translate(commonTranslations.backHome, locale)}</span>
      </a>
      {/* Replace admin@example.com with the real site owner address. */}
      <a href="mailto:admin@example.com" className="yy-button yy-button--green">
        <Icon name="message-square" className="yy-button__icon" />
        <span>{translate(commonTranslations.contactOwner, locale)}</span>
      </a>
    </div>
  );
}

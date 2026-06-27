"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import { commonTranslations, translate } from "@/config/i18n";

interface SecurityMetaBarProps {
  statusLabel?: string;
  typeLabel?: string;
  rayId?: string;
}

export function SecurityMetaBar({
  statusLabel,
  typeLabel,
  rayId = "::RAY_ID::",
}: SecurityMetaBarProps) {
  const locale = useLocale();

  return (
    <div className="yy-meta" data-ray-fallback="7F4C-9A21-RAY">
      <div className="yy-meta__item">
        <Icon name="shield" className="yy-meta__icon" />
        <span>{translate(commonTranslations.yueYuanStatus, locale)}</span>
        <strong className="yy-meta__danger">
          {statusLabel ?? translate(commonTranslations.yueYuanBlocked, locale)}
        </strong>
      </div>

      <div className="yy-meta__item">
        <Icon name="network" className="yy-meta__icon" />
        <span>{translate(commonTranslations.yueYuanType, locale)}</span>
        <strong>
          {typeLabel ?? translate(commonTranslations.yueYuanEdgeType, locale)}
        </strong>
      </div>

      <div className="yy-meta__item">
        <Icon name="file-question" className="yy-meta__icon" />
        <span>{translate(commonTranslations.yueYuanRequestId, locale)}</span>
        <code data-ray-id="true">{rayId}</code>
      </div>
    </div>
  );
}

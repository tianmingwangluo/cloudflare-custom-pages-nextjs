"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { interfaceTranslations, translate } from "@/config/i18n";
import type { NetworkStatusConfig } from "@/config/routes";
import { clsx } from "clsx";
import { NetworkNode } from "./NetworkNode";

interface NetworkStatusBoxProps extends NetworkStatusConfig {
  rayId?: string;
  className?: string;
}

export const NetworkStatusBox = ({
  clientStatus,
  edgeStatus,
  originStatus,
  className,
}: NetworkStatusBoxProps) => {
  const locale = useLocale();

  return (
    <div className={clsx("grid gap-2.5", className)}>
      <NetworkNode
        label={translate(interfaceTranslations["network-status-you"], locale).message}
        status={clientStatus}
      />
      <NetworkNode
        label={translate(interfaceTranslations["network-status-cdn"], locale).message}
        status={edgeStatus}
      />
      {originStatus && (
        <NetworkNode
          label={
            translate(interfaceTranslations["network-status-origin"], locale).message
          }
          status={originStatus}
        />
      )}
    </div>
  );
};

export default NetworkStatusBox;

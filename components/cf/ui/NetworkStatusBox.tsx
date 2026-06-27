import { interfaceTranslations } from "@/config/i18n";
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
  return (
    <div className={clsx("grid gap-2.5", className)}>
      <NetworkNode
        label={interfaceTranslations["network-status-you"].message}
        status={clientStatus}
      />
      <NetworkNode
        label={interfaceTranslations["network-status-cdn"].message}
        status={edgeStatus}
      />
      {originStatus && (
        <NetworkNode
          label={interfaceTranslations["network-status-origin"].message}
          status={originStatus}
        />
      )}
    </div>
  );
};

export default NetworkStatusBox;

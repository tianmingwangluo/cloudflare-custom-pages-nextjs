import { Icon } from "@/components/ui/icon";
import { interfaceTranslations } from "@/config/i18n";
import type { ReactNode } from "react";

export const NetworkStatusWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
        <Icon name="network" className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
        {interfaceTranslations["connection-tracking"].message}
      </div>
      {children}
    </div>
  );
};

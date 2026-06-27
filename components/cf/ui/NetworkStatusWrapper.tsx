"use client";

import { useLocale } from "@/components/i18n/use-locale";
import { Icon } from "@/components/ui/icon";
import { interfaceTranslations, translate } from "@/config/i18n";

export const NetworkStatusWrapper = () => {
  const locale = useLocale();

  return (
    <div className="mb-4 flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100">
      <Icon name="network" className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
      {translate(interfaceTranslations["connection-tracking"], locale).message}
    </div>
  );
};

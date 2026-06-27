import { Icon } from "@/components/ui/icon";
import { clsx } from "clsx";

type NetworkStatus = "success" | "error" | "challenging";

interface NetworkNodeProps {
  label: string;
  status: NetworkStatus;
  className?: string;
}

const statusConfig = {
  success: {
    text: "正常",
    icon: "check-circle",
    className:
      "border-emerald-100 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  error: {
    text: "受限",
    icon: "x-circle",
    className:
      "border-red-100 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300",
  },
  challenging: {
    text: "验证中",
    icon: "shield-check",
    className:
      "border-amber-100 bg-amber-50 text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300",
  },
} as const;

export const NetworkNode = ({ label, status, className }: NetworkNodeProps) => {
  const config = statusConfig[status];

  return (
    <div
      className={clsx(
        "flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 py-2.5",
        config.className,
        className,
      )}
    >
      <span className="min-w-0 truncate text-sm font-medium">{label}</span>
      <span className="inline-flex shrink-0 items-center gap-1.5 text-xs">
        <Icon name={config.icon} className="h-3.5 w-3.5" />
        {config.text}
      </span>
    </div>
  );
};
